<template>
  <div id="app">
    <navbar></navbar>
    <router-view></router-view>
    <footerlist v-if="$route.meta.isShow"></footerlist>
  </div>
</template>

<script>
import navbar from "@/components/Header/header.vue";
import footerlist from "@/components/Footer/footer.vue";
export default {
  data() {
    return {
      xiaotang: "ABC",
    };
  },
  components: {
    navbar,
    footerlist,
  },
  mounted() {
    this.$store.dispatch("categoryList");
    this.$store.dispatch("getFloorList");
  },
};
</script>

<style>
a {
  cursor: pointer;
}
</style>
