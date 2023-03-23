<template>
  <div>
    {{ model }}
    <button @click="monitorChange">monitor++</button>
  </div>
</template>

<script>
export default {
  props: ["monitor"],
  computed: {
    model: {
      get() {
        console.log('改变')
        return this.monitor;
      },
      set(val) {
        console.log(val)
        this.$emit('change',val)
      },
    },
  },
  methods: {
    monitorChange() {
        this.model++
    },
  },
};
</script>
