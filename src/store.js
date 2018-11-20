import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import App from './IndexReducers';

let store;
// 检测浏览器是否安装Redux Devtools 插件
if (!(window.__REDUX_DEVTOOLS_EXTENSION__ || window.__REDUX_DEVTOOLS_EXTENSION__)) {
    store = createStore(
        App,
        applyMiddleware(thunk)
    );
} else {
    store = createStore(
        App,
        compose(applyMiddleware(thunk), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()) //插件调试，未安装会报错
    );
}

export default store;