// 特性  优缺点  内部如何实现
Promise.prototype.then = function (onResolved, onRejected) {
    let self = this
    if (this.status === "resolved") {
        return new Promise((resolve, reject) => {
            onResolved(this.data);
        })
    }
    if (this.status === "rejected") {
        return new Promise((resolve, reject) => {
            onRejected(this.data);
        })
    }
    if (self.status === 'pending') {
        return new Promise(function (resolve, reject) {
            self.onResolvedCallback.push(() => {
                onResolved(self.data);
            });
            self.onRejectedCallback.push(() => {
                onRejected(self.data);
            });
        })
    }
}
Promise.all = function (array) {
    return new Promise((resolve, reject) => {
        let allCallback = []
        for (let index = 0; index < array.length; index++) {
            Promise.resolve(array[index]).then(res => {
                allCallback.push(res);
                if (allCallback.length === array.length) {
                    resolve(allCallback)
                }
            }, error => {
                console.log(error);
            });
        }
    })

}
Promise.resolve = function (arrayItem) {
    return arrayItem
}
function Promise(executor) {
    let self = this;
    this.status = "pending"
    this.onResolvedCallback = []
    this.onRejectedCallback = []
    function resolve(value) {
        if (self.status === "pending") {
            self.status = "resolved"
            self.data = value
            for (let index = 0; index < self.onResolvedCallback.length; index++) {
                self.onResolvedCallback[index](self.data);
            }
        }
    }
    function reject(reason) {
        if (self.status === "pending") {
            self.status = "rejected"
            self.data = reason
            console.log("执行了reject", self.data);
        }
    }
    try {
        executor(resolve, reject);
    } catch (e) {
        reject(e);
    }
};
// let promise = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         resolve("成功");
//     }, 500);
// }).then(res => {
//     console.log(res);
// }, error => {
//     console.log(error);
// })

let p1 = new Promise((resolve, reject) => {
    setTimeout(function () {
        resolve(1)
    }, 1000)
})
let p2 = new Promise((resolve, reject) => {
    setTimeout(function () {
        resolve(2)
    }, 2000)
})
let p3 = new Promise((resolve, reject) => {
    setTimeout(function () {
        resolve(3)
    }, 3000)
})
Promise.all([p3, p1, p2]).then(res => {
    console.log("res===", res);
}, reject => {

});


// function promiseAll(promises) {
//     return new Promise(function (resolve, reject) {
//         if (!Array.isArray(promises)) {
//             throw new TypeError(`argument must be a array`)
//         }
//         var resolvedCounter = 0;
//         var promiseNum = promises.length;
//         var resolvedResult = [];
//         for (let i = 0; i < promiseNum; i++) {
//             Promise.resolve(promises[i]).then(value => {
//                 resolvedCounter++;
//                 resolvedResult[i] = value;
//                 if (resolvedCounter == promiseNum) {
//                     return resolve(resolvedResult)
//                 }
//             }, error => {
//                 return reject(error)
//             })
//         }
//     })
// }


