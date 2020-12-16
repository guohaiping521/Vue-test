export function patch(oldVnode, vnode) {
  //元素节点 nodeType 1   属性节点 nodeType 2
  const isRealElement = oldVnode.nodeType;
  if (isRealElement) {
    const oldElm = oldVnode;
    const parentElm = oldElm.parentNode;
    let el = createElm(vnode);
    parentElm.insertBefore(el, oldElm.nextSibling);
    parentElm.removeChild(oldElm);
  } else {
    console.log("isRealElement2", isRealElement);
  }
}
function createElm(vnode) {
  const { tag, children, text } = vnode;
  if (typeof tag === "string") {
    vnode.el = document.createElement(tag);
    updateProperties(vnode);
    children.forEach((child) => {
      vnode.el.appendChild(createElm(child));
    });
  } else {
    vnode.el = document.createTextNode(text);
  }
  return vnode.el;
}
function updateProperties(vnode) {
  let newProps = vnode.data || {};
  let el = vnode.el;
  for (let key in newProps) {
    if (key === "style") {
      for (let styleName in newProps.style) {
        el.style[styleName.trim()] = newProps.style[styleName];
      }
    } else if (key === "class") {
      el.className = newProps.class;
    } else {
      el.setAttribute(key, newProps[key]);
    }
  }
}
