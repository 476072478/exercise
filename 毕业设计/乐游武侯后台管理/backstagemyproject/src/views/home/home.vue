<template>
  <div id="app">
    <el-header>
      Header
      <div>
        <div>
          <el-avatar
            src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
          ></el-avatar>
        </div>
        欢迎回来{{ this.$store.state.adminInfo.adminname }}!
        <el-dropdown @command="outLogin">
          <span class="el-dropdown-link">
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>{{
              this.$store.state.adminInfo.adminjob
            }}</el-dropdown-item>
            <el-dropdown-item command="a">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <sidemenu></sidemenu>
      </el-aside>
      <el-main>
        <span>{{ this.$route.meta.name }}</span>
        <div class="main">
          <router-view></router-view>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import sidemenu from "@/views/sandbox/sideMenu/sidemenu.vue";
import { mapState } from "vuex";
export default {
  data() {
    return {};
  },
  mounted() {},
  components: {
    sidemenu,
  },
  computed: {
    ...mapState(["mainspan"]),
  },
  methods: {
    outLogin(command) {
      if (command === "a") {
        this.$store.dispatch("deleteadmininfo");
        this.$router.push("/login");
      }
    },
  },
};
</script>


<style lang="scss">
* {
  margin: 0;
  padding: 0;
}
.el-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #cbcfd4;
  line-height: 60px;
  background-color: #324057;
  font-size: 25px;
  div {
    font-size: 15px;
    display: flex;
    align-items: center;
    div {
      padding: 0 5px;
    }
  }
}

.el-aside {
  background-color: #ffffff;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  span {
    position: relative;
    left: 0;
    top: 0;
    font-size: 14px;
  }
  .main {
    margin: 10px 0;
    background-color: #ffffff;
    height: 92%;
    box-sizing: border-box;
    padding: 10px;
    overflow-y: scroll;
  }
}
.el-container {
  height: 90vh;
}
</style>

