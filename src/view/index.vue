<template>
  <div class="hello">
    <top></top>
    <div class="m-auto-1180 clear" style="margin-bottom:40px;">
      <!-- 精选 -->
      <div class="column-title f-r clear" >
				<h2 class="f-l">精选</h2>
				<p class="f-l">精华，奇技淫巧</p>
			</div>
      <ul class="car-card f-r clear">
        <li v-for="(item,index) in 2" :key="index" >
          <div class="img" style="background-image: url('http://img.qdaily.com/paper/paper_show/20170829112857ZIXL96xwmz1rgcQK.jpg?imageMogr2/auto-orient/thumbnail/!500x280r/gravity/Center/crop/500x280/quality/85/format/webp/ignore-error/1');"></div>
          <div class="card_author">
            <div class="card-title">
              <h3>
                如何读懂并写出装逼的函数式代码
              </h3>
              <p class="card_author_span">今天凌晨，我看到 Swift 开发小组的现任掌门 Ted Kremenek 贴出了名为「Swift 5: start your engines」的一条 Twitter，预示着 Swift 5 的开发工作即将展开了。</p>
            </div>
          </div>
        </li>
      </ul>

      <!-- javascript -->
      <div class="column-title f-r clear">
				<h2 class="f-l">javaScript</h2>
				<p class="f-l">面向对象，却没有对象</p>
				<router-link class="f-r" :to="{path: '/list/portal_1?tag_id=all'}" target="_blank">查看更多</router-link>
			</div>
      <ul class="card f-r clear">
        <li v-for="(item,index) in 10" :key="index" class="clear">
          <a href="#" class="img-box">
            <div class="img" style="background-image: url('http://img.qdaily.com/paper/paper_show/20170828165741ewjqa1cgvZNiLu0p.png?imageMogr2/auto-orient/thumbnail/!500x280r/gravity/Center/crop/500x280/quality/85/format/webp/ignore-error/1');"></div>
          </a>
          <div class="card-box">
            <a href="#" class="card-h3">如何读懂并写出装逼的函数式代码如何读懂并写</a>
            <p>今天凌晨，我看到 Swift 开发小组的现任掌门 Ted Kremenek 贴出了名为「Swift 5: start your engines」的一条 Twitter，预示着 Swift 5 的开发工作即将展开了。今天凌晨，我看到 Swift 开发小组的现任掌门 Ted Kremenek 贴出了名为「Swift 5: start your engines」的一条 Twitter，预示着 Swift 5 的开发工作即将展开了。</p>
            <div class="time">28天前</div>
          </div>
        </li>
        <div class="card-btn">
          <div class="loader-bd">加载更多</div>
        </div>
      </ul>

      <div class="column-title f-r clear">
				<h2 class="f-l">CSS</h2>
				<p class="f-l">酷炫，且有趣</p>
				<router-link class="f-r" :to="{path: '/list/portal_1?tag_id=all'}" target="_blank">查看更多</router-link>
			</div>
      <ul class="card f-r clear">
        <li v-for="(item,index) in 10" :key="index" class="clear">
          <a href="#" class="img-box">
            <div class="img" style="background-image: url('http://img.qdaily.com/paper/paper_show/20170828165741ewjqa1cgvZNiLu0p.png?imageMogr2/auto-orient/thumbnail/!500x280r/gravity/Center/crop/500x280/quality/85/format/webp/ignore-error/1');"></div>
          </a>
          <div class="card-box">
            <a href="#" class="card-h3">如何读懂并写出装逼的函数式代码如何读懂并写</a>
            <p>今天凌晨，我看到 Swift 开发小组的现任掌门 Ted Kremenek 贴出了名为「Swift 5: start your engines」的一条 Twitter，预示着 Swift 5 的开发工作即将展开了。今天凌晨，我看到 Swift 开发小组的现任掌门 Ted Kremenek 贴出了名为「Swift 5: start your engines」的一条 Twitter，预示着 Swift 5 的开发工作即将展开了。</p>
            <div class="time">28天前</div>
          </div>
        </li>
        <div class="card-btn">
          <div class="loader-bd">加载更多</div>
        </div>
      </ul>

      <div class="column-title f-r clear">
				<h2 class="f-l">NodeJs</h2>
				<p class="f-l">从入门，到删库跑路</p>
				<router-link class="f-r" :to="{path: '/list/portal_1?tag_id=all'}" target="_blank">查看更多</router-link>
			</div>
      <ul class="card f-r clear">
        <li v-for="(item,index) in 10" :key="index" class="clear">
          <a href="#" class="img-box">
            <div class="img" style="background-image: url('http://img.qdaily.com/paper/paper_show/20170828165741ewjqa1cgvZNiLu0p.png?imageMogr2/auto-orient/thumbnail/!500x280r/gravity/Center/crop/500x280/quality/85/format/webp/ignore-error/1');"></div>
          </a>
          <div class="card-box">
            <a href="#" class="card-h3">如何读懂并写出装逼的函数式代码如何读懂并写</a>
            <p>今天凌晨，我看到 Swift 开发小组的现任掌门 Ted Kremenek 贴出了名为「Swift 5: start your engines」的一条 Twitter，预示着 Swift 5 的开发工作即将展开了。今天凌晨，我看到 Swift 开发小组的现任掌门 Ted Kremenek 贴出了名为「Swift 5: start your engines」的一条 Twitter，预示着 Swift 5 的开发工作即将展开了。</p>
            <div class="time">28天前</div>
          </div>
        </li>
        <div class="card-btn">
          <div class="loader-bd">加载更多</div>
        </div>
      </ul>

      <div class="column-title f-r clear">
				<h2 class="f-l">框架和插件</h2>
				<p class="f-l">学习，永无止境</p>
				<router-link class="f-r" :to="{path: '/list/portal_1?tag_id=all'}" target="_blank">查看更多</router-link>
			</div>
      <ul class="card f-r clear">
        <li v-for="(item,index) in 10" :key="index" class="clear">
          <a href="#" class="img-box">
            <div class="img" style="background-image: url('http://img.qdaily.com/paper/paper_show/20170828165741ewjqa1cgvZNiLu0p.png?imageMogr2/auto-orient/thumbnail/!500x280r/gravity/Center/crop/500x280/quality/85/format/webp/ignore-error/1');"></div>
          </a>
          <div class="card-box">
            <a href="#" class="card-h3">如何读懂并写出装逼的函数式代码如何读懂并写</a>
            <p>今天凌晨，我看到 Swift 开发小组的现任掌门 Ted Kremenek 贴出了名为「Swift 5: start your engines」的一条 Twitter，预示着 Swift 5 的开发工作即将展开了。今天凌晨，我看到 Swift 开发小组的现任掌门 Ted Kremenek 贴出了名为「Swift 5: start your engines」的一条 Twitter，预示着 Swift 5 的开发工作即将展开了。</p>
            <div class="time">28天前</div>
          </div>
        </li>
        <div class="card-btn">
          <div class="loader-bd">加载更多</div>
        </div>
      </ul>
    </div>
    <foot></foot>
  </div>
</template>

<script src="@/js/index.js"></script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less" src="@/css/index.less">

</style>
