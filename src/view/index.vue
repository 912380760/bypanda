<template>
  <div class="hello">
    <top></top>
    <div class="m-auto-1180" style="height:1000px;">
      这是内容区域
    </div>
    <foot></foot>
  </div>
</template>

<script>
import top from '@/components/top'
import foot from '@/components/foot'
export default {
  name: 'hello',
  components: {top, foot},
  data () {
    return {

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
