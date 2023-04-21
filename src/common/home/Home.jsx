import { useState, useEffect } from 'react';
import useFetch from 'common/hooks/useFetch';
import { featuresData } from './data';
import { Link } from 'react-router-dom';
import { nanoid } from 'nanoid';
import './home.css';
import { FaLightbulb } from 'react-icons/fa';
import { ReactComponent as Flower } from 'images/icon-flower.svg';
import FeaturedPlays from 'common/playlists/FeaturedPlays';
import Contributors from './Contributors';
import ExtendedFooter from 'common/footer/ExtendedFooter';
import { useSearchContext } from 'common/search/search-context';
//import { Tweet } from 'react-twitter-widgets';
import Spinner from 'common/spinner/spinner';
import ActivityBanner from 'common/activities/ActivityBanner';
import DefaultBanner from 'common/defaultBanner/DefaultBanner';

// array of tweet IDs to show on the home page
// const tweetIdArray = [
//   '1586967659622572032',
//   '1588544417425928192',
//   '1588540468362874880',
//   '1592818641225097217',
//   '1585216106876502017',
//   '1588542228829704192',
//   '1597979662852182016',
//   '1597969995761614849',
//   '1597193263642857474',
//   '1586951630435495936',
//   '1591622673700098049'
// ];

const HomeBody = () => {
  return (
  <section className="app-home-body">
    <div className="home-bg-graphics">
      <Flower className="home-bg-graphics-sm" />
      <Flower className="home-bg-graphics-rg" />
      <Flower className="home-bg-graphics-lg" />
    </div>
    <div className="app-home-body-content">
      {process.env.REACT_APP_ACTIVITIES_ON && process.env.REACT_APP_ACTIVITIES_ON === 'true' ? (
        <ActivityBanner currentActivity={process.env.REACT_APP_ACTIVITY_ID} />
      ) : (
        <DefaultBanner />
      )}
    </div>
  </section>
  );
};

const HomeFeatures = ({}) => {
  return (
    <section className="home-features">
      <ul className="list-home-features">
        {featuresData.map((feature) => {
          return (
            <li className="home-features-item" key={nanoid()}>
              <span className="item-icon">{feature.icon}</span>
              <h2 className="item-title">{feature.title}</h2>
              <p className="item-desc">{feature.desc}</p>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

const HomeIdeas = ({}) => {
  return (
    <section className="home-ideas">
      <FaLightbulb className="icon" color="var(--color-brand-primary)" size="48px" />
      <p className="ideas-lead">Not sure how to get started?</p>
      <p className="ideas-title">We have got lot of ideas</p>
      <Link className="home-anchor" to="/ideas">
        <span className="text">Get started with some ideas</span>
      </Link>
    </section>
  );
};

const HomePlays = ({ children }) => {
  return (
    <section className="home-plays">
      {children}
      <div className="home-plays-footer">
        <Link className="home-anchor" to="/plays">
          <span className="text">View all Plays</span>
        </Link>
      </div>
    </section>
  );
};

// const HomeTweets = ({ tweetsId = [] }) => {
//   // set the state for loading
//   const [isTweetsLoading, setTweetsLoading] = useState((curr) => true);

//   // Function to handle the tweets loading state after tweets have been loaded.
//   const tweetLoadHandler = () => setTweetsLoading((curr) => false);

//   useEffect(() => {
//     setTweetsLoading((curr) => false);
//   }, []);

//   return (
//     <section className="home-tweets">
//       <h2 className="title-primary">
//         What Our{' '}
//         <strong>
//           <span>Community</span>
//         </strong>{' '}
//         Says!
//       </h2>

//       {isTweetsLoading && <Spinner />}
//       {!isTweetsLoading &&
//         <div
//           className={isTweetsLoading ? 'tweets-container' : 'tweets-container active'}
//           data-testid="tweet-container"
//         >
//           {tweetsId.map((id) => (
//             <Tweet
//               key={id}
//               options={{
//                 width: '310',
//                 conversation: 'none',
//                 cards: 'hidden',
//                 align: 'center'
//               }}
//               tweetId={id}
//               // onLoad={tweetLoadHandler}
//             />
//           ))}
//         </div>
//       }
//     </section>
//   );
// };

const Home = () => {

  // const { setSearchTerm, searchTerm, setFilterQuery } = useSearchContext();
  // useEffect(() => {
  //   setSearchTerm((current) => '');
  //   setFilterQuery({
  //     level_id: '',
  //     tags: [],
  //     owner_user_id: '',
  //     language: ''
  //   });

  //   return () => {};
  // }, [setSearchTerm, searchTerm, setFilterQuery]);

  // eslint-disable-next-line no-console
  console.log('REACT_APP_ACTIVITIES_ON', process.env.REACT_APP_ACTIVITIES_ON);

  return (
    <main>
      <HomeBody />
      <HomeFeatures />
      <HomeIdeas />
      <HomePlays children={<FeaturedPlays />} />
      {/* <HomeTweets tweetsId={tweetIdArray} /> */}
      <Contributors sorted={true} />
      <ExtendedFooter />
    </main>
  );
};

export default Home;
