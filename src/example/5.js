function Stack() {
    this.itemArr = [];
    this.top = 0;//初始化栈顶位置为0
}
Stack.prototype = {
    push: function (el) {
        return this.itemArr[this.top++] = el;
    },
    pop: function () {
        return this.itemArr.splice(--this.top, 1)
    },
    peek: function () {
        return this.itemArr[this.top - 1];
    },
    isEmpty: function () {
        return this.top == 0;
    },
    size: function () {
        return this.top;
    },
    clear: function () {
        this.top = 0;
        this.itemArr = [];
        return this.itemArr;
    }
}
var stack = new Stack();
let array = new Array(4, 3, 2, 1, 6, 1, 0);
console.log(findSmallSeq(array, 4));
function findSmallSeq(nums, k) {
    let ans = new Array();
    let stack = new Stack();
    for (let index = 0; index < nums.length; index++) {
        while (!stack.isEmpty() && stack.peek() > nums[index] && (stack.size() + nums.length - index) > k) {
            stack.pop();
        }
        stack.push(nums[index]);
    }
    for (let index = stack.size() - 1; index >= 0; index--) {
        ans[index] = stack.peek();
        stack.pop();
    }
    return ans;
}




