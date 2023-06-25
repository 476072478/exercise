<template>
  <el-row class="tac">
    <el-col>
      <el-menu
        :default-active="defaultNumber"
        class="el-menu-vertical-demo"
        background-color="#324057"
        text-color="#ffffff"
        active-text-color="rgba(0, 255, 255, 1)"
      >
        <el-menu-item
          v-for="item in sidemenu"
          :index="item.id"
          :key="item.id"
          @click="changePage(item)"
        >
          <i :class="item.icon"></i>
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
          icon:'el-icon-s-home'
        },
        {
          id: "2",
          name: "管理景区",
          key: "/home/administerspot",
          icon:'el-icon-s-opportunity'
        },
        {
          id: "3",
          name: "增加景区",
          key: "/home/addscenicspot",
          icon:"el-icon-circle-plus"
        },
        {
          id: "4",
          name: "线路管理",
          key: "/home/routeradminister",
          icon:'el-icon-place'
        },
        {
          id: "5",
          name: "添加线路",
          key: "/home/addroutespot",
          icon:'el-icon-add-location'
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
