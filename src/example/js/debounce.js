var count = 0
var container = document.getElementById('container');
var button = document.getElementById('button');
button.addEventListener('click', function () {
    setUseAction.cancel();
})
let setUseAction = debounce(getUserAction, 10000, true);
function getUserAction(e) {
    console.log("count==", count);
    count++;
    container.innerHTML = count;
    return count;
};

container.onmousemove = setUseAction;
//立刻执行函数，等到停止触发n秒后，再次执行
function debounce(fn, timeout, immediate) {
    let timer;
    let result;
    let debounced = function () {
        let context = this;
        let args = arguments;
        if (timer) clearTimeout(timer);
        if (immediate) {
            let callNow = !timer;
            timer = setTimeout(() => {
                timer = null
            }, timeout);
            if (callNow) {
                result = fn.apply(context, args)
            }
        } else {
            timer = setTimeout(() => {
                fn.apply(context, args)
            }, timeout);
        }
        console.log("result===", result);
        return result;
    };
    debounced.cancel = function () {
        clearTimeout(timer);
        timer = null;
    }
    return debounced;
}