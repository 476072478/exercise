import { newArrayProto } from "./array";
import Dep from "./dep";
class Observe {
  constructor(data) {
    this.dep = new Dep(); //所有对象都要增加dep

    Object.defineProperty(data, "__ob__", {
      value: this,
      enumerable: false, // 不可枚举
    });
    if (Array.isArray(data)) {
      // 数组不做劫持，太浪费性能，重写数组方法
      // 需要保留数组原有的特性，并且能够重写部分方法
      data.__proto__ = newArrayProto;
      this.observeArray(data);
    } else {
      this.walk(data);
    }
  }
  walk(data) {
    // 循环对象，对属性依次劫持
    Object.keys(data).forEach((key) => defineReactive(data, key, data[key]));
  }
  observeArray(data) {
    // 数组里面的{}需要监测到
    data.forEach((item) => observe(item));
  }
}
function dependArray(value) {
  for (let i = 0; i < value.length; i++) {
    value[i].__ob__ && value[i].__ob__.dep.depend();
    if (Array.isArray(value[i])) {
      dependArray(value[i]);
    }
  }
}
export function defineReactive(target, key, value) {
  //闭包
  let childob = observe(value); //对所有对象都进行属性劫持
  let dep = new Dep(); //每一个属性都有一个dep
  Object.defineProperty(target, key, {
    get() {
      if (Dep.target) {
        dep.depend(); //让这个属性的收集器记住当前过程
        if (childob) {
          childob.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value;
    },
    set(newvalue) {
      if (value === newvalue) return;
      observe(newvalue);
      value = newvalue;
      dep.notify(); //通知更新
    },
  });
}
export function observe(data) {
  // 对这个对象进行劫持
  if (typeof data !== "object" || data === null) {
    return null;
  }
  if (data.__ob__ instanceof Observe) {
    //说明这个数据已经被代理
    return data.__ob__;
  }
  // 如果一个对象已经被劫持，那么就不用被劫持
  return new Observe(data);
}
