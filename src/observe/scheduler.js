import { nextTick } from "../util/next-tick";
let has = {};
let queue = [];

export function queueWatcher(watcher) {
  const id = watcher.id;
  //避免更新多次
  if (has[id] == null) {
    has[id] = true;
    queue.push(watcher);
    nextTick(flushSchedulerQueue);
  }
}
function flushSchedulerQueue() {
  queue.forEach((element) => {
    element.run();
    queue = [];
    has = {};
  });
}
