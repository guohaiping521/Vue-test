(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('.')) :
  typeof define === 'function' && define.amd ? define(['.'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Vue = factory());
}(this, (function () { 'use strict';

  function _typeof(obj) {
    "@babel/helpers - typeof";

    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function (obj) {
        return typeof obj;
      };
    } else {
      _typeof = function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
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
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);

    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      if (enumerableOnly) symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
      keys.push.apply(keys, symbols);
    }

    return keys;
  }

  function _objectSpread2(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};

      if (i % 2) {
        ownKeys(Object(source), true).forEach(function (key) {
          _defineProperty(target, key, source[key]);
        });
      } else if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
      } else {
        ownKeys(Object(source)).forEach(function (key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
      }
    }

    return target;
  }

  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
  }

  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }

  function _iterableToArrayLimit(arr, i) {
    if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"] != null) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
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

  var hasProto = ("__proto__" in {});

  function def(obj, key, value) {
    Object.defineProperty(obj, key, {
      enumerable: false,
      configurable: false,
      value: value
    });
  }

  function isObject(data) {
    return _typeof(data) === "object" && data !== null;
  }
  function proxy(vm, sourse, key) {
    Object.defineProperty(vm, key, {
      get: function get() {
        return vm[sourse][key];
      },
      set: function set(newVal) {
        vm["_data"][key] = newVal;
      }
    });
  }
  var strats = Object.create(null);
  var LIFECYCLE_HOOKS = ["beforeCreate", "created", "beforeMount", "mounted", "beforeUpdate", "updated", "beforeDestroy", "destroyed", "activated", "deactivated", "errorCaptured", "serverPrefetch"];
  LIFECYCLE_HOOKS.forEach(function (hook) {
    strats[hook] = mergeHook;
  });

  function mergeHook(parentVal, childVal) {
    if (childVal) {
      if (parentVal) {
        return parentVal.concat(childVal);
      } else {
        if (Array.isArray(childVal)) {
          return childVal;
        } else {
          return [childVal];
        }
      }
    } else {
      return parentVal;
    }
  }

  function mergeOptions(parent, child) {
    var options = {};

    for (var key in parent) {
      mergeField(key);
    }

    for (var _key in child) {
      if (!parent.hasOwnProperty(_key)) {
        mergeField(_key);
      }
    }

    function mergeField(key) {
      if (strats[key]) {
        options[key] = strats[key](parent[key], child[key]);
        return;
      }

      if (_typeof(parent[key]) === "object" && _typeof(child[key]) === "object") {
        options[key] = _objectSpread2(_objectSpread2({}, parent[key]), child[key]);
      } else if (child[key] == null) {
        options[key] = parent[key];
      } else {
        options[key] = child[key];
      }
    }

    return options;
  }

  //value.__proto__=arrayMethods; 原型链向上查找，找不到再往上
  //arrayMethods.__proto__=arrayProto
  //Object.create(proto, [propertiesObject])
  var arrayProto = Array.prototype;
  var arrayMethods = Object.create(arrayProto);
  var methodsToPatch = ["push", //向数组的末尾添加一个或更多元素，并返回新的长度
  "pop", //删除并返回数组的最后一个元素
  "shift", //删除并返回数组的第一个元素
  "unshift", //向数组的开头添加一个或更多元素，并返回新的长度。
  "splice", //删除元素，并向数组添加新元素。(2,3,"value"  从第二个开始删除3个，第2个之后添加value)
  "sort", //对数组的元素进行排序
  "reverse" //颠倒数组中元素的顺序。
  ];
  methodsToPatch.forEach(function (method) {
    arrayMethods[method] = function () {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      arrayProto[method].apply(this, args);
      var ob = this.__ob__;
      var inserted;

      switch (method) {
        case "push":
        case "unshift":
          inserted = args;
          break;

        case "splice":
          inserted = args.slice(2);
          break;
      }

      if (inserted) {
        ob.observeArray(inserted);
      }
    };
  });

  var uid = 0;

  var Dep = /*#__PURE__*/function () {
    function Dep() {
      _classCallCheck(this, Dep);

      this.id = uid++;
      this.subs = [];
    }

    _createClass(Dep, [{
      key: "depend",
      value: function depend() {
        this.subs.push(Dep.target);
      }
    }, {
      key: "notify",
      value: function notify() {
        console.log(this.subs);
        this.subs.forEach(function (sub) {
          sub.update();
        });
      }
    }]);

    return Dep;
  }();
  Dep.target = null;
  var targerStack = [];
  function pushTarget(target) {
    Dep.target = target;
    targerStack.push(target);
  }
  function popTarget() {
    targerStack.pop();
    console.log("targerStack", targerStack);
    Dep.target = targerStack[targerStack.length - 1];
  }

  function observe(data) {
    var isObj = isObject(data);

    if (!isObj) {
      return;
    }

    return new Observer(data);
  }
  var Observer = /*#__PURE__*/function () {
    function Observer(value) {
      _classCallCheck(this, Observer);

      //如果是数组并不会对索引进行观测，会导致消耗过大，性能问题
      //前端开发很少操作索引,如果对象里放置的对象进行监控
      //对数组的对象进行劫持、对操作数组的方法进行重写（push shift unshift）
      def(value, "__ob__", this);

      if (Array.isArray(value)) {
        if (hasProto) {
          protoAugment(value, arrayMethods);
        } else {
          console.log("no hasProto");
        }

        this.observeArray(value);
      } else {
        this.walk(value);
      }
    } //遍历数组


    _createClass(Observer, [{
      key: "observeArray",
      value: function observeArray(items) {
        for (var i = 0; i < items.length; i++) {
          observe(items[i]);
        }
      } //遍历对象

    }, {
      key: "walk",
      value: function walk(value) {
        var keys = Object.keys(value);
        keys.forEach(function (key) {
          defineReactive(value, key);
        });
      }
    }]);

    return Observer;
  }();
  function protoAugment(value, src) {
    value.__proto__ = src;
  }
  function defineReactive(obj, key, val) {
    var dep = new Dep();
    var property = Object.getOwnPropertyDescriptor(obj, key);
    var getter = property && property.get;
    var setter = property && property.set;

    if ((!getter || setter) && arguments.length === 2) {
      val = obj[key];
    }

    observe(val);
    Object.defineProperty(obj, key, {
      enumerable: true,
      configurable: true,
      get: function get() {
        if (Dep.target) {
          dep.depend();
        }

        var value = getter ? getter.call(obj) : val;
        return value;
      },
      set: function set(newVal) {
        var value = getter ? getter.call(obj) : val;

        if (newVal === value) {
          return;
        }

        val = setter ? setter.call(obj, newVal) : newVal;
        observe(newVal);
        dep.notify();
      }
    });
  }

  function initState(vm) {
    var opts = vm.$options; //数据来源 属性 方法 数据  计算属性 watch

    if (opts.props) {
      initProps(vm, opts.props);
    }

    if (opts.methods) {
      initMethods(vm, opts.props);
    }

    if (opts.data) {
      initData(vm);
    }

    if (opts.computed) initComputed(vm, opts.computed);

    if (opts.watch) {
      initWatch(vm, opts.watch);
    }
  }

  function initProps(vm, propsOptions) {}

  function initMethods(vm, methods) {}

  function initData(vm) {
    var data = vm.$options.data;
    data = vm._data = typeof data === "function" ? data.call(vm) : data;

    for (var key in vm._data) {
      proxy(vm, "_data", key);
    } //mvvm模式:数据变化驱动视图变化


    observe(data);
  }

  function initComputed(vm, computed) {}

  function initWatch(vm, watch) {}

  var unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;
  var attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/;
  var ncname = "[a-zA-Z_][\\-\\.0-9_a-zA-Z".concat(unicodeRegExp.source, "]*");
  var qnameCapture = "((?:".concat(ncname, "\\:)?").concat(ncname, ")");
  var startTagOpen = new RegExp("^<".concat(qnameCapture));
  var startTagClose = /^\s*(\/?)>/;
  var endTag = new RegExp("^<\\/".concat(qnameCapture, "[^>]*>"));
  var whitespaceRE = /\s+/g;
  var ELEMENT_TYPE = 1;
  var TEXT_TYPE = 3;
  var currentParent,
      root,
      stack = [];
  function parseHTML(html) {
    //indexOf :可返回某个指定的字符串值在字符串中首次出现的位置
    while (html) {
      var text = void 0;
      var textEnd = html.indexOf("<");

      if (textEnd === 0) {
        var startTagMatch = parseStartTag();

        if (startTagMatch) {
          start(startTagMatch.tagName, startTagMatch.attrs);
          continue;
        }

        var endTagMathch = html.match(endTag);

        if (endTagMathch) {
          advance(endTagMathch[0].length);
          end(endTagMathch[1]);
          continue;
        }
      } else if (textEnd > 0) {
        text = html.substring(0, textEnd);

        if (text) {
          advance(text.length);
          chars(text);
        }
      }
    }

    function advance(n) {
      html = html.substring(n);
    }

    function parseStartTag() {
      var start = html.match(startTagOpen);

      if (start) {
        var match = {
          tagName: start[1],
          attrs: []
        };
        advance(start[0].length);

        var _end, attr;

        while (!(_end = html.match(startTagClose)) && (attr = html.match(attribute))) {
          advance(attr[0].length);
          match.attrs.push({
            name: attr[1],
            value: attr[3] || attr[4] || attr[5]
          });
        }

        if (_end) {
          advance(_end[0].length);
          return match;
        }
      }
    }

    return root;
  }

  function start(tagName, attrs) {
    var element = createASTElement(tagName, attrs);

    if (!root) {
      root = element;
    }

    currentParent = element;
    stack.push(element);
  } //标签  属性  父亲


  function createASTElement(tag, attrs, parent) {
    return {
      tag: tag,
      type: ELEMENT_TYPE,
      children: [],
      attrs: attrs,
      parent: null
    };
  }

  function chars(text) {
    text = text.replace(whitespaceRE, "");

    if (text) {
      var child = {
        text: text,
        type: TEXT_TYPE
      };
      currentParent.children.push(child);
    }
  }

  function end(tagName) {
    var element = stack.pop();

    if (element.tag === tagName) {
      currentParent = stack[stack.length - 1];

      if (currentParent) {
        element.parent = currentParent;
        currentParent.children.push(element);
      }
    }
  }

  //找到{{abc}}这样的.+的意义是最小匹配, 找到符合的马上结束
  var defaultTagRE = /\{\{((?:.|\r?\n)+?)\}\}/g;
  function generate(el) {
    var children = getChildren(el);
    var code = "_c(\"".concat(el.tag, "\",").concat(el.attrs.length ? genProps(el.attrs) : "undefined", ",").concat(children ? children : "", ")");
    return code;
  }

  function getChildren(el) {
    var children = el.children;

    if (children && children.length > 0) {
      return "".concat(children.map(function (c) {
        return gen(c);
      }));
    } else {
      return false;
    }
  }

  function gen(child) {
    //元素标签
    if (child.type === 1) {
      return generate(child);
    } else {
      var text = child.text;
      var tokens = [];
      var lastIndex = defaultTagRE.lastIndex = 0;
      var match, index;

      while (match = defaultTagRE.exec(text)) {
        index = match.index;

        if (index > lastIndex) {
          tokens.push(JSON.stringify(text.slice(lastIndex, index)));
        }

        tokens.push("_s(".concat(match[1].trim(), ")"));
        lastIndex = index + match[0].length;
      }

      if (lastIndex < text.length) {
        tokens.push(JSON.stringify(text.slice(lastIndex)));
      }

      return "_v(".concat(tokens.join("+"), ")");
    }
  }

  function genProps(attrs) {
    var str = "";

    for (var index = 0; index < attrs.length; index++) {
      var attr = attrs[index];

      if (attr.name === "style") {
        (function () {
          var obj = {};
          attr.value.split(";").forEach(function (element) {
            var _element$split = element.split(":"),
                _element$split2 = _slicedToArray(_element$split, 2),
                key = _element$split2[0],
                value = _element$split2[1];

            obj[key] = value;
          });
          attr.value = obj;
        })();
      }

      str += "".concat(attr.name, ":").concat(JSON.stringify(attr.value), ",");
    }

    return "{".concat(str.slice(0, -1), "}");
  }

  //ast 语法树  是用对象来描述原生语法  虚拟dom用对象来描述dom节点
  function compileToFunctions(template) {
    //解析html字符串，将html字符串=>ast语法树
    var root = parseHTML(template);
    var code = generate(root); //所有模板引擎的实现都需要new Function +with

    var renderFn = new Function("with(this){ return ".concat(code, "}")); //ast语法树转为render函数，字符串拼接（模板引擎）
    //ast转为js的语法

    return renderFn;
  }

  var uid$1 = 0;

  var Watcher = /*#__PURE__*/function () {
    function Watcher(vm, exprOrFn, callback, optioins) {
      _classCallCheck(this, Watcher);

      this.id = ++uid$1; // uid for batching

      this.vm = vm;
      this.callback = callback;
      this.optioins = optioins;
      this.getter = exprOrFn;
      this.get();
    }

    _createClass(Watcher, [{
      key: "get",
      value: function get() {
        pushTarget(this);
        this.getter();
        popTarget();
      }
    }, {
      key: "addDep",
      value: function addDep() {}
    }, {
      key: "update",
      value: function update() {
        this.get();
      }
    }]);

    return Watcher;
  }();

  function patch(oldVnode, vnode) {
    //元素节点 nodeType 1   属性节点 nodeType 2
    var isRealElement = oldVnode.nodeType;

    if (isRealElement) {
      var oldElm = oldVnode;
      var parentElm = oldElm.parentNode;
      var el = createElm(vnode);
      parentElm.insertBefore(el, oldElm.nextSibling);
      parentElm.removeChild(oldElm);
      return el;
    }
  }

  function createElm(vnode) {
    var tag = vnode.tag,
        children = vnode.children,
        text = vnode.text;

    if (typeof tag === "string") {
      vnode.el = document.createElement(tag);
      updateProperties(vnode);
      children.forEach(function (child) {
        vnode.el.appendChild(createElm(child));
      });
    } else {
      vnode.el = document.createTextNode(text);
    }

    return vnode.el;
  }

  function updateProperties(vnode) {
    var newProps = vnode.data || {};
    var el = vnode.el;

    for (var key in newProps) {
      if (key === "style") {
        for (var styleName in newProps.style) {
          el.style[styleName.trim()] = newProps.style[styleName];
        }
      } else if (key === "class") {
        el.className = newProps["class"];
      } else {
        el.setAttribute(key, newProps[key]);
      }
    }
  }

  function lifecycleMixin(Vue) {
    Vue.prototype._update = function (vnode) {
      var vm = this;
      vm.$el = patch(vm.$el, vnode); //用虚拟节点创建出真实节点，替换掉真实的el节点
    };
  }
  function mountComponent(vm, el) {
    vm.$el = el;
    callHook(vm, "beforeMount"); //渲染页面

    var updateComponent = function updateComponent() {
      //vm._render()通过render方法返回虚拟dom，然后进行更新
      vm._update(vm._render());
    }; //渲染watcher，视图变化，渲染更新  true代表他是一个渲染的Watcher


    new Watcher(vm, updateComponent, function () {}, true);
    callHook(vm, "mounted");
  }
  function callHook(vm, hook) {
    var handers = vm.$options[hook];

    if (handers) {
      handers.forEach(function (option) {
        option.call(vm);
      });
    }
  }

  function initMixin(Vue) {
    Vue.prototype._init = function (options) {
      var vm = this;
      vm.$options = mergeOptions(vm.constructor.options, options);
      callHook(vm, "beforeCreate"); //初始化状态

      initState(vm);
      callHook(vm, "created");

      if (vm.$options.el) {
        vm.$mount(vm.$options.el);
      }
    };

    Vue.prototype.$mount = function (el) {
      var vm = this;
      var options = vm.$options;
      el = document.querySelector(el);

      if (!options.render) {
        var template = options.template;

        if (!template && el) {
          template = el.outerHTML;
        } //template转换为render方法


        var render = compileToFunctions(template);
        options.render = render;
      }

      mountComponent(vm, el);
    };
  }

  var VNode = function VNode(tag, data, children, text) {
    _classCallCheck(this, VNode);

    this.tag = tag;
    this.data = data;
    this.children = children;
    this.text = text;
  };
  function createTextVNode(val) {
    return new VNode(undefined, undefined, undefined, val);
  }

  function createElement(tag) {
    var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    for (var _len = arguments.length, children = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      children[_key - 2] = arguments[_key];
    }

    return new VNode(tag, data, children, undefined);
  }

  function renderMixin(Vue) {
    //创建元素虚拟节点
    Vue.prototype._c = function () {
      return createElement.apply(void 0, arguments);
    }; //创建文本的虚拟节点


    Vue.prototype._v = function (val) {
      return createTextVNode(val);
    }; //JSON.stringify


    Vue.prototype._s = function (val) {
      return val == null ? "" : _typeof(val) === "object" ? JSON.stringify(val) : val;
    };

    Vue.prototype._render = function () {
      var vm = this;
      var render = vm.$options.render;
      return render.call(vm);
    };
  }

  function initGlobalAPI(Vue) {
    Vue.options = {};

    Vue.mixin = function (mixin) {
      //实现对象合并
      this.options = mergeOptions(this.options, mixin);
    };

    Vue.mixin({
      a: 1,
      beforeCreate: function beforeCreate() {}
    });
    Vue.mixin({
      b: 2,
      beforeCreate: function beforeCreate() {}
    });
  }

  function Vue(options) {
    this._init(options);
  }

  initMixin(Vue);
  lifecycleMixin(Vue);
  renderMixin(Vue);
  initGlobalAPI(Vue);
  //重新生成虚拟dom-->更新dom

  return Vue;

})));
//# sourceMappingURL=vue.js.map
