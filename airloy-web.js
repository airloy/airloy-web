/**
 * AirloyWeb v0.9.8
 * (c) 2016 Layman
 * @license MIT
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('airloy')) :
  typeof define === 'function' && define.amd ? define(['airloy'], factory) :
  (global.AirloyWeb = factory(global.airloy));
}(this, (function (airloy) { 'use strict';

var asyncGenerator = function () {
  function AwaitValue(value) {
    this.value = value;
  }

  function AsyncGenerator(gen) {
    var front, back;

    function send(key, arg) {
      return new Promise(function (resolve, reject) {
        var request = {
          key: key,
          arg: arg,
          resolve: resolve,
          reject: reject,
          next: null
        };

        if (back) {
          back = back.next = request;
        } else {
          front = back = request;
          resume(key, arg);
        }
      });
    }

    function resume(key, arg) {
      try {
        var result = gen[key](arg);
        var value = result.value;

        if (value instanceof AwaitValue) {
          Promise.resolve(value.value).then(function (arg) {
            resume("next", arg);
          }, function (arg) {
            resume("throw", arg);
          });
        } else {
          settle(result.done ? "return" : "normal", result.value);
        }
      } catch (err) {
        settle("throw", err);
      }
    }

    function settle(type, value) {
      switch (type) {
        case "return":
          front.resolve({
            value: value,
            done: true
          });
          break;

        case "throw":
          front.reject(value);
          break;

        default:
          front.resolve({
            value: value,
            done: false
          });
          break;
      }

      front = front.next;

      if (front) {
        resume(front.key, front.arg);
      } else {
        back = null;
      }
    }

    this._invoke = send;

    if (typeof gen.return !== "function") {
      this.return = undefined;
    }
  }

  if (typeof Symbol === "function" && Symbol.asyncIterator) {
    AsyncGenerator.prototype[Symbol.asyncIterator] = function () {
      return this;
    };
  }

  AsyncGenerator.prototype.next = function (arg) {
    return this._invoke("next", arg);
  };

  AsyncGenerator.prototype.throw = function (arg) {
    return this._invoke("throw", arg);
  };

  AsyncGenerator.prototype.return = function (arg) {
    return this._invoke("return", arg);
  };

  return {
    wrap: function (fn) {
      return function () {
        return new AsyncGenerator(fn.apply(this, arguments));
      };
    },
    await: function (value) {
      return new AwaitValue(value);
    }
  };
}();





var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();







var get = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
};

var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};











var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};



var set = function set(object, property, value, receiver) {
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent !== null) {
      set(parent, property, value, receiver);
    }
  } else if ("value" in desc && desc.writable) {
    desc.value = value;
  } else {
    var setter = desc.set;

    if (setter !== undefined) {
      setter.call(receiver, value);
    }
  }

  return value;
};















var toConsumableArray = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  } else {
    return Array.from(arr);
  }
};

var BrowserDevice = function (_Device) {
  inherits(BrowserDevice, _Device);

  function BrowserDevice(args) {
    classCallCheck(this, BrowserDevice);

    var _this = possibleConstructorReturn(this, (BrowserDevice.__proto__ || Object.getPrototypeOf(BrowserDevice)).call(this, args));

    _this.init(args.airloy);
    return _this;
  }

  createClass(BrowserDevice, [{
    key: 'init',
    value: function init(airloy$$1) {
      var id = airloy$$1.store.getItem('airloy.device.id');
      if (id) {
        this._identifier = id;
      } else {
        this._identifier = window.navigator.userAgent + '^' + this.createGuid();
        airloy$$1.store.setItem('airloy.device.id', this._identifier);
      }
    }
  }, {
    key: 'createGuid',
    value: function createGuid() {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0,
            v = c === 'x' ? r : r & 0x3 | 0x8;
        return v.toString(16);
      });
    }
  }, {
    key: 'getIdentifier',
    value: function getIdentifier() {
      return this._identifier;
    }
  }]);
  return BrowserDevice;
}(airloy.Device);

if (typeof window.CustomEvent !== "function") {
  var _CustomEvent = function _CustomEvent(event, params) {
    params = params || { bubbles: false, cancelable: false, detail: undefined };
    var evt = document.createEvent('CustomEvent');
    evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
    return evt;
  };

  _CustomEvent.prototype = window.Event.prototype;
  window.CustomEvent = _CustomEvent;
}

var BrowserEvent = function (_Event) {
  inherits(BrowserEvent, _Event);

  function BrowserEvent() {
    classCallCheck(this, BrowserEvent);

    var _this = possibleConstructorReturn(this, (BrowserEvent.__proto__ || Object.getPrototypeOf(BrowserEvent)).call(this));

    _this._events = [];
    return _this;
  }

  createClass(BrowserEvent, [{
    key: 'on',
    value: function on(event, handler) {
      this._events[event] = this._events[event] || [];
      var listener = function listener(e) {
        handler.apply(undefined, toConsumableArray(e.detail));
      };
      this._events[event].push(listener);
      document.body.addEventListener(event, listener, false);
    }
  }, {
    key: 'once',
    value: function once(event, handler) {
      var _this2 = this;

      this._off(event);
      var listener = function listener(e) {
        handler.apply(undefined, toConsumableArray(e.detail));
        _this2._off(event);
      };
      this._events[event] = [listener];
      document.body.addEventListener(event, listener, false);
    }
  }, {
    key: '_off',
    value: function _off(event) {
      if (this._events[event]) {
        this._events[event].forEach(function (old) {
          document.body.removeEventListener(event, old, false);
        });
        this._events[event] = null;
      }
    }
  }, {
    key: 'emit',
    value: function emit(event) {
      for (var _len = arguments.length, data = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        data[_key - 1] = arguments[_key];
      }

      var myEvent = new CustomEvent(event, { detail: data });
      document.body.dispatchEvent(myEvent);
    }
  }]);
  return BrowserEvent;
}(airloy.Event);

var storage = window.localStorage || window.sessionStorage;

var BrowserStore = function (_Store) {
  inherits(BrowserStore, _Store);

  function BrowserStore() {
    classCallCheck(this, BrowserStore);
    return possibleConstructorReturn(this, (BrowserStore.__proto__ || Object.getPrototypeOf(BrowserStore)).apply(this, arguments));
  }

  createClass(BrowserStore, [{
    key: 'getItem',
    value: function getItem(key) {
      return storage.getItem(key);
    }
  }, {
    key: 'setItem',
    value: function setItem(key, value) {
      storage.setItem(key, value);
    }
  }, {
    key: 'removeItem',
    value: function removeItem(key) {
      storage.removeItem(key);
    }
  }]);
  return BrowserStore;
}(airloy.Store);

var plugin = {
  install: function install(airloy$$1) {
    airloy$$1.store = new BrowserStore();
    airloy$$1.device = new BrowserDevice({ airloy: airloy$$1 });
    airloy$$1.event = new BrowserEvent();
  }
};

return plugin;

})));
