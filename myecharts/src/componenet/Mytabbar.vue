<template>
  <div class="Sytabbar">
    <div class="left">
      <div class="leftjt">>>&nbsp;</div>
      <div class="leftwz">{{ tabname }}</div>
    </div>
    <div class="right">
      <div></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MyTabbbar",
  props: {
    tabname: {
      type: String,
      default: "左上角名称",
    },
  },
};
</script>

<style scoped>
.Sytabbar {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  height: 50px;
  width: 100%;
  box-sizing: border-box;
}
.left {
  display: flex;
  align-items: center;
  justify-content: center;
}
.Sytabbar .leftjt {
  font-size: 13px;
  color: rgba(131, 186, 255, 1);
}
.Sytabbar .leftwz {
  font-size: 14px;
  font-family: Microsoft YaHei;
  font-weight: bold;
  color: #cff7ff;
}
</style>
>
