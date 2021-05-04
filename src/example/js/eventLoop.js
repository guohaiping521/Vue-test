//test 1
console.log('global')

for (var i = 1; i <= 5; i++) {
    setTimeout(function () {
        console.log(i)
    }, i * 1000)
    console.log(i)
}

new Promise(function (resolve) {
    console.log('promise1')
    resolve()
}).then(function () {
    console.log('then1')
})

setTimeout(function () {
    console.log('timeout2')
    new Promise(function (resolve) {
        console.log('timeout2_promise')
        resolve()
    }).then(function () {
        console.log('timeout2_then')
    })
}, 2000)

//global
//1 2 3 4 5
//promise1
//then1
//6 6
//timeout2
//timeout2_promise
//timeout2_then
//666


//test 2
console.log('script start')
async function async1() {
    await async2()
    console.log('async1 end')
}
async function async2() {
    console.log('async2 end')
}
async1();
setTimeout(function () {
    console.log('setTimeout')
}, 0)
new Promise(resolve => {
    console.log('Promise')
    resolve()
})
    .then(function () {
        console.log('promise1')
    })
    .then(function () {
        console.log('promise2')
    })

console.log('script end')

//script start
//async2 end
//Promise
//script end
//async1 end
//promise1
//promise2
//setTimeout

//test 3
console.log('script start')

async function async1() {
    await async2()
    console.log('async1 end')
}
async function async2() {
    console.log('async2 end')
    return Promise.resolve().then(() => {
        console.log('async2 end1')
    })
}
async1()
setTimeout(function () {
    console.log('setTimeout')
}, 0)

new Promise(resolve => {
    console.log('Promise')
    resolve()
})
    .then(function () {
        console.log('promise1')
    })
    .then(function () {
        console.log('promise2')
    })

console.log('script end')



//script start
//async2 end
//Promise
//script end
//async2 end1
//promise1
//promise2
//async1 end
//setTimeout


