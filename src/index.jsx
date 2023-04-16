import React, { lazy, useEffect, useState } from 'react';
import RouteDefs from 'common/routing/RouteDefs';
import { SearchContextProvider } from 'common/search/search-context';
import loadable from '@loadable/component';
import './index.css';

import { createRoot } from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { registerSW } from "virtual:pwa-register";
import {whyDidYouUpdate}  from 'why-did-you-update';
import ErrorBoundry from './ErrorBoundary/ErrorBoundary';
// import Notification from 'common/components/Notification';
//import 'react-toastify/dist/ReactToastify.min.css';

// inside your starter code, do this

///const Notification = loadable(() => import('common/components/Notification.jsx'));

if (process.env.NODE_ENV !== 'production') {


}
// add this to prompt for a refresh
const updateSW = registerSW({
  onNeedRefresh() {
    if (confirm("New content available. Reload?")) {
      updateSW(true);
    }
  },
});


console.log('REACT_APP_TESTER = ' + process.env.REACT_APP_TESTER);

/** removing console statement in react prod build */
/* eslint-disable no-console */
if (process.env.NODE_ENV !== 'development') {
  console.log = () => {};
  console.debug = () => {};
  console.info = () => {};
  console.disableYellowBox = true;
}

const Index = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showShareModal, setShowShareModal] = useState(false);
  const [filterQuery, setFilterQuery] = useState({
    level_id: [],
    tags: [],
    owner_user_id: [],
    language: []
  });


  const value = {
    searchTerm,
    setSearchTerm,
    filterQuery,
    setFilterQuery,
    showShareModal,
    setShowShareModal
  };

  return (
    // <React.StrictMode>
    <ErrorBoundry>
        <SearchContextProvider value={value}>
          <RouteDefs />
        </SearchContextProvider>
        {/* <Notification /> */}
    </ErrorBoundry>
    // </React.StrictMode>
  );
};
const container = document.getElementById('root');
const root = createRoot(container);
root.render(<Index />);

// Makes the app to work offline and load faster
//register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

// if (process.env.NODE_ENV !== 'production') {

//   whyDidYouUpdate(React);
// }
