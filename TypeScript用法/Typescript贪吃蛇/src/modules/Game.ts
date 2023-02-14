import Snake from "./Snake.ts";
import Food from "./Food.ts";
import ScorePanel from "./ScorePanel.ts";
class Game {
    //蛇
    snake: Snake
    //食物
    food: Food
    //记分牌
    scorePanel: ScorePanel
    //创建一个属性来储存蛇的移动方向
    direction: string = 'ArrowRight'
    //创建一个属性来记录游戏是否结束
    isLife = true
    constructor() {
        this.snake = new Snake()
        this.food = new Food()
        this.scorePanel = new ScorePanel()
        this.init()
    }
    //游戏的初始化方法，嗲用后游戏开始
    init() {
        //绑定键盘按键按下的事件
        document.addEventListener('keydown', this.keydownHandler.bind(this))
        this.run()
    }
    //创建一个键盘按下的响应函数ArrowUpArrowDownArrowLeftArrowRight
    keydownHandler(event: KeyboardEvent) {
        //修改direction属性
        return this.direction = event.key
    }
    run() {
        //根据方向来使蛇的位置改变
        //向上 top 减小 向下 增加  向左 left
        //获取蛇头现在的坐标
        let x = this.snake.X
        let y = this.snake.Y
        switch (this.direction) {
            case 'ArrowUp':
                y -= 10
                break
            case 'ArrowDown':
                y += 10
                break
            case 'ArrowLeft':
                x -= 10
                break
            case 'ArrowRight':
                x += 10
                break
        }
        //检查蛇是否吃到食物
        this.judgeEat(x, y)
        if (this.snake.body[1] && this.snake.body[1].offsetLeft === x && this.snake.body[1].offsetTop === y) {
            console.log('掉头了')
            if (x > this.snake.X) {
                x = this.snake.X - 10
            } else if (x > this.snake.X) {
                x = this.snake.X + 10
            }
            if (y > this.snake.Y) {
                y = this.snake.Y - 10
            } else if (y < this.snake.Y) {
                y = this.snake.Y + 10
            } else {

            }
        }
        this.snake.movebody()
        try {
            this.snake.Y = y
            this.snake.X = x
        } catch (d: unknown) {
            //进入到catch，说明出现了异常，弹出一个提示信息
            alert('游戏结束啦')
            this.isLife = false
        }
        this.isLife && setTimeout(this.run.bind(this), 100 - (this.scorePanel.leverl - 1) * 30)
    }
    //定义一个方法，用来检测是否吃到食物
    judgeEat(X: number, Y: number) {
        if (X === this.food.X && Y === this.food.Y) {
            this.snake.addbody()
            this.food.change()
            this.scorePanel.addscore()
        }
    }
}

export default Game