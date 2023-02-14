<template>
  <el-dialog title="添加数据" :visible.sync="dialogVisible">
    <el-form
      ref="form"
      label-width="80px"
      style="display: flex; flex-wrap: wrap"
    >
      <div v-for="(item, index) in addimg" :key="index" class="controlImg">
        <img
          :src="item"
          alt=""
          width="150px"
          height="150px"
          style="margin: 4px"
        />
      </div>
      <div class="myinput">
        <img
          src="../../public/img/add.png"
          alt=""
          width="150px"
          height="150px"
        />
        <input
          type="file"
          ref="myfile"
          class="myfile"
          :multiple="multiple"
          @change="soonUnload"
        />
      </div>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="cancelimg">取 消</el-button>
      <el-button type="submit" @click="onSubmit">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
import axios from "axios";
export default {
  props: {
    dialogVisible: {
      type: Boolean,
      default: false,
    },
    // 是否能上传多个图片
    multiple: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      addimg: [],
    };
  },
  methods: {
    //用户点击取消
    cancelimg() {
      this.$emit("addimgspotEvent", false);
      this.$refs.myfile.value = "";
      this.addimg = [];
    },
    //用户提交图片
    onSubmit() {
      let param = new FormData();
      for (let i = 0; i < this.$refs.myfile.files.length; i++) {
        param.append("avatar", this.$refs.myfile.files[i]);
      }
      if (this.$route.params.id) {
        param.append("post_id", this.$route.params.id);
      }
      this.$emit("addimgspotEvent", false);
      axios({
        url: "http://127.0.0.1:8080/api/addimg",
        method: "POST",
        headers: { "Content-Type": "multipart/form-data" },
        data: param,
      }).then((res) => {
        this.$emit("changeimgpost", res.data.data);
      });
    },
    //遍历file，实时显示图片
    soonUnload() {
      let _that = this;
      let reader = new FileReader();
      handleFile(0);
      function handleFile(i) {
        let file = _that.$refs.myfile.files[i];
        reader.readAsDataURL(file);
        reader.onload = () => {
          _that.addimg.push(reader.result);
          i++;
          if (i < _that.$refs.myfile.files.length) {
            handleFile(i);
          }
        };
      }
    },
  },
};
</script>
<style scoped>
.controlImg {
  height: 150px;
  width: 150px;
  box-sizing: border-box;
  position: relative;
}
.controlImg i {
  position: absolute;
  top: 10px;
  right: 5px;
  color: aliceblue;
}
.myinput {
  position: relative;
}
.myfile {
  width: 150px;
  height: 150px;
  opacity: 0;
  position: absolute;
  left: 0;
  top: 0;
}
</style>