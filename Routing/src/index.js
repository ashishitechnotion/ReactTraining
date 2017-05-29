import React from 'react';
import ReactDOM from 'react-dom';
//import registerServiceWorker from './registerServiceWorker';
import { browserHistory } from 'react-router';
import Navbar from './components/Navbar'

import Routes from './routes';

ReactDOM.render(
  <Routes history={browserHistory} />,
  document.getElementById('root')
);
//registerServiceWorker();
