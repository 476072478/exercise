(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Vue = factory());
})(this, (function () { 'use strict';

    // 静态方法
    var strats = {};
    var LIFECYCLE = ['beforeCreate', 'created'];
    LIFECYCLE.forEach(function (hook) {
      return strats[hook] = function (p, c) {
        // {} {created:function(){}} => {created:[fn]}  第一次合并
        // {created:[fn]} {created:function(){}} => {created:[fn,fn]}
        if (c) {
          // 如果儿子有父亲有，父亲肯定是数组，让父亲和儿子拼在一起
          if (p) {
            return p.concat(c);
          } else {
            // 第一次，父亲没有，儿子有，将儿子包装成数组
            return [c];
          }
        } else {
          // 如果儿子没有，直接返回父亲
          return p;
        }
      };
    });
    strats.components = function (parentVal, childVal) {
      var res = Object.create(parentVal);
      if (childVal) {
        for (var key in childVal) {
          res[key] = childVal[key]; //返回的是构造的对象，可以拿到父亲原型上的属性，并且将儿子的都拷贝到自己身上
        }
      }

      return res;
    };
    function mergeOptions(parent, child) {
      var options = {};
      for (var key in parent) {
        // 循环老的
        mergeField(key);
      }
      for (var _key in child) {
        // 循环新的
        if (!parent.hasOwnProperty(_key)) {
          mergeField(_key);
        }
      }
      function mergeField(key) {
        // 策略模式，用策略模式减少if，else
        if (strats[key]) {
          options[key] = strats[key](parent[key], child[key]);
        } else {
          // 如果不在策略中则以儿子为主
          options[key] = child[key] || parent[key]; //优先采用儿子，再采用父亲
        }
      }

      return options;
    }

    function initGlobalAPI(Vue) {
      // 静态方法
      Vue.options = {
        _base: Vue
      };
      Vue.mixin = function (mixin) {
        // 我们期望将用户的选项和全局的options进行合并
        this.options = mergeOptions(this.options, mixin);
        return this;
      };
      Vue.extend = function (options) {
        // 就是实现根据用户的参数 返回一个构造函数
        function Sub() {
          var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
          // 最终使用一个组件，就是new一个实例
          this._init(options); // 默认对子类进行初始化
        }

        Sub.prototype = Object.create(Vue.prototype); // Sub.prototype._proto_ =  Vue.prototype
        Sub.prototype.constructor = Sub;
        // 希望将用户传递的参数和全局的Vue.options合并
        Sub.options = mergeOptions(Vue.options, options); // 保存用户传递的选项
        return Sub;
      };
      Vue.options.components = {};
      Vue.component = function (id, definition) {
        // 如果definition已经是个函数了，说明用户自己调用了Vue.extend
        definition = typeof definition == 'function' ? definition : Vue.extend(definition);
        Vue.options.components[id] = definition;
      };
    }

    function _iterableToArrayLimit(arr, i) {
      var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"];
      if (null != _i) {
        var _s,
          _e,
          _x,
          _r,
          _arr = [],
          _n = !0,
          _d = !1;
        try {
          if (_x = (_i = _i.call(arr)).next, 0 === i) {
            if (Object(_i) !== _i) return;
            _n = !1;
          } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0);
        } catch (err) {
          _d = !0, _e = err;
        } finally {
          try {
            if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r)) return;
          } finally {
            if (_d) throw _e;
          }
        }
        return _arr;
      }
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
    function _slicedToArray(arr, i) {
      return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
    }
    function _arrayWithHoles(arr) {
      if (Array.isArray(arr)) return arr;
    }
    function _unsupportedIterableToArray(o, minLen) {
      if (!o) return;
      if (typeof o === "string") return _arrayLikeToArray(o, minLen);
      var n = Object.prototype.toString.call(o).slice(8, -1);
      if (n === "Object" && o.constructor) n = o.constructor.name;
      if (n === "Map" || n === "Set") return Array.from(o);
      if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
    }
    function _arrayLikeToArray(arr, len) {
      if (len == null || len > arr.length) len = arr.length;
      for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
      return arr2;
    }
    function _nonIterableRest() {
      throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
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

    // 标签名 a-aaa
    var ncname = "[a-zA-Z_][\\-\\.0-9_a-zA-Z]*";
    // 命名空间标签 aa:aa-xxx
    var qnameCapture = "((?:".concat(ncname, "\\:)?").concat(ncname, ")");
    // 开始标签-捕获标签名
    var startTagOpen = new RegExp("^<".concat(qnameCapture));
    // 结束标签-匹配标签结尾的 </div>
    var endTag = new RegExp("^<\\/".concat(qnameCapture, "[^>]*>"));
    // 匹配属性
    var attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/;
    // 匹配标签结束的 >
    var startTagClose = /^\s*(\/?)>/;
    // 匹配 {{ }} 表达式
    var defaultTagRE = /\{\{((?:.|\r?\n)+?)\}\}/g;
    function parseHTML(html) {
      function advance(n) {
        html = html.substring(n);
      }
      var root; //树的操作，需要根据开始标签和结束标签产生一个树
      // 如何构建树的父子关系
      var stack = [];
      function creatASTElement(tagName, attrs) {
        return {
          tag: tagName,
          attrs: attrs,
          children: [],
          parent: null,
          type: 1
        };
      }
      function start(tagName, attrs) {
        var element = creatASTElement(tagName, attrs);
        if (root == null) {
          root = element;
        }
        var parent = stack[stack.length - 1];
        if (parent) {
          element.parent = parent; //让这个元素记住自己的父亲
          parent.children.push(element); // 让这个元素记住自己的儿子
        }

        stack.push(element);
      }
      function end(tagName) {
        stack.pop();
      }
      function chars(text) {
        text = text.replace(/\s/g, '');
        if (text) {
          var parent = stack[stack.length - 1];
          parent.children.push({
            type: 3,
            text: text
          });
        }
      }
      function parseStartTag() {
        var start = html.match(startTagOpen);
        if (start) {
          var match = {
            tagName: start[1],
            //标签名
            attrs: []
          };
          advance(start[0].length);
          var _end, attr;
          // 如果不是开始标签的结束,那就一直匹配
          while (!(_end = html.match(startTagClose)) && (attr = html.match(attribute))) {
            match.attrs.push({
              name: attr[1],
              value: attr[3] || attr[4] || attr[5] || true
            });
            advance(attr[0].length);
          }
          if (_end) {
            advance(_end[0].length);
            return match;
          }
          return false; //不是开始标签
        }
      }

      while (html) {
        // 如果textEnd为0,说明是一个开始标签,或一个结束标签
        var textEnd = html.indexOf("<"); //如果indexOf中的索引是0，则说明是个标签
        if (textEnd === 0) {
          var startTagMatch = parseStartTag();
          if (startTagMatch) {
            start(startTagMatch.tagName, startTagMatch.attrs);
            continue;
          }
          var matches = void 0;
          if (matches = html.match(endTag)) {
            //不是开始就会走到结束
            end(matches[1]);
            advance(matches[0].length);
            continue;
          }
        }
        var text = void 0;
        if (textEnd >= 0) {
          text = html.substring(0, textEnd);
        }
        if (text) {
          advance(text.length);
          chars(text);
        }
      }
      return root;
    }
    function getProps(attrs) {
      var str = '';
      var _loop = function _loop() {
        var attr = attrs[i];
        // style = 'color:red;background:blue'
        if (attr.name == 'style') {
          // style:'{color:red,background:blue}'
          var obj = {};
          attr.value.split(';').reduce(function (memo, current) {
            var _current$split = current.split(':'),
              _current$split2 = _slicedToArray(_current$split, 2),
              key = _current$split2[0],
              value = _current$split2[1];
            memo[key] = value;
            return obj;
          }, obj);
          attr.value = obj;
        }
        str += "".concat(attr.name, ":").concat(JSON.stringify(attr.value), ",");
      };
      for (var i = 0; i < attrs.length; i++) {
        _loop();
      }
      return "{".concat(str.slice(0, -1), "}");
    }
    function gen(child) {
      if (child.type === 1) {
        return getCode(child);
      } else {
        var text = child.text;
        if (!defaultTagRE.test(text)) {
          return "_v(".concat(JSON.stringify(text), ")"); //不带表达式的
        } else {
          var tokens = [];
          var match;
          //exec 遇到全局匹配有lastIndex问题，每次匹配前需要将lastIndex置为0
          var startIndex = defaultTagRE.lastIndex = 0;
          while (match = defaultTagRE.exec(text)) {
            var endIndex = match.index; //匹配到索引
            if (endIndex > startIndex) {
              tokens.push(JSON.stringify(text.substring(startIndex, endIndex)));
            }
            tokens.push("_s(".concat(match[1].trim(), ")"));
            startIndex = endIndex + match[0].length;
          }
          if (startIndex < text.length) {
            //将最后的尾巴也丢进去
            tokens.push(JSON.stringify(text.slice(startIndex)));
          }
          return "_v(".concat(tokens.join('+'), ")");
        }
      }
    }
    function getChildren(children) {
      return children.map(function (child) {
        return gen(child);
      }).join(',');
    }
    function getCode(ast) {
      // 字符串拼接，拼接成想要的就行
      var code;
      code = "_c('".concat(ast.tag, "',").concat(ast.attrs.length ? getProps(ast.attrs) : 'undefined').concat(ast.children ? ',' + getChildren(ast.children) : '', ")");
      //  _c('div',{className:'xxx'},createTextVnode('hello world'))
      return code;
    }
    // 将模板变成render函数，通过with+new Function()的方式让
    function compileToFunction(template) {
      // 将template转化成ast语法树
      var ast = parseHTML(template);
      // 通过ast语法树转成render函数
      var code = getCode(ast);
      // 生产render方法（render方法执行后的返回结果就是虚拟dom）
      var render = new Function("with(this){return ".concat(code, "}"));
      return render;
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
        // 走到这里
        ob.dep.notify(); //数组变化了，通知对应的watcher实现更新
        return result;
      };
    });

    var id$1 = 0;
    var Dep = /*#__PURE__*/function () {
      function Dep() {
        _classCallCheck(this, Dep);
        this.id = id$1++; //属性的dep要收集watcher
        this.subs = []; //这里存放
      }
      _createClass(Dep, [{
        key: "depend",
        value: function depend() {
          // 这里我们不希望放重复的wacher，而且刚才只是一个单向的关系
          // watcher记录dep
          // this.subs.push(Dep.target)
          Dep.target.addDep(this); //让watcher记住dep
        }
      }, {
        key: "addSub",
        value: function addSub(watcher) {
          this.subs.push(watcher);
        }
      }, {
        key: "notify",
        value: function notify() {
          this.subs.forEach(function (watcher) {
            return watcher.update();
          }); //告诉watcher要更新了
        }
      }]);
      return Dep;
    }();
    var stack = [];
    function pushTarget(watcher) {
      stack.push(watcher);
      Dep.target = watcher;
    }
    function popTarget() {
      stack.pop();
      Dep.target = stack[stack.length - 1];
    }
    Dep.target = null;

    var Observe = /*#__PURE__*/function () {
      function Observe(data) {
        _classCallCheck(this, Observe);
        this.dep = new Dep(); //所有对象都要增加dep
        Object.defineProperty(data, "__ob__", {
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
    function dependArray(value) {
      for (var i = 0; i < value.length; i++) {
        value[i].__ob__ && value[i].__ob__.dep.depend();
        if (Array.isArray(value[i])) {
          dependArray(value[i]);
        }
      }
    }
    function defineReactive(target, key, value) {
      //闭包
      var childob = observe(value); //对所有对象都进行属性劫持
      var dep = new Dep(); //每一个属性都有一个dep
      Object.defineProperty(target, key, {
        get: function get() {
          if (Dep.target) {
            dep.depend(); //让这个属性的收集器记住当前过程
            if (childob) {
              childob.dep.depend();
              if (Array.isArray(value)) {
                dependArray(value);
              }
            }
          }
          return value;
        },
        set: function set(newvalue) {
          if (value === newvalue) return;
          observe(newvalue);
          value = newvalue;
          dep.notify(); //通知更新
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

    var queeu = [];
    var has = {};
    var pending = false; //防抖

    function flushSchedulerQueue() {
      var flushQueue = queeu.slice(0);
      queeu = [];
      has = {};
      pending = false;
      flushQueue.forEach(function (q) {
        return q.run();
      }); //在刷新的过程中可能还有新的watcher，重新放到queue中
    }

    var callbacks = [];
    var waiting = false;
    function flushCallbacks() {
      waiting = false;
      var cbs = callbacks.slice(0);
      callbacks = [];
      cbs.forEach(function (cb) {
        return cb();
      });
    }
    // nextTick采用的是优雅降级的方式
    var timeFunc;
    if (Promise) {
      timeFunc = function timeFunc() {
        Promise.resolve().then(flushCallbacks);
      };
    } else if (MutationObserver) {
      var observer = new MutationObserver(flushCallbacks);
      var textNode = createTextNode(1);
      observer.observe(textNode, {
        characterData: true
      });
      timeFunc = function timeFunc() {
        textNode.textContent = 2;
      };
    } else if (setImmediate) {
      timeFunc = function timeFunc() {
        setImmediate(flushCallbacks);
      };
    } else {
      setTimeout(function () {
        flushCallbacks();
      }, 0);
    }
    function nextTick(cb) {
      //先内部的还是先用户的？
      callbacks.push(cb);
      if (!waiting) {
        timeFunc(); //最后一起刷新
      }
    }

    function queueWatcher(watcher) {
      var id = watcher.id;
      if (!has[id]) {
        queeu.push(watcher);
        has[id] = true;
        // 不管update执行多少次，但是最终只执行一次
        if (!pending) {
          nextTick(flushSchedulerQueue);
          pending = true;
        }
      }
    }
    var id = 0;
    var Watcher = /*#__PURE__*/function () {
      function Watcher(vm, exprOrFn, options, cb) {
        _classCallCheck(this, Watcher);
        // 不同组件有不同watcher
        this.id = id++;
        this.renderWatcher = options; //是一个渲染过程
        if (typeof exprOrFn === 'string') {
          this.getter = function () {
            return vm[exprOrFn];
          };
        } else {
          this.getter = exprOrFn; // getter意味着调用这个函数会发生取值操作
        }

        this.deps = []; //后续我们实现计算属性和清理工作会用到
        this.depsId = new Set();
        this.lazy = options.lazy;
        this.dirty = this.lazy; //缓存
        this.cb = cb;
        this.vm = vm;
        this.user = options.user; // 标识是否是用户自己的watcher
        this.value = this.lazy ? undefined : this.get();
      }
      _createClass(Watcher, [{
        key: "evaluate",
        value: function evaluate() {
          this.value = this.get();
          this.dirty = false;
        }
      }, {
        key: "get",
        value: function get() {
          pushTarget(this); //静态属性只有一份
          var value = this.getter.call(this.vm); //会去vm上取值
          popTarget();
          return value;
        }
      }, {
        key: "addDep",
        value: function addDep(dep) {
          //一个组件对应多个属性，重复的属性也不用记录
          var id = dep.id;
          if (!this.depsId.has(id)) {
            this.deps.push(dep);
            this.depsId.add(id); //watcher已经记住dep，并且已经去重
            dep.addSub(this);
          }
        }
      }, {
        key: "depend",
        value: function depend() {
          var i = this.deps.length;
          while (i--) {
            this.deps[i].depend(); //让计算属性watcher也收集渲染过程
          }
        }
      }, {
        key: "update",
        value: function update() {
          if (this.lazy) {
            //如果是计算属性,依赖的值变化了，就标值计算属性是脏值
            this.dirty = true;
          } else {
            queueWatcher(this); //把当前的watcher暂存起来
          }
        }
      }, {
        key: "run",
        value: function run() {
          var oldValue = this.value;
          var newValue = this.get();
          if (this.user) {
            this.cb.call(this.vm, oldValue, newValue);
          }
        }
      }]);
      return Watcher;
    }(); // 需要给每个属性增加一个dep，目的就是收集watcher

    function initState(vm) {
      // 对数据进行劫持
      var opts = vm.$options;
      if (opts.data) {
        initData(vm);
      }
      if (opts.computed) {
        initComputed(vm);
      }
      if (opts.watch) {
        initWatch(vm);
      }
    }
    function initWatch(vm) {
      var watch = vm.$options.watch;
      for (var key in watch) {
        var handler = watch[key];
        if (Array.isArray(watch)) {
          for (var i = 0; i < watch.length; i++) {
            creatWatch(vm, key, handler[i]);
          }
        } else {
          creatWatch(vm, key, handler);
        }
      }
    }
    function creatWatch(vm, key, handler) {
      // 字符串,函数
      if (typeof handler === 'string') {
        handler = vm[handler];
      }
      return vm.$watch(key, handler);
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
    function initComputed(vm) {
      var computed = vm.$options.computed;
      var watchers = vm.computedWatcher = {}; //将计算属性watcher保存到vm上
      for (var key in computed) {
        var userDef = computed[key];
        // 我们需要监控计算属性中get的变化
        var fn = typeof userDef === 'function' ? userDef : userDef.get;
        watchers[key] = new Watcher(vm, fn, {
          lazy: true
        });
        defineComputed(vm, key, userDef);
      }
    }
    function defineComputed(target, key, userDef) {
      var setter = userDef.set || function () {};
      Object.defineProperty(target, key, {
        get: createComputedGeeter(key),
        set: setter
      });
    }
    function createComputedGeeter(key) {
      // 我们需要监测是否要执行这个getter
      return function () {
        var watcher = this.computedWatcher[key];
        if (watcher.dirty) {
          // 如果是脏的，则执行
          watcher.evaluate();
        }
        if (Dep.target) {
          //计算属性出栈后还有渲染过程，我应该让计算属性watcher里面的属性也去收集上一层watcher
          watcher.depend();
        }
        return watcher.value;
      };
    }
    function initStateMixin(Vue) {
      Vue.prototype.$nextTick = nextTick;
      // watch最终调用的是这个方法
      Vue.prototype.$watch = function (exprOrFn, cb) {
        new Watcher(this, exprOrFn, {
          user: true
        }, cb);
      };
    }

    var isReservedTag = function isReservedTag(tag) {
      return ['a', 'button', 'p', 'div', 'ul', 'li', 'span'].includes(tag);
    };
    function createElement(vm, tag) {
      var data = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      if (data == null) {
        data = {};
      }
      var key = data.key;
      if (key) {
        delete data.key;
      }
      for (var _len = arguments.length, children = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
        children[_key - 3] = arguments[_key];
      }
      if (isReservedTag(tag)) {
        return vnode(vm, tag, data, children, data.key, null);
      } else {
        // 创造一个组件的虚拟节点（包含组件的构造函数）
        var Ctor = vm.$options.components[tag]; // 组件的构造函数
        // // Ctor就是组件的定义，可能是一个Sub类，还有可能是组件的obj选项
        return createComponentVnode(vm, tag, key, data, children, Ctor);
      }
    }
    function createComponentVnode(vm, tag, key, data, children, Ctor) {
      if (_typeof(Ctor) === 'object') {
        Ctor = vm.$options._base.extend(Ctor);
      }
      data.hook = {
        init: function init(vnode) {
          // 稍后创造真实节点的时候，如果是组件则调用此init方法
          // 保存组件的实例到虚拟节点上
          var instance = vnode.componentInstance = new vnode.componentOptions.Ctor();
          instance.$mount(); // instance.$el
        }
      };

      return vnode(vm, tag, data, children, key, null, {
        Ctor: Ctor
      });
    }
    function createTextNode$1(vm, text) {
      return vnode(vm, null, null, null, null, text);
    }
    function vnode(vm, tag, data, children, key, text, componentOptions) {
      return {
        vm: vm,
        tag: tag,
        data: data,
        children: children,
        key: key,
        text: text,
        componentOptions: componentOptions //组件的构造函数
      };
    }

    function isSameVnode(vnode1, vnode2) {
      return vnode1.tag === vnode2.tag && vnode1.key === vnode2.key;
    }

    function createComponent(vnode) {
      var i = vnode.data;
      if ((i = i.hook) && (i = i.init)) {
        i(vnode); //初始化组件
      }

      console.log('🚀 ~ file ~ text:', vnode);
      if (vnode.componentInstance) {
        return true;
      }
    }
    function createElm(vnode) {
      var tag = vnode.tag,
        data = vnode.data,
        children = vnode.children,
        text = vnode.text;
      if (typeof tag === "string") {
        // 创建真实元素 也要区分是组件还是元素
        if (createComponent(vnode)) {
          //组件
          return vnode.componentInstance.$el;
        }
        vnode.el = document.createElement(tag); //后续我们需要diff算法，拿虚拟节点比对后更新dom
        patchProps(vnode.el, {}, data);
        children.forEach(function (children) {
          // 递归渲染
          vnode.el.appendChild(createElm(children));
        });
      } else {
        // 文本
        vnode.el = document.createTextNode(text);
      }
      return vnode.el; //从根虚拟节点创建真实节点
    }

    function patchProps(el) {
      var oldprops = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var props = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      // 老的属性中有，新的没有，要删除老的
      var oldStyles = oldprops.style || {};
      var newStyles = props.style || {};
      for (var key in oldStyles) {
        // 老的样式中有，新的样式中没有则删除
        if (!newStyles[key]) {
          el.style[key] = '';
        }
      }
      for (var _key in oldprops) {
        // 老的属性中有，新的没有删除属性
        if (!props[_key]) {
          el.removeAttribute(_key);
        }
      }
      for (var _key2 in props) {
        // 用新的覆盖老的
        if (_key2 === "style") {
          for (var styleName in props[_key2]) {
            el.style[styleName] = props.style[styleName];
          }
        } else {
          el.setAttribute(_key2, props[_key2]);
        }
      }
    }
    function patch(oldVnode, vnode) {
      if (!oldVnode) {
        // 这就是组件的挂载
        return createElm(vnode); // vm.$el 对应的就是组件渲染的结果
      }

      var isRealElement = oldVnode && oldVnode.nodeType; // 如果有说明他是一个元素
      if (isRealElement) {
        var oldElm = oldVnode;
        // 需要获取父节点，将当前节点的下一个元素作为参照物将他插入，之后删除老节点
        var parentNode = oldElm.parentNode;
        var el = createElm(vnode);
        parentNode.insertBefore(el, oldElm.nextSibling);
        parentNode.removeChild(oldElm);
        return el;
      } else {
        // diff算法
        // 两个节点不是同一个节点，直接删除老的换上新的（没有比对了）
        // 两个节点是同一个节点，（判断节点的tag和节点的key） 比较两个节点的属性是否有差异（复用老的节点，将差异的属性更新）
        // 节点比较完毕后，需要比较两个节点的儿子
        patchVonde(oldVnode, vnode);
      }
    }
    function mountChildren(el, newChildren) {
      for (var i = 0; i < newChildren.length; i++) {
        var child = newChildren[i];
        el.appendChild(createElm(child));
      }
    }
    function patchVonde(oldVnode, vnode) {
      if (!isSameVnode(oldVnode, vnode)) {
        var _el = createElm(vnode);
        oldVnode.el.parentNode.replaceChild(_el, oldVnode.el);
        return _el;
      }
      // 文本的情况，文本我们期望比较一下文本的内容
      var el = vnode.el = oldVnode.el; // 复用老节点的元素
      if (!oldVnode.tag) {
        // 是文本
        if (oldVnode.text !== vnode.text) {
          el.textContent = vnode.text;
        }
        return;
      }
      // console.log(oldVnode, vnode)
      // 是标签 标签我们需要比对标签的属性
      patchProps(el, oldVnode.data, vnode.data);

      // 比较儿子节点，一方有儿子，一方没儿子
      // 两方都有儿子
      var oldChildren = oldVnode.children || [];
      var newChildren = vnode.children || [];
      if (oldChildren.length > 0 && newChildren.length > 0) {
        // 两方都有儿子
        updateChildren(el, oldChildren, newChildren);
      } else if (newChildren.length > 0) {
        mountChildren(el, newChildren);
      } else if (oldChildren.length > 0) {
        el.innerHTML = '';
      }
      return el;
    }
    function updateChildren(el, oldChildren, newChildren) {
      // 双指针
      var oldStartIndex = 0;
      var newStartIndex = 0;
      var oldEndIndex = oldChildren.length - 1;
      var newEndIndex = newChildren.length - 1;
      var oldStartVnode = oldChildren[0];
      var newStartVnode = newChildren[0];
      var oldEndVnode = oldChildren[oldEndIndex];
      var newEndVnode = newChildren[newEndIndex];
      function makeIndexByKey(children) {
        var map = {};
        children.forEach(function (child, index) {
          map[child.key] = index;
        });
        return map;
      }
      var map = makeIndexByKey(oldChildren);
      while (oldStartIndex <= oldEndIndex && newStartIndex <= newEndIndex) {
        // 有任何一个不满足则停止
        if (!oldStartVnode) {
          oldStartVnode = oldChildren[++oldStartIndex];
        } else if (!oldEndVnode) {
          oldEndVnode = oldChildren[--oldStartIndex];
        }
        // 双方有一方头指针，大于尾部指针则停止循环 
        // 比较开头节点
        if (isSameVnode(oldStartVnode, newStartVnode)) {
          patchVonde(oldStartVnode, newStartVnode); //如果是相同节点则递归比较子节点
          oldStartVnode = oldChildren[++oldStartIndex];
          newStartVnode = newChildren[++newStartIndex];
        } else if (isSameVnode(oldEndVnode, newEndVnode)) {
          patchVonde(oldEndVnode, newEndVnode);
          oldEndVnode = oldChildren[--oldEndIndex];
          newEndVnode = newChildren[--newEndIndex];
          // 比较尾部节点
        } else if (isSameVnode(oldEndVnode, newStartVnode)) {
          patchVonde(oldEndVnode, newStartVnode);
          el.insertBefore(oldEndVnode.el, oldStartVnode.el);
          oldEndVnode = oldChildren[--oldEndIndex];
          newStartVnode = newChildren[++newStartIndex];
          // 交叉比对 abcd - > dabc
        } else if (isSameVnode(oldStartVnode, newEndVnode)) {
          patchVonde(oldStartVnode, newEndVnode);
          el.insertBefore(oldStartVnode.el, oldEndVnode.el.nextSibling);
          oldStartVnode = oldChildren[++oldStartIndex];
          newEndVnode = newChildren[--newEndIndex];
          // 交叉比对 dabc - > abcd
        } else {
          // 乱序比对，尽可能的复用原来的dom
          // 根据老的列表做一个映射关系，用新的去找，找到则移动，找不到则添加，最后多余的就删除
          var moveIndex = map[newStartVnode.key]; //如果拿到则说明是我要移动的索引
          if (moveIndex !== undefined) {
            var moveVnode = oldChildren[moveIndex]; // 找到对应的虚拟节点
            el.insertBefore(moveVnode.el, oldStartVnode.el);
            oldChildren[moveIndex] = undefined; // 不能删，删则导致数组塌陷，表示这个节点已经移动走了
            patchVonde(moveVnode, newStartVnode);
          } else {
            el.insertBefore(createElm(newStartVnode), oldStartVnode.el);
          }
          newStartVnode = newChildren[++newStartIndex];
        }
      }
      if (newStartIndex <= newEndIndex) {
        // 新得多了，多余的就插入进去
        for (var i = newStartIndex; i <= newEndIndex; i++) {
          var childEL = createElm(newChildren[i]);
          // 这里可能是向后追加，还有可能向前追追加
          var anchor = newChildren[newEndIndex + 1] ? newChildren[newEndIndex + 1].el : null; // 获取下一个元素
          el.insertBefore(childEL, anchor); // anchor为null的时候则会认为是appednChild
        }
      }

      if (oldStartIndex <= oldEndIndex) {
        // 老的多了，多的就删除
        for (var _i = oldStartIndex; _i <= oldEndIndex; _i++) {
          if (oldChildren[_i]) {
            var _childEL = oldChildren[_i].el;
            el.removeChild(_childEL);
          }
        }
      }
    }
    // 每次更新页面的话，dom结果是不会变的，我调用render方法时，数据变化了会根据数据渲染成新的虚拟节点，用新的虚拟节点渲染dom

    function lifeCycleMixin(Vue) {
      Vue.prototype._c = function () {
        // 创造对应的虚拟节点，进行渲染
        return createElement.apply(void 0, [this].concat(Array.prototype.slice.call(arguments)));
      };
      Vue.prototype._v = function () {
        return createTextNode$1.apply(void 0, [this].concat(Array.prototype.slice.call(arguments)));
      };
      Vue.prototype._s = function (value) {
        //将数据转化成字符串，因为使用变量对应的结果可能是一个对象
        if (_typeof(value) === 'object' && value !== null) {
          return JSON.stringify(value);
        }
        return value;
      };
      Vue.prototype._render = function () {
        var vm = this;
        var render = vm.$options.render;
        var vnode = render.call(vm);
        return vnode;
      };
      Vue.prototype._update = function (vnode) {
        //将虚拟节点变成真实节点
        // 将Vnode渲染到el元素中
        var vm = this;
        var el = vm.$el;
        var prevVnode = vm._vnode;
        vm._vnode = vnode; //把组件第一次产生的虚拟节点保存到_vnode上
        if (prevVnode) {
          // 之前渲染过了
          vm.$el = patch(prevVnode, vnode);
        } else {
          vm.$el = patch(el, vnode);
        }
      };
    }
    function mountComponent(vm, el) {
      //实现页面的挂载流程
      // 先将el挂载到实例上
      vm.$el = el;
      var updataComponent = function updataComponent() {
        // 需要调用生成的render函数获取到虚拟节点 -》 生成真实的dom
        vm._update(vm._render());
      };
      new Watcher(vm, updataComponent, true);
      //如果稍后数据变化，也调用这个函数重新执行
      // 观察者模式
    }

    function callHook(vm, hook) {
      // 调用钩子函数
      var handlers = vm.$options[hook];
      if (handlers) {
        handlers.forEach(function (handler) {
          handler.call(vm);
        });
      }
    }

    /*
     * @Author: 小唐 476072478@qq.com
     * @Date: 2023-03-03 09:58:34
     * @LastEditors: 小唐 476072478@qq.com
     * @LastEditTime: 2023-04-18 16:10:58
     * @FilePath: \Vue2源码编写\src\init.js
     * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
     */
    function initMixin(Vue) {
      Vue.prototype._init = function (options) {
        // 用于初始化操作
        var vm = this;
        vm.$options = mergeOptions(this.constructor.options, options); // 将用户的选项挂载到实例上

        callHook(vm, 'beforeCreate');
        // 初始化状态，初始化计算属性，watcher
        initState(vm);
        callHook(vm, 'created');
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
          // 先查找有没有render函数
          var template;
          if (!ops.template && el) {
            // 如果没有render函数有el
            template = el.outerHTML;
          } else {
            // 写了templat，就用写了的template
            template = ops.template;
          }
          if (template) {
            // 这里需要对模板进行编译
            var render = compileToFunction(template);
            ops.render = render;
          }
        }
        // 将实例挂载到el上
        mountComponent(vm, el);
      };
    }

    function Vue(options) {
      this._init(options);
    }
    initStateMixin(Vue);
    initMixin(Vue); // 扩展了init方法
    lifeCycleMixin(Vue);
    initGlobalAPI(Vue);

    return Vue;

}));
//# sourceMappingURL=vue.js.map
