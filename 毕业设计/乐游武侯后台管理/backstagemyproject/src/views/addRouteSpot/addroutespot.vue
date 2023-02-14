<template>
  <div>
    <el-descriptions title="景区基本信息" border>
      <el-descriptions-item
        v-for="(item, key) in formdata"
        :label="[key]"
        :key="item"
      >
        <el-input
          type="textarea"
          v-model.number="formdata[key]"
          placeholder="请输入内容"
        ></el-input>
      </el-descriptions-item>
    </el-descriptions>
    <addimgspot
      :dialogVisible="dialogVisible"
      :multiple="multiple"
      @addimgspotEvent="addimgspotEvent"
      @changeimgpost="changeimgpost"
    ></addimgspot>
    <el-button type="success" round @click="checkImg" class="elbuttonstyle"
      >选择图片</el-button
    >
    <el-button type="primary" round @click="submitspot" class="elbuttonstyle"
      >提交</el-button
    >
  </div>
</template>
<script>
import addimgspot from "../../components/addimgspot.vue";
import { adminUploadSpotInfo } from "../../request/apihandle";
export default {
  data() {
    return {
      formdata: {
        "name(名称)": "",
        "introduce(介绍)": "",
        "imgsrc(图片地址)": "",
      },
      dialogVisible: false,
      // 是否能上传多个图片
      multiple: false,
    };
  },
  components: {
    addimgspot,
  },
  mounted() {},
  methods: {
    submitspot() {
      var rule = /[a-zA-Z]/g;
      let witch = true;
      let newformdata = {};
      for (let i in this.formdata) {
        if (this.formdata[i] === "") {
          witch = false;
          this.$message({
            message: ` ${i}未填写`,
            type: "warning",
          });
          return;
        }
        newformdata[i.match(rule).join("")] = this.formdata[i];
      }
      if (witch) {
        adminUploadSpotInfo(newformdata).then(() => {
          this.$message({
            message: `恭喜您，上传成功`,
            type: "success",
          });
        });
      }
    },
    checkImg() {
      this.dialogVisible = true;
    },
    // 图片上传组件点击取消
    addimgspotEvent() {
      this.dialogVisible = false;
    },
    // 上传图片后 后端返回的信息
    changeimgpost(data) {
      this.formdata["imgsrc(图片地址)"] = data;
    },
  },
};
</script>
<style scoped>
.elbuttonstyle {
  float: right;
  margin: 30px 10px;
  width: 120px;
}
</style>