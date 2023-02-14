<template>
  <div class="outer">
    <div class="type-nav">
      <div class="container" @mouseleave="ishide()">
        <div @mouseleave="ishide()">
          <h2 class="all" @mouseenter="isshow()">全部商品分类</h2>
          <transition name="xiaozhou">
            <div class="sort" v-show="isShow" @mouseleave="clearbackground()">
              <div class="all-sort-list2" @click="goSearch">
                <div
                  class="item"
                  v-for="(c1, index) in categoryList"
                  :key="c1.categoryId"
                >
                  <h3
                    @mouseenter="changebackground(index)"
                    :class="currentIndex == index ? 'background' : ''"
                  >
                    <a
                      :data-categoryName="c1.categoryName"
                      :data-category1Id="c1.categoryId"
                      >{{ c1.categoryName }}</a
                    >
                  </h3>
                  <div
                    class="item-list clearfix"
                    v-show="currentIndex === index"
                  >
                    <div class="subitem">
                      <dl
                        class="fore"
                        v-for="c2 in c1.categoryChild"
                        :key="c2.categoryId"
                      >
                        <dt>
                          <a
                            :data-categoryName="c2.categoryName"
                            :data-category2Id="c2.categoryId"
                            >{{ c2.categoryName }}</a
                          >
                        </dt>
                        <dd>
                          <em
                            v-for="c3 in c2.categoryChild"
                            :key="c3.categoryId"
                          >
                            <a
                              :data-categoryName="c3.categoryName"
                              :data-category3Id="c3.categoryId"
                              >{{ c3.categoryName }}</a
                            >
                          </em>
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </transition>
        </div>
        <nav class="nav">
          <a href="###">服装城</a>
          <a href="###">美妆馆</a>
          <a href="###">尚品汇超市</a>
          <a href="###">全球购</a>
          <a href="###">闪购</a>
          <a href="###">团购</a>
          <a href="###">有趣</a>
          <a href="###">秒杀</a>
        </nav>
      </div>
    </div>
  </div>
</template>
<style scoped>
.xiaozhou-enter {
  opacity: 0;
}
.xiaozhou-enter-to {
  opacity: 1;
}
.xiaozhou-enter-active {
  transition: all 0.2s linear;
}
.xiaozhou-leave {
  opacity: 1;
  background: #e1251b;
}
.xiaozhou-leave-to {
  opacity: 0;
}
.xiaozhou-leave-active {
  transition: all 0.2s linear;
}
.outer .type-nav {
  border-bottom: 2px solid #e1251b;
}
.outer .type-nav .container {
  width: 1200px;
  margin: 0 auto;
  display: flex;
  position: relative;
}
.outer .type-nav .container .all {
  width: 210px;
  height: 45px;
  background-color: #e1251b;
  line-height: 45px;
  text-align: center;
  color: #fff;
  font-size: 14px;
  font-weight: bold;
}
.outer .type-nav .container .nav a {
  height: 45px;
  margin: 0 22px;
  line-height: 45px;
  font-size: 16px;
  color: #333;
}
.outer .type-nav .container .sort {
  left: 0;
  top: 45px;
  width: 210px;
  position: absolute;
  background: #fafafa;
  z-index: 999;
}
.outer .type-nav .container .sort .all-sort-list2 .item h3 {
  line-height: 30px;
  font-size: 14px;
  font-weight: 400;
  overflow: hidden;
  padding: 0 20px;
  margin: 0;
}
.outer .type-nav .container .sort .all-sort-list2 .item h3 a {
  color: #333;
}
.outer .type-nav .container .sort .all-sort-list2 .item .item-list {
  /* display: none; */
  position: absolute;
  width: 734px;
  min-height: 460px;
  background: #f7f7f7;
  left: 210px;
  border: 1px solid #ddd;
  top: 0;
  z-index: 9999 !important;
}
.outer .type-nav .container .sort .all-sort-list2 .item .item-list .subitem {
  float: left;
  width: 650px;
  padding: 0 4px 0 8px;
}
.outer .type-nav .container .sort .all-sort-list2 .item .item-list .subitem dl {
  border-top: 1px solid #eee;
  padding: 6px 0;
  overflow: hidden;
  zoom: 1;
}
.outer
  .type-nav
  .container
  .sort
  .all-sort-list2
  .item
  .item-list
  .subitem
  dl.fore {
  border-top: 0;
}
.outer
  .type-nav
  .container
  .sort
  .all-sort-list2
  .item
  .item-list
  .subitem
  dl
  dt {
  float: left;
  width: 54px;
  line-height: 22px;
  text-align: right;
  padding: 3px 6px 0 0;
  font-weight: 700;
}
.outer
  .type-nav
  .container
  .sort
  .all-sort-list2
  .item
  .item-list
  .subitem
  dl
  dd {
  float: left;
  width: 415px;
  padding: 3px 0 0;
  overflow: hidden;
}
.outer
  .type-nav
  .container
  .sort
  .all-sort-list2
  .item
  .item-list
  .subitem
  dl
  dd
  em {
  float: left;
  height: 14px;
  line-height: 14px;
  padding: 0 8px;
  margin-top: 5px;
  border-left: 1px solid #ccc;
}
.outer .list-container {
  width: 1200px;
  margin: 0 auto;
}
/* h3:hover {
  background: #e1251b;
  cursor: pointer;
} */
a:hover {
  color: black;
}
.background {
  background: red;
}
</style>
<script>
// import _ from "lodash";
export default {
  name: "Typenav",
  data() {
    return {
      currentIndex: -1,
      fangdou: null,
      isShow: true,
    };
  },
  computed: {
    categoryList() {
      return this.$store.state.home.datalist.slice(0, 16);
    },
  },
  methods: {
    changebackground(index) {
      //节流
      this.throttle(function () {
        this.currentIndex = index;
      }, 50);
    },
    clearbackground() {
      this.currentIndex = -1;
    },
    //路由跳转
    goSearch(event) {
      let { categoryname, category1id, category2id, category3id } =
        event.target.dataset;
      if (categoryname) {
        let location = { name: "search" };
        let query = { categoryName: categoryname };
        if (category1id) {
          query.category1Id = category1id;
        } else if (category2id) {
          query.category2Id = category2id;
        } else if (category3id) {
          query.category3Id = category3id;
        }
        location.query = query;
        location.params = this.$route.params;
        this.$router.push(location);
      }
    },
    throttle(fn, time) {
      var jieliu = true;
      if (jieliu) {
        setTimeout(() => {
          fn.call(this);
        }, time);
      }
      jieliu = false;
    },

    isshow() {
      if (this.$route.path !== "/home") {
        this.isShow = true;
      }
    },
    ishide() {
      if (this.$route.path !== "/home") {
        this.isShow = false;
      }
    },
  },
  mounted() {
    if (this.$route.path !== "/home") {
      this.isShow = false;
    }
  },
};
</script>