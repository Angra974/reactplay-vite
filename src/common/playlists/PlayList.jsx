import PlayThumbnail from './PlayThumbnail';
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

const PlayNotFound = ({ search = null }) => {
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

  let location = useLocation();

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

      if (plays.length === 0 && allPlays.length === 0) {
        let res = await getPlaysByFilter(translatedQuery);
        res && setPlays(
          res.filter((res_play) => all_plays.includes(toSanitized(res_play.title_name)))
        );
        setAllPlays([...plays]);

        if (translatedQuery) {
          setIsFiltered(true);
        }
      }
      setLoading(false);
    };
    getPlays();
  }, [location.search]);

  console.log(allPlays);

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
