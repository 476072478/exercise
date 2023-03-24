<template>
  <div id="app">
    <!-- <LoginNumber />
    <LoginSituation />
    <RyczNumber />
    <BusinessSituation />
    <BusinessRanger/> -->
    <CScomputed/>
  </div>
</template>

<script>
// import LoginNumber from "./mycomponents/LoginNumber.vue";
// import LoginSituation from "./mycomponents/LoginSituation.vue";
// import BusinessSituation from "./mycomponents/BusinessMySituation.vue";
// import RyczNumber from "./mycomponents/RyczNumber.vue";
// import BusinessRanger from "./mycomponents/BusinessRanger.vue";
import CScomputed from './test/CScomputed.vue';
export default {
  name: "App",
  components: {
    // LoginNumber,
    // LoginSituation,
    // RyczNumber,
    // BusinessSituation,
    // BusinessRanger
    CScomputed
  },
  data(){
    return{
      monitor:100000
    }
  },
  methods:{
    change(val){
      this.monitor = val
    }
  }
};
</script>

<style>
*{
  margin: 0;
  padding: 0;
}
#app {
  margin: 0;
  padding: 0;
  background: url(./assets/bg.png);
  width: 100vw;
  display: flex;
  flex-wrap: wrap;
}
</style>
