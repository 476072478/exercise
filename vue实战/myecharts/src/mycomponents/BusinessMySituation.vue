<template>
  <BjTp width="847px" height="520px">
    <MyTabbar tabname="业务办理情况" />
    <div class="allys" style="bottom: 38px; left: 89px">
      <div class="yqys">
        <div class="yqtp">
          <img src="../assets/xyq.png" alt="" width="100%" height="100%" />
        </div>
        <div class="yqwz">
          <div>36125</div>
          <div>涉案财物</div>
        </div>
      </div>
      <div class="sjys">
        <div class="rkl">
          <div>入库率:</div>
          <div class="bfh">20%</div>
        </div>
        <div class="czl">
          <div>处置率:</div>
          <div class="bfh">35%</div>
        </div>
      </div>
      <div class="arrow1">
        <img src="../assets/arrow3.png" alt="" />
      </div>
    </div>
    <div class="allys" style="bottom: 246px; left: 89px">
      <div class="yqys">
        <div class="yqtp">
          <img src="../assets/xyq.png" alt="" width="100%" height="100%" />
        </div>
        <div class="yqwz">
          <div>81267</div>
          <div>接处警</div>
        </div>
      </div>
      <div class="sjys">
        <div class="rkl">
          <div>入库率:</div>
          <div class="bfh">20%</div>
        </div>
        <div class="czl">
          <div>处置率:</div>
          <div class="bfh">35%</div>
        </div>
      </div>
      <div class="arrow1">
        <img src="../assets/arrow1.png" alt="" />
      </div>
    </div>
    <div
      class="allys"
      style="bottom: 376px; left: 370px; width: 246px; height: 110px"
    >
      <div class="yqys">
        <div class="yqtp">
          <img src="../assets/xyq.png" alt="" width="100%" height="100%" />
        </div>
        <div class="yqwz">
          <div>35060</div>
          <div>均衡量裁</div>
        </div>
      </div>
      <div class="sjys" style="margin-left: 7px; margin-top: 0">
        <div class="rkl">
          <div>入库率:</div>
          <div class="bfh">20%</div>
        </div>
        <div class="czl">
          <div>处置率:</div>
          <div class="bfh">35%</div>
        </div>
      </div>
      <div class="arrow3">
        <img src="../assets/arrow5.png" alt="" />
      </div>
    </div>
    <div class="allys" style="bottom: 246px; left: 630px">
      <div class="yqys">
        <div class="yqtp">
          <img src="../assets/xyq.png" alt="" width="100%" height="100%" />
        </div>
        <div class="yqwz">
          <div>20538</div>
          <div>刑事案件</div>
        </div>
      </div>
      <div class="sjys">
        <div class="rkl">
          <div>入库率:</div>
          <div class="bfh">20%</div>
        </div>
        <div class="czl">
          <div>处置率:</div>
          <div class="bfh">35%</div>
        </div>
      </div>
      <div class="arrow2">
        <img src="../assets/arrow2.png" alt="" />
      </div>
    </div>
    <div class="allys" style="bottom: 38px; left: 630px">
      <div class="yqys">
        <div class="yqtp">
          <img src="../assets/xyq.png" alt="" width="100%" height="100%" />
        </div>
        <div class="yqwz">
          <div>15837</div>
          <div>行政案件</div>
        </div>
      </div>
      <div class="sjys">
        <div class="rkl">
          <div>入库率:</div>
          <div class="bfh">20%</div>
        </div>
        <div class="czl">
          <div>处置率:</div>
          <div class="bfh">35%</div>
        </div>
      </div>
      <div class="arrow2">
        <img src="../assets/arrow4.png" alt="" />
      </div>
    </div>
    <div class="center">
      <img src="../assets/ywblqk.png" alt="" />
    </div>
  </BjTp>
</template>

<script>
export default {
  name: "businessSituation",
  components: {},
};
</script>

<style>
@keyframes rotateyqtp {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.allys {
  width: 131px;
  height: 166px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  position: absolute;
}
.allys .arrow1 {
  position: absolute;
  top: 36px;
  left: 131px;
}
.allys .arrow2 {
  position: absolute;
  top: 40px;
  right: 131px;
}
.allys .arrow3 {
  position: absolute;
  top: 117px;
  left: 49px;
}
.yqtp {
  position: absolute;
  top: 0;
  left: 0;
  width: 110px;
  height: 110px;
  animation: rotateyqtp 2s linear infinite;
  transform-origin: 55px 55px;
}
.yqys {
  width: 110px;
  height: 110px;
  position: relative;
}
.yqwz {
  position: absolute;
  top: 35px;
  left: 31px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
}
.yqwz :nth-child(1) {
  text-align: center;
  width: 45px;
  height: 20px;
  font-size: 26px;
  font-family: Agency FB;
  font-weight: 400;
  color: #00ffff;
}
.yqwz :nth-child(2) {
  text-align: center;
  width: 50px;
  height: 11px;
  font-size: 12px;
  font-family: Microsoft YaHei;
  font-weight: bold;
  color: #ffffff;
  margin-top: 11px;
}
.sjys {
  width: 129px;
  height: 57px;
  background: rgba(41, 150, 204, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  font-size: 12px;
  margin-top: 6px;
}
.sjys .rkl,
.czl {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 81px;
  height: 11px;
  color: #ffffff;
}
.bfh {
  color: rgba(0, 255, 255, 1);
}
.center {
  position: absolute;
  bottom: 164px;
  left: 350px;
  width: 150px;
  height: 60px;
}
</style>
