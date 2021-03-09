var count = 0
var container = document.getElementById('container');

function getUserAction(e) {
    count++;
    container.innerHTML = count;
    return count;
};

container.onmousemove = throttle(getUserAction, 1000);

// function throttle(fn, delay) {
//     let previous = 0
//     return function () {
//         let now = new Date().getTime();
//         let context = this;
//         let args = arguments;
//         if (now - previous > delay) {
//             previous = now;
//             fn.apply(context, args);
//         }
//     }
// }

function throttle(func, wait) {
    let timeout;
    let previous = 0;

    return function () {
        context = this;
        args = arguments;
        timeout = setTimeout(() => {
            timeout = null;
            fn.apply(context, args);
        }, wait);
    }
}



function getUpadte() {
    let a=1;
    if(a==1){
        console.log("1111111");
        return;
    }
    console.log(1111111111111);  
}

getUpadte();
