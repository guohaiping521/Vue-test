//ast 语法树  是用对象来描述原生语法  虚拟dom用对象来描述dom节点
import { parseHTML } from "./parser-html";
//找到{{abc}}这样的.+的意义是最小匹配, 找到符合的马上结束
const defaultTagRE = /\{\{((?:.|\r?\n)+?)\}\}/g;
function generate(el) {
  let children = getChildren(el);
  let code = `_c("${el.tag}",${
    el.attrs.length ? genProps(el.attrs) : "undefined"
  },${children ? children : ""})`;
  return code;
}
function getChildren(el) {
  let children = el.children;
  if (children && children.length > 0) {
    return `${children.map((c) => gen(c))}`;
  } else {
    return false;
  }
}
function gen(child) {
  //元素标签
  if (child.type === 1) {
    return generate(child);
  } else {
    let text = child.text;
    let tokens = [];
    let lastIndex = (defaultTagRE.lastIndex = 0);
    let match, index;
    while ((match = defaultTagRE.exec(text))) {
      index = match.index;
      if (index > lastIndex) {
        tokens.push(JSON.stringify(text.slice(lastIndex, index)));
      }
      tokens.push(`_s(${match[1].trim()})`);
      lastIndex = index + match[0].length;
    }
    if (lastIndex < text.length) {
      tokens.push(JSON.stringify(text.slice(lastIndex)));
    }
    return `_v(${tokens.join("+")})`;
  }
}
function genProps(attrs) {
  let str = "";
  for (let index = 0; index < attrs.length; index++) {
    let attr = attrs[index];
    if (attr.name === "style") {
      let obj = {};
      attr.value.split(";").forEach((element) => {
        let [key, value] = element.split(":");
        obj[key] = value;
      });
      attr.value = obj;
    }
    str += `${attr.name}:${JSON.stringify(attr.value)},`;
  }

  return `{${str.slice(0, -1)}}`;
}
export function compileToFunctions(template) {
  //解析html字符串，将html字符串=>ast语法树
  let root = parseHTML(template);
  let code = generate(root);
  //所有模板引擎的实现都需要new Function +with
  let renderFn = new Function(`with(this){ return ${code}}`);
  //ast语法树转为render函数，字符串拼接（模板引擎）
  //ast转为js的语法
  return renderFn;
}
