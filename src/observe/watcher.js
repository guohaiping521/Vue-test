import { pushTarget, popTarget } from "./dep";
import { queueWatcher } from "./scheduler";
let uid = 0;
class Watcher {
  constructor(vm, exprOrFn, callback, optioins) {
    this.id = ++uid; // uid for batching
    this.vm = vm;
    this.callback = callback;
    this.optioins = optioins;
    this.getter = exprOrFn;
    this.newDepIds = new Set();
    this.depIds = new Set();
    this.newDeps = [];
    this.get();
  }
  get() {
    pushTarget(this);
    this.getter();
    popTarget();
  }
  addDep(dep) {
    const id = dep.id;
    if (!this.newDepIds.has(id)) {
      this.newDepIds.add(id);
      dep.addSub(this);
    }
  }
  run() {
    this.get();
  }
  update() {
    queueWatcher(this);
  }
}
export default Watcher;
