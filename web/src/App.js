import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom';

import Users from './user/pages/Users';
import ProfilePage from './profile/pages/ProfilePage';
import UpdateHeader from './profile/header/pages/UpdateHeader';
import Auth from './user/pages/Auth';
import MainNavigation from './shared/components/Navigation/MainNavigation';
import { AuthContext } from './shared/context/auth-context';
import { useAuth } from './shared/hooks/auth-hook';
import NewHeader from './profile/header/pages/NewHeader';
import NewExperience from './profile/experience/pages/NewExperience';
import UpdateExperience from './profile/experience/pages/UpdateExperience';

const App = () => {
  const { token, login, logout, userId } = useAuth();

  let routes;

  if (token) {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Users />
        </Route>
        <Route path="/:userId/profile" exact>
          <ProfilePage />
        </Route>
        {/* HEADERS */}
        <Route path="/header/new" exact>
          <NewHeader />
        </Route>
        <Route path="/header/:headerId">
          <UpdateHeader />
        </Route>
        {/* EXPERIENCES */}
        <Route path="/experiences/new" exact>
          <NewExperience />
        </Route>
        <Route path="/experience/:experienceId">
          <UpdateExperience />
        </Route>

        <Redirect to="/" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Users />
        </Route>
        <Route path="/:userId/page" exact>
          <ProfilePage />
        </Route>
        <Route path="/auth">
          <Auth />
        </Route>
        <Redirect to="/auth" />
      </Switch>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        userId: userId,
        login: login,
        logout: logout
      }}
    >
      <Router>
        <MainNavigation />
        <main>{routes}</main>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
