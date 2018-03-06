import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import Home from './components/Home';
import ResponsiveDrawer from './components/ResponsiveDrawer';



//TMP dependacy for material
var injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();




ReactDOM.render(
  <ResponsiveDrawer />,
  document.getElementById('root'));
registerServiceWorker();
