//ast 语法树  是用对象来描述原生语法  虚拟dom用对象来描述dom节点
import { parseHTML } from "./parser-html";
export function compileToFunctions(template) {
  //解析html字符串，将html字符串=>ast语法树
  let root = parseHTML(template);
  //ast语法树转为render函数，字符串拼接（模板引擎）
  return function render() {};
}
