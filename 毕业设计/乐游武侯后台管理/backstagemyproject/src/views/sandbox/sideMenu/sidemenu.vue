<template>
  <el-row class="tac">
    <el-col>
      <el-menu
        :default-active="defaultNumber"
        class="el-menu-vertical-demo"
        background-color="#ffffff"
        text-color="#9eabc7"
        active-text-color="#0F100D"
      >
        <el-menu-item
          v-for="item in sidemenu"
          :index="item.id"
          :key="item.id"
          @click="changePage(item)"
        >
          <i class="el-icon-house"></i>
          <span slot="title">{{ item.name }}</span>
        </el-menu-item>
      </el-menu>
    </el-col>
  </el-row>
</template>
<script>
export default {
  data() {
    return {
      sidemenu: [
        {
          id: "1",
          name: "首页",
          key: "/home/homeeachrs",
        },
        {
          id: "2",
          name: "管理景区",
          key: "/home/administerspot",
        },
        {
          id: "3",
          name: "增加景区",
          key: "/home/addscenicspot",
        },
        {
          id: "4",
          name: "线路管理",
          key: "/home/routeradminister",
        },
        {
          id: "5",
          name: "添加线路",
          key: "/home/addroutespot",
        },
      ],
      defaultNumber: "1",
    };
  },
  mounted() {
    let data = this.sidemenu.filter((item) => item.key === this.$route.path)[0];
    this.defaultNumber = (data && data.id) || "";
  },
  methods: {
    changePage(data) {
      this.$router.push({
        name: `${data.key}`,
      });
    },
  },
};
</script>
<style scoped>
</style>
