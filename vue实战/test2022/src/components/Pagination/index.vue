<template>
  <div>
    <div class="fr page">
      <div class="sui-pagination clearfix">
        <ul>
          <li
            class="prev"
            :class="pagelist.start == pageNo ? 'disabled' : ''"
            @click="changePageNo(-1)"
          >
            <a>«上一页</a>
          </li>
          <li @click="changeIndex(1)">
            <a v-if="pagelist.start > 1">1</a>
          </li>
          <li class="dotted" v-if="pagelist.start > 2"><span>...</span></li>
          <li
            v-for="item in pagelist.end"
            :key="item"
            v-show="item >= pagelist.start"
            @click="changeIndex(item)"
            :class="pageNo == item ? 'active' : ''"
          >
            <a>{{ item }}</a>
          </li>
          <li class="dotted" v-if="pagelist.end < totalPages - 1">
            <span>...</span>
          </li>
          <li v-if="pagelist.end < totalPages" @click="changeIndex(totalPages)">
            <a>{{ totalPages }}</a>
          </li>
          <li class="next" :class="pagelist.end == pageNo ? 'disabled' : ''">
            <a @click="changePageNo(1)">下一页»</a>
          </li>
        </ul>
        <div>
          <span>共{{ totalPages }}页&nbsp;</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "pagination",
  props: ["pageNo", "pageSize", "continues", "totalPages"],
  data() {
    return {};
  },
  mounted() {},
  computed: {
    pagelist() {
      //总页数没有显示页数多
      const { totalPages, continues, pageNo } = this;
      var start = 0,
        end = 0;
      if (totalPages < continues) {
        start = 1;
        end = totalPages;
      } else {
        start = pageNo - parseInt(continues / 2);
        end = pageNo + parseInt(continues / 2);
        if (start < 1) {
          start = 1;
          end = continues;
        }
        if (end > totalPages) {
          start = totalPages - continues + 1;
          end = totalPages;
        }
      }
      return { start, end };
    },
  },
  methods: {
    changePageNo(index) {
      this.$emit("event", index);
    },
    changeIndex(index) {
      this.$emit("events", index);
    },
  },
};
</script>
<style scoped lang='scss'>
.page {
  width: 100%;
  .sui-pagination {
    margin: 18px auto;
    display: flex;
    ul {
      margin-left: 0;
      margin-bottom: 0;
      vertical-align: middle;
      float: left;

      li {
        line-height: 18px;
        display: inline-block;
        padding: 0 3px;
        a {
          position: relative;
          float: left;
          line-height: 18px;
          text-decoration: none;
          background-color: #fff;
          border: 1px solid #e0e9ee;
          margin-left: -1px;
          font-size: 14px;
          padding: 9px 18px;
          color: #333;
        }

        &.active {
          a {
            background-color: #fff;
            color: #e1251b;
            border-color: #fff;
            cursor: default;
          }
        }

        &.prev {
          a {
            background-color: #fafafa;
          }
        }

        &.disabled {
          a {
            color: #999;
            cursor: default;
          }
        }

        &.dotted {
          span {
            margin-left: -1px;
            position: relative;
            float: left;
            line-height: 18px;
            text-decoration: none;
            background-color: #fff;
            font-size: 14px;
            border: 0;
            padding: 9px 18px;
            color: #333;
          }
        }

        &.next {
          a {
            background-color: #fafafa;
          }
        }
      }
    }

    div {
      color: #333;
      font-size: 14px;
      width: 241px;
      height: 38px;
      line-height: 38px;
      margin: 0 18px;
    }
  }
}
</style>