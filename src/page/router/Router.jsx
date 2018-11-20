import React from 'react';
import {Router,Route,IndexRoute,hashHistory} from 'react-router';

import App from './../../App';
import Home from '../home/home';
import Cart from '../cart/cart';
import User from '../user/user';


const RouterConfiger=()=>(
    <Router history={hashHistory} >
        <Route path="/" component={App} >
            <IndexRoute component={Home} />
            <Route path='/Home' component={Home} />
            <Route path='/Cart' component={Cart} />
            <Route path='/User' component={User} />
            <Route path='*' component={Error} />
        </Route>
    </Router>
)
export default RouterConfiger;