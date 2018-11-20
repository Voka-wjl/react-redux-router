import {
  Feedback,
  Dialog
} from 'Blue';
import {
  FieldOperateType,
  Channel
} from './enum';
import {
  getDomainUrl
} from './apiurlmapping';
import {
  MipCommon as api
} from '../utils/apidata';

const Toast = Feedback.toast;

const show = (msg, duration, hasMask) => {
  Toast.show({
    type: 'loading',
    content: msg,
    duration: duration,
    hasMask: hasMask,
  });
};
const hide = () => Toast.hide();

/*
 * 公共类 
 * @construct Utils
 * @autor cp
 * @date 2017年8月7日12:15:22
 */
export default class Utils {
  /**
   * 短信退订，描述内容。
   * @static
   * @returns '回复T退订'
   * @memberof Utils
   */
  static GetUnsubscribeText() {
    return UNSUBSCRIBE_TEXT;
  }
  /** 
   * 校验是否为手机格式
   * @param {string} v 手机号码 
   */
  static isMobile(v) {
    var reg = /^0?(13[0-9]|15[012356789]|18[0-9]|14[57]|17[0678])[0-9]{8}$/;
    return reg.test(v);
  }
  // /**
  // * 只允许输入数字 onkeydown 事件
  // * @Method   inputInt() 
  // * @Author cp
  // * @For CommonJs 
  // */
  // static inputInt() {
  //     console.log('inputInt event',event);
  //     if ((event.keyCode >= 48 && event.keyCode <= 57) || (event.keyCode >= 96 && event.keyCode <= 105) || event.keyCode == 8) {
  //         return true;
  //     }
  //     return false;
  // }
  /**
   * 是否为数字
   * @static
   * @param {any} v 
   * @returns 
   * @memberof Utils
   */
  static isNumber(v) {
    if (!v) return false;
    if (v.match(/[^0-9]+/g) !== null)
      return false;
    return true;
  }
  /** 
   * 校验是否为手机格式,支持多个手机号，用','隔开
   * @param {string} v 手机号码 
   */
  static checkMulti(moblieStr) {

    if (!moblieStr)
      throw new Error(`参数moblieStr：${moblieStr} 无效`);

    let tmpArr = moblieStr.split(';');
    let isCorrectMobile = true;
    if (tmpArr.length > 0) {
      tmpArr.map((item) => {
        if (!Utils.isMobile(item)) {
          isCorrectMobile = false;
          return false;
        }
      });
    }
    return isCorrectMobile;
  }
  /** 
   * 显示提示信息弹窗
   * @param {string} msg 提示内容
   * @param {string} title 提示标题
   */
  static tipsMessage(msg, title = '提示', sureBtn = '确定') {
    Dialog.alert({
      title: title,
      content: msg,
      locale: {
        ok: sureBtn
      }
    });
  }
  /** 
   * 显示提示内容
   * @param {string} msg 显示内容，默认显示 ‘数据正在处理中，请稍后...’ 
   */
  static prompt(msg = '') {
    Toast.prompt(msg);
  }
  /**
   *  操作成功提示
   * @static 
   * @param {string} [msg=''] 
   * @param {number} [duration=2000] 
   * @memberof Utils
   */
  static success(msg = '', duration = 1000) {
    Toast.success({
      title: '',
      content: msg,
      duration: duration
    });
  }
  /** 
   * 显示loading弹窗
   * @param {string} msg 显示内容，默认显示 ‘数据正在处理中，请稍后...’
   * @param {number} duration 显示持续时间，0表示一直存在，以毫秒为单位，默认3秒关闭
   * @param {boolean} hasMask 是否带有遮罩,默认带遮罩
   */
  static showLoading(msg = '数据正在处理中，请稍后...', duration = 0, hasMask = true) {
    show(msg, duration, hasMask);
  }
  /** 
   * 关闭loading弹窗 
   */
  static hideLoading() {
    hide();
  }
  /** 
   * 对数组进行分页
   * @param {number} pageIndex 请求成功回调函数
   * @param {number} pageSize 请求失败回调函数 
   * @param {array} array 请求失败回调函数 
   */
  static pagination(pageIndex, pageSize, array) {

    if (!pageIndex || pageIndex <= 0)
      throw new Error(`参数 pageIndex：${pageIndex} 无效`);
    if (!pageSize || pageSize <= 0)
      throw new Error(`参数 pageSize：${pageSize} 无效`);
    if (!array || Array.isArray(array))
      throw new Error(`参数 array：${array} 不是有效数组`);

    let offset = (pageIndex - 1) * pageSize;

    return (offset + pageSize >= array.length) ? array.slice(offset, array.length) : array.slice(offset, offset + pageSize);
  }
  /**
   * 在光标处插入内容
   * @param {dom object}  dom对象 如document.getElementById()
   * @param {string}     插入的文本内容
   */
  static insertAtCursor(myField, myValue) {

    // IE support
    if (document.selection) {
      myField.focus();
      let sel = document.selection.createRange();
      sel.text = myValue;
      sel.select();
    }
    // MOZILLA/NETSCAPE support 
    else if (myField.selectionStart || myField.selectionStart == '0') {
      var startPos = myField.selectionStart;
      var endPos = myField.selectionEnd;
      // save scrollTop before insert www.keleyi.com
      var restoreTop = myField.scrollTop;
      var placeholder = myField.placeholder;

      myField.value = myField.value.replace(placeholder, '').substring(0, startPos) + myValue + myField.value.replace(placeholder, '').substring(endPos, myField.value.length);
      if (restoreTop > 0) {
        myField.scrollTop = restoreTop;
      }
      myField.focus();
      myField.selectionStart = startPos + myValue.length;
      myField.selectionEnd = startPos + myValue.length;
    } else {
      myField.value += myValue;
      myField.focus();
    }
  }

