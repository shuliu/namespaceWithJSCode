
/**
 * @global
 */
var Shark = new Namespace();
/**
 * @class AssertException
 * @classdesc Assert exception
 * @exmaple
 * throw new Shark.Exception.AssertException();
 * @param {string} message 錯誤訊息
 */
Shark.namespace('Exception').AssertException = function(message) {
    this.message = message || 'Assert exception';
    this.name = 'AssertException';
    this.stack = (new Error()).stack;
};

Shark.Exception.AssertException.prototype = Object.create(Error.prototype);
Shark.Exception.AssertException.prototype.constructor = Shark.Exception.AssertException;
/**
 * @class ElementDoesNotExistsException
 * @classdesc Element does not exists exception
 * @exmaple
 * throw new Shark.Exception.ElementDoesNotExistsException();
 * @param {string} message 錯誤訊息
 */
Shark.namespace('Exception').ElementDoesNotExistsException = function(message) {
    this.message = message || 'Element does not exists.';
    this.name = 'ElementDoesNotExistsException';
    this.stack = (new Error()).stack;
};

Shark.Exception.ElementDoesNotExistsException.prototype = Object.create(Error.prototype);
Shark.Exception.ElementDoesNotExistsException.prototype.constructor = Shark.Exception.ElementDoesNotExistsException;
/**
 * @class IndexOutOfRangeException
 * @classdesc Index out of range exception
 * @exmaple
 * throw new Shark.Exception.IndexOutOfRangeException();
 * @param {string} message 錯誤訊息
 */
Shark.namespace('Exception').IndexOutOfRangeException = function(message) {
    this.message = message || 'Index out of range.';
    this.name = 'IndexOutOfRangeException';
    this.stack = (new Error()).stack;
};

Shark.Exception.IndexOutOfRangeException.prototype = Object.create(Error.prototype);
Shark.Exception.IndexOutOfRangeException.prototype.constructor = Shark.Exception.IndexOutOfRangeException;
/**
 * @class IndexOutOfRangeException
 * @classdesc Index out of range exception
 * @exmaple
 * throw new Shark.Exception.IndexOutOfRangeException();
 * @param {string} message 錯誤訊息
 */
Shark.namespace('Exception').InvalidArgumentException = function(message) {
    this.message = message || 'Invalid argument.';
    this.name = 'InvalidArgumentException';
    this.stack = (new Error()).stack;
};

Shark.Exception.InvalidArgumentException.prototype = Object.create(Error.prototype);
Shark.Exception.InvalidArgumentException.prototype.constructor = Shark.Exception.InvalidArgumentException;
Shark.namespace('').Type = {
    Boolean: typeof true,
    Number: typeof 0,
    String: typeof "",
    Object: typeof {},
    Undefined: typeof undefined,
    Function: typeof function () {
    }
};
/**
 * 字串工具
 * @namespace
 * @alias Shark.String
 * @returns {{format: format, rightPad: rightPad}} String 物件
 */
Shark.namespace('').String = (function () {

    /**
     * 格式化字串
     * 第一個參數為格式化字串，裡面用 {x} x=1,2,3... 表示要用後面的參數代入
     * @example
     * var name = 'Leo Shiang';
     * var question = 'How are you?';
     * var output = Shark.String.format('hi {1}! {2}}', name, question);
     * console.log(output);
     * 輸出
     * hi Leo Shiang! How are you?
     * @param {any} source 格式化字串
     * @returns {string} 格式化之後的字串
     */
    var format = function (source) {
        var formatted = source;
        if (arguments.length === 1) {
            return formatted;
        }

        for (var i = 1; i < arguments.length; i++) {
            var regexp = new RegExp('\\{' + i + '\\}', 'gi');
            formatted = formatted.replace(regexp, arguments[i]);
        }

        return formatted;
    };

    /**
     * 靠右對齊，左邊補上指定的字串
     * @example
     * var s = Shark.Core.rightPad('a', '*', 3);
     * // s = '**a';
     * @param {string} source 原始字串
     * @param {string} paddingString 左邊要補上的指定字串
     * @param {string} length 最後輸出的字傳長度
     * @returns {string} 格式化之後的字串
     */
    var rightPad = function (source, paddingString, length) {
        var result = source;
        while (result.length < length) {
            result = paddingString + result;
        }
        return result;
    };

    var repeat = function (string, count) {
        var result = [];
        result.length = count + 1;
        return result.join(string);
    };

    return {
        format: format,
        rightPad: rightPad,
        repeat: repeat
    }
})();
Shark.namespace('').Event = function (sender) {
    this.sender = sender;
    this.listeners = [];
};

