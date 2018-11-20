import * as React from 'react';
import "../index.scss"
// import Router from "../index"
// import { render } from 'react-dom'
// import { hashHistory } from 'react-router'
// import Home from "../../home/home"
import { Link,HashRouter} from 'react-router-dom'

class App extends React.Component {

    render() {
        return (
            <HashRouter>
                <div id="wrapper">
                    <ul className="nav navbar-nav header">
                        <li ><Link to="/Home">首页</Link></li>
                        <li><Link to="/User">用户</Link></li>
                        <li><Link to="/Cart">购物车</Link></li>
                        {/* <li><Link to="/aboutUs">关于我们</Link></li> */}
                    </ul>
                    <div>
                        {/* <RouteMap history={hashHistory}/> */}
                        1
                        {this.props.children}
                    </div>
                </div>
            </HashRouter>

        );
    }
}

export default App;