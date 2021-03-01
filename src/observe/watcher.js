import { pushTarget, popTarget } from "./dep";
import { queueWatcher } from "./scheduler";
import { parsePath } from "../util/lang";

let uid = 0;
class Watcher {
  constructor(vm, expOrFn, callback, optioins) {
    this.id = ++uid; // uid for batching
    this.vm = vm;
    this.callback = callback;
    if (optioins) {
      this.user = optioins.user
      this.sync = optioins.sync
      this.lazy = optioins.lazy
    }
    if (typeof expOrFn === 'function') {
      this.getter = expOrFn;
    } else {
      this.getter = parsePath(expOrFn);
    }
    this.dirty = this.lazy;
    this.newDepIds = new Set();
    this.depIds = new Set();
    this.newDeps = [];
    this.deps = [];
    this.value = this.lazy ? undefined : this.get();//watcher的老值
  }
  get() {
    let value;
    pushTarget(this);
    const vm = this.vm;
    value = this.getter.call(vm, vm);
    popTarget();
    this.cleanupDeps()
    return value;
  }
  addDep(dep) {
    const id = dep.id;
    if (!this.newDepIds.has(id)) {
      this.newDepIds.add(id);
      this.newDeps.push(dep);
      dep.addSub(this);
    }
  }
  cleanupDeps() {
    this.deps = this.newDeps
  }
  depend() {
    let length = this.deps.length;
    while (length--) {
      this.deps[length].depend();
    }
    console.log("this.newDepIds==", this.deps);
  }
  evaluate() {
    this.value = this.get();
    this.dirty = false;
  }
  run() {
    let oldValue = this.value;
    let newValue = this.get();
    this.value = newValue
    if (this.user) {
      this.callback.call(this.vm, this.value, oldValue);
    }
  }
  update() {
    if (this.lazy) {
      this.dirty = true;
    } else if (this.sync) {
      this.run()
    } else {
      queueWatcher(this);
    }
  }
}
export default Watcher;
