import {createStore,combineReducers} from 'redux';
import {goodsinfo} from '../home/reducers/homereducer';
import {info} from '../cart/reducers/cartreducer';
// import thunk from 'redux-thunk';

//创建一个 Redux store 来以存放应用中所有的 state，应用中应有且仅有一个 store。

var store = createStore(
    combineReducers({ goodsinfo, info })
    // combineReducers(goodsinfo,info)
);

export default store;