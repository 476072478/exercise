<template>
  <div class="spotdetailbox">
    <el-page-header @back="goBack"> </el-page-header>
    <div class="mydescriptions">
      <el-tabs type="border-card" class="mycard">
        <!-- 景区管理界面 -->
        <el-tab-pane label="景区管理">
          <el-descriptions :column="4" border>
            <el-descriptions-item
              v-for="(item, key) in postDetail"
              :label="key"
              :key="item.id"
            >
              <el-input
                type="textarea"
                :disabled="
                  key === 'id' || key === 'cover_id' ? true : controller
                "
                :autosize="{ minRows: 2, maxRows: 4 }"
                v-model.number="postDetail[key]"
                placeholder="请输入内容"
                @change="userChangeInfo"
              ></el-input>
            </el-descriptions-item>
          </el-descriptions>
          <div class="elbuttonstyle">
            <el-button type="primary" round @click="changeDataDetailOne">{{
              controller ? "修改数据" : "取消修改"
            }}</el-button>
            <el-button
              type="success"
              round
              @click="confirmChange"
              :disabled="suerButton"
              >确认修改</el-button
            >
          </div>
        </el-tab-pane>
        <!-- 评论管理界面 -->
        <el-tab-pane label="评论管理" class="mycardtwo">
          <el-table :data="userComment" style="width: 100%">
            <el-table-column prop="id" label="id" width="100">
            </el-table-column>
            <el-table-column prop="comment_time" label="评论时间">
            </el-table-column>
            <el-table-column prop="user_id" label="用户id"> </el-table-column>
            <el-table-column prop="username" label="用户名称">
            </el-table-column>
            <el-table-column prop="usertext" label="评论内容">
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="120">
              <template slot-scope="scope">
                <el-button
                  @click.native.prevent="deleteRow(scope.$index, userComment)"
                  type="danger"
                  icon="el-icon-delete"
                >
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <!-- 图片地址界面 -->
        <el-tab-pane label="图片地址">
          <el-table
            ref="multipleTable"
            :data="imgpost"
            tooltip-effect="dark"
            style="width: 100%"
            height="320"
          >
            <el-table-column prop="id" label="id" width="100">
            </el-table-column>
            <el-table-column prop="imgsrc" label="图片地址"> </el-table-column>
            <el-table-column prop="spot_id" label="所属景区"> </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button
                  @click.native.prevent="deleteimgspot(scope.$index, imgpost)"
                  type="danger"
                  icon="el-icon-delete"
                >
                </el-button>
              </template>
            </el-table-column>
          </el-table>
          <div class="elbuttonstyle">
            <el-button type="primary" round @click="addimgdata"
              >添加数据</el-button
            >
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <addimgspot
      :dialogVisible="dialogVisible"
      @addimgspotEvent="addimgspotEvent"
      @changeimgpost="changeimgpost"
    ></addimgspot>
  </div>
</template>
<script>
import {
  getspotDetail,
  deleteUserComment,
  deleteImgSpot,
  changeSpotInfo,
} from "../../request/apihandle.js";
import addimgspot from "@/components/addimgspot";
export default {
  data() {
    return {
      postDetail: {},
      userComment: [],
      imgpost: [],
      //修改数据和取消修改显示
      controller: true,
      //备份数据
      Backupdata: {},
      dialogVisible: false,
      head: "http://127.0.0.1:8080/public",
      //确认修改按钮
      suerButton: true,
    };
  },
  components: {
    addimgspot,
  },
  mounted() {
    getspotDetail(this.$route.params.id).then((res) => {
      this.postDetail = res.data.data[0];
      this.userComment = res.data.data[1];
      this.imgpost = res.data.data[2];
      this.Backupdata = { ...res.data.data[0] };
      console.log(this.Backupdata);
    });
  },
  methods: {
    // 用户评论
    userChangeInfo() {
      if (this.postDetail != { ...this.Backupdata }) {
        this.suerButton = false;
      }
    },
    // 返回上一级页面
    goBack() {
      this.$router.back();
    },
    //取消修改与确认修改交换
    changeDataDetailOne() {
      if (!this.controller) {
        this.postDetail = { ...this.Backupdata };
      }
      this.controller = !this.controller;
    },
    //确认修改景区信息
    confirmChange() {
      // 将输入框变为不可修改
      this.controller = true;
      // 将确定框变为不可点击
      this.suerButton = true;
      // 同步前端数据
      this.Backupdata = { ...this.postDetail };
      changeSpotInfo(this.postDetail);
    },
    //删除用户评论
    deleteRow(index, data) {
      this.$confirm("此操作将永久删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          deleteUserComment(data[index].id).then((res) =>
            this.$message({
              type: "success",
              message: `${res.data.data}`,
            })
          );
          data.splice(index, 1);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    //删除图片地址
    deleteimgspot(index, data) {
      this.$confirm("此操作将永久删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          deleteImgSpot(data[index].id).then((res) =>
            this.$message({
              type: "success",
              message: `${res.data.data}`,
            })
          );
          data.splice(index, 1);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    //打开提交图片窗口
    addimgdata() {
      this.dialogVisible = true;
    },
    //子组件修改dialogVisible
    addimgspotEvent(blur) {
      this.dialogVisible = blur;
    },
    //同步前端展示图片地址
    changeimgpost(data) {
      this.imgpost = data;
    },
  },
};
</script>
<style scoped>
.my-label {
  background: #e1f3d8;
}

.my-content {
  background: #fde2e2;
}
.mydescriptions {
  margin: 25px 20px;
  height: 100%;
}
.spotdetailbox {
  height: 80%;
}
.mycard {
  height: 100%;
}
.mycardtwo {
  height: 420px;
  overflow-x: hidden;
  overflow-y: scroll;
}
.elbuttonstyle {
  float: right;
  margin: 30px 0;
}
</style>