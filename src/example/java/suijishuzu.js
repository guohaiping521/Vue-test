

var array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
console.log(gRandomArr(array, 10));
function gRandomArr(arr, length) {
    let arrayList = []
    for (let index = 0; index < length; index++) {
        let position = Math.floor(Math.random() * array.length);
        arrayList.push(arr[position])
        arr.splice(position, 1);
    }
    return arrayList;
}


















// var gRandomArr = function (arr, length) {
//     var newArr = [],
//         i = 0,
//         index;
//     for (; i < length; i++) {
//         // 利用数组长度生成随机索引值
//         index = parseInt(Math.random() * arr.length);
//         // 将随机索引对应的数组元素添加到新的数组中
//         newArr.push(arr[index]);
//         // 删除原数组中随机生成的元素
//         arr.splice(index, 1);
//     }

//     return newArr;
// };
