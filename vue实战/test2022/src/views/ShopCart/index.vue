<template>
  <div class="cart" v-if="list">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul class="cart-list" v-for="item in changelist" :key="item.id">
          <li class="cart-list-con1">
            <input
              type="checkbox"
              name="chk_list"
              :checked="item.isChecked == 1"
              @click="changechecked(item.skuId, item.isChecked)"
            />
          </li>
          <li class="cart-list-con2">
            <img :src="item.imgUrl" />
            <div class="item-msg">
              {{ item.skuName }}
            </div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{ item.cartPrice }}</span>
          </li>
          <li class="cart-list-con5">
            <a
              href="javascript:void(0)"
              class="mins"
              @click="changeShopNumber('mins', -1, item)"
              >-</a
            >
            <input
              autocomplete="off"
              type="text"
              :value="item.skuNum"
              minnum="1"
              class="itxt"
              @change="
                changeShopNumber('change', $event.target.value * 1, item)
              "
            />
            <a
              href="javascript:void(0)"
              class="plus"
              @click="changeShopNumber('add', 1, item)"
              >+</a
            >
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{ item.skuPrice * item.skuNum }}</span>
          </li>
          <li class="cart-list-con7">
            <a class="sindelet" @click="clearList(item.skuId)">删除</a>
            <br />
            <a>移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input
          class="chooseAll"
          type="checkbox"
          :checked="isAllCheck"
          @change="isAll"
        />
        <span>全选</span>
      </div>
      <div class="option">
        <a @click="ClearCheckedShops">删除选中的商品</a>
        <a>移到我的关注</a>
        <a>清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">
          已选择 <span>{{ isAllprice.length }}</span
          >件商品
        </div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{ isAllpriceList }}</i>
        </div>
        <div class="sumbtn">
          <a class="sum-btn" target="_blank" @click="changetrande">结算</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "ShopCart",
  data() {
    return {
      jieliu: true,
    };
  },
  computed: {
    ...mapState({
      list: (res) => res.shopcart.shoplist[0] || [],
    }),
    changelist() {
      return this.list.cartInfoList || [];
    },
    isAllCheck() {
      return (
        this.changelist.every((item) => item.isChecked == 1) &&
        this.changelist.length !== 0
      );
    },
    isAllprice() {
      return this.changelist.filter((item) => item.isChecked == 1);
    },
    isAllpriceList() {
      let price = 0;
      this.isAllprice.forEach((item) => {
        price += item.skuPrice * item.skuNum;
      });
      return price;
    },
  },
  mounted() {
    this.getDate();
  },
  methods: {
    //修改某个产品的参数
    getDate() {
      return this.$store.dispatch("getShopCartList");
    },
    changeShopNumber(type, number, item) {
      if (this.jieliu) {
        switch (type) {
          //加号
          case "add":
            number = 1;
            break;
          case "mins":
            item.skuNum > 1 ? (number = -1) : (number = 0);
            break;
          case "change":
            if (isNaN(number) || number < 0) {
              number = 0;
            }
            if (number > 0) {
              number = parseInt(number) - item.skuNum;
            }
            break;
        }
        this.$store
          .dispatch("addOrUpdateShopCart", {
            skuId: item.skuId,
            skuNum: number,
          })
          .then(() => this.getDate().then((this.jieliu = true)));
      }
      this.jieliu = false;
    },
    clearList(id) {
      this.$store.dispatch("ClearShopCartList", id).then((res) => {
        if (res.data.code == 200) {
          this.getDate();
        }
      });
    },
    //修改购物车选中状态
    changechecked(id, checked) {
      if (checked == 1) {
        checked = 0;
      } else {
        checked = 1;
      }
      this.$store
        .dispatch("getShopCheckList", {
          skuId: id,
          isChecked: checked,
        })
        .then((res) => {
          if (res.data.code == 200) {
            this.getDate();
          }
        });
    },
    //全选全不选
    isAll(event) {
      let checked = event.target.checked ? "1" : "0";
      this.$store.dispatch("isAllChecked", checked).then((res) => {
        if (res[0].data.code == 200) {
          this.getDate();
        }
      });
    },
    //删除全部选中的商品
    async ClearCheckedShops() {
      //派发一个action
      try {
        await this.$store.dispatch("deleteAllCheckedCart");
        this.getDate();
      } catch (error) {
        alert(error);
      }
    },
    changetrande() {
      this.$router.push("/trade");
    },
  },
};
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      & > div {
        float: left;
      }

      .cart-th1 {
        width: 25%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 25%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;
      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;
        display: flex;
        align-items: center;

        .cart-list-con1 {
          width: 15%;
        }

        .cart-list-con2 {
          width: 35%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }

        .cart-list-con4 {
          width: 10%;
        }

        .cart-list-con5 {
          width: 17%;

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }

        .cart-list-con6 {
          width: 10%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 13%;

          a {
            color: #666;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .select-all {
      padding: 10px;
      overflow: hidden;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      display: flex;
      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      display: flex;
      align-items: center;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: "Microsoft YaHei";
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>