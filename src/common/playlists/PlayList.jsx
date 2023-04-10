import PlayThumbnail from './PlayThumbnail';
import { ReactComponent as ImageOops } from 'images/img-oops.svg';
import React, { Fragment, useEffect, useState } from 'react';
import Loader from 'common/spinner/spinner';
import fs from 'fs';
import useLocalStorage from 'common/hooks/useLocalStorage';

import { default as all_plays} from 'plays/playsList';

import { nanoid } from 'nanoid'
import './playlist.css';
import { toSanitized } from 'common/services/string';
import DynamicBanner from './DynamicBanner';
import { useLocation } from 'react-router-dom';
import { ParseQuery, QueryDBTranslator } from 'common/search/search-helper';
import { getPlaysByFilter } from 'common/services/plays';

const PlayList = () => {
    const [randomPlay, setRandomPlay] = useState({});

  const [loading, setLoading] = useState();
  const [plays, setPlays] = useState([]);
  const [isFiltered, setIsFiltered] = useState(false);
 //   const [allPlays, setAllPlays] =  useLocalStorage('vall_Plays', [],0);
 const [allPlays, setAllPlays] =  useState([]);

  let location = useLocation();
  let randomIndex = 0;

  useEffect(() => {
    setAllPlays([])
    const getPlays = async () => {
      setLoading(true);
      const parsedQuery = ParseQuery(location.search);

  if(!parsedQuery && Array.isArray(allPlays) ) {
          if(allPlays.length > 0) {
          setPlays(curr => [...allPlays])
          setRandomPlay(curr => allPlays[Math.floor(Math.random() * allPlays.length)]);
          setIsFiltered(curr => false)
           console.log(allPlays)
          }
      }

    console.dir(all_plays)
      let translatedQuery;
      if (parsedQuery) {
        translatedQuery = QueryDBTranslator(parsedQuery);
      }

      if(plays.length=== 0 && allPlays.length=== 0) {




      let res = await getPlaysByFilter(translatedQuery);
       let found_plays = [];
       if (res) {

      found_plays =  res.filter((res_play) => all_plays.includes(toSanitized(res_play.title_name)))
        setPlays(current => found_plays);

      }
      console.log(found_plays)
      if (!translatedQuery) {
        if (found_plays && found_plays.length > 0) {
          // generate a random index to select a random play
          const randomIndex = Math.floor(Math.random() * found_plays.length);
          setRandomPlay(found_plays[randomIndex]);
        }
      } else {
        setIsFiltered(curr => true);
      }
      }
      setLoading(curr => false);
    };
    getPlays();
  }, [location.search]);

  if (loading) {
    return <Loader />;
  }

  if (plays?.length === 0) {
    return (
      <div className="play-not-found">
        <ImageOops className="play-not-found-image" />
        <p className="page-404-lead">Play not found</p>
        {location.search ? (
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
    );
  }

  return (
    <Fragment>
      {isFiltered ? null : <DynamicBanner randomPlay={randomPlay} />}

      <ol className="list-plays">
        {plays?.map((play, index) =>
            <PlayThumbnail key={nanoid()} play={play} />
          )}
      </ol>
    </Fragment>
  );
};

export default PlayList;
