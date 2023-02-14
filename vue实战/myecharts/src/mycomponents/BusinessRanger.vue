<template>
  <BjTp width="499px" height="900px">
    <MyTabbar tabname="业务办理排名情况"></MyTabbar>
    <div class="cwrkl">
      <ul class="content">
        <span class="bq"
          >财物入库率
          <img src="../assets/xljt.png" alt="" />
        </span>
        <ul class="plat">
          <li>测试</li>
          <li>测试</li>
          <li>测试</li>
        </ul>
      </ul>
      <div class="allpcs">
        <div class="pcspm" v-for="(item, index) in dtpcspm" :key="index">
          <div class="pht">
            <span>{{ item.name }}</span>
            <div class="bfb" :ref="'bfb' + index">{{ item.jd }}</div>
            <img src="../assets/pgt.png" alt="" />
          </div>
          <div class="ysyq" :class="index <= 2 && 'imgrotate'">
            <span :class="item > 3 && 'loser'">{{ index + 1 }}</span>
            <img src="../assets/hsyq.png" alt="" v-if="index <= 2" />
            <img src="../assets/qsyq.png" alt="" v-else />
          </div>
        </div>
      </div>
    </div>
  </BjTp>
</template>

<script>
export default {
  data() {
    return {
      pcspm: [
        { name: "永安湖派出所", jd: "98%" },
        { name: "永安湖派出所", jd: "97%" },
        { name: "永安湖派出所", jd: "96%" },
        { name: "永安湖派出所", jd: "95%" },
        { name: "永安湖派出所", jd: "94%" },
        { name: "永安湖派出所", jd: "93%" },
        { name: "永安湖派出所", jd: "92%" },
        { name: "永安湖派出所", jd: "91%" },
        { name: "永安湖派出所", jd: "90%" },
        { name: "永安湖派出所", jd: "89%" },
        { name: "永安湖派出所", jd: "88%" },
        { name: "永安湖派出所", jd: "78%" },
        { name: "永安湖派出所", jd: "77%" },
      ],
      dtpcspm: [],
      maxjd: 0,
      tap: null,
    };
  },
  mounted() {
    this.changebfb();
    this.dtpcspm = this.pcspm.map((item) => {
      return { ...item, jd: "0 %" };
    });
    this.tap = setInterval(() => {
      this.changebfb();
    }, 30);
  },
  methods: {
    changebfb() {
      let gate = true;
      let newmaxjd = this.maxjd;
      let data = [];
      this.pcspm.forEach((item, index) => {
        if (Number(item.jd.split("%")[0]) > newmaxjd && gate) {
          newmaxjd++;
          gate = false;
        }
        if (Number(item.jd.split("%")[0]) >= newmaxjd) {
          data[index] = { ...item, jd: newmaxjd + "%" };
        } else {
          data[index] = { ...item };
        }
      });
      this.dtpcspm = data;
      this.maxjd = newmaxjd;
      if (newmaxjd >= Number(this.pcspm[0].jd.split("%")[0])) {
        clearInterval(this.tap);
      }
    },
  },
};
</script>

<style scoped>
@keyframes phtrotate {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
}
.content {
  position: absolute;
  right: 39px;
  top: 52px;
}
.plat,
.bq {
  width: 61px;
  height: 11px;
  font-size: 12px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: #ffffff;
  cursor: pointer;
}
.bq {
  display: block;
  width: 120px;
  height: 28px;
  line-height: 28px;
  background: rgba(0, 255, 255, 0.15);
  border: 1px solid #00ffff;
  border-radius: 13px;
  padding-left: 14px;
  position: relative;
  box-sizing: border-box;
}
.bq img {
  position: absolute;
  right: 14px;
  bottom: 8px;
}
.plat {
  display: none;
}
.content:hover .plat {
  display: block;
}
.content:hover img {
  transform: rotate(180deg);
}
.allpcs {
  position: absolute;
  display: flex;
  flex-wrap: wrap;
  top: 77px;
  left: 56px;
}
.pcspm {
  position: relative;
  width: 370px;
  height: 40px;
  margin-top: 21px;
}
.pcspm .ysyq {
  width: 40px;
  height: 40px;
  position: absolute;
  bottom: 14px;
  left: 8px;
}
.pcspm .imgrotate {
  animation: phtrotate 1s linear infinite;
}
.pcspm .ysyq span {
  display: block;
  text-align: center;
  position: absolute;
  width: 40px;
  height: 18px;
  font-size: 24px;
  font-family: Agency FB;
  font-weight: 400;
  color: #ffdc20;
  line-height: 19px;
  bottom: 12px;
}
.pcspm .ysyq .loser {
  color: #ffffff;
}
.pcspm .pht span {
  display: block;
  position: absolute;
  left: 54px;
  bottom: 10px;
  font-size: 12px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: #ffffff;
}
.pcspm .pht .bfb {
  position: absolute;
  width: 45px;
  height: 22px;
  font-size: 26px;
  font-family: Agency FB;
  font-weight: 400;
  color: #fdbf46;
  line-height: 21px;
  background: linear-gradient(0deg, #ffdc20 0%, #ffffff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  right: 0;
  bottom: 5px;
}
</style>
