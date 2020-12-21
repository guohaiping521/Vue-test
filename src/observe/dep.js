let uid = 0;
export default class Dep {
  constructor() {
    this.id = uid++;
    this.subs = [];
  }
  addSub(sub) {
    this.subs.push(sub);
  }
  //存在多个watcher,更改数据，调用多个watcher update更新
  //相同的存在一个watcher
  depend() {
    Dep.target.addDep(this);
  }

  notify() {
    this.subs.forEach((sub) => {
      sub.update();
    });
  }
}

const targerStack = [];
Dep.target = null;
//Watcher
export function pushTarget(target) {
  Dep.target = target;
  targerStack.push(target);
}
export function popTarget() {
  targerStack.pop();
  Dep.target = targerStack[targerStack.length - 1];
}
