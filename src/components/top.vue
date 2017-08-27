<template lang="html">
  <div class="top">
    <div class="top-conter clear">
      <img src="../assets/logo.png" class="logo" alt="">
      <ul class="top-ul">
        <li>javascript</li>
        <li>jquery</li>
        <li>css</li>
        <li>vue</li>
        <li>node</li>
        <li>webpack</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
.top{
  width: 100%;
  height: 70px;
  box-shadow: 0 2px 10px 0 rgba(0,0,0,.05);
  background: #fff;
}
.top-conter{
  width: 1180px;
  height: 70px;
  margin: 0 auto;
  position: relative;

  .logo{
    width: auto;
    height: 70px;
    float: left;
  }

  .top-ul{
    float: left;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);

    li{
      float: left;
      line-height: 70px;
      font-size: 16px;
      margin-right: 60px;
      color: #415967;
      opacity: .8;
      cursor: pointer;

      &:last-child{
        margin-right: 0;
      }
      &:hover{
        opacity: 1;
      }
    }
  }

}
</style>
