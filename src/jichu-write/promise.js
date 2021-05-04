// // Promise.prototype.then = (onResolved, onRejectd) => {
// //     console.log("=====", this);
// // }//箭头函数指向
Promise.prototype.then = function (onResolved, onRejectd) {
    let self = this;
    if (this.status === "resolved") {
        onResolved(this.data);
    } else if (this.status === "rejected") {
        onRejectd(this.data);
    } else if (this.status === "pending") {
        return new Promise((resolve, reject) => {
            self.onResolvedCallback.push((data) => {
                onResolved(this.data)
            });
            self.onRejectedCallback.push((data) => {
                onRejectd(this.data)
            });
        })

    }
}

function Promise(exectour) {
    let self = this
    this.status = "pending"
    this.data = ""
    this.onResolvedCallback = []
    this.onRejectedCallback = []
    function resolve(data) {
        if (self.status === "pending") {
            self.status = "resolved"
            self.data = data;
            for (let index = 0; index < self.onResolvedCallback.length; index++) {
                const element = self.onResolvedCallback[index];
                element(self.data)
            }
        }
    }
    function reject(data) {
        if (self.status === "pending") {
            self.status = "rejected"
            self.data = data;
        }
    }
    exectour(resolve, reject);
}

Promise.all = function (array) {
    return new Promise((resolve, reject) => {
        let resultArray = [];
        for (let index = 0; index < array.length; index++) {
            const element = array[index];
            resultArray.push(element.data)
        }
        resolve(resultArray)
    })
}

// let promise = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         resolve("success");
//     }, 1000);
// }).then(res => {
//     console.log("sucess内容==", res);
// }, err => {
//     console.log(err);
// })

let promise1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve("success promise1");
    }, 100);
})
let promise2 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve("success promise2");
    }, 100);
})
Promise.all([promise1, promise2]).then(res => {
    console.log("res===", res);
}, err => {
    console.log("err===", res);
});