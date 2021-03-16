var Plane = function () { }
Plane.prototype.fire = function () {
    console.log('发射普通子弹');
}
let MissileDecorator = function (plane) {
    this.plane = plane;
}
MissileDecorator.prototype.fire = function () {
    this.plane.fire();
    console.log('发射导弹');
}

var AtomDecorator = function (plane) {
    this.plane = plane;
}
AtomDecorator.prototype.fire = function () {
    this.plane.fire();
    console.log('发射原子弹');
}
let plane = new Plane();
plane = new MissileDecorator(plane);
plane = new AtomDecorator(plane);
plane.fire();
console.log(plane);
////////////////////////////
var plane = {
    fire: function () {
        console.log('发射普通子弹');
    }
}
var missileDecorator = function () {
    console.log('发射导弹');
}
var atomDecorator = function () {
    console.log('发射原子弹');
}
var fire1 = plane.fire;
plane.fire = function () {
    fire1();
    missileDecorator();
}
var fire2 = plane.fire;
plane.fire = function () {
    fire2();
    atomDecorator();
}
plane.fire();

window.onload = function () {
    console.log("onload");
}
let _onload = window.onload
window.onload = function () {
    _onload();
    console.log("重写了");
}


Function.prototype.before = function name(beforefn) {
    var __self = this;
    return function () {
        beforefn.apply(this, arguments);
        return __self.apply(this, arguments);
    }
}

Function.prototype.after = function (afterfn) {
    var __self = this;
    return function () {
        var ret = __self.apply(this, arguments);
        afterfn.apply(this, arguments);
        return ret;
    }
};

window.onload = function () {
    alert(1);
}
window.onload = (window.onload || function () { }).after(function () {
    alert(2);
}).after(function () {
    alert(3);
}).after(function () {
    alert(4);
});