import PlayThumbnail from './PlayThumbnail';
import 'fs' from 'fs'
import { ReactComponent as ImageOops } from 'images/img-oops.svg';
import { Fragment, useEffect, useState } from 'react';
import Loader from 'common/spinner/spinner';
import useLocalStorage from 'common/hooks/useLocalStorage';
import { default as all_plays } from 'plays/playsList';
import { nanoid } from 'nanoid'
import './playlist.css';
import { toSanitized } from 'common/services/string';
import DynamicBanner from './DynamicBanner';
import { useLocation } from 'react-router-dom';
import { ParseQuery, QueryDBTranslator } from 'common/search/search-helper';
import { getPlaysByFilter } from 'common/services/plays';
import Counts from 'common/utils/RenderCounts';

export const PlayNotFound = ({ search = null }) => {
  return (
    <div className="play-not-found">
      <ImageOops className="play-not-found-image" />
      <p className="page-404-lead">Play not found</p>
      {search ? (
        <p className="page-404-desc">
          You migh want to adjust the search criteria or{' '}
          <a className="underline" href="/plays">
            clear
          </a>{' '}
          it.
        </p>
      ) : (
        <p className="page-404-desc">Something went wrong</p>
      )}
    </div>

  )
}

const PlayList = () => {
  const [loading, setLoading] = useState(true);
  const [plays, setPlays] = useState([]);
  const [isFiltered, setIsFiltered] = useState(false);
  //   const [allPlays, setAllPlays] =  useLocalStorage('vall_Plays', [],0);
  const [allPlays, setAllPlays] = useState([]);
  // get a look to local storage
  const [isInstallChecked, setIsInstallChecked] = useState(false);
  let location = useLocation();

  const checkPlaysIntallation = () => {

      // check plays install
      // no relation with api
      if(Array.isArray(plays) && plays.length > 0) {

          console.dir(plays[0])
      try {
          if (fs.existsSync(`../../${plays[0].path}/node_modules`)) {
            //file exists
          }
        } catch(err) {
          console.log('package not installed')
          console.error(err)
        }
      }


  }


  useEffect(() => {
    const getPlays = async () => {
      setLoading(true);
      const parsedQuery = ParseQuery(location.search);
      if (!parsedQuery && Array.isArray(allPlays)) {
        if (allPlays.length > 0) {
          setPlays([...allPlays])
          setIsFiltered(false)
        }
      }

      let translatedQuery;
      if (parsedQuery) {
        translatedQuery = QueryDBTranslator(parsedQuery);
      }

      if (allPlays.length === 0) {
        let res = await getPlaysByFilter(translatedQuery) ;
        if(res) {
          const results =    res.filter((res_play) => all_plays.includes(res_play.title_name) || all_plays.includes(res_play.component));
          setPlays(results);
          setAllPlays(res);
        }
        if (translatedQuery) {
          setIsFiltered(true);
        }
      } else {
          setPlays([...allPlays.filter((res_play) => all_plays.includes(res_play.title_name) || all_plays.includes(res_play.component))]);
      }
      setLoading(false);
    };
    await getPlays();
    checkPlaysIntallation();
  }, [location.search]);


  if(plays?.length === 0) {
      return loading ? <Loader /> : <PlayNotFound search={location?.search ? location.search : null} />
  }

  return (
    <Fragment>
      {isFiltered ? null : <DynamicBanner randomPlay={plays[Math.floor(Math.random() * plays.length)]} />}

      <ol className="list-plays">
        {plays.map((play, index) => <PlayThumbnail key={nanoid()} play={play} /> )}
      </ol>
      <Counts />
    </Fragment>
  );
};

export default PlayList;
