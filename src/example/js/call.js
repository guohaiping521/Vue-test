Function.prototype.callOne = function (context, ...args) {
    context.fn = this || window
    let result = eval('context.fn(...args)');
    delete context.fn
    return result;
}
Function.prototype.applyOne = function (context, args) {
    context.fn = this || window
    let result = eval('context.fn(...args)');
    delete context.fn
    return result;
}

Function.prototype.bindOne = function (context, ...args) {
    if (typeof this !== "function") {
        throw new Error("报错");
    }
    let self = this
    let bound = function (...ar) {
        //Object [global] {  this
        //self  :
        // function bar(name, age) {
        //     this.habit = "habit";
        //     console.log("bar start");
        //     console.log(this.value);
        //     console.log("bar end");
        //     return "返回值"
        // }
        console.log("this===", this);
        console.log("this instanceof self==", this instanceof self);
        self.applyOne(this instanceof self ? this : context, args.concat(ar));
    }
    if (self.prototype) {
        bound.prototype = Object.create(self.prototype);
    }
    return bound;
}

var value = "window"
var foo = {
    value: "foo",
}
function bar(name, age) {
    this.habit = "habit";
    return "返回值"
}
bar.prototype.friend = "friend"
let fn = bar.bindOne(foo, "name");
let object = new fn();
fn.prototype.end = "end"
console.log(bar.prototype.end);





function newObject={

}






// function instanceOf(obj, constructor) {
//     if (typeof constructor !== 'function') {
//         throw new TypeError(`Right-hand side of 'instanceof' is not callable`);
//     }
//     console.log("success");
// }

// function myInstanceof(left, right) {
//     // 这里先用typeof来判断基础数据类型，如果是，直接返回false
//     if (typeof left !== 'object' || left === null) return false;
//     // getProtypeOf是Object对象自带的API，能够拿到参数的原型对象
//     let proto = Object.getPrototypeOf(left);

//     while (true) {                  //循环往下寻找，直到找到相同的原型对象
//         if (proto === null) return false;

//         if (proto === right.prototype) return true;//找到相同原型对象，返回true
//         proto = Object.getPrototypeOf(proto);

//     }
// }




// Function.prototype.bind = function (context, ...args) {
//     var self = this;
//     var fbound = function () {
//         self.apply(this instanceof self ? this : context, args.concat(Array.prototype.slice.call(arguments)));
//     }
//     if (this.prototype) {
//         fbound.prototype = Object.create(this.prototype);
//     }
//     return fbound;
// }
