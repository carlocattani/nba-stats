import React, { ReactNode } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Loading, PageNotFound, Navbar } from '@common-ui';
import style from './app.module.scss';

const Homepage = React.lazy(() => import('./pages/homepage/homepage.component'));
const PlayerPage = React.lazy(() => import('./pages/playerPage/playerPage.component'));

const fallback: ReactNode = (
  <div className={style.loading}>
    <Loading />
  </div>
);

export const App: React.FC = () => {
  return (
    <div className={style.container}>
      <Router>
        <React.Suspense fallback={fallback}>
          <Navbar />
          <Switch>
            <Route path='/' exact={true} component={Homepage} />
            <Route path='/player/:id/' exact={true} component={PlayerPage} />
            <Route component={PageNotFound} />
          </Switch>
        </React.Suspense>
      </Router>
    </div>
  );
};