Shark.Event.prototype = {
    attach: function (listener) {
        this.listeners.push(listener);
    },

    notify: function (args, context) {
        for (var i = 0; i < this.listeners.length; i += 1) {
            if (Shark.System.isNull(context)) {
                this.listeners[i](this.sender, args);
            } else {
                this.listeners[i](this.sender, args).bind(context)
            }
        }
    }
};
/**
 * 系統工具
 * @namespace
 * @alias Shark.System
 * @returns {{jsonSize: jsonSize, isEmpty: isEmpty, isNull: isNull}} SystemHelper 物件
 */
Shark.namespace('').System = (function () {
    /**
     * 取得物件轉成 JSON 字串之後的大小
     * @param {object} object 要檢查的物件
     * @returns {number} 字串長度
     */
    var jsonSize = function (object) {
        if (isEmpty(object)) {
            return 0;
        }
        var json = JSON.stringify(object);
        return json.length;
    };

    /**
     * 判斷物件是否為空
     * @param {object} target 要判斷的物件
     * @returns {boolean} 當 target 是下列的值會回傳 true，否則回傳 false
     * <pre>
     * 1. undefined
     * 2. false
     * 3. null
     * 4. array 長度 = 0
     * 5. 字串長度 = 0
     * 6. '0'
     * 7. 物件沒有任何 key
     * 8. 數字 = 0
     * </pre>
     * @example
     * var name = 'test';
     * if (!Share.Core.IsEmpty(name)) {
         *     alert('name');
         * }
     */
    var isEmpty = function (target) {
        var type = typeof target;

        if (type === Shark.Type.Undefined) {
            return true;
        }

        if (type === Shark.Type.Boolean) {
            return !target;
        }

        if (target === null) {
            return true;
        }

        if (target instanceof Array) {
            if (target.length < 1) {
                return true;
            }
        } else if (type === Shark.Type.String) {
            if (target.length < 1) {
                return true;
            }
            if (target === '0') {
                return true;
            }
        } else if (type === Shark.Type.Object) {
            if (Object.keys(target).length < 1) {
                return true;
            }
        } else if (type === Shark.Type.Number) {
            if (target === 0) {
                return true;
            }
        }

        return false;
    };

    /**
     * 判斷物件是否為 null
     * @example
     * if (!Share.Core.isNull(name)) { ... }
     * @param {object} target 要判斷的物件
     * @returns {boolean} 當 target 或是 undefined 時會回傳 true，否則回傳 false
     */
    var isNull = function (target) {
        return target === null || target === undefined;
    };

    /**
     * 將物件轉為字串表示
     * @param {object} target 要轉換的物件
     * @returns {string} 字串表示
     */
    var objectToString = function (target) {
        var type = typeof target;

        if (target instanceof Function) {
            return Shark.Type.Function;
        }

        if (type === Shark.Type.Object) {
            return 'object:' + JSON.stringify(target);
        }

        if (type === Shark.Type.Undefined) {
            return Shark.Type.Undefined;
        }

        if (type === Shark.Type.Boolean) {
            return Shark.Type.Boolean + ':' + target;
        }

        if (type === Shark.Type.String) {
            return Shark.Type.String + ':\'' + target + '\'';
        }

        if (type === Shark.Type.Number) {
            return Shark.Type.Number + ':' + target;
        }

        if (target === undefined) {
            return Shark.Type.Undefined;
        }

        if (target === null) {
            return 'null';
        }

        if (target instanceof Array) {
            return 'array[' + target.length + ']';
        }

        return 'unknown';
    };

    /**
     * 判斷是否為函式
     * @param {object} subject 要判斷的物件
     * @returns 當 subject 是函式時會回傳 true，否則回傳 false
     */
    var isFunction = function (subject) {
        return typeof (subject) === Shark.Type.Function;
    };

    /**
     * 繼承
     * @param {object} child
     * @param {object} parent
     * @throws Shark.Exception.InvalidArgumentException
     */
    var inherits = function (child, parent) {
        if (Shark.System.isNull(child)) {
            throw new Shark.Exception.InvalidArgumentException('child is null');
        }

        if (Shark.System.isNull(parent)) {
            throw new Shark.Exception.InvalidArgumentException('parent is null');
        }

        child.prototype = Object.create(parent.prototype);
    };

    var getArguments = function (func) {
        var ARROW = true;
        var FUNC_ARGS = ARROW ?
            /^(function)?\s*[^\(]*\(\s*([^\)]*)\)/m :
            /^(function)\s*[^\(]*\(\s*([^\)]*)\)/m;
        var FUNC_ARG_SPLIT = /,/;
        var FUNC_ARG = /^\s*(_?)(.+?)\1\s*$/;
        var STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;

        return ((func || '').toString().replace(STRIP_COMMENTS, '').match(FUNC_ARGS) || ['', '', ''])[2]
            .split(FUNC_ARG_SPLIT)
            .map(function (arg) {
                return arg.replace(FUNC_ARG, function (all, underscore, name) {
                    return name.split('=')[0].trim();
                });
            })
            .filter(String);
    };

    return {
        jsonSize: jsonSize,
        getArguments: getArguments,
        isEmpty: isEmpty,
        isFunction: isFunction,
        isNull: isNull,
        objectToString: objectToString,
        inherits: inherits
    };
})();
/**
 * Assertion
 * @namespace
 * @alias Shark.Assert
 * @returns {object} Assert 物件
 */
