function A(name) {
    this.name = name;
}
A.prototype.getName = function () {
    console.log(this.name);
}
function B(name) {
    A.call(this)
}
B.prototype = Object.create(A.prototype);
B.prototype.constructor = B;
let b = new B("ghp");
console.log(b.name);
console.log(b.getName());