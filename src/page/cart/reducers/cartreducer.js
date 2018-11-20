import {DATA_LIST,EDIT_LOGO} from '../action/cartAction';
import commonJS from '../../asets/common';
const initState = [{id:1,name:1,pic:'',state:false}];

export const info = (state = initState, action) => {
    let newState = commonJS.deepCopyState(state);
            // console.log(state)
    switch (action.type) {

        case DATA_LIST:
            // console.log(state);
            return initDataList(state, action);
        case EDIT_LOGO:
            let { qrcodeval, qrcodeindex } = action.payload;
            console.log(qrcodeval, qrcodeindex);
            console.log(newState)
            newState[qrcodeindex].id =1;
            return Object.assign([], state, newState);
        default:
            return state;
    }
};

const initDataList = (state , action) => {
    let newState = action.payload;
    // console.log(newState)
    return Object.assign([], state, newState);
};