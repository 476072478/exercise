<template>
  <div class="outer">
    <header class="header">
      <!-- 头部的第一行 -->
      <div class="top">
        <div class="container">
          <div class="loginList">
            <p>尚品汇欢迎您！</p>
            <p v-if="!list">
              <span>请</span>
              <router-link to="/login">
                <a>登录</a>
              </router-link>
              <router-link to="/register">
                <a class="register">免费注册</a>
              </router-link>
            </p>
            <p v-if="list">
              <span>欢迎您！| </span>
              <a>{{ list }} | </a>
              <a @click="handlereLogin">退出登录</a>
            </p>
          </div>
          <div class="typeList">
            <a @click="tocenter">我的订单</a>
            <a @click="toshopsList">我的购物车</a>
            <a>我的尚品汇</a>
            <a>尚品汇会员</a>
            <a>企业采购</a>
            <a>关注尚品汇</a>
            <a>合作招商</a>
            <a>商家后台</a>
          </div>
        </div>
      </div>
      <!--头部第二行 搜索区域-->
      <div class="bottom">
        <h1 class="logoArea">
          <a
            class="logo"
            title="尚品汇"
            target="_blank"
            @click="$router.push('/home')"
          >
            <img src="./images/logo.png" alt="" />
          </a>
        </h1>
        <div class="searchArea">
          <form action="###" class="searchForm">
            <input
              type="text"
              id="autocomplete"
              class="input-error input-xxlarge"
              v-model="keyword"
            />
            <button
              class="sui-btn btn-xlarge btn-danger"
              type="button"
              @click="toSearch"
            >
              搜索
            </button>
          </form>
        </div>
      </div>
    </header>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      keyword: "",
    };
  },
  methods: {
    toSearch() {
      let location = {
        name: "search",
        params: { keyword: this.keyword || undefined },
      };
      location.query = this.$route.query;
      this.keyword = "";
      this.$router.push(location);
    },
    //去购物车界面
    toshopsList() {
      this.$router.push({
        path: "/shopcart",
      });
    },
    handlereLogin() {
      this.$store.dispatch("cleartoken").then((res) => {
        if (res.data.code == 200) {
          this.$router.push("/home");
        }
      });
    },
    //去我的订单界面
    tocenter() {
      this.$router.push("/center");
    },
  },
  computed: {
    ...mapState({
      list: (res) => res.user.userInfo.name,
    }),
  },
};
</script>
<style scoped>
.outer .header > .top {
  background-color: #eaeaea;
  height: 30px;
  line-height: 30px;
  display: flex;
}
.outer .header > .top .container {
  width: 1200px;
  margin: 0 auto;
  overflow: hidden;
}
.outer .header > .top .container .loginList {
  float: left;
}
.outer .header > .top .container .loginList p {
  float: left;
  margin-right: 10px;
}
.outer .header > .top .container .loginList p .register {
  border-left: 1px solid #b3aeae;
  padding: 0 5px;
  margin-left: 5px;
}
.outer .header > .top .container .typeList {
  float: right;
}
.outer .header > .top .container .typeList a {
  padding: 0 10px;
}
.outer .header > .top .container .typeList a + a {
  border-left: 1px solid #b3aeae;
}
.outer .header > .bottom {
  width: 1200px;
  margin: 0 auto;
  overflow: hidden;
}
.outer .header > .bottom .logoArea {
  float: left;
}
.outer .header > .bottom .logoArea .logo img {
  width: 175px;
  margin: 25px 45px;
}
.outer .header > .bottom .searchArea {
  float: right;
  margin-top: 35px;
}
.outer .header > .bottom .searchArea .searchForm {
  overflow: hidden;
}
.outer .header > .bottom .searchArea .searchForm input {
  box-sizing: border-box;
  width: 490px;
  height: 32px;
  padding: 0px 4px;
  border: 2px solid #ea4a36;
  float: left;
}
.outer .header > .bottom .searchArea .searchForm input:focus {
  outline: none;
}
.outer .header > .bottom .searchArea .searchForm button {
  height: 32px;
  width: 68px;
  background-color: #ea4a36;
  border: none;
  color: #fff;
  float: left;
  cursor: pointer;
}
.outer .header > .bottom .searchArea .searchForm button:focus {
  outline: none;
}
</style>