<template>
  <div class="hello">
    <top></top>
    <div class="m-auto-1180 clear" style="margin-bottom:40px;">
      <div class="column-title f-r clear" style="margin-top: 20px;">
				<h2 class="f-l">精选</h2>
				<p class="f-l">精华，奇技淫巧</p>
				<router-link class="f-r" :to="{path: '/list/portal_1?tag_id=all'}" target="_blank">查看更多</router-link>
			</div>
      <ul class="car-card f-r clear">
        <li v-for="(item,index) in 4" :key="index" style="background-image: url('https://pic1.zhimg.com/v2-84a164bf0450ca164138b4140bc993e8_r.png');">
          <div class="card_author">
            <h3>
              <p>
                如何读懂并写出装逼的函数式代码如何读懂并写出装逼的函数式代码<br>
                <span class="card_author_span">今天凌晨，我看到 Swift 开发小组的现任掌门 Ted Kremenek 贴出了名为「Swift 5: start your engines」的一条 Twitter，预示着 Swift 5 的开发工作即将展开了。</span>
              </p>
            </h3>
          </div>
        </li>
      </ul>

      <div class="column-title f-r clear">
				<h2 class="f-l">javaScript</h2>
				<p class="f-l">面向对象，却没有对象</p>
				<router-link class="f-r" :to="{path: '/list/portal_1?tag_id=all'}" target="_blank">查看更多</router-link>
			</div>
      <ul class="card f-r clear">
        <li v-for="(item,index) in 12" :key="index" style="background-image: url('https://pic1.zhimg.com/v2-84a164bf0450ca164138b4140bc993e8_r.png');">
          <div class="card-box">
            <h3>
              <p>
                如何读懂并写出装逼的函数式代码如何读懂并写<br>
                <span class="card_author_span">今天凌晨，我看到 Swift 开发小组的现任掌门 Ted Kremenek 贴出了名为「Swift 5: start your engines」的一条 Twitter，预示着 Swift 5 的开发工作即将展开了。</span>
              </p>
            </h3>
          </div>
        </li>
        <el-button :plain="true" type="info" class="click_more">加载更多</el-button>
      </ul>

      <div class="column-title f-r clear">
				<h2 class="f-l">CSS</h2>
				<p class="f-l">酷炫，且有趣</p>
				<router-link class="f-r" :to="{path: '/list/portal_1?tag_id=all'}" target="_blank">查看更多</router-link>
			</div>
      <ul class="card f-r clear">
        <li v-for="(item,index) in 12" :key="index" style="background-image: url('https://pic1.zhimg.com/v2-84a164bf0450ca164138b4140bc993e8_r.png');">
          <div class="card-box">
            <h3>
              <p>
                如何读懂并写出装逼的函数式代码如何读懂并写<br>
                <span class="card_author_span">今天凌晨，我看到 Swift 开发小组的现任掌门 Ted Kremenek 贴出了名为「Swift 5: start your engines」的一条 Twitter，预示着 Swift 5 的开发工作即将展开了。</span>
              </p>
            </h3>
          </div>
        </li>
        <el-button :plain="true" type="info" class="click_more">加载更多</el-button>
      </ul>

      <div class="column-title f-r clear">
				<h2 class="f-l">NodeJs</h2>
				<p class="f-l">从入门，到删库跑路</p>
				<router-link class="f-r" :to="{path: '/list/portal_1?tag_id=all'}" target="_blank">查看更多</router-link>
			</div>
      <ul class="card f-r clear">
        <li v-for="(item,index) in 12" :key="index" style="background-image: url('https://pic1.zhimg.com/v2-84a164bf0450ca164138b4140bc993e8_r.png');">
          <div class="card-box">
            <h3>
              <p>
                如何读懂并写出装逼的函数式代码如何读懂并写<br>
                <span class="card_author_span">今天凌晨，我看到 Swift 开发小组的现任掌门 Ted Kremenek 贴出了名为「Swift 5: start your engines」的一条 Twitter，预示着 Swift 5 的开发工作即将展开了。</span>
              </p>
            </h3>
          </div>
        </li>
        <el-button :plain="true" type="info" class="click_more">加载更多</el-button>
      </ul>

      <div class="column-title f-r clear">
				<h2 class="f-l">框架和插件</h2>
				<p class="f-l">学习，永无止境</p>
				<router-link class="f-r" :to="{path: '/list/portal_1?tag_id=all'}" target="_blank">查看更多</router-link>
			</div>
      <ul class="card f-r clear">
        <li v-for="(item,index) in 12" :key="index" style="background-image: url('https://pic1.zhimg.com/v2-84a164bf0450ca164138b4140bc993e8_r.png');">
          <div class="card-box">
            <h3>
              <p>
                如何读懂并写出装逼的函数式代码如何读懂并写<br>
                <span class="card_author_span">今天凌晨，我看到 Swift 开发小组的现任掌门 Ted Kremenek 贴出了名为「Swift 5: start your engines」的一条 Twitter，预示着 Swift 5 的开发工作即将展开了。</span>
              </p>
            </h3>
          </div>
        </li>
        <el-button :plain="true" type="info" class="click_more">加载更多</el-button>
      </ul>
    </div>
    <foot></foot>
  </div>
</template>

<script src="@/js/index.js"></script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less" src="@/css/index.less">

</style>
