import {DATA_LIST,EDIT_LOGO} from '../action/homeAction';
import commonJS from '../../asets/common';
const initState = [{id:1,name:1,pic:'',state:false}];

export const goodsinfo = (state = initState, action) => {
    let newState = commonJS.deepCopyState(state);
            // console.log(state)
    switch (action.type) {

        case DATA_LIST:
            // console.log(state);
            return initDataList(state, action);
        case EDIT_LOGO:
            let { qrcodeval, qrcodeindex } = action.payload;
            // console.log(qrcodeval, qrcodeindex);
            // console.log(newState)
            newState[qrcodeindex].id = qrcodeval;
            return Object.assign([], state, newState);
        default:
            return state;
    }
};

const initDataList = (state , action) => {
    // console.log(state)
    let newState = action.payload;
    return Object.assign([], state, newState);
};