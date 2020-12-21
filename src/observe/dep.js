let uid = 0;
export default class Dep {
  constructor() {
    this.id = uid++;
    this.subs = [];
  }
  addSub(sub) {
    this.subs.push(sub);
  }

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
export function pushTarget(target) {
  Dep.target = target;
  targerStack.push(target);
}
export function popTarget() {
  targerStack.pop();
  Dep.target = targerStack[targerStack.length - 1];
}
