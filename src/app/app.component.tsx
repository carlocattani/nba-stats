import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Loading, PageNotFound, Navbar } from '@common-ui';
import style from './app.module.scss';
import { Provider } from 'react-redux';
import { StoreUtil } from '@store';

const Homepage = React.lazy(() => import('./pages/homepage/homepage.component'));
const PlayerPage = React.lazy(() => import('./pages/playerPage/playerPage.component'));

export const App: React.FC = () => {
  return (
    <div className={style.container}>
      <Provider store={StoreUtil.store}>
        <Router>
          <React.Suspense fallback={<Loading />}>
            <Navbar />
            <Switch>
              <Route path='/' exact={true} component={Homepage} />
              <Route path='/player/:id/' exact={true} component={PlayerPage} />
              <Route component={PageNotFound} />
            </Switch>
          </React.Suspense>
        </Router>
      </Provider>
    </div>
  );
};
