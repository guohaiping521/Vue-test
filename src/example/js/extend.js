//原型链：共享一块内存空间，都影响
function Parent() {
    this.name = "名字";
    this.play = [1, 2, 3]
}
function Child() {
    this.grader = "成绩";
}
Child.prototype = new Parent();
let child1 = new Child();
let child2 = new Child();
child1.play.push(4);

console.log(child1.play);
console.log(child2.play);
//构造函数-----------------------------
function Parent() {
    this.name = "名字";
    this.play = [1, 2, 3]
}
function Child() {
    Parent.call(this);
    this.grader = "成绩";
}
let child1 = new Child();
let child2 = new Child();
child1.play.push(4);

console.log(child1.play);
console.log(child2.play);

//组合继承-------调用两次Parent，消耗内存----------------------
function Parent() {
    this.name = "名字";
    this.play = [1, 2, 3]
}
Parent.prototype.getPlay = function () {
    return this.name
}
Child.prototype = new Parent();
function Child() {
    Parent.call(this);
    this.grader = "成绩";
}
Child.prototype.constructor = Child;
let child1 = new Child();
let child2 = new Child();
child1.play.push(4);
console.log(child2.play);
//寄生式继承-----多个实例的引用类型属性指向相同的内存------------------------
let obj = {
    name: "name",
    age: [1, 2, 3, 4]
}
let cloneTarget = Object.create(obj);
cloneTarget.getAge = function () {
    return this.age
}
cloneTarget.age.push(4)
let cloneTarget1 = Object.create(cloneTarget);
console.log(cloneTarget1.age);
console.log(cloneTarget1.getAge());

//寄生式组合继承------------------------
function Parent() {
    this.name = "名字";
    this.play = [1, 2, 3]
}
function Child() {
    Parent.call(this);
    this.age = 10
}
Child.prototype = Object.create(Parent.prototype);
Child.prototype.constructor = Child;

let child = new Child();
console.log(child);
//es6继承------------------------
class Parent {
    constructor(name) {
        this.name = name
    }
}
class Child extends Parent {
    constructor(name) {
        super(name);
        this.play = [1, 2, 3]
    }
}
let child = new Child("11");
console.log(child);


//-------------习题-----------
function A(name) {
    this.name = name;
}
A.prototype.getName = function () {
    console.log(this.name);
}
function B(name) {
    A.call(this, name)
}
B.prototype = Object.create(A.prototype);
B.prototype.constructor = B;
let b = new B("ghp");
console.log(b.name);
console.log(b.getName());


