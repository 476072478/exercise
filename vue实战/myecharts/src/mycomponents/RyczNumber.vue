<template>
  <BjTp width="846px" height="369px">
    <MyTabbar tabname="人员处置情况" />
    <div id="RyczNumber">
      <div class="ryczys">
        <div class="beforeryczys" ref="beforeryczys">
          <img src="../assets/g.png" alt="" />
        </div>
        <img src="../assets/rycz.png" alt="" />
      </div>
    </div>
  </BjTp>
</template>

<script>
export default {
  name: "App",
  mounted() {
    this.changeczys();
  },
  methods: {
    changeczys() {
      let beforeryczys = this.$refs.beforeryczys;
      let left = 0;
      let top = 0;
      let right = 360;
      let bottom = 95;
      let lastdistance = -360;
      let czysInt = setInterval(() => {
        if (left < 360) {
          left += 20;
          beforeryczys.style.transform = `translateX(${left}px)`;
          return;
        }
        if (top < 95) {
          top += 5;
          if (top <= 50) {
            left += 5;
          } else {
            left -= 5;
          }
          beforeryczys.style.transform = `translateX(${left}px) translateY(${top}px)`;
          return;
        }
        if (right > -360) {
          right -= 20;
          beforeryczys.style.transform = `translateX(${right}px) translateY(${top}px)`;
          return;
        }
        if (bottom > 0) {
          bottom -= 5;
          if (top <= -50) {
            left -= 5;
          } else {
            left += 5;
          }
          beforeryczys.style.transform = `translateX(${right}px) translateY(${bottom}px)`;
          return;
        }
        if (lastdistance < 0) {
          lastdistance += 20;
          beforeryczys.style.transform = `translateX(${lastdistance}px)`;
          return;
        }
        clearInterval(czysInt);
        this.changeczys();
      }, 40);
    },
  },
};
</script>

<style>
#RyczNumber {
  position: relative;
  margin: 10px;
}
.ryczys {
  width: 825px;
  height: 150px;
  position: relative;
  border-radius: 75px;
}
.beforeryczys {
  position: absolute;
  width: 500px;
  height: 50px;
  top: 0;
  left: 0px;
  right: 0;
  bottom: 0;
  margin: 0 auto;
  transition: all 0.1s linear;
}
.beforeryczys img{
  width: 500px;
  height: 50px;
}
</style>
