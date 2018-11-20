import React from 'react';
import { Router, Route} from 'react-router';
import App from './mod/app';
import Home from "../home/home";
import User from "../user/user";
import Cart from "../cart/cart";
import { browserHistory } from 'react-router'


class Index extends React.Component {
    render() {
        return (
            // <div></div>
            <Router history={browserHistory}>
                <Route path="/" component={App}>
                    {/* <IndexRoute component={Home} /> */}
                    <Route path="Home" component={Home} />
                    <Route path="User" component={User} />
                    <Route path="Cart" component={Cart} />
                </Route>
            </Router>
        );
    }
}

export default Index;