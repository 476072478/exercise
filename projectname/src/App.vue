<template>
  <div>
    {{ nameObj.name }}
    {{ nameObj.title }}
  </div>
</template>

<script setup>
import { reactive } from "vue";
const nameObj = reactive({
  name: "小唐",
  title: "xxxx",
});
setTimeout(() => {
  nameObj.name = '小林'
}, 2000);
</script>

<style></style>
