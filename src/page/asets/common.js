export default class Utils {

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
  
  
    
  }
  