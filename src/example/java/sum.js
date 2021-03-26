let twoSum = function (sum, target) {
    let map = new Map();
    for (let index = 0; index < sum.length; index++) {
        if (map.has(target - sum[index])) {
            return [map.get(target - sum[index]), index]
        } else {
            map.set(sum[index], index);
        }
    }
}

var array = [1, 2, 3, 4]
console.log(twoSum(array, 7));