import { isObject, hasProto, def } from "../util/index.js";
import { arrayMethods } from "./array";

import Dep from "./dep.js";
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
    this.value = value;
    this.dep = new Dep();
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
  walk(data) {
    let keys = Object.keys(data);
    keys.forEach((key) => {
      defineReactive(data, key, data[key]);
    });
  }
}

export function set(target, key, val) {
  if (Array.isArray(target)) {
    target.splice(key, 1, val);
    return val;
  }
  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val;
  }
  const ob = target.__ob__;
  if (!ob) {
    target[key] = val;
    return val;
  }
  defineReactive(ob.value, key, val);
  ob.dep.notify();
  return val;
}

export function del(target, key) {
  //判断是否为数组
  if (Array.isArray(target)) {
    target.splice(key, 1);
    return;
  }
  //删除项是否存在于object
  if (!target.hasOwnProperty(key)) {
    return;
  } else {
    delete target[key];
  }
  //不是观测对象(直接return)，是的话进行notify
  const ob = target.__ob__;
  if (!ob) {
    return;
  } else {
    ob.dep.notify();
  }
}

export function protoAugment(value, src) {
  value.__proto__ = src;
}

export function defineReactive(obj, key, val) {
  const dep = new Dep();
  const property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return;
  }
  const getter = property && property.get;
  const setter = property && property.set;
  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key];
  }
  let childOb = observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get() {
      const value = getter ? getter.call(obj) : val;
      if (Dep.target) {
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value;
    },
    set(newVal) {
      console.log("newVal==", newVal);
      const value = getter ? getter.call(obj) : val;
      if (newVal === value) {
        return;
      }
      val = setter ? setter.call(obj, newVal) : newVal;
      observe(newVal);//设置的为对象
      dep.notify();
    },
  });
  function dependArray(array) {
    array.forEach((element) => {
      element && element.__ob__ && element.__ob__.dep.depend();
      if (Array.isArray(element)) {
        dependArray(element);
      }
    });
  }
}
