import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './routes';

import * as serviceWorker from './serviceWorker';
import "./default-style/default-style.css";
import "./default-style/default-pages-style.css";

ReactDOM.render(<Routes />, document.getElementById('root'));

serviceWorker.unregister();
