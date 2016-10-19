/**
 * airloy_web v0.9.2
 * (c) 2016 Layman
 * @license MIT
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('airloy'), require('fingerprintjs2')) :
  typeof define === 'function' && define.amd ? define(['airloy', 'fingerprintjs2'], factory) :
  (global.airloy_web = factory(global.airloy,global.Fingerprint2));
}(this, (function (airloy,Fingerprint2) { 'use strict';

Fingerprint2 = 'default' in Fingerprint2 ? Fingerprint2['default'] : Fingerprint2;

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







var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

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

var BrowserDevice = function (_Device) {
  inherits(BrowserDevice, _Device);

  function BrowserDevice(args) {
    classCallCheck(this, BrowserDevice);

    var _this = possibleConstructorReturn(this, (BrowserDevice.__proto__ || Object.getPrototypeOf(BrowserDevice)).call(this, args));

    new Fingerprint2().get(function (result, components) {
      this._identifier = result;
    });
    return _this;
  }

  createClass(BrowserDevice, [{
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
      this._events[event].push(handler);
      document.body.addEventListener(event, handler, false);
    }
  }, {
    key: 'once',
    value: function once(event, handler) {
      var _this2 = this;

      this._off(event);
      var listener = function listener() {
        handler.apply(undefined, arguments);
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

      var myEvent = new CustomEvent(event, { detail: _extends({}, data) });
      document.body.dispatchEvent(myEvent);
    }
  }]);
  return BrowserEvent;
}(airloy.Event);

function __async(g) {
  return new Promise(function (s, j) {
    function c(a, x) {
      try {
        var r = g[x ? "throw" : "next"](a);
      } catch (e) {
        j(e);return;
      }r.done ? s(r.value) : Promise.resolve(r.value).then(c, d);
    }function d(e) {
      c(e, 1);
    }c();
  });
}

var storage = window.localStorage || window.sessionStorage;

var BrowserStore = function (_Store) {
  inherits(BrowserStore, _Store);

  function BrowserStore() {
    classCallCheck(this, BrowserStore);
    return possibleConstructorReturn(this, (BrowserStore.__proto__ || Object.getPrototypeOf(BrowserStore)).apply(this, arguments));
  }

  createClass(BrowserStore, [{
    key: 'getItem',
    value: function getItem(key) {return __async(function*(){
      return storage.getItem(key);
    }())}
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
    airloy$$1.device = new BrowserDevice();
    airloy$$1.store = new BrowserStore();
    airloy$$1.event = new BrowserEvent();
  }
};

return plugin;

})));
