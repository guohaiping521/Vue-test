const { dir } = require("console");

let count = 0;
function getN(param) {
    if (param === 1 || param === 2) {
        return param
    } else {
        return getN(param - 1) + getN(param - 2);
    }
}
console.log(getN(5));




function getN(param) {
    let count = 0;
    let array = new Array();
    array[1] = 1;
    array[2] = 2;
    if (param === 1 || param === 2) {
        return array[param]
    }
    for (let index = 3; index <= param; index++) {
        array[index] = array[index - 1] + array[index - 2]
    }
    return array[param];
}
console.log(getN(5));






console.dir(Array);