<template>
  <div v-if="tableData.length !== 0" style="height: 100%; position: relative">
    <el-table
      :data="tableData[showpage]"
      style="width: 100%; max-height: 75%"
      @row-click="gotodetails"
    >
      <el-table-column prop="id" label="id"> </el-table-column>
      <el-table-column prop="fraction" label="评分"> </el-table-column>
      <el-table-column prop="price" label="价格"> </el-table-column>
      <el-table-column prop="name" label="名称"> </el-table-column>
      <el-table-column prop="position" label="地址"> </el-table-column>
      <el-table-column prop="cover_id" label="所属类别"> </el-table-column>
      <el-table-column prop="like_count" label="收藏总数"> </el-table-column>
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
import { getallspotdata } from "../../request/apihandle.js";
export default {
  data() {
    return {
      tableData: [],
      showpage: 0,
      currentPage: 1,
      pagesize: 4,
      total: 0,
    };
  },
  mounted() {
    getallspotdata().then((res) => {
      //控制每个数组的长度
      this.total = res.data.data.length;
      let width = this.pagesize;
      let data = [];
      let mylength = res.data.data.length - (res.data.data.length % width);
      res.data.data.forEach((item, index) => {
        data.push(item);
        if ((index + 1) % width === 0 && index !== 0 && index + 1 <= mylength) {
          this.tableData.push(data);
          data = [];
        }
        if (index + 1 > mylength && index + 1 === res.data.data.length) {
          this.tableData.push(data);
        }
      });
    });
  },
  computed: {},
  methods: {
    handleCurrentChange(val) {
      this.showpage = val - 1;
    },
    gotodetails(row) {
      this.$router.push({
        path: "/home/spotdetail/" + row.id,
      });
    },
  },
};
</script>
<style scoped>
.pagination {
  position: absolute;
  bottom: 50px;
  right: 130px;
}
</style>