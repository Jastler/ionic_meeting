import React, { useEffect } from 'react';
import { useLocation, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Media from 'react-media';
import { LinearProgress } from '@material-ui/core';

import { getData } from './redux/actions';
import { routes } from './redux/utils';

import { Header } from './components/Header';
import { DesktopTable } from './components/DesktopTable';
// import { MobileTable } from './components/MobileTable';

import './App.css';

function App() {
  const { pathname } = useLocation();
  const route = pathname.slice(1);
  const { data, canLoadMore } = useSelector((state) => state[route] || {});
  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => {
      if (data) dispatch(getData(route));
    }, 1000);
  }, [route]);

  if (!data) return <Redirect to="/news" />;

  if (!data.length) return <LinearProgress />;

  return (
    <div className="App">
      <Header route={route} routes={routes} />
      <Media queries={{
        small: '(max-width: 599px)',
        large: '(min-width: 600px)',
      }}
      >
        {(matches) => (
          <>
            {/* {matches.small && (
            <MobileTable
              dispatchData={() => dispatch(getData(route))}
              data={data}
            />
            )} */}
            {matches.large && (
            <DesktopTable
              dispatchData={() => dispatch(getData(route))}
              data={data}
              canLoadMore={canLoadMore}
            />
            )}
          </>
        )}
      </Media>
    </div>
  );
}

export default App;
