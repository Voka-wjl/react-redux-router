export const DATA_LIST = 'DATA_LIST';
export const EDIT_LOGO = 'EDIT_LOGO';

//初始数据
export const initDataList = (payload) => ({
    type: DATA_LIST,
    payload
});


export const editLogo = (payload) => ({
    type: EDIT_LOGO,
    payload
});


