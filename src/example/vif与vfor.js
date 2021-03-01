//v-if与v-for优先级
let compiler = require("vue-template-compiler");
const ast = compiler.compile('<div v-if="false" v-for="i in 3"></div>');
console.log(ast.render);
//with(this){return _l((3),function(i){return (false)?_c('div'):_e()})}
//先循环然后每个判断是不是false
var a = 1;
function name() {
    console.log(a);
    var a;
}
name();