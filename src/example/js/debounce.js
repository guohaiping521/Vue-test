var count = 0
var container = document.getElementById('container');
let setUseAction = debounce(getUserAction, 1000);
function getUserAction(e) {
    console.log("count==", count);
    count++;
    container.innerHTML = count;
    return count;
};

container.onmousemove = setUseAction;

function debounce(fn, timeout) {
    let timeOut;
    return function () {
        let args = arguments;
        let _this = this;
        clearTimeout(timeOut);
        timeOut = setTimeout(() => {
            fn.apply(_this.args)
        }, timeout);
    }
}

