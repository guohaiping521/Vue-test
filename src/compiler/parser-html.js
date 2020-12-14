export const unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;
const attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/;
const ncname = `[a-zA-Z_][\\-\\.0-9_a-zA-Z${unicodeRegExp.source}]*`;
const qnameCapture = `((?:${ncname}\\:)?${ncname})`;
const startTagOpen = new RegExp(`^<${qnameCapture}`);
const startTagClose = /^\s*(\/?)>/;
const endTag = new RegExp(`^<\\/${qnameCapture}[^>]*>`);
const defaultTagRE = /\{\{((?:.|\r?\n)+?)\}\}/g;
const whitespaceRE = /\s+/g;
const ELEMENT_TYPE = 1;
const TEXT_TYPE = 3;
let currentParent,
  root,
  stack = [];
export function parseHTML(html) {
  //indexOf :可返回某个指定的字符串值在字符串中首次出现的位置
  while (html) {
    let text;
    let textEnd = html.indexOf("<");
    if (textEnd === 0) {
      let startTagMatch = parseStartTag();
      if (startTagMatch) {
        start(startTagMatch.tagName, startTagMatch.attrs);
        continue;
      }
      let endTagMathch = html.match(endTag);
      if (endTagMathch) {
        advance(endTagMathch[0].length);
        end(endTagMathch[1]);
        continue;
      }
    } else if (textEnd > 0) {
      text = html.substring(0, textEnd);
      if (text) {
        advance(text.length);
        chars(text);
      }
    }
  }
  function advance(n) {
    html = html.substring(n);
  }
  function parseStartTag() {
    let start = html.match(startTagOpen);
    if (start) {
      const match = {
        tagName: start[1],
        attrs: [],
      };
      advance(start[0].length);
      let end, attr;
      while (
        !(end = html.match(startTagClose)) &&
        (attr = html.match(attribute))
      ) {
        advance(attr[0].length);
        match.attrs.push({
          name: attr[1],
          value: attr[3] || attr[4] || attr[5],
        });
      }
      if (end) {
        advance(end[0].length);
        return match;
      }
    }
  }
  return root;
}
function start(tagName, attrs) {
  let element = createASTElement(tagName, attrs);
  if (!root) {
    root = element;
    console.log("root====", root);
  }
  currentParent = element;
  stack.push(element);
}
//标签  属性  父亲
function createASTElement(tag, attrs, parent) {
  return {
    tag: tag,
    type: ELEMENT_TYPE,
    children: [],
    attrs,
    parent: null,
  };
}
function chars(text) {
  text = text.replace(whitespaceRE, "");
  if (text) {
    let child = {
      text: text,
      type: TEXT_TYPE,
    };
    currentParent.children.push(child);
  }
}
function end(tagName) {
  let element = stack.pop();
  if (element.tag === tagName) {
    currentParent = stack[stack.length - 1];
    if (currentParent) {
      element.parent = currentParent;
      currentParent.children.push(element);
    }
  }
}
