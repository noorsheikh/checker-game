import React from 'react';
import {BrowserRouter,  Route,  Switch} from 'react-router-dom';


import Welcome from './components/Welcome/Welcome';
// import Login from '././components/Login/Login';
import CreateAccount from './components/CreateAccount/CreateAccount';
import HomePage from './components/Home/HomePage';
import LoginPage from './components/Login/LoginPage';
import ErrorPage from './components/ErrorPage/ErrorPage';


const Routes =  (
  <BrowserRouter >
      <Switch>
          <Route exact path="/" component={Welcome}/>
            <Route path="/home" component={HomePage}/> 
            <Route path="/login" component={LoginPage}/>
          <Route path="/signup" component={CreateAccount}/>
          <Route path="*" component={ErrorPage}/>
      </Switch>
  </BrowserRouter>
);

export default Routes;