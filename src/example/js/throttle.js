var count = 0
var container = document.getElementById('container');

function getUserAction(e) {
    count++;
    container.innerHTML = count;
    console.log("count==", count);
    return count;
};

container.onmousemove = throttle(getUserAction, 1000);

// function throttle(fn, timeOut) {
//     let pre = 0
//     return function () {
//         let _this = this;
//         let args = arguments
//         let now = new Date().getTime();
//         if (now - pre > timeOut) {
//             pre = now
//             fn.apply(_this, args);
//         }
//     }
// }


function throttle(fn, timeOut) {
    let timer;
    return function () {
        let _this = this;
        let args = arguments
        if (!timer) {
            timer = setTimeout(() => {
                timer = null;
                fn.apply(_this, args);
            }, timeOut);
        }
    }
}

