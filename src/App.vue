<template>
  <div id="app">
    <router-view style="position: relative; z-index: 1;"/>
    <!-- <Canvas-Star /> -->
  </div>
</template>

<script>
import CanvasStar from '@/components/CanvasStar.vue'; 
export default {
  name: 'App',
  components: {
    CanvasStar,
  },
  methods: {
    
  },
  mounted() {
    this.$nextTick(() => {

    })
  }
};
</script>

<style lang="less" scoped>

</style>
