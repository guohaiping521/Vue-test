var fps_compatibility = function () {
    return (
        window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        function (callback) {
            window.setTimeout(callback, 1000 / 60);
        }
    );
}();

var fps_config = {
    lastTime: performance.now(),
    lastFameTime: performance.now(),
    frame: 0
}

var fps_loop = function () {
    var _first = performance.now();
    console.log();
    let _diff = (_first - fps_config.lastFameTime);
    fps_config.lastFameTime = _first;
    var fps = Math.round(1000 / _diff);
    fps_config.frame++;
    if (_first > 1000 + fps_config.lastTime) {
        var fps = Math.round((fps_config.frame * 1000) / (_first - fps_config.lastTime));
        console.log(`time: ${new Date()} fps is：`, fps);
        fps_config.frame = 0;
        fps_config.lastTime = _first;
    };
    fps_compatibility(fps_loop);
}
fps_loop();
function isBlocking(fpsList, below = 20, last = 3) {
    var count = 0
    for (var i = 0; i < fpsList.length; i++) {
        if (fpsList[i] && fpsList[i] < below) {
            count++;
        } else {
            count = 0
        }
        if (count >= last) {
            return true
        }
    }
    return false
}



function doFunc() {
    var arrs = [];
    for (var i = 0; i < 1000000; i++) {
        arrs.push({ 'label': i, 'value': i });
    }
    return arrs;
}
var t1 = window.performance.now();
console.log(t1);
doFunc();
var t2 = window.performance.now();
console.log(t2);
console.log('doFunc函数执行的时间为：' + (t2 - t1) + '毫秒');