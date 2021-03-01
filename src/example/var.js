function runStack(n) {
    if (n === 0) {
        console.log(100);
    }
    return setTimeout(() => {
        runStack(n - 2)
    }, 0);
}
runStack(10)






function bar() {
    console.log(myName)
}
function foo() {
    var myName = "极客邦"
    bar()
}
let myName = "极客时间"
foo()
