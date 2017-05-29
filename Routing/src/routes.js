import React from 'react';
import { Router, Route } from 'react-router';

import Home from './components/Home';
import About from './components/About';
import NotFound from './components/404';
import Services from './components/Services';
import Contact from './components/Contact';

const Routes = (props) => (
  <Router {...props}>
    <Route path="/" component={Home}> /* Home will be common for all */
      <Route path="/about" component={About} />
      <Route path="/services" component={Services} />
      <Route path="/contact" component={Contact} />
      <Route path="*" component={NotFound} />
    </Route>
  </Router>

  
);

export default Routes;