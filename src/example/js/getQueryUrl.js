let url = "http://localhost:8080/static/hy/yaya-main/order-details.html?";
let params = { a: 1, b: 2 };

var keys = [];
for (var key in params) {
    keys.push(key)
}
var sortedKeys = keys.sort();
var connect = url.indexOf('?') === -1 ? '?' : '&';
var len = sortedKeys.length;
var tempUrl = url + connect + sortedKeys[0] + '=' + params[sortedKeys[0]];

if (len === 1) {
    console.log("tempUrl==", tempUrl);
}
for (var i = 1; i < len; i++) {
    tempUrl += '&' + sortedKeys[i] + '=' + params[sortedKeys[i]];
}
console.log(tempUrl);
