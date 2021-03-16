//模板方法模式
let Beverage = function (param) {
    let boilWater = function () {
        console.log('把水煮沸');
    };
    let brew = param.brew || function () {
        throw new Error('必须传递 brew 方法');
    };
    var pourInCup = param.pourInCup || function () {
        throw new Error('必须传递 pourInCup 方法');
    };
    var addCondiments = param.addCondiments || function () {
        throw new Error('必须传递 addCondiments 方法');
    };
    var F = function () { };
    F.prototype.init = function () {
        boilWater();
        brew();
        pourInCup();
        addCondiments();
    };
    return F;
};
let Coffee = new Beverage({
    brew: function () {
        console.log('用沸水冲泡咖啡');
    },
    pourInCup: function () {
        console.log('把咖啡倒进杯子');
    },
    addCondiments: function () {
        console.log('加糖和牛奶');
    }
})
let coffee = new Coffee();
coffee.init();