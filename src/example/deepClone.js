const isComplexData = (value) => {
    return typeof value === "object" && value != null
}
const deepClone = (obj, hash = new WeakMap()) => {
    if (Object.prototype.toString.call(obj) === "[object Date]") {
        return new Date(obj);
    }
    if (Object.prototype.toString.call(obj) === "[object RegExp]") {
        return new RegExp(obj);
    }
    if (hash.has(obj)) {
        return hash.get(obj)
    }
    let allDesc = Object.getOwnPropertyDescriptors(obj);
    let cloneTarget = Object.create(Object.getPrototypeOf(obj), allDesc);
    hash.set(obj, cloneTarget)
    for (const iterator of Reflect.ownKeys(obj)) {
        cloneTarget[iterator] = isComplexData(obj[iterator]) ? deepClone(obj[iterator], hash) : obj[iterator]
    }
    return cloneTarget;
}
var myDate = new Date();
var newValue = new object();
function object() {
    this.nam = "ghp";
    this.age = myDate;
    this.getName = newValue;
    this.arrayList = [1, 2, 3, 4]
}
let value = new object();
Object.defineProperty(value, "nonumerable", {
    enumerable: false,
    value: "不可枚举"
})
// Proxy  Vue3
console.log(deepClone(value));
