//创建一个新对象
//把新对象的原型指向构造函数的原型
//执行构造函数的代码
//构造函数有返回值就返回，没有就返回新对象
function Parent(name) {
    this.name = name;
    this.play = [1, 2, 3]
}
function newObject(fn, ...args) {
    if (typeof fn !== 'function') {
        throw 'fn must be a function';
    }
    let object = Object.create(null);
    object._proto_ = fn.prototype;
    let result = fn.call(object, ...args);
    if (typeof result == 'object') return result;
    return object;
}
let object = newObject(Parent, "11");
console.log(object);



//call
Function.prototype.call = function (context, ...args) {
    var context = context || window;
    context.fn = this;
    var result = eval(context.fn(...args));
    delete context.fn
    return result;
}
function Parent(name) {
    this.name = name;
    this.play = [1, 2, 3]
}
function Child(name) {
    this.age = 111;
    Parent.call(this, 111);
}
let child = new Child();
console.log(child);



