import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import TeamBuilder from './teamBuilder';
import registerServiceWorker from './registerServiceWorker';
import Hub from './hub';
import 'semantic-ui-css/semantic.min.css'
import RevenueHistory from './revenue-history.page';

ReactDOM.render(<TeamBuilder />, document.getElementById('root'));
registerServiceWorker();
