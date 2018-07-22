import React from 'react';
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import LoginPage from './components/LoginPage/LoginPage';
import RegisterPage from './components/RegisterPage/RegisterPage';
import UserPage from './components/UserPage/UserPage';
import InfoPage from './components/InfoPage/InfoPage';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'

import './styles/main.css';
import TranslatioTheme from './components/TranslatioTheme/TranslatioTheme';
import AccountPage from './components/AccountPage/AccountPage';
import RequestTranslation from './components/RequestTranslation/RequestTranslation';
import CompletedTranslations from './components/CompletedTranslations/CompletedTranslations';
import NewTranslation from './components/NewTranslation/NewTranslation';

const App = () => (
  <div>
    <MuiThemeProvider theme = {TranslatioTheme}>
    <Router>
    <div>
      <Switch>
        <Redirect exact from="/" to="/home" />
        <Route
          path="/home"
          component={LoginPage}
        />
        <Route
          path="/register"
          component={RegisterPage}
        />
        <Route
          path="/user"
          component={UserPage}
        />
        <Route
          path="/info"
          component={InfoPage}
        />
        <Route
          path="/accountpage"
          component={AccountPage}
        />
        <Route
          path="/requesttranslation"
          component={RequestTranslation}
        />
        <Route
          path="/completedtranslations"
          component={CompletedTranslations}
        />
        <Route
          path="/newtranslation"
          component={NewTranslation}
        />
        {/* OTHERWISE (no path!) */}
        <Route render={() => <h1>404</h1>} />

      </Switch>
      </div>
    </Router>
    </MuiThemeProvider>
  </div>
);

export default App;
