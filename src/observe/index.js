import { isObject, hasProto, def } from "../util/index.js";
import { arrayMethods } from "./array";
import Dep from "./dep";
export function observe(data) {
  let isObj = isObject(data);
  if (!isObj) {
    return;
  }
  return new Observer(data);
}
export class Observer {
  constructor(value) {
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
  }
  //遍历数组
  observeArray(items) {
    for (let i = 0; i < items.length; i++) {
      observe(items[i]);
    }
  }
  //遍历对象
  walk(value) {
    let keys = Object.keys(value);
    keys.forEach((key) => {
      defineReactive(value, key);
    });
  }
}

export function protoAugment(value, src) {
  value.__proto__ = src;
}

export function defineReactive(obj, key, val) {
  const dep = new Dep();
  const property = Object.getOwnPropertyDescriptor(obj, key);
  const getter = property && property.get;
  const setter = property && property.set;
  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key];
  }
  observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get() {
      if (Dep.target) {
        dep.depend();
      }
      const value = getter ? getter.call(obj) : val;
      return value;
    },
    set(newVal) {
      const value = getter ? getter.call(obj) : val;
      if (newVal === value) {
        return;
      }
      val = setter ? setter.call(obj, newVal) : newVal;
      observe(newVal);
      dep.notify();
    },
  });
}
