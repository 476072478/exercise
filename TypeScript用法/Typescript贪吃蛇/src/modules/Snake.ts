class Snake {
    //表示蛇头的元素
    head: HTMLElement
    //表示蛇的身体
    body: HTMLCollection
    snake: HTMLElement
    constructor() {
        this.snake = document.getElementById('snake')!
        this.head = document.querySelector('#snake>div')! as HTMLElement
        this.body = document.getElementById('snake')!.getElementsByTagName('div')
    }
    get X() {
        return this.head.offsetLeft
    }
    get Y() {
        return this.head.offsetTop
    }
    //设置蛇头的坐标
    set X(value) {
        //如果新值和旧值相同，就不修改
        if (this.X === value) {
            return
        }
        if (this.X < 0 || this.X > 290) {
            throw new Error('撞墙了！！')
        }
        this.head.style.left = value + 'px'
        //移动身体
        this.checkheadBody()
    }
    set Y(value) {
        if (this.Y === value) {
            return
        }
        if (this.Y < 0 || this.Y > 290) {
            throw new Error('撞墙了！！')
        }
        this.head.style.top = value + 'px'
        this.checkheadBody()
    }
    //设置蛇增加身体的方法
    addbody() {
        this.snake.insertAdjacentHTML('beforeend', '<div></div>')
    }
    movebody() {
        //将后边的身体设置为前面身体的位置
        let Arr = [...this.body]
        for (let i = Arr.length - 1; i > 0; i--) {
            (this.body[i] as HTMLElement).style.top = (Arr[i - 1] as HTMLElement).offsetTop + 'px';
            (this.body[i] as HTMLElement).style.left = (Arr[i - 1] as HTMLElement).offsetLeft + 'px'
        }
    }
    //检测所有身体，检测是否与蛇头的坐标重叠
    checkheadBody() {
        for (let i = 1; i < this.body.length; i++) {
            if (this.X === (this.body[i] as HTMLElement).offsetLeft && this.Y === (this.body[i] as HTMLElement).offsetTop) {
                throw new Error('撞到啦')
            }
        }
    }
}
export default Snake