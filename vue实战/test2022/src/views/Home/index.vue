<template>
  <div>
    <typenav></typenav>
    <listcontainer></listcontainer>
    <recommend></recommend>
    <rank></rank>
    <floor
      v-for="(floor, index) in floorList"
      :key="floor.id"
      :floorList="floorList[index]"
    ></floor>
    <like></like>
    <brand></brand>
  </div>
</template>
<script>
import { mapState } from "vuex";
import listcontainer from "@/views/Home/Listcontainer";
import recommend from "@/views/Home/Recommend";
import rank from "@/views/Home/Rank";
import like from "@/views/Home/Like";
import floor from "@/views/Home/Floor";
import brand from "@/views/Home/Brand";
export default {
  components: {
    listcontainer,
    recommend,
    rank,
    like,
    floor,
    brand,
  },
  computed: {
    ...mapState({
      floorList: (state) => state.home.floorlist.data,
    }),
  },
  mounted() {
    this.$store.dispatch("getUserInfo");
  },
};
</script>