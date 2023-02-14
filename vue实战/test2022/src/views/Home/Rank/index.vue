<template>
  <div class="outer">
    <div class="rank">
      <div class="tab">
        <div class="tab-tit clearfix">
          <a href="javascript:;" class="on">
            <p class="img">
              <i></i>
            </p>
            <p class="text">热卖排行</p>
          </a>
          <a href="javascript:;">
            <p class="img">
              <i></i>
            </p>
            <p class="text">特价排行</p>
          </a>
          <a href="javascript:;">
            <p class="img">
              <i></i>
            </p>
            <p class="text">新品排行</p>
          </a>
        </div>
      </div>
      <div class="content">
        <ul>
          <li>
            <div class="img-item">
              <p class="tab-pic">
                <a href="#">
                  <img src="./images/1.jpg" />
                </a>
              </p>
              <div class="tab-info">
                <div class="info-title">
                  <a href="#"
                    >【官网价直降1100】Apple iPhone 8 Plus 256GB 银色
                    移动联通电信4G手机</a
                  >
                </div>
                <p class="info-price">定金：¥100.00</p>
              </div>
            </div>
            <div class="img-item">
              <p class="tab-pic">
                <a href="#">
                  <img src="./images/1.jpg" />
                </a>
              </p>
              <div class="tab-info">
                <div class="info-title">
                  <a href="#"
                    >【官网价直降1100】Apple iPhone 8 Plus 256GB 银色
                    移动联通电信4G手机</a
                  >
                </div>
                <p class="info-price">定金：¥100.00</p>
              </div>
            </div>
            <div class="img-item">
              <p class="tab-pic">
                <a href="#">
                  <img src="./images/1.jpg" />
                </a>
              </p>
              <div class="tab-info">
                <div class="info-title">
                  <a href="#"
                    >【官网价直降1100】Apple iPhone 8 Plus 256GB 银色
                    移动联通电信4G手机</a
                  >
                </div>
                <p class="info-price">定金：¥100.00</p>
              </div>
            </div>
            <div class="img-item">
              <p class="tab-pic">
                <a href="#">
                  <img src="./images/1.jpg" />
                </a>
              </p>
              <div class="tab-info">
                <div class="info-title">
                  <a href="#"
                    >【官网价直降1100】Apple iPhone 8 Plus 256GB 银色
                    移动联通电信4G手机</a
                  >
                </div>
                <p class="info-price">定金：¥100.00</p>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<style scoped>
.outer .rank {
  width: 1200px;
  margin: 0 auto;
}
.outer .rank .tab {
  margin: 0 auto;
  overflow: hidden;
  width: 312px;
}
.outer .rank .tab .tab-tit {
  text-align: center;
}
.outer .rank .tab .tab-tit a {
  display: block;
  padding: 0 18px;
  float: left;
  text-decoration: none;
  font-size: 16px;
  color: #999;
}
.outer .rank .tab .tab-tit a p {
  margin: 5px 0;
}
.outer .rank .tab .tab-tit a .img i {
  width: 35px;
  height: 35px;
  display: block;
  background: url(./images/bg0.png);
  margin-left: 10px;
}
.outer .rank .tab .tab-tit a .text {
  line-height: 28px;
}
.outer .rank .tab .tab-tit .on {
  color: #e60012;
}
.outer .rank .tab .tab-tit .on .img i {
  background-position: -35px 0;
}
.outer .rank .content {
  overflow: hidden;
  padding: 10px;
}
.outer .rank .content ul li {
  overflow: hidden;
  list-style: none;
  line-height: 18px;
}
.outer .rank .content ul li .img-item {
  border: 1px solid #e1251b;
  width: 269px;
  float: left;
  overflow: hidden;
  margin: 0 12px 10px;
  background: #fff;
}
.outer .rank .content ul li .img-item .tab-pic {
  width: 230px;
  height: 210px;
  overflow: hidden;
  text-align: center;
  margin: 5px auto 18px;
}
.outer .rank .content ul li .img-item .tab-pic a img {
  width: 200px;
  height: 200px;
}
.outer .rank .content ul li .img-item .tab-info {
  background: #fafafa;
}
.outer .rank .content ul li .img-item .tab-info .info-title {
  height: 50px;
  line-height: 28px;
  overflow: hidden;
  margin: 0 auto;
  padding-left: 10px;
}
.outer .rank .content ul li .img-item .tab-info .info-title a {
  color: #333;
  text-decoration: none;
}
.outer .rank .content ul li .img-item .tab-info .info-price {
  font-size: 20px;
  color: #e1251b;
  height: 35px;
  padding-left: 10px;
  display: block;
  line-height: 24px;
  margin: 10px auto 0;
}
</style>