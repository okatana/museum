import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import {store} from '../components/TicketsStore';

console.log('process.env=', process.env);

ReactDOM.render(
    <App store={store}/>,
  document.getElementById('root'),
);
