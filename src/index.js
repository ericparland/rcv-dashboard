import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import Home from './components/Home';
import ResponsiveDrawer from './components/ResponsiveDrawer';
import { Router, useRouterHistory } from 'react-router';
import {createHashHistory} from 'history';


//TMP dependacy for material
var injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();


const routes = {
  path: '/',
//  component: Layout,
  indexRoute: { component: ResponsiveDrawer },
  childRoutes: [
    { path: 'home', component: Home },
    //{ path: 'dashboard', component: Dashboard },
  //  { path: 'conference', component: ConferenceDetails },
  //  { path: 'session', component: SessionDetails },
  //  { path: 'users', component: UserDetails }
  ]
};

ReactDOM.render(
  <ResponsiveDrawer />,
    //<Router history={useRouterHistory(createHashHistory)({queryKey: false})} routes={routes} />,
  document.getElementById('root'));
registerServiceWorker();
