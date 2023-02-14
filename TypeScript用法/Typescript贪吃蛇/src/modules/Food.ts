class Food {
    //定义一个属性所对应的元素
    element: HTMLElement
    constructor() {
        //获取页面中的元素并将其赋值给element
        this.element = document.querySelector('.food>div')!
    }
    //定义一个获取食物坐标x轴的方法
    get X() {
        return this.element.offsetLeft
    }
    get Y() {
        return this.element.offsetTop
    }
    //修改事物的位置，蛇移动一次就是一格，一格的大小就是10，所以食物的坐标必须是整10
    change() {
        this.element.style.left = Math.round(Math.random() * 29) * 10 + 'px'
        this.element.style.top = Math.round(Math.random() * 29) * 10 + 'px'
    }
}
export default Food