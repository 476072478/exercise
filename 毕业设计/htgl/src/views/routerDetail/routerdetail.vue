<template>
  <div>
    <el-page-header @back="goBack"> </el-page-header>
    <el-tabs type="card" class="mycard" value="first">
      <el-tab-pane label="详情管理" name="first">
        <el-descriptions :column="3" border>
          <el-descriptions-item
            v-for="(item, key, index) in detailData"
            :key="index"
            :label="key"
            label-class-name="my-label"
            content-class-name="my-content"
          >
            <el-input
              type="textarea"
              :disabled="key === 'Id' || key === 'imgsrc' ? true : textdata"
              :autosize="{ minRows: 2, maxRows: 4 }"
              v-model="detailData[key]"
              @input="userChangeInfo"
            ></el-input>
          </el-descriptions-item>
        </el-descriptions>
        <div class="elbuttonstyle">
          <el-button
            type="primary"
            @click="changeTableData"
            :disabled="!suerChange"
            >修改数据</el-button
          >
          <el-button type="success" :disabled="suerChange" @click="changeInfo"
            >确认修改</el-button
          >
          <el-button type="warning" @click="changeImg">更换图片</el-button>
        </div>
      </el-tab-pane>
      <el-tab-pane label="路线管理" name="second">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="origin" label="起点">
            <template slot-scope="scope">
              <el-input v-model.number="scope.row.origin" :disabled="sureadd">
              </el-input>
            </template>
          </el-table-column>
          <el-table-column prop="destination" label="终点">
            <template slot-scope="scope">
              <el-input
                v-model.number="scope.row.destination"
                :disabled="sureadd"
              >
              </el-input>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="120">
            <template slot-scope="scope" v-if="scope.$index < tableDataLength">
              <el-button type="danger" @click="deleteCheckRow(scope.row.id)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <div class="elbuttonstyle">
          <el-button type="success" round @click="addRoute">添加路径</el-button>
          <el-button
            type="success"
            round
            @click="sueraddRoute"
            :disabled="sureadd"
            >确认添加</el-button
          >
        </div></el-tab-pane
      >
    </el-tabs>
    <addimgspot
      :dialogVisible="dialogVisible"
      :multiple="multiple"
      @addimgspotEvent="addimgspotEvent"
      @changeimgpost="changeimgpost"
    ></addimgspot>
  </div>
</template>
<script>
import addimgspot from "@/components/addimgspot";
import {
  gettravelrouter,
  addUserRoute,
  deleteRoute,
  updateRouteSpotInfo,
} from "../../request/apihandle";
export default {
  data() {
    return {
      // 景区线路推荐信息
      tableData: [],
      // 景区线路推荐信息的长度
      tableDataLength: 0,
      // 数据是否能够修改
      textdata: true,
      //确认添加按钮是否禁用
      sureadd: true,
      // 景区信息
      detailData: {},
      //确认修改按钮与修改数据按钮是否禁用
      suerChange: true,
      //提交图片框显示与隐藏
      dialogVisible: false,
      // 是否能上传多个图片
      multiple: false,
    };
  },
  components: {
    addimgspot,
  },
  mounted() {
    this.getrouter();
  },
  methods: {
    // 图片上传后 后端返回的信息
    changeimgpost(data) {
      this.detailData.imgsrc = data[0].imgsrc;
      this.changeInfo();
    },
    // 子组件点击取消按钮
    addimgspotEvent(data) {
      this.dialogVisible = data;
    },
    // 点击更换图片
    changeImg() {
      this.dialogVisible = true;
    },
    // 点击修改数据
    changeTableData() {
      // 数据能够修改
      this.textdata = false;
    },
    // 用户修改了数据
    userChangeInfo() {
      // 确认修改按钮取消禁用
      this.suerChange = false;
    },
    // 用户点击确认修改
    changeInfo() {
      this.suerChange = true;
      updateRouteSpotInfo(this.detailData).then((res) => {
        if (res.data.status === 0) {
          this.$message({
            message: "恭喜你，更新成功",
            type: "success",
          });
        } else {
          this.$message.error("更新失败，请检查您的网络");
        }
      });
    },
    // 返回上一级页面
    goBack() {
      this.$router.back();
    },
    // 向后端发送请求获取数据
    getrouter() {
      gettravelrouter(this.$route.params.id).then((res) => {
        this.tableData = res.data.data[0];
        this.tableDataLength = res.data.data[0].length;
        this.detailData = res.data.data[1];
      });
    },
    // 用户删除路径
    deleteCheckRow(id) {
      this.$confirm("此操作将永久删除该路径, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true,
      })
        .then(() => {
          deleteRoute(id).then(() => {
            this.getrouter();
            this.$message({
              type: "success",
              message: "删除成功!",
            });
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    // 用户添加路径
    addRoute() {
      this.sureadd = false;
      this.tableData.push({ spot_id: this.$route.params.id });
    },
    // 用户确认路径添加并向后端发送请求
    sueraddRoute() {
      this.sureadd = true;
      let valve = true;
      let newrouteData = this.tableData.filter((item, index) => {
        if (!item.destination) {
          valve = false;
          this.$message.error("有信息未填写完整");
        }
        return index >= this.tableDataLength;
      });
      if (valve) {
        addUserRoute(newrouteData).then(() => {
          this.getrouter();
          this.$message({
            message: "恭喜你，添加成功",
            type: "success",
          });
        });
      } else {
        this.getrouter();
      }
    },
  },
};
</script>
<style scoped>
.elbuttonstyle {
  float: right;
  margin: 30px 20px;
}
.mycard {
  margin: 25px 20px;
  height: 100%;
}
</style>