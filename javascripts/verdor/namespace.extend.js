
/**
 * namespace pattern
 * 
 * =====================================
 * example:
 * var myApp = myApp || {};
 * helpers.extend(myApp, 'modules.module2');
 * helpers.extend(myApp, 'moduleA.moduleB.moduleC.moduleD');
 * helpers.extend(myApp, 'longer.version.looks.like.this');
 * helpers.extend(myApp, 'moduleA.moduleB.moduleC.moduleD.moduleE', function(aa){console.log(aa)});
 * console.log(myApp);
 * 
 * extendObject(myNS, {hello:{world:{wave:{test: function(){console.log(arguments);}}}}});
 */

export class helpers {

  /** gen and set namespace with object */
  extend(nsObject, nsString, value) {
    var parts = nsString.split('.'),
      i = 0;
    for (i = 0; i < parts.length; i++) {
      if (typeof nsObject[parts[i]] == 'undefined') {
        nsObject[parts[i]] = (i === parts.length - 1 && typeof value !== 'undefined') ? value : {};
      }
      nsObject = nsObject[parts[i]];
    }

    return nsObject;
  }

  /**
   * 物件 append
   * { object } destination 原 object
   * { object } source 加入的 object
  */
  extendObject(destination, source) {
    var toString = Object.prototype.toString,
      objTest = toString.call({});
    for (var property in source) {
      if (source[property] && objTest == toString.call(source[property])) {
        destination[property] = destination[property] || {};
        extend(destination[property], source[property]);
      } else {
        destination[property] = source[property];
      }
    }
    return destination;
  };
}
