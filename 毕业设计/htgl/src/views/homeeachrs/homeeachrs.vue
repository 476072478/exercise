<template>
  <div class="myhomeeachrs">
    <el-row :gutter="20">
      <el-col :span="8">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>用户收藏最多</span>
          </div>
          <div
            v-for="item in userLike_count"
            :key="item.id"
            class="text item"
            @click="gotoDetail(item.id)"
          >
            {{ item.name }}
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>用户评论最多</span>
          </div>
          <div
            v-for="item in userComment"
            :key="item.id"
            class="text item"
            @click="gotoDetail(item.id)"
          >
            {{ item.name }}
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card :body-style="{ padding: '0px' }">
          <img
            src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
            class="image"
          />
          <div style="padding: 14px" class="adminInfo">
            <el-avatar
              src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
            ></el-avatar>
            <div>
              <p>{{ this.$store.state.adminInfo.adminname }}</p>
              <p>
                <span>权限</span> {{ this.$store.state.adminInfo.adminjob }}
              </p>
            </div>
          </div>
          <div class="adminbutton">
            <div>
              <i class="el-icon-setting"></i>
            </div>
            <div>
              <i class="el-icon-edit"></i>
            </div>
            <div>
              <i class="el-icon-more"></i>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <div ref="main" id="main"></div>
  </div>
</template>
<script>
import { getallspotdata, getAllUserComment } from "@/request/apihandle.js";
import * as echarts from "echarts";
export default {
  data() {
    return {
      // 用户收藏排序
      like_count: [],
      // 用户评论排序
      user_comment: [],
      // 不同景区用户评论数量
      middledata: {},
      maxNumber: 10,
      echartsdata: [0, 0, 0],
      echartobj: null,
    };
  },
  computed: {
    userLike_count() {
      return this.like_count.filter((item, index) => {
        if (index < this.maxNumber) {
          return true;
        } else {
          return false;
        }
      });
    },
    userComment() {
      return this.user_comment.filter((item, index) => {
        if (index < this.maxNumber) {
          return true;
        } else {
          return false;
        }
      });
    },
  },
  mounted() {
    this.echartobj = echarts.init(this.$refs.main);
    window.onresize = () => {
      this.echartobj.resize();
    };
    getallspotdata().then((res) => {
      res.data.data.forEach((item) => {
        if (item.cover_id === 0) {
          this.echartsdata[0]++;
        }
        if (item.cover_id === 1) {
          this.echartsdata[1]++;
        }
        if (item.cover_id === 2) {
          this.echartsdata[2]++;
        }
      });
      this.like_count = [
        ...res.data.data.sort((a, b) => b.like_count - a.like_count),
      ];
      this.user_comment = [...res.data.data];
      getAllUserComment().then((res) => {
        res.data.data.forEach((element) => {
          let stringNumber = JSON.stringify(element.spot_id);
          if (Object.keys(this.middledata).includes(stringNumber)) {
            this.middledata[stringNumber]++;
          } else {
            this.middledata[stringNumber] = 0;
          }
        });
        this.getallInof();
        this.initeachrs();
      });
    });
  },
  methods: {
    getallInof() {
      this.user_comment.map((item) => {
        if (Object.keys(this.middledata).includes(JSON.stringify(item.id))) {
          item["commentnumber"] = this.middledata[JSON.stringify(item.id)];
          return item;
        } else {
          item["commentnumber"] = 0;
          return item;
        }
      });
      this.user_comment.sort((a, b) => b.commentnumber - a.commentnumber);
    },
    // 前往景区详情管理页面
    gotoDetail(id) {
      this.$router.push("/home/spotdetail/" + id);
    },
    initeachrs() {
      // 基于准备好的dom，初始化echarts实例
      // 绘制图表
      this.echartobj.setOption({
        title: {
          text: "吃住游各类型数量",
        },
        tooltip: {},
        xAxis: {
          data: ["游", "住", "吃"],
        },
        yAxis: {},
        series: [
          {
            name: "类型",
            type: "bar",
            data: this.echartsdata,
          },
        ],
      });
    },
  },
  destroyed() {
    window.onresize = null;
  },
};
</script>
<style scoped>
.myhomeeachrs {
  padding: 30px;
}
.el-row {
  margin-bottom: 20px;
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
  height: 450px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
  cursor: pointer;
}
.item:hover {
  color: #99a9bf;
}
.image {
  width: 100%;
  height: 100%;
  display: block;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}
.adminInfo {
  display: flex;
}
.adminInfo div p {
  font-size: 16px;
  height: 20px;
  line-height: 20px;
  padding: 5px 15px;
}
.adminbutton {
  display: flex;
}
.adminbutton div {
  border: 1px solid #d3dce6;
  height: 50px;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
#main {
  width: 100%;
  height: 400px;
}
</style>