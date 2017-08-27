<template lang="html">
  <div class="foot">
    <div class="foot-conter">
      <p>Powered & Designed by <a href="#">huangzhilong</a></p>
      <p>Copyright© 2017-2017 黄志龙-鑫空间-鑫生活</p>
      <p>粤ICP备16013334号-1</p>
    </div>

  </div>
</template>

<script>
export default {
}
</script>

<style lang="less">
.foot{
  height: 100px;
  width: 100%;
  background: #1e2022;
  text-align: center;

  .foot-conter{
    height: 63px;
    padding: 19px 0;
  }

  p{
    font-size: 14px;
    color: hsla(0,0%,100%,.5);
    line-height: 1.5;
    a{
      color: hsla(0,0%,100%,.5);
      &:hover{
        color: #0e88eb;
      }
    }
  }
}
</style>
