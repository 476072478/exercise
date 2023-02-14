<template>
  <BjTp width="499px" height="365px">
    <MyTabbar tabname="系统各市州登录情况" />
    <div class="external">
      <div id="LoginSituation" ref="LoginSituation"></div>
    </div>
  </BjTp>
</template>

<script>
import * as echarts from "echarts";
require;
export default {
  name: "LoginSituation",
  props: {
    // 动画时间
    dhsj: {
      type: Number,
      default: 1000,
    },
  },
  data() {
    return {
      salvProName: [
        "石羊场派出所",
        "金牛区派出所",
        "三圣乡派出所",
        "琉璃厂派出所",
        "倪家桥派出所",
        "琉璃厂派出所",
        "驷马桥派出所",
      ],
      ProValue: [400, 181, 154, 144, 135, 117, 74],
      salvProValue: [400, 181, 154, 144, 135, 117, 74],
      newsalvProValue: [0, 0, 0, 0, 0, 0, 0],
      mc1: require("../assets/mc1.png"),
      mc2: require("../assets/mc2.png"),
      mc3: require("../assets/mc3.png"),
      myChart: null,
      zlevel: 1,
      zlevel1: 2,
      animation1: true,
      animation2: true,
    };
  },
  watch: {},
  mounted() {
    this.myChart = echarts.init(this.$refs.LoginSituation);
    this.initEcharts();
    setTimeout(() => {
      this.ValTwoAction();
    }, this.dhsj);
  },
  methods: {
    initEcharts() {
      var salvProMax = []; //背景按最大值
      for (let i = 0; i < this.ProValue.length; i++) {
        salvProMax.push(300 + this.ProValue[0]);
      }
      let option = {
        grid: {
          left: "2%",
          right: "2%",
          bottom: "2%",
          top: "2%",
          containLabel: true,
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "none",
          },
          formatter: function (params) {
            return params[0].name + " : " + params[0].value;
          },
        },
        xAxis: [
          {
            show: false,
            type: "value",
          },
        ],
        yAxis: [
          {
            type: "category",
            inverse: true,
            axisLabel: {
              show: true,
              textStyle: {
                color: "rgba(0, 255, 255, 1)",
              },
              rich: {
                mc1: {
                  height: 30,
                  width: 30,
                  align: "center",
                  backgroundColor: {
                    image: this.mc1,
                  },
                },
                mc2: {
                  height: 30,
                  width: 30,
                  align: "center",
                  backgroundColor: {
                    image: this.mc2,
                  },
                },
                mc3: {
                  height: 30,
                  width: 30,
                  align: "center",
                  backgroundColor: {
                    image: this.mc3,
                  },
                },
                mc4: {
                  height: 30,
                  width: 45,
                  align: "center",
                  color: "#FFFFFF",
                },
              },
              formatter: function (params, index) {
                if (index === 0) {
                  return ["{mc1|}" + "  " + params].join("\n");
                }
                if (index === 1) {
                  return ["{mc2|}" + "  " + params].join("\n");
                }
                if (index === 2) {
                  return ["{mc3|}" + "  " + params].join("\n");
                }
                return ["{mc4|" + (index + 1) + "}" + params].join("\n");
              },
            },
            splitLine: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            axisLine: {
              show: false,
            },
            data: this.salvProName,
          },
          {
            type: "category",
            inverse: true,
            axisTick: "none",
            axisLine: "none",
            show: true,
            axisLabel: {
              textStyle: {
                color: "#ffffff",
                fontSize: "12",
              },
            },
            data: this.ProValue.map((item) => item + " 次"),
          },
        ],
        series: [
          {
            name: "值1",
            type: "bar",
            zlevel: this.zlevel,
            animation: this.animation1,
            animationEasing: "linear",
            animationDurationUpdate: this.dhsj,
            itemStyle: {
              normal: {
                barBorderRadius: 5,
                color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                  {
                    offset: 0,
                    color: "rgba(20, 143, 228, 1)",
                  },
                  {
                    offset: 0.5,
                    color: "rgba(1, 251, 254, 1)",
                  },
                  {
                    offset: 1,
                    color: "rgba(212, 232, 232, 1)",
                  },
                ]),
              },
            },
            barWidth: 10,
            data: this.salvProValue,
          },
          {
            name: "值2",
            type: "bar",
            zlevel: this.zlevel1,
            animation: this.animation2,
            animationEasing: "linear",
            animationDurationUpdate: this.dhsj,
            itemStyle: {
              normal: {
                barBorderRadius: 5,
                color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                  {
                    offset: 1,
                    color: "rgba(20, 143, 228, 1)",
                  },
                  {
                    offset: 0.5,
                    color: "rgba(1, 251, 254, 1)",
                  },
                  {
                    offset: 0,
                    color: "rgba(212, 232, 232, 1)",
                  },
                ]),
              },
            },
            barWidth: 10,
            data: this.newsalvProValue,
          },
          {
            name: "背景",
            type: "bar",
            animation: true,
            animationEasing: "linear",
            animationDurationUpdate: this.dhsj,
            barWidth: 10,
            barGap: "-100%",
            data: salvProMax,
            itemStyle: {
              normal: {
                color: "rgba(12, 70, 107, 1)",
                barBorderRadius: 5,
              },
            },
          },
        ],
      };
      option && this.myChart.setOption(option);
    },
    ValTwoAction() {
      // 值2动画出发
      this.animation2 = true;
      this.newsalvProValue = this.ProValue;
      this.zlevel = 1;
      this.zlevel1 = 2;
      this.initEcharts();
      this.ValOneback();
    },
    ValOneback() {
      // 值1动画回来
      setTimeout(() => {
        this.animation1 = false;
        this.salvProValue = new Array(this.ProValue.length).fill(0);
        this.initEcharts();
        this.ValOneAction();
      }, this.dhsj);
    },
    ValOneAction() {
      // 值1动画出发
      this.zlevel = 2;
      this.zlevel1 = 1;
      this.animation1 = true;
      this.salvProValue = this.ProValue;
      this.initEcharts();
      this.ValTwoBack();
    },
    ValTwoBack() {
      // 值2动画回来
      setTimeout(() => {
        this.animation2 = false;
        this.newsalvProValue = new Array(this.ProValue.length).fill(0);
        this.initEcharts();
        this.ValTwoAction();
      }, this.dhsj);
    },
  },
};
</script>

<style>
.external {
  width: 499px;
  height: 326px;
  position: relative;
}
#LoginSituation {
  width: 394px;
  height: 300px;
  position: absolute;
  right: 36px;
}
</style>
