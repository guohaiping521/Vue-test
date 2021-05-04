//合并[4,1,3,9,6,2] [8,5,3,2,1,4,7] 去重，取出所有偶数从大到小输出
//8642
function getSortArray(array1, array2) {
    let array = array1.concat(array2);
    let arraySort = array.sort().reduce((preV, curV, index, array) => {
        if ((!preV || array[index - 1] !== curV) && curV % 2 === 0) {
            preV.unshift(curV)
            return preV
        } else {
            return preV;
        }
    }, [])
    return arraySort;
}
console.log(getSortArray([8, 5, 3, 2, 1, 4, 7], [4, 1, 3, 9, 6, 2]));
