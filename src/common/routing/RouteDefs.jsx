import loadable from '@loadable/component';
import App from '@/App';

const Footer = loadable(() => import('common/index.js'), {
  resolveComponent: (components) => components.Footer,
});
const Header = loadable(() => import('common/index.js'), {
  resolveComponent: (components) => components.Header,
});
const Home = loadable(() => import('common/index.js'), {
  resolveComponent: (components) => components.Home,
});

const PlayMeta = loadable(() => import('common/index.js'), {
  resolveComponent: (components) => components.PlayMeta,
});

const DefMeta = loadable(() => import('common/index.js'), {
  resolveComponent: (components) => components.DefMeta,
});

const PlayIdeas = loadable(() => import('common/index.js'), {
  resolveComponent: (components) => components.PlayIdeas,
});

const CreatePlay = loadable(() => import('common/index.js'), {
  resolveComponent: (components) => components.CreatePlay,
});

const PlayCreated = loadable(() => import('common/index.js'), {
  resolveComponent: (components) => components.PlayCreated,
});


const TechStack = loadable(() => import('common/index.js'), {
  resolveComponent: (components) => components.TechStack,
});


const LeaderBoard = loadable(() => import('common/index.js'), {
  resolveComponent: (components) => components.LeaderBoard,
});


const PageNotFound = loadable(() => import('common/index.js'), {
  resolveComponent: (components) => components.PageNotFound,
});

const Modal = loadable(() => import('common/index.js'), {
  resolveComponent: (components) => components.Modal,
});

const ExtendedFooter = loadable(() => import('common/index.js'), {
  resolveComponent: (components) => components.ExtendedFooter,
});

const PlayList = loadable(() => import('common/playlists/PlayList.jsx'));

const BadgesDashboard = loadable(() => import('common/badges-dashboard/index.jsx'));



import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { NhostClient, NhostProvider } from '@nhost/react';

const nhost = new NhostClient({
  backendUrl: process.env.REACT_APP_NHOST_BACKEND_URL || ''
});

const RouteDefs = () => {
  // Array of paths used for changing the title of the website dynamically.
  const routes = [
    {
      path: '/',
      title: 'ReactPlay - One app to learn, create, and share ReactJS projects.'
    },
    { path: '/plays', title: 'ReactPlay - Plays' },
    { path: '/ideas', title: 'ReactPlay - Ideas' },
    { path: '/tech-stacks', title: 'ReactPlay - Tech Stacks' },
    { path: '/plays/create', title: 'ReactPlay - Create Play' },
    { path: '/leaderboard', title: 'ReactPlay - Leader Board' }
  ];

  return (
    <NhostProvider nhost={nhost}>
      <BrowserRouter>
        <Header />
        <DefMeta routes={routes} />
        <Routes>
          <Route element={<Home />} path="/" />
          <Route element={<TechStack />} path="/tech-stacks" />
          <Route element={<CreatePlay />} path="/editplay/:username/:playname" />
          <Route element={<App />} path="/plays">
            <Route index element={<PlayList />} />
            <Route exact element={<CreatePlay />} path="create" />
            {process.env.NODE_ENV === 'development' && (
              <Route exact element={<PlayCreated />} path="created/:playid" />
            )}
            <Route exact idex element={<PlayMeta />} path=":username">
              <Route exact element={<PlayMeta />} path=":playname">
                <Route exact element={<PlayMeta />} path=":param1">
                  <Route exact element={<PlayMeta />} path=":param2" />
                </Route>
              </Route>
            </Route>

            {/* <Route exact path=":playid" element= {<PlayMeta />}>
                    <Route exact path=":param1" element= {<PlayMeta />}>
                      <Route exact path=":param2" element= {<PlayMeta />}/>
                      </Route>
                  </Route> */}
          </Route>
          <Route element={<App />} path="/contributors">
            <Route element={<App />} path=":email">
              <Route element={<BadgesDashboard />} path="badges" />
            </Route>
          </Route>
          <Route element={<App />} path="/play">
            <Route index element={<PlayList />} />
          </Route>
          <Route element={<PlayIdeas />} path="/ideas" />
          <Route element={<LeaderBoard />} path="/leaderboard" />
          <Route element={<PageNotFound />} path="*" />
        </Routes>
        <Footer />
      </BrowserRouter>
    </NhostProvider>
  );
};

export default RouteDefs;
