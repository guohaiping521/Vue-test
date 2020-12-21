import { nextTick } from "../util/next-tick";
let has = {};
let queue = [];

export function queueWatcher(watcher) {
  const id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    queue.push(watcher);
    nextTick(flushSchedulerQueue);
  }
}
function flushSchedulerQueue() {
  queue.forEach((watcher) => {
    watcher.run();
    has = {};
    queue = [];
  });
}
