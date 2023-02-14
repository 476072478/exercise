"use strict";
class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    sayhello() {
        console.log('hai');
    }
}
const per = new Person('小唐', 18);
const xiaozhou = new Person('小周', 17);
console.log(per.name);
console.log(xiaozhou.name);
console.log(xiaozhou.age);