  /**
   * 计算短信字数和条数
   * @static
   * @param {string} smsSign 短信签名
   * @param {string} content 短信内容
   * @param {string} smsDebook 短信退订回复内容
   * @returns {
   * smsContLen 短息字符数， 如果遇到占位符，需要按照占位符的字符数计算
   * smsCount 短信被拆分为几条、 一条短信最多67个字符
   * }
   * @memberof Utils
   */
  static calSMSContentLength(smsSign, content, smsDebook = Utils.GetUnsubscribeText()) {
    let smsContLen = 0;
    // 0、没有输入任何内容计算短信字符数
    if (!content) {
      smsContLen = smsSign.length + smsDebook.length;
    } else {
      let reg = /\$\{(nick)\}?|\$\{(levelName)\}?|\$\{(point)\}?|\$\{(shortLink)\}?/g;
      let matchGroup = content.match(reg);
      // 1、没有占位符计算短信字符数
      if (matchGroup === null) {
        smsContLen = smsSign.length + smsDebook.length + content.length;
      } else {
        // 2、有占位符计算短信字符数
        let tmpPlaceholderCharCount = 0;
        let tmpContent = content.replace(reg, '');
        matchGroup.map((item) => {
          tmpPlaceholderCharCount += Utils.getPlaceholderCharLength(item);
        });
        smsContLen = smsSign.length + smsDebook.length + tmpContent.length + tmpPlaceholderCharCount;
      }
    }

    let partNum = parseInt(smsContLen % 67 == 0 ? smsContLen / 67 : smsContLen / 67 + 1);

    return {
      smsCharLength: smsContLen,
      smsCount: partNum
    };
  }
  /**
   * 获取短信占位符的 字符数
   * 
   * @static
   * @param {any} type 
   * @returns 
   * @memberof Utils
   */
  static getPlaceholderCharLength(type) {
    let tmpPlaceholderCharCount = 0;
    switch (type) {
      case PlaceholderType.nick:
        tmpPlaceholderCharCount += 25;
        break;
      case PlaceholderType.levelName:
        tmpPlaceholderCharCount += 7;
        break;
      case PlaceholderType.point:
        tmpPlaceholderCharCount += 8;
        break;
      case PlaceholderType.shortLink:
        tmpPlaceholderCharCount += 16;
        break;
    }
    return tmpPlaceholderCharCount;
  }
  /**
   * 深拷贝 对象
   * 
   * @static
   * @memberof Utils
   */
  static deepCopyState(obj) {
    if (typeof (obj) !== 'object') {
      console.error(`obj(${obj}) is not object`);
      return obj;
    };
    try {
      return JSON.parse(JSON.stringify(obj));
    } catch (err) {
      console.error(err);
      return obj;
    }
  }

  static getType(obj) {
    //tostring会返回对应不同的标签的构造函数
    var toString = Object.prototype.toString;
    var map = {
      '[object Boolean]': 'boolean',
      '[object Number]': 'number',
      '[object String]': 'string',
      '[object Function]': 'function',
      '[object Array]': 'array',
      '[object Date]': 'date',
      '[object RegExp]': 'regExp',
      '[object Undefined]': 'undefined',
      '[object Null]': 'null',
      '[object Object]': 'object'
    };
    if (obj instanceof Element) {
      return 'element';
    }
    return map[toString.call(obj)];
  }

