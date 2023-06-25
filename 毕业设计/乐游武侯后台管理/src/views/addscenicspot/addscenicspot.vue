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
    <el-button type="primary" round @click="submitspot" class="elbuttonstyle"
      >提交</el-button
    >
  </div>
</template>
<script>
import { addscenicSpotInfo } from "../../request/apihandle";
export default {
  data() {
    return {
      formdata: {
        "fraction(评分)": 0,
        "price(价格)": 0,
        "name(名称)": "",
        "text(描述)": "",
        "position(地址)": "",
        "cover_id(所属类别)": 0,
        "like_count(收藏人数)": 0,
        "bigname(大标题)": "",
        "ranking(排名)": "",
        "label(小标题)": "",
        "detailText(详细标题)": "",
      },
    };
  },
  methods: {
    submitspot() {
      let data = this.formdata;
      let switchs = true;
      let newformdata = {};
      for (let i in data) {
        i.split("").forEach((item, index) => {
          if (item === "(") {
            newformdata[i.split("").splice(0, index).join("")] =
              this.formdata[i];
          }
        });
      }
      newformdata["imgsrc"] = "";
      for (let j in newformdata) {
        if (newformdata[j] === "") {
          switchs = false;
          this.$message({
            message: `${j}没有填写`,
            type: "warning",
          });
          return;
        }
      }
      if (switchs) {
        addscenicSpotInfo(newformdata).then((res) =>
          this.$confirm("景区添加成功，是否跳转到该景区管理界面？", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "success",
          })
            .then(() => {
              this.$router.push("/spotdetail/" + res.data.data);
            })
            .catch(() => {
              this.$message({
                type: "info",
                message: "已取消跳转",
              });
            })
        );
      }
    },
  },
};
</script>
<style scoped>
.elbuttonstyle {
  float: right;
  margin: 30px 10px;
  width: 150px;
}
</style>
