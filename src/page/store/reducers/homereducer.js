import {
    DATA_LIST, EDIT_BANNER_URL, EDIT_LOGO, SET_TITLE_TYPE, SET_TITLE, EDIT_QRCODE, DELATE_GOODSLIST, SET_GOODS_URL, SET_GOODS_NAME, SET_GOODS_PRICE, SET_GOODS_SALEPRICE, CLEAR_GOODS_INFO, SET_GOODS_IMG,
    ADD_GOODS, DELATE_GOODS, ADD_GOODS_LIST, SET_PAGE_URL, SET_MSG_CONTENT, SET_MAIL_TITLE, SET_DESCRIPTION, EDIT_QRCODE_IMG, EDIT_BANNER_IMG, SET_GOODSINFO
} from '../actions/RecommendedAction';
import commonJS from '../../../utils/common';
const initState = [{
    "emailTitle": "",
    "companyLogo": "",
    "description": "",
    "showQRCode": false,
    "QRCode": "",
    "bannerImg": "",
    "bannerUrl": "",
    "contentArr": [
        {
            "title": "",
            "showTitleRow": true,
            "productArr": [
                {
                    "productLink": "",
                    "name": "",
                    "img": "",
                    "salePrice": "",
                    "price": "",
                    "isGetInfoSuccess": true,
                    "NumIID": -1
                }
            ]
        },
    ],
    "shortUrl": "",
    "msgContent": "",
    "fileName": "",
    "isSaved": true

}];

