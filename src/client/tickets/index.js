import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import {store} from '../components/TicketsStore';

ReactDOM.render(
    <App store={store}/>,
  document.getElementById('root'),
);
