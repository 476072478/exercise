<template>
  <div>
    <typenav></typenav>
    <div class="main">
      <div class="py-container">
        <!--bread-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a>全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <li class="with-x" v-if="searchParam.categoryName">
              {{ searchParam.categoryName }}<i @click="removecategoryName">×</i>
            </li>
            <li class="with-x" v-if="searchParam.keyword">
              {{ searchParam.keyword }}<i @click="removekeyword">×</i>
            </li>
            <li
              class="with-x"
              v-if="searchParam.trademark"
              @click="removetrademark"
            >
              {{ searchParam.trademark.split(":")[1] }}<i>×</i>
            </li>
            <li
              class="with-x"
              v-for="(item, index) in searchParam.props"
              :key="item"
            >
              {{ item.split(":")[1] }}<i @click="removeprops(index)">×</i>
            </li>
          </ul>
        </div>

        <!--selector-->
        <SearchSelector
          @pushtrademark="pushtrademark"
          @pushattrNam="pushattrNam"
        />

        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <li :class="{ active: isOne }" @click="changeOrder(1)">
                  <a
                    >综合<span
                      v-show="isOne && isAsc"
                      class="iconfont icon-cs-jt-xs-1-1"
                    ></span
                    ><span
                      v-show="isOne && !isAsc"
                      class="iconfont icon-cs-jt-xx-1-1"
                    ></span
                  ></a>
                </li>
                <li :class="{ active: !isOne }" @click="changeOrder(2)">
                  <a
                    >价格<span
                      v-show="!isOne && isAsc"
                      class="iconfont icon-cs-jt-xs-1-1"
                    ></span
                    ><span
                      v-show="!isOne && !isAsc"
                      class="iconfont icon-cs-jt-xx-1-1"
                    ></span
                  ></a>
                </li>
              </ul>
            </div>
          </div>
          <div class="goods-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-5" v-for="item in goodsList" :key="item.id">
                <div class="list-wrap">
                  <div class="p-img" @click="toDetail(item.id)">
                    <a target="_blank"><img v-lazy="item.defaultImg" /></a>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>{{ item.price }}</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a
                      target="_blank"
                      title="促销信息，下单即赠送三个月CIBN视频会员卡！【小米电视新品4A 58 火爆预约中】"
                      >{{ item.title }}</a
                    >
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a
                      href="success-cart.html"
                      target="_blank"
                      class="sui-btn btn-bordered btn-danger"
                      >加入购物车</a
                    >
                    <a href="javascript:void(0);" class="sui-btn btn-bordered"
                      >收藏</a
                    >
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <pagination
            :pageNo="searchParam.pageNo"
            :pageSize="searchParam.pageSize"
            :totalPages="$store.state.search.searchlist.totalPages"
            :continues="5"
            @event="changepageno"
            @events="jianpageno"
          ></pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import SearchSelector from "./SearchSelector/SearchSelector";
export default {
  data() {
    return {
      searchParam: {
        category1Id: "",
        category2Id: "",
        category3Id: "",
        categoryName: "",
        keyword: "",
        props: [],
        trademark: "",
        order: "1:desc",
        pageNo: 1,
        pageSize: 3,
      },
    };
  },
  name: "Search",
  beforeMount() {
    this.searchParam = {
      ...this.searchParam,
      ...this.$route.params,
      ...this.$route.query,
    };
    this.getData();
  },
  mounted() {},
  uptated() {},
  watch: {
    $route(newvalue) {
      Object.assign(this.searchParam, newvalue.params, newvalue.query);
      this.$store.dispatch("getSearchList", this.searchParam);
      this.searchParam.category1Id = "";
      this.searchParam.category2Id = "";
      this.searchParam.category3Id = "";
    },
  },
  methods: {
    getData() {
      this.$store.dispatch("getSearchList", this.searchParam);
    },
    removecategoryName() {
      this.searchParam.categoryName = "";
      this.searchParam.category1Id = "";
      this.searchParam.category2Id = "";
      this.searchParam.category3Id = "";
      this.$router.push({
        name: "search",
        keyword: this.$route.keyword,
      });
    },
    removekeyword() {
      this.searchParam.keyword = "";
      this.$router.push({
        name: "search",
        query: this.$route.query,
      });
    },
    pushtrademark(data) {
      this.searchParam.trademark = `${data.tmId}:${data.tmName}`;
      this.getData();
    },
    removetrademark() {
      (this.searchParam.trademark = ""), this.getData();
    },
    pushattrNam(item, c1) {
      this.searchParam.props.push(`${item.attrId}:${c1}:${item.attrName}`);
      this.getData();
    },
    removeprops(index) {
      this.searchParam.props.splice(index, 1);
      this.getData();
    },
    changeOrder(flag) {
      if (flag == this.searchParam.order.split(":")[0]) {
        this.searchParam.order = `${flag}:${
          this.searchParam.order.split(":")[1] == "desc" ? "asc" : "desc"
        }`;
        this.getData();
      } else {
        this.searchParam.order = `${flag}:desc`;
        this.getData();
      }
    },
    changepageno(index) {
      this.searchParam.pageNo += index;
      if (this.searchParam.pageNo < 1) {
        this.searchParam.pageNo = 1;
      }
      this.getData();
    },
    jianpageno(index) {
      this.searchParam.pageNo = index;
      this.getData();
    },
    toDetail(id) {
      this.$router.push("/detail/" + id);
    },
  },
  computed: {
    ...mapGetters(["goodsList"]),
    isOne() {
      return this.searchParam.order.indexOf("1") != -1;
    },
    isAsc() {
      return this.searchParam.order.indexOf("asc") != -1;
    },
  },
  components: {
    SearchSelector,
  },
};
</script>

<style lang="less" scoped>
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }

              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: -5px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>