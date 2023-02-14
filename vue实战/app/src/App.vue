<template>
  <div id="app">
    <navbar></navbar>
    <router-view></router-view>
    <footerlist></footerlist>
  </div>
</template>

<script>
import navbar from "@/components/Header/header.vue";
import footerlist from "@/components/Footer/footer.vue";
export default {
  components: {
    navbar,
    footerlist,
  },
};
</script>

<style>
</style>
