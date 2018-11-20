import React from 'react';
import ReactDom from 'react-dom';
import './index.scss'
import store from './page/store/Store';

//状态管理
// import {createStore} from 'redux';
import {Provider} from 'react-redux';


import RouterConfig from './page/router/Router'//router


// const reducer = function(state, action) {
//   return state;
// }

// const store = createStore(reducer);


ReactDom.render(
    <Provider store={store}>
        <RouterConfig/>
    </Provider>,
    document.getElementById("app")
)