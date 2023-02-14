<template>
  <div id="bjtp" :style="{ width: width, height: height }">
    <slot></slot>
    <div class="lefttop gl"></div>
    <div class="righttop gl"></div>
    <div class="rightbottom gl"></div>
    <div class="leftbottom gl"></div>
  </div>
</template>

<script>
export default {
  name: "BjTp",
  props: {
    width: {
      type: String,
      default: "846px",
    },
    height: {
      type: String,
      default: "520px",
    },
  },
};
</script>

<style>
#bjtp {
  position: relative;
  background: url(../assets/bg.png) no-repeat center;
  background-size: cover;
  margin: 10px;
  overflow: hidden;
}
#bjtp::before {
  content: "";
  width: 491px;
  height: 1px;
  background: linear-gradient(
    90deg,
    rgba(120, 209, 255, 0),
    rgba(120, 209, 255, 0.96),
    rgba(120, 209, 255, 0)
  );
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin:  0 auto;
}
.gl {
  width: 4px;
  height: 2px;
  background: #00f4fa;
}
.lefttop {
  position: absolute;
  top: 0;
  left: 0;
}
.righttop {
  position: absolute;
  top: 0;
  right: 0;
}
.rightbottom {
  position: absolute;
  right: 0;
  bottom: 0;
}
.leftbottom {
  position: absolute;
  left: 0;
  bottom: 0;
}
</style>
