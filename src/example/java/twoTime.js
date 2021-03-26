const once = (fn) => {
    console.log();
    let done = 0;
    return function () {
        if (done < 2) {
            fn.apply(this, fn)
        } else {
            console.log("不执行了");
        }
        done++
    }
}
let fun = once(() => {
    console.log("111");
});
fun();
fun();
fun();
fun();
fun();
fun();