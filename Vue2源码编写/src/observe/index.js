import { newArrayProto } from './array'
class Observe {
  constructor(data) {
    Object.defineProperty(data, '__ob__', {
      value: this,
      enumerable: false // 不可枚举
    })
    if (Array.isArray(data)) {
      // 数组不做劫持，太浪费性能，重写数组方法
      // 需要保留数组原有的特性，并且能够重写部分方法
      data.__proto__ = newArrayProto
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
export function defineReactive(target, key, value) {
  //闭包
  observe(value); //对所有对象都进行属性劫持
  Object.defineProperty(target, key, {
    get() {
      return value;
    },
    set(newvalue) {
      if (value === newvalue) return;
      observe(newvalue);
      value = newvalue;
    },
  });
}
export function observe(data) {
  // 对这个对象进行劫持
  if (typeof data !== "object" || data === null) {
    return null;
  }
  if (data.__ob__ instanceof Observe) { //说明这个数据已经被代理
    return data.__ob__
  }
  // 如果一个对象已经被劫持，那么就不用被劫持
  return new Observe(data);
}
