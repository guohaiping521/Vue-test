
const win: any = window;
try {
  Object.defineProperty(win, 'callbackList', {
    value: win.callbackList || {test:0},
    writable: false
  });
} catch (error) {
  
}
// 监听
export function listen(key: string, fn: Function) {
  console.log(`listen:${key}`)
  if (!win.callbackList[key]) {
    win.callbackList[key] = []
  }
  win.callbackList[key].push(fn)
  console.log(win.callbackList)
}
// 触发
export function trigger(event?: any, data?: any) {
  console.log(win.callbackList)
  var key = Array.prototype.shift.call(arguments)
  var fns = win.callbackList[key]
  console.log(`trigger:${key}`)
  console.log(fns)
  if (!fns || fns.length === 0) {
    return false
  }

  for (var i = 0, fn; (fn = fns[i++]);) {
    fn.apply(this, arguments)
  }
}
// 移除
export function remove(key: string, fn: Function) {
  console.log(`remove:${key}`)
  var fns = win.callbackList[key]
  if (!fns) {
    return false
  }
  if (!fn) {
    // fns && (fns.length = 0);
  } else {
    for (var len = fns.length - 1; len >= 0; len--) {
      var _fn = fns[len]
      if (_fn === fn) {
        fns.splice(len, 1)
      }
    }
  }
}

export default {
  listen,
  trigger,
  remove
}
