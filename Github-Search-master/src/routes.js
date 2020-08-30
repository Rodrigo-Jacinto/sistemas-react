import React from 'react';
import { Route, Router, browserHistory } from 'react-router';
import App from './App';
import Result from './pages/result/result.js';
import PageErro from './pages/page-erro/page-erro.js';

const Routes = () => (
    <Router history={browserHistory}>
        <Route path="/" component={App} />
        <Route path="/result/:user" component={Result} />
        <Route path="*" component={PageErro} />
    </Router>
);

export default Routes; 