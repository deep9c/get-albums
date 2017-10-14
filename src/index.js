import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Artist from './components/Artist';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Artist />, document.getElementById('root'));
registerServiceWorker();
