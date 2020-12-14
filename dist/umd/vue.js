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
      } // console.log("args", args);

    };
  });

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
        console.log("触发了get");
        var value = getter ? getter.call(obj) : val;
        return value;
      },
      set: function set(newVal) {
        var value = getter ? getter.call(obj) : val;

        if (newVal === value) {
          return;
        }

        val = setter ? setter.call(obj, newVal) : newVal; // console.log("newVal==", newVal);

        observe(newVal);
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
    data = vm._data = typeof data === "function" ? data.call(vm) : data; //mvvm模式:数据变化驱动视图变化

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
      console.log("root====", root);
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

  //ast 语法树  是用对象来描述原生语法  虚拟dom用对象来描述dom节点
  function compileToFunctions(template) {
    //解析html字符串，将html字符串=>ast语法树
    var root = parseHTML(template); //ast语法树转为render函数，字符串拼接（模板引擎）

    return function render() {};
  }

  function initMixin(Vue) {
    Vue.prototype._init = function (options) {
      var vm = this;
      vm.$options = options; //初始化状态

      initState(vm);

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
    };
  }

  function Vue(options) {
    this._init(options);
  }

  initMixin(Vue);

  return Vue;

})));
//# sourceMappingURL=vue.js.map
