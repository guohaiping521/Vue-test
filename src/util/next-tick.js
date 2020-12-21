const callbacks = [];
let waiting = false;
function flushCallbacks() {
  console.log("执行", callbacks);
  callbacks.forEach((element) => {
    element();
    waiting = false;
  });
}
export function nextTick(cb) {
  callbacks.push(cb);
  console.log("callbacks", callbacks);
  if (waiting === false) {
    waiting = true;
    setTimeout(flushCallbacks, 0);
  }
}
