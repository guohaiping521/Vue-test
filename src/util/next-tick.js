let waiting = false;
const callbacks = [];
export function flushCallbacks(params) {
  callbacks.forEach((element) => {
    element();
  });
  waiting = false;
}
export function nextTick(cb) {
  callbacks.push(cb);
  if (!waiting) {
    waiting = true;
    setTimeout(flushCallbacks, 0);
  }
}
