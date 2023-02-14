<template>
  <div>
    <el-table
      :data="introduce[showPage]"
      style="height: 500px"
      @row-click="gotodetails"
    >
      <el-table-column prop="Id" label="Id" width="60"> </el-table-column>
      <el-table-column prop="name" label="名称" width="120"> </el-table-column>
      <el-table-column prop="introduce" label="简介"> </el-table-column>
      <el-table-column label="图片">
        <template slot-scope="scope">
          <img :src="scope.row.imgsrc" alt="" width="300px" height="200px" />
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="pagesize"
        layout="prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>
  </div>
</template>
<script>
import { getSpotintroduce } from "../../request/apihandle";
export default {
  data() {
    return {
      introduce: [],
      showPage: 0,
      currentPage: 1,
      total: 1,
      pagesize: 2,
    };
  },
  mounted() {
    getSpotintroduce().then((res) => {
      this.total = res.data.data.length;
      let width = this.pagesize;
      let data = [];
      let mylength = res.data.data.length - (res.data.data.length % width);
      res.data.data.forEach((item, index) => {
        data.push(item);
        if ((index + 1) % width === 0 && index !== 0 && index + 1 <= mylength) {
          this.introduce.push(data);
          data = [];
        }
        if (index + 1 > mylength && index + 1 === res.data.data.length) {
          this.introduce.push(data);
        }
      });
    });
  },
  methods: {
    gotodetails(val) {
      this.$router.push("/home/routerdetail/" + val.Id);
    },
    handleCurrentChange() {
      this.showPage = this.currentPage - 1;
    },
  },
};
</script>
<style scoped>
.pagination {
  position: absolute;
  bottom: 150px;
  right: 130px;
}
</style>