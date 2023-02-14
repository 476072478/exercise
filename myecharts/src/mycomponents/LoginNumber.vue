<template>
  <BjTp width="500px" height="181px">
    <MyTabbar tabname="系统登录总次数" />
    <div id="XspFk" :key="XspFkKey">
      <div class="AllXspFk" v-for="(item, index) in changextdlzcs" :key="index">
        <div class="cover" :class="item.isAnimation && 'coverAnimation'">
          <img src="../assets/xianshipingfangkuai.png" alt="" />
        </div>
        <div class="back">
          <img src="../assets/xianshipingfangkuai.png" alt="" />
        </div>
        <span class="zt" :class="item.isAnimation && 'ztAnimation'">{{
          item.szdx
        }}</span>
      </div>
    </div>
  </BjTp>
</template>

<script>
export default {
  name: "LoginNumber",
  props: {
    // 更新数据时间
    jgsj: {
      type: Number,
      default: 5000,
    },
    // 翻牌间隔时间
    fpcs: {
      type: Number,
      default: 800,
    },
  },
  data() {
    return {
      // 后端返回的数据
      xtdlzcsData: [1, 4, 2, 5, 4, 6, 3, 4, 6],
      number: 0,
      maxnumber: 0,
      // 最开始需要从0进行渲染
      changextdlzcs: [],
      XspFkKey: 0,
    };
  },
  mounted() {
    this.maxnumber = Math.max(...this.xtdlzcsData);
    this.changextdlzcsFF();
  },
  methods: {
    // 初始渲染
    changextdlzcsFF() {
      let arr = [];
      this.xtdlzcsData.map((item) => {
        if (item > this.number) {
          let mynumber = this.number + 1;
          arr.push({ szdx: mynumber, isAnimation: true });
        } else {
          arr.push({ szdx: item, isAnimation: false });
        }
      });
      this.number++;
      if (this.maxnumber > this.number) {
        this.changextdlzcs = arr;
        setTimeout(() => {
          this.changextdlzcsFF();
        }, this.fpcs - 10);
      } else {
        this.changextdlzcs = this.xtdlzcsData.map((item) => {
          return { szdx: item, isAnimation: false };
        });
        setInterval(() => {
          // 每隔2s向后端请求一次数据
          let data = (Number(this.xtdlzcsData.join("")) + 235)
            .toString()
            .split("");
          // 将传入的数据与之前的数据进行比较，进行数据更新
          this.updataxtdlzcsFF(data);
        }, this.jgsj);
      }
    },
    // 数据更新
    updataxtdlzcsFF(data) {
      let j = data.length - 1;
      let newdata = [];
      for (let i = this.xtdlzcsData.length - 1; i >= 0; i--, j--) {
        if (data[j] == this.xtdlzcsData[i]) {
          newdata[j] = { szdx: this.xtdlzcsData[i], isAnimation: false };
        } else {
          if (this.xtdlzcsData[i] == 9) {
            newdata[j] = { szdx: 0, isAnimation: true };
          } else {
            newdata[j] = { szdx: ++this.xtdlzcsData[i], isAnimation: true };
          }
        }
      }
      // 更新本地数据
      let updataszdx = newdata.map((item) => item.szdx);
      this.xtdlzcsData = updataszdx;
      // 先让牌子翻起来,数字再变化
      this.changextdlzcs = this.changextdlzcs.map((item, index) => {
        return { ...item, isAnimation: newdata[index].isAnimation };
      });
      setTimeout(() => {
        this.changextdlzcs = newdata;
      }, this.fpcs - 100);

      if (Number(updataszdx.join("")) !== Number(data.join(""))) {
        setTimeout(() => {
          this.updataxtdlzcsFF(data);
        }, this.fpcs);
      } else {
        setTimeout(() => {
          this.changextdlzcs = data.map((item) => {
            return { szdx: item, isAnimation: false };
          });
        }, this.fpcs);
      }
    },
  },
};
</script>
<style>
@keyframes coverchange {
  0% {
    transform: rotateX(0deg);
  }
  100% {
    transform: rotateX(180deg);
  }
}
@keyframes ztchange {
  0% {
    transform: rotateX(0deg);
  }
  50% {
    transform: rotateX(90deg);
  }
  100% {
    transform: rotateX(0deg);
  }
}
#XspFk {
  display: flex;
}
.AllXspFk {
  width: 50px;
  height: 62px;
  position: relative;
  backface-visibility: hidden;
  align-items: center;
  justify-content: center;
  display: flex;
  margin: 0 3px;
  perspective: 340px;
}
.cover {
  position: absolute;
  width: 50px;
  height: 62px;
  z-index: 1;
  border: 1px solid rgba(20, 143, 228, 1);
}
.coverAnimation {
  animation: coverchange 0.8s ease-in-out infinite;
}
.back {
  position: absolute;
  width: 50px;
  height: 62px;
  border: 1px solid rgba(20, 143, 228, 1);
}
.zt {
  position: relative;
  color: #40cdf1;
  font-size: 30px;
  font-family: DS-Digital-BoldItalic;
  font-weight: Bold Italic;
  z-index: 2;
}
.ztAnimation {
  animation: ztchange 0.8s ease-in-out infinite;
}
</style>
