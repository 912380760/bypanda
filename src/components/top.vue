<template lang="html">
  <div class="top">
    <div class="top-conter clear">
      <span class="logo icon iconfont icon-github1" ></span>
      <ul class="top-ul">
        <li class="activate">Home</li>
        <li>JavaScript</li>
        <li>CSS</li>
        <li>NodeJs</li>
        <li>Frame</li>
      </ul>
      <div class="top-my">
        <a href="#" class="my">关于我</a>
        <a href="https://www.zhihu.com/people/huang-zhi-long-22" target="_blank">
          <span class="icon iconfont icon-zhihu zhihu"></span>
        </a>
        <el-tooltip placement="bottom">
          <div slot="content">
            <img src="../assets/top/微信.png" width="120" alt="">
          </div>
          <span class="icon iconfont icon-weixin weixin"></span>
        </el-tooltip>
      </div>
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
  background: #000;
}
.top-conter{
  width: 1180px;
  height: 70px;
  background: #000;
  margin: 0 auto;
  position: relative;

  .logo{
    margin-top: 15px;
    font-size: 40px;
    color: #ffc81f;
    float: left;
    cursor: pointer;
  }
  .top-ul{
    position: absolute;
    left: 50%;
    transform: translateX(-50%);

    li{
      float: left;
      line-height: 70px;
      font-size: 16px;
      margin-right: 60px;
      color: #fff;
      cursor: pointer;

      &:last-child{
        margin-right: 0;
      }
      &:hover{
        color: #ffc81f;
      }
    }
    li.activate{
      color: #ffc81f;
    }
  }
  .top-my{
    float: right;

    .my{
      color: gray;
      font-size: 14px;
      line-height: 70px;
      margin-right: 10px;

      &:hover{
        color: #ffc81f;
      }
    }
    .zhihu{
      color: gray;
      cursor: pointer;
      font-size: 17px;
      line-height: 70px;
      margin-right: 10px;
      position: relative;
      top: 2px;
      &:hover{
        color: #ffc81f;
      }
    }
    .weixin{
      color: gray;
      cursor: pointer;
      font-size: 16px;
      line-height: 70px;
      position: relative;
      margin-right: 10px;
      top: 2px;
      &:hover{
        color: #ffc81f;
      }
    }
  }
}
</style>
