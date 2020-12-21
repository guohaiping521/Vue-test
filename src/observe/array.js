//value.__proto__=arrayMethods; 原型链向上查找，找不到再往上
//arrayMethods.__proto__=arrayProto
//Object.create(proto, [propertiesObject])
const arrayProto = Array.prototype;
export const arrayMethods = Object.create(arrayProto);
const methodsToPatch = [
  "push", //向数组的末尾添加一个或更多元素，并返回新的长度
  "pop", //删除并返回数组的最后一个元素
  "shift", //删除并返回数组的第一个元素
  "unshift", //向数组的开头添加一个或更多元素，并返回新的长度。
  "splice", //删除元素，并向数组添加新元素。(2,3,"value"  从第二个开始删除3个，第2个之后添加value)
  "sort", //对数组的元素进行排序
  "reverse", //颠倒数组中元素的顺序。
];
methodsToPatch.forEach((method) => {
  arrayMethods[method] = function (...args) {
    const result = arrayProto[method].apply(this, args);
    const ob = this.__ob__;
    let inserted;
    switch (method) {
      case "push":
      case "unshift":
        inserted = args;
        break;
      case "splice":
        inserted = args.slice(2);
        break;
      default:
        break;
    }
    if (inserted) {
      ob.observeArray(inserted);
    }
    ob.dep.notify();
    return result;
  };
});
