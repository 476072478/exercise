(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Vue = factory());
})(this, (function () { 'use strict';

    // 标签名 a-aaa
    function parseHTML(html) {
      while (html) {
        html.indexOf('<'); //如果indexOf中的索引是0，则说明是个标签 
      }
    }

    function compileToFunction(template) {
      // 将template转化成ast语法树
      parseHTML(template);
      // 生产render方法（render方法执行后的返回结果就是虚拟dom）
      console.log(template);
    }

    function _typeof(obj) {
      "@babel/helpers - typeof";

      return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
        return typeof obj;
      } : function (obj) {
        return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      }, _typeof(obj);
    }
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }
    function _defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
      }
    }
    function _createClass(Constructor, protoProps, staticProps) {
      if (protoProps) _defineProperties(Constructor.prototype, protoProps);
      if (staticProps) _defineProperties(Constructor, staticProps);
      Object.defineProperty(Constructor, "prototype", {
        writable: false
      });
      return Constructor;
    }
    function _toPrimitive(input, hint) {
      if (typeof input !== "object" || input === null) return input;
      var prim = input[Symbol.toPrimitive];
      if (prim !== undefined) {
        var res = prim.call(input, hint || "default");
        if (typeof res !== "object") return res;
        throw new TypeError("@@toPrimitive must return a primitive value.");
      }
      return (hint === "string" ? String : Number)(input);
    }
    function _toPropertyKey(arg) {
      var key = _toPrimitive(arg, "string");
      return typeof key === "symbol" ? key : String(key);
    }

    // 获取数组的原型
    var oldArrayProto = Array.prototype;
    var newArrayProto = Object.create(oldArrayProto);
    var methods = ['push', 'pop', 'shift', 'unshift', 'reverse', 'sort', 'splice'];
    methods.forEach(function (method) {
      newArrayProto[method] = function () {
        var _oldArrayProto$method;
        var ob = this.__ob__;
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }
        var result = (_oldArrayProto$method = oldArrayProto[method]).call.apply(_oldArrayProto$method, [this].concat(args));
        var inserted;
        switch (method) {
          case 'push':
          case 'unshift':
            inserted = args;
            break;
          case 'splice':
            inserted = args.slice(2);
        }
        if (inserted) {
          ob.observeArray(inserted);
        }
        return result;
      };
    });

    var Observe = /*#__PURE__*/function () {
      function Observe(data) {
        _classCallCheck(this, Observe);
        Object.defineProperty(data, '__ob__', {
          value: this,
          enumerable: false // 不可枚举
        });

        if (Array.isArray(data)) {
          // 数组不做劫持，太浪费性能，重写数组方法
          // 需要保留数组原有的特性，并且能够重写部分方法
          data.__proto__ = newArrayProto;
          this.observeArray(data);
        } else {
          this.walk(data);
        }
      }
      _createClass(Observe, [{
        key: "walk",
        value: function walk(data) {
          // 循环对象，对属性依次劫持
          Object.keys(data).forEach(function (key) {
            return defineReactive(data, key, data[key]);
          });
        }
      }, {
        key: "observeArray",
        value: function observeArray(data) {
          // 数组里面的{}需要监测到
          data.forEach(function (item) {
            return observe(item);
          });
        }
      }]);
      return Observe;
    }();
    function defineReactive(target, key, value) {
      //闭包
      observe(value); //对所有对象都进行属性劫持
      Object.defineProperty(target, key, {
        get: function get() {
          return value;
        },
        set: function set(newvalue) {
          if (value === newvalue) return;
          observe(newvalue);
          value = newvalue;
        }
      });
    }
    function observe(data) {
      // 对这个对象进行劫持
      if (_typeof(data) !== "object" || data === null) {
        return null;
      }
      if (data.__ob__ instanceof Observe) {
        //说明这个数据已经被代理
        return data.__ob__;
      }
      // 如果一个对象已经被劫持，那么就不用被劫持
      return new Observe(data);
    }

    function initState(vm) {
      // 对数据进行劫持
      var opts = vm.$options;
      if (opts.data) {
        initData(vm);
      }
    }
    function Proxy(vm, target, key) {
      // 使用时候的劫持
      Object.defineProperty(vm, key, {
        get: function get() {
          return vm[target][key];
        },
        set: function set(newvalue) {
          vm[target][key] = newvalue;
        }
      });
    }
    function initData(vm) {
      // 对data进行劫持
      var data = vm.$options.data;
      data = typeof data == "function" ? data.call(vm) : data;
      vm._data = data;
      // 将vm.data 用vm代理
      for (var key in data) {
        Proxy(vm, "_data", key);
      }
      observe(data);
    }

    function initMixin(Vue) {
      Vue.prototype._init = function (options) {
        //用于初始化操作
        var vm = this;
        vm.$options = options; //将用户的选项挂载到实例上
        // 初始化状态
        initState(vm);
        // todo...
        if (options.el) {
          vm.$mount(options.el);
        }
      };
      Vue.prototype.$mount = function (el) {
        var vm = this;
        el = document.querySelector(el);
        var ops = vm.$options;
        if (!ops.render) {
          //先查找有没有render函数
          var template;
          if (!ops.template && el) {
            //如果没有render函数有el
            template = el.outerHTML;
          } else {
            // 写了templat，就用写了的template
            if (el) {
              template = ops.template;
            }
          }
          if (template) {
            // 这里需要对模板进行编译
            var render = compileToFunction(template);
            ops.render = render;
          }
        }
        ops.render;
      };
    }

    function Vue(options) {
      this._init(options);
    }
    initMixin(Vue); //扩展了init方法

    return Vue;

}));
//# sourceMappingURL=vue.js.map
