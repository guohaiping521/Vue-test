import { pushTarget, popTarget } from "./dep";
let uid = 0;
class Watcher {
  constructor(vm, exprOrFn, callback, optioins) {
    this.id = ++uid; // uid for batching
    this.vm = vm;
    this.callback = callback;
    this.optioins = optioins;
    this.getter = exprOrFn;
    this.get();
  }
  get() {
    this.getter();
  }
  addDep() {}
  update() {
    this.get();
  }
}
export default Watcher;
