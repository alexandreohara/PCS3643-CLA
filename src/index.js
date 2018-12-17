import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';
import Hub from './hub';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import TeamBuilder from './teamBuilder';
import { CreateActivityPage } from './Controller/create-activity.page';

ReactDOM.render(
  <Router >
    <div>
      <Route path='/' exact component={Hub} />
      <Route path='/team-builder' component={TeamBuilder} />
      <Route path='/new-demand' component={CreateActivityPage} />
      <Route  />
    </div>
  </Router>
  , document.getElementById('root')
);

registerServiceWorker();
