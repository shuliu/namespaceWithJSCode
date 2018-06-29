/**
 * @class Namespace
 * @classdesc 命名空間實體物件。定義一個命名空間，會回傳一個 Name space
 */
class Namespace {

  /**
   * 遍歷命名空間樹
   * @method
   * @param {string} namespace 命名空間，例如：System.Helpers
   * @param {callback} callback 回呼函數
   * @returns {obejct} 命名空間最後一個節點
   */
  traverse(namespace, callback) {
    if (namespace.trim() === '') {
      return this;
    }

    // 將命名空間分解
    let parts = namespace.split(".");

    // 從命名空間樹頭開始
    let node = this;

    // 依序遍歷每一個命名空間節點
    parts.forEach(
      function (name) {
        node = callback(node, name);
      });

    return node;
  }

  /**
   * 定義命名空間
   * @method
   * @param {string} namespace 命名空間，例如：System.Helpers
   * @returns {obejct} 命名空間
   */
  namespace(namespace) {
    // 依序遍歷每一個命名空間節點
    return this.traverse(
      namespace,
      function (node, item) {
        // 為命名空間節點產生一個物件，並存入陣列
        node[item] = node[item] || {};

        // 回傳剛剛產生的物件
        return node[item];
      }
    );
  }

  /**
   * 反射，動態載入物件
   * @param {string} namespace 命名空間
   * @example
   * 假設完整的 namespace 為 App.System.Math.Add
   * Add 為一個 function，其定義為：
   * App.namespace('System.Math').Add = function(a, b) {
   *  return a + b;
   * }
   *
   * 我們可以透過字串來取得 Add
   * var add = App.reflection('System.Math.Add');
   * var result = add(1, 2);
   * // result = 3
   * @returns {object} 物件建構函數
   */
  reflection(namespace) {
    return this.traverse(
      namespace,
      function (node, item) {
        // 回傳命名空間節點物件
        return node[item];
      }
    );
  }


}

Namespace.prototype.String = {
  'rightPad': (source, paddingString, length) => {
    var result = source;
    while (result.length < length) {
      result = paddingString + result;
    }
    return result;
  }
};

var Shark = new Namespace();