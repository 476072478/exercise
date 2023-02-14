export default class ScorePanel {
    //记录分数和等级
    score = 0
    leverl = 1
    //分数和等级所在的元素，在构造函数中进行初始化
    scoreEle: HTMLElement
    levelEle: HTMLElement
    //设置变量限制等级
    maxlevel: number
    //设置升级限制,多少分升级一次
    upScore: number
    constructor(number = 10, upScore = 10) {
        this.scoreEle = document.querySelector('#score')!
        this.levelEle = document.querySelector('#level')!
        this.maxlevel = number
        this.upScore = upScore
    }
    //设置加分的方法
    addscore() {
        this.score++
        this.scoreEle.innerHTML = 'SCORE:' + this.score
        if (this.score % this.upScore === 0) {
            this.addlevel()
        }
    }
    //设置升级的方法
    addlevel() {
        this.leverl++
        //等级设置上线为10
        if (this.leverl < this.maxlevel) {
            this.levelEle.innerHTML = 'LEVEL:' + this.leverl
        }
    }
}