let uid = 0;
export default class Dep {
  constructor() {
    this.id = uid++;
    this.subs = [];
  }

  depend() {
    this.subs.push(Dep.target);
  }

  notify() {
    console.log(this.subs);
    this.subs.forEach((sub) => {
      sub.update();
    });
  }
}
Dep.target = null;
const targerStack = [];
export function pushTarget(target) {
  Dep.target = target;
  targerStack.push(target);
}
export function popTarget() {
  targerStack.pop();
  console.log("targerStack", targerStack);
  Dep.target = targerStack[targerStack.length - 1];
}