Shark.namespace('').Assert = (function () {
    /**
     * 拋出 Assert 例外
     * @param {string} errorMessage 錯誤訊息
     */
    var throwAssertException = function (errorMessage) {
        throw new Shark.Exception.AssertException(errorMessage);
    };

    /**
     * 判斷是否相同
     * @example
     * var result = Shark.Assert.equal(1, 1);
     * // result = true
     * @param {object} expected 期望值
     * @param {object} actual 實際值
     */
    var equal = function (expected, actual) {
        if (expected !== actual) {
            throwAssertException('actual is not equal to expected.');
        }
    };

    /**
     * 判斷是否不相同
     * @example
     * var result = Shark.Assert.equal(1, 1);
     * // result = true
     * @param {object} expected 期望值
     * @param {object} actual 實際值
     */
    var notEqual = function (expected, actual) {
        if (expected === actual) {
            throwAssertException('actual is equal to expected.');
        }
    };

    var inRange = function (min, max, actual) {
        if (actual < min || actual > max) {
            throwAssertException(
                Shark.String.format('actual{1} is not in range {2} - {3}', actual, min, max));
        }
    };

    var isArray = function (actual) {
        if (!Array.isArray(actual)) {
            throwAssertException('actual is not an array.');
        }
    };

    var isString = function (actual) {
        if (Object.prototype.toString.call(actual) !== '[object String]') {
            throwAssertException('actual is not a string.');
        }
    };

    var isFunction = function (actual) {
        if (!Shark.System.isFunction(actual)) {
            throwAssertException('actual is not a function.');
        }
    };

    var isNull = function (actual) {
        if (!Shark.System.isNull(actual)) {
            throwAssertException('actual is not null.');
        }
    };

    var isNotNull = function (actual) {
        if (Shark.System.isNull(actual)) {
            throwAssertException('actual is null.');
        }
    };

    var isNotEmpty = function (actual) {
        if (Shark.System.isEmpty(actual)) {
            throwAssertException('actual is empty.');
        }
    };

    var typeOf = function (actual, expected) {
        if (typeof actual !== expected) {
            throwAssertException('actual is not type of ' + expected);
        }
    };

    return {
        equal: equal,
        notEqual: notEqual,
        inRange: inRange,
        isArray: isArray,
        isString: isString,
        isFunction: isFunction,
        isNull: isNull,
        isNotEmpty: isNotEmpty,
        isNotNull: isNotNull,
        typeOf: typeOf
    };
})();
Shark.namespace('').HttpMethod = {
    Delete: "DELETE",
    Get: "GET",
    Post: "POST",
    Put: "PUT"
};
/**
 * 簡單儲存服務
 * @namespace
 * @alias Shark.SimpleStorage
 * @returns {object} SimpleStorage
 */
Shark.namespace('').SimpleStorage = (function () {
    /**
     * 讀取物件
     * @param {string} key 鍵值
     * @returns {object} 物件，如果讀取失敗，會回傳 []
     */
    var getItem = function (key) {
        try {
            var value = localStorage.getItem(key);
            var object = JSON.parse(value);
            return object;
        } catch (err) {
            console.log(err);
            return [];
        }
    };

    /**
     * 寫入物件
     * @param {string} key 鍵值
     * @param {object} object 物件
     */
    var setItem = function (key, object) {
        localStorage.setItem(key, JSON.stringify(object));
    };

    return {
        getItem: getItem,
        setItem: setItem
    };
})();