  /**
   * 深拷贝对象
   * @static
   * @param {any} data 
   * @returns 
   * @memberof Utils
   */
  static deepClone(data) {
    var type = Utils.getType(data);
    var obj;
    if (type === 'array') {
      obj = [];
    } else if (type === 'object') {
      obj = {};
    } else {
      //不再具有下一层次
      return data;
    }
    if (type === 'array') {
      for (var i = 0, len = data.length; i < len; i++) {
        obj.push(Utils.deepClone(data[i]));
      }
    } else if (type === 'object') {
      for (var key in data) {
        obj[key] = Utils.deepClone(data[key]);
      }
    }
    return obj;
  }
  /**
   * 替换中文逗号
   * 
   * @static
   * @param {any} str 
   * @returns 
   * @memberof Utils
   */
  static replaceComma(str) {
    if (!str) return str;
    var reg = /(，+)|(,\s*,)+/g;
    return str.replace(reg, ',');
  }
  /**
   * 获取通过,号分割的字符个数
   * 
   * @static
   * @memberof Utils
   */
  static getCommaSplitCount(str) {
    if (!str) return 0;
    if (str.indexOf(',') === -1) return 1;
    let tmpCharArr = [];
    str.split(',').forEach(item => {
      if (item) tmpCharArr.push(item);
    });
    return tmpCharArr.length;
  }
  /**
   * 将对象属性转换为JSON对象
   * 
   * @static
   * @param {any} obj 
   * @memberof Utils
   */
  static objectToJson(obj) {
    if (typeof (obj) !== 'object') {
      console.error('obj is not object.');
      return {};
    };
    let jsonObj = {};
    if (obj) {
      for (let prop in obj) {
        jsonObj[prop] = obj[prop];
      }
    }
    return jsonObj;
  }
  /**
   * 通过操作类型枚举获取操作类型符号
   * 
   * @static
   * @memberof Utils
   */
  static getOperateSymbolByValue(operate) {
    return operate === FieldOperateType.Range ?
      '-' : operate === FieldOperateType.EQU ?
        '=' : operate === FieldOperateType.GEQ ?
          '>=' : operate === FieldOperateType.LEQ ?
            '<=' : '';
  }
  /**
   * 通过渠道枚举映射,渠道文本描述
   * 
   * @static
   * @param {Channel} channel 渠道
   * @returns 
   * @memberof Utils
   */
  static getChannelText(channel) {
    if (typeof (channel) === 'undefined') {
      console.error(`channel【${channel}】 is not defined.`);
      return '';
    }

    let channelText = [];
    (channel + '').split(',').forEach(item => {
      switch (parseInt(item)) {
        case Channel.Sms:
          channelText.push('短信');
          break;
        case Channel.Edm:
          channelText.push('邮件');
          break;
        case Channel.Mms:
          channelText.push('彩信');
          break;
        case Channel.Coupon:
          channelText.push('优惠券');
          break;
        case Channel.Point:
          channelText.push('积分');
          break;
        case Channel.Assist:
          channelText.push('协运营服务');
          break;
        default:
          channelText.push('未知');
          break;
      }
    });
    return channelText.join(',');
  }
  /**
   * 通过渠道文字描述，获取渠道枚举值（number，多个用,隔开）
   * @static
   * @param {any} channelStr 
   * @returns 
   * @memberof Utils
   */
  static getChannelByText(channelStr) {
    if (!channelStr) {
      console.error(`参数channelStr【${channelStr}】无效`);
    }
    let channel = [];
    channelStr.split(',').forEach(item => {
      switch (item) {
        case '短信':
          channel.push(Channel.Sms);
          break;
        case '彩信':
          channel.push(Channel.Mms);
          break;
        case '邮件':
          channel.push(Channel.Edm);
          break;
        case '优惠券':
          channel.push(Channel.Coupon);
          break;
        case '积分':
          channel.push(Channel.Point);
          break;
        case '协运营服务':
          channel.push(Channel.Assist);
          break;
        case '未知':
        default:
          channel.push(-1);
          break;
      }
    });
    return channel.join(',');
  }

