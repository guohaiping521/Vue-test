//发布订阅模式
var Event = (function () {
    var clientList = {},
        trigger,
        listen,
        remove;
    listen = function (key, fn) {
        if (!this.clientList[key]) {
            this.clientList[key] = []
        }
        this.clientList[key].push(fn);
    };
    trigger = function () {
        var key = Array.prototype.shift.call(arguments);
        fns = this.clientList[key];
        if (!fns || fns.length === 0) {
            return false;
        }
        for (var i = 0, fn; fn = fns[i++];) {
            fn.apply(this, arguments);
        }
    };
    remove = function (key, fn) {
        var fns = this.clientList[key];
        if (!fn) { // 如果没有传入具体的回调函数，表示需要取消 key 对应消息的所有订阅
            fns && (fns.length = 0);
        } else {
            for (var l = fns.length - 1; l >= 0; l--) { // 反向遍历订阅的回调函数列表
                var _fn = fns[l];
                if (_fn === fn) {
                    fns.splice(l, 1); // 删除订阅者的回调函数
                }
            }
        }
    }
    return {
        listen,
        trigger,
        remove
    }
})();
Event.listen('squareMeter88', fn1 = function (price) { // 小明订阅 88 平方米房子的消息
    console.log('价格= ' + price); // 输出： 2000000
})
Event.remove('squareMeter88');
Event.trigger('squareMeter88', 2000000); // 发布 88 平方米房子的价格