export const edmContentForm = (state = initState, action) => {
    let newState = commonJS.deepCopyState(state);
    switch (action.type) {
        case DATA_LIST:
            return initDataList(state, action);
        case EDIT_LOGO:
            let { logoindex, logoval } = action.payload;
            newState[logoindex].companyLogo = logoval;
            return Object.assign([], state, newState);
        case EDIT_QRCODE:
            let { qrcodeindex, qrcodeval } = action.payload;
            newState[qrcodeindex].showQRCode = qrcodeval;
            return Object.assign([], state, newState);
        case EDIT_QRCODE_IMG:
            let { qrcodeIMGindex, qrcodeIMGval } = action.payload;
            newState[qrcodeIMGindex].QRCode = qrcodeIMGval;
            return Object.assign([], state, newState);
        case EDIT_BANNER_URL:
            let { BannerUrlval, BannerUrlindex } = action.payload;
            newState[BannerUrlindex].bannerUrl = BannerUrlval;
            return Object.assign([], state, newState);
        case EDIT_BANNER_IMG:
            let { BannerImgval, BannerImgindex } = action.payload;
            newState[BannerImgindex].bannerImg = BannerImgval;
            return Object.assign([], state, newState);
        case SET_TITLE_TYPE:
            let { TitleTypeval, TitleTypeindex, proindex } = action.payload;
            newState[TitleTypeindex].contentArr[proindex].showTitleRow = TitleTypeval;
            return Object.assign([], state, newState);
        case SET_TITLE:
            let { titleval, titleindex0, titleindex1 } = action.payload;
            newState[titleindex0].contentArr[titleindex1].title = titleval;
            return Object.assign([], state, newState);
        case DELATE_GOODSLIST:
            newState[0].contentArr.splice(1, 1)
            return Object.assign([], state, newState);
        case SET_GOODS_URL:
            let { Goodsurlval, Goodsurlindex0, Goodsurlindex1, Goodsurlindex2 } = action.payload;
            newState[Goodsurlindex0].contentArr[Goodsurlindex1].productArr[Goodsurlindex2].productLink = Goodsurlval;
            return Object.assign([], state, newState);
        case SET_GOODS_NAME: 
            let { Goodsnameval, Goodsnameindex0, Goodsnameindex1, Goodsnameindex2 } = action.payload;
            newState[Goodsnameindex0].contentArr[Goodsnameindex1].productArr[Goodsnameindex2].name = Goodsnameval;
            let tmpState = Object.assign([], state, newState);
            // console.log('Goodsnameval', Goodsnameval);
            // console.log('tmpState', tmpState[Goodsnameindex0].contentArr[Goodsnameindex1].productArr[Goodsnameindex2]);
            return tmpState;//Object.assign([], state, newState);
        case SET_GOODS_PRICE:
            let { Goodspriceval, Goodspriceindex0, Goodspriceindex1, Goodspriceindex2 } = action.payload;
            newState[Goodspriceindex0].contentArr[Goodspriceindex1].productArr[Goodspriceindex2].price = Goodspriceval;
            return Object.assign([], state, newState);
        case SET_GOODS_SALEPRICE:
            let { GoodsalePriceval, GoodsalePriceindex0, GoodsalePriceindex1, GoodsalePriceindex2 } = action.payload;
            newState[GoodsalePriceindex0].contentArr[GoodsalePriceindex1].productArr[GoodsalePriceindex2].salePrice = GoodsalePriceval;
            return Object.assign([], state, newState);
        case CLEAR_GOODS_INFO:
            let { Goodsinfoval, Goodsinfoindex0, Goodsinfoindex1, Goodsinfoindex2 } = action.payload;
            newState[Goodsinfoindex0].contentArr[Goodsinfoindex1].productArr[Goodsinfoindex2] = {};
            return Object.assign([], state, newState);
        case SET_GOODS_IMG:
            let { GoodsImgval, GoodsImgindex0, GoodsImgindex1, GoodsImgindex2 } = action.payload;
            newState[GoodsImgindex0].contentArr[GoodsImgindex1].productArr[GoodsImgindex2].img = GoodsImgval;
            return Object.assign([], state, newState);
        case ADD_GOODS:
            let { Goodsval, Goodsindex0, Goodsindex1 } = action.payload;
            newState[Goodsindex0].contentArr[Goodsindex1].productArr.push({addImg:true,NumIID:"",ProductId:"",img:"",name:"",price:"",productLink:"",salePrice:""})
            return Object.assign([], state, newState);
        case DELATE_GOODS:
            let { deleteGoodsval, deleteGoodsindex0, deleteGoodsindex1, deleteGoodsindex2 } = action.payload;
            newState[deleteGoodsindex0].contentArr[deleteGoodsindex1].productArr.splice(deleteGoodsindex2, 1)
            return Object.assign([], state, newState);
        case ADD_GOODS_LIST:
            let { GoodsListval, GoodsListindex0, GoodsListindex1 } = action.payload;
            newState[GoodsListindex0].contentArr.splice(GoodsListindex1 + 1, 0, { productArr: [] })
            return Object.assign([], state, newState);
        case SET_PAGE_URL:
            let { Pageurlval, Pageurlindex0 } = action.payload;
            newState[Pageurlindex0].shortUrl = Pageurlval;
            return Object.assign([], state, newState);
        case SET_MSG_CONTENT:
            let { msgContentval, msgContentindex0 } = action.payload;
            newState[msgContentindex0].ContentInfo.SendContent = msgContentval;
            return Object.assign([], state, newState);
        case SET_MAIL_TITLE:
            let { MailTitleval, MailTitleindex0 } = action.payload;
            newState[MailTitleindex0].emailTitle = MailTitleval;
            return Object.assign([], state, newState);
        case SET_DESCRIPTION:
            let { Descriptionval, Descriptionindex0 } = action.payload;
            newState[Descriptionindex0].description = Descriptionval;
            return Object.assign([], state, newState);
        case SET_GOODSINFO:
            let { goodsinfo, goodsinfoindex0, goodsinfoindex1, goodsinfoindex2 } = action.payload;
            newState[goodsinfoindex0].contentArr[goodsinfoindex1].productArr[goodsinfoindex2] = goodsinfo;
            return Object.assign([], state, newState);
        default:
            return state;
    }
};

const initDataList = (state = initState, action) => {
    let newState = commonJS.deepCopyState(state),
        GoodsList = action.payload;
    newState = GoodsList;
    return Object.assign([], state, newState);
};