  /**
   * 多个渠道，解析为文字描述，用','分割
   * @static
   * @param {any} channelArray 
   * @returns 
   * @memberof Utils
   */
  static getMutilChannelStr(channelArray) {
    if (!channelArray || !Array.isArray(channelArray)) {
      console.log(`channelArray【${channelArray}】 不是有效数组`);
      return channelArray;
    }
    return channelArray.join(',');
  }
  /**
   * 获取下载商品系列表格下载链接
   * @static
   * @param {any} seriesId 
   * @returns 
   * @memberof Utils
   */
  static getDownLoadSeriesTabelUrl(seriesId) {
    if (!seriesId) {
      console.error('必须提供seriesId');
      return;
    }
    let domainUrl = getDomainUrl();

    return `${domainUrl}/AISeriesExportReport/Index?seriesId=${seriesId}`;

  }
  /**
   * 复制内容到粘贴板
   * @static
   * @param {any} text 
   * @returns 
   * @memberof Utils
   */
  static copyTextToClipboard(text) {

    var textArea = document.createElement('textarea');

    textArea.style.position = 'fixed';
    textArea.style.top = 0;
    textArea.style.left = 0;
    textArea.style.width = '1px';
    textArea.style.height = '1px';
    textArea.style.padding = 0;
    textArea.style.border = 'none';
    textArea.style.outline = 'none';
    textArea.style.boxShadow = 'none';
    textArea.style.background = 'transparent';
    textArea.value = text;

    document.body.appendChild(textArea);

    textArea.select();

    var isSucc = false;
    try {
      isSucc = document.execCommand('copy');
      var msg = isSucc ? '成功' : '失败';
      console.log('复制内容 ' + msg);
    } catch (err) {
      console.log('不能使用这种方法复制内容');
    }
    document.body.removeChild(textArea);
    return isSucc;
  }


  /**
   *  将数值格式化成3位用,分隔的格式
   * @param {number} str  数值 
   * @returns 超过3位，逗号分隔的数值 如：1,001,000
   */
  static formatNum(str) {

    if (!str)
      return 0;

    var newStr = '';
    var count = 0;
    str = str + '';
    if (str.indexOf('.') == -1) {
      for (var i = str.length - 1; i >= 0; i--) {
        if (count % 3 == 0 && count != 0) {
          newStr = str.charAt(i) + ',' + newStr;
        } else {
          newStr = str.charAt(i) + newStr;
        }
        count++;
      }
      str = newStr; // + ".00"; //自动补小数点后两位 
    } else {
      for (var i = str.indexOf('.') - 1; i >= 0; i--) {
        if (count % 3 == 0 && count != 0) {
          newStr = str.charAt(i) + ',' + newStr;
        } else {
          newStr = str.charAt(i) + newStr; // 逐个字符相接起来
        }
        count++;
      }
      str = newStr + (str + '00').substr((str + '00').indexOf('.'), 3);
    }
    return str;
  }
  /**
   * 字符串转Number类型
   * @param {any} str 
   * @returns 
   * @memberof Utils
   */
  static parseNumber(str) {
    if (!str)
      return str;
    if (str.indexOf('.') > -1)
      return parseFloat(str);
    else
      return parseInt(str);
  }
  /**
   * 获取当前是否为顾问登陆
   * @static
   * @param {function} callback(isAdviserLogin,adviserId) 请求成功回调函数，isAdviserLogin是否为顾问登陆，adviserId顾问ID
   * @memberof Utils
   */
  static isAdviserLogin(callback) {
    api.isAdviserLogin((res) => {
      if (callback && typeof (callback) == 'function') callback(res.data.isAdviserLogin, res.data.adviserId);
      // if (callback && typeof (callback) == 'function') callback(true, res.data.adviserId);
    });
  }
  /**
   * 预览邮件内容
   * @static
   * @param {any} content 
   * @memberof Utils
   */
  static previewEmailContent(content) {
    if (content && content.length > 0) {
      let win = window.open(null, '_blank');
      win.opener = null;
      win.document.body.innerHTML = content;
      win.document.title = '查看邮件';
    }
  }
}

/**
 * 报表公共函数库
 * @export
 * @class ReportUtils
 */
export class ReportUtils {

  /**
   * 获取百分比样式
   * @param {any} perValue 
   * @returns 
   * @memberof ReportSummary
   */
  static getPercentClassName(perValue) {
    if (perValue > 0)
      return 'per-up';
    else if (perValue < 0)
      return 'per-down';
    else
      return 'per-zore';
  }


  
}



const PlaceholderType = {
  nick: '${nick}',
  point: '${point}',
  levelName: '${levelName}',
  shortLink: '${shortLink}'
};



export const PointSendType = {
  /// 按付款时间奖励 
  PayTime: 1,
  /// 按历史累计订单金额奖励 
  TotalTradeAmount: 2,
  /// 按历史累计订单笔数奖励 
  TotalTradeCount: 3
};

/**
 * 智能营销方案商品系列设置状态枚举
 * 商品系列创建完成 = 101,定位和剔除商品设置完成 = 102,规则模块设置完成 = 103,模块筛选条件设置完成 = 104,发送内容设置完成 = 105
 *  
 */



