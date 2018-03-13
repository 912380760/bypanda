<template>
  <!-- eslint-disable -->
  <div id="resume">
    <StyleEditor ref="styleEditor" :code="currentStyle"></StyleEditor>
    <ResumeEditor ref="resumeEditor" :markdown="currentMarkdown" :enableHtml="enableHtml"></ResumeEditor>
  </div>
</template>

<script>
/* eslint-disable */
  import StyleEditor from '@/components/StyleEditor'
  import ResumeEditor from '@/components/ResumeEditor'

  export default {
    name: 'resume',
    components: {
      StyleEditor,
      ResumeEditor
    },
    data() {
      return {
        interval: 0,
        currentStyle: '',
        enableHtml: false,
        fullStyle: [
          `/*
* 大家好，我是黄志龙
* 三月了，好多公司都在招聘，你是不是也在准备简历呀。
* 说做就做，我也来写一份简历！
*/

/* 首先给所有元素加上过渡效果 */
* {
  transition: all .3s;
}
/* 文字离边框太近了 */
.styleEditor {
  padding: .5em;
  border: 1px solid;
  margin: .5em;
  overflow: auto;
  width: 45vw; height: 90vh;
}
/* 代码高亮 */
.token.selector{ color: rgb(133,153,0); }
.token.property{ color: rgb(187,137,0); }
.token.function{ color: rgb(42,161,152); }

/* 加点 3D 效果呗 */
html{
  perspective: 1000px;
}
.styleEditor {
  position: fixed; left: 0; top: 0;
  -webkit-transition: none;
  transition: none;
  -webkit-transform: rotateY(10deg) translateZ(-100px) ;
          transform: rotateY(10deg) translateZ(-100px) ;
}

/* 接下来我给自己准备一个编辑器 */
.resumeEditor{
  position: fixed; right: 0; top: 0;
  padding: .5em;  margin: .5em;
  width: 48vw; height: 90vh;
  border: 1px solid;
  background: white; color: #222;
  overflow: auto;
}
/* 好了，我开始写简历了 */


`,
          `
/* 这个简历好像差点什么
 * 对了，这是 Markdown 格式的，我需要变成对 HR 更友好的格式
 * 简单，用开源工具翻译成 HTML 就行了
 */
`
          ,
          `
/* 再对 HTML 加点样式 */
.resumeEditor{
  padding: 2em;
}
.resumeEditor h2{
  display: inline-block;
  border-bottom: 1px solid;
  margin: 1em 0 .5em;
}
.resumeEditor ul,.resumeEditor ol{
  list-style: none;
}
.resumeEditor ul> li::before{
  content: '•';
  margin-right: .5em;
}
.resumeEditor ol {
  counter-reset: section;
}
.resumeEditor ol li::before {
  counter-increment: section;
  content: counters(section, ".") " ";
  margin-right: .5em;
}
.resumeEditor blockquote {
  margin: 1em;
  padding: .5em;
  background: #ddd;
}
`],
        currentMarkdown: '',
        fullMarkdown: `黄志龙
----

现在在 [数字尾巴](http://dgtle.com) 担任高级前端开发工程师。

技能
----

* 熟练掌握HTML5+CSS3新特性，根据W3C标准像素级实现设计图。
* 熟练掌握的移动端页面开发、自适应布局、响应式布局、弹性布局，能够处理移动端页面在不同机
型中的兼容问题
* 熟练掌握微信页面的开发、微信相关SDK
* 熟练掌握PC端开发，熟悉不同浏览器的差异，能处理Chrome、Safari、Firefox、IE等浏览器的
兼容问题
* 熟练掌握Vue、Angular等前端框架
* 熟练掌握ES5、ES6、jQuery
* 熟练掌握git、svn版本管理工具
* 熟练掌握AJAX、Cookie、LocalStorage、SessionStorage
* 熟练掌握ElementUi、Bootstrap、Axios、Zepto、iScroll、Swiper、fullPage、EChart等前端插件
* 熟悉Webpack、Gulp、NPM、Node等前端构建工具和环境
* 熟悉Less、Sass等CSS预处理器
* 熟悉Radio、Video、Canvas、SVG等H5新API
* 了解正则表达式、网站 SEO 优化、HTTP 协议

工作经历
----
1. 数字尾巴科技有限公司
2. 中软国际科技服务有限公司(深圳分公司)
----

项目经验
----
#### [鲸跃汽车](https://www.whalegogo.com)(官网和 WAP)
实现 ui 设计师提供的设计图，持续跟进项目的迭代和维护。 2017.04-至今

作为新出行手足兄弟网站，专注豪华车分享体验平台。项目拥有新出行的所有功能，并再基础上使用全新的 框架，运用 MVVM 模式进行开发。
1. 使用 vue 作为核心框架，使用 vuex 插件实现全局状态的管理;
2. 使用 vue-router 实现路由功能，从而达到页面切换;
3. pc 端上的 UI 框架使用饿了么的 ElementUI 框架，WAP 上使用 VUX 框架;
4. 作为单页面应用网站，实现了路由懒加载和图片懒加载的功能;
5. 使用包管理工具(npm)和自动化打包工具(webpack)进行模块化开发;
6. 使用 less 进行预编译，使用 git 进行代码管理。

#### [新出行](https://www.xchuxing.com)(官网和 WAP)
实现 ui 设计师提供的设计图，持续跟进项目的迭代和维护。 2016.06-至今

新出行是一个提供全面的新能源汽车体验分享平台，具有汽车体验、生活方式、线上报名活动以及直播车展 等;
1. 使用 jQurey 作为核心框架，页面采用 rem 进行布局;
2. 使用 HTML5的 LocalStorage 缓存技术实现页面的数据缓存;
3. 用到 swiper、animate.css、HTML5+CSS3实现页面交互; 
4. 使用 less 进行预编译。

#### [数字尾巴](https://www.dgtle.com)(官网和 WAP)

实现 ui 设计师提供的设计图，持续跟进项目的迭代和维护。2015.08-至今

数字尾巴是一个分享数码产品的使用体验的平台，拥有着上百万的用户量。每日拥有数万人的访问量。 
1. 使用 jQurey 作为核心框架完成页面交互效果，页面动态效果;
2. 使用 template.js 模板引擎进行页面数据渲染;
3. 使用图片懒加载功能显示商品提高页面的响应速度;
4. 引入了 iScroll、Swiper 等插件实现轮播图、页面部分内容的滚动; 
5. 使用 less 进行预编译，使用 git 进行代码管理以及版本的迭代。

#### 深圳房地产经纪行业协会综合服务系统(PC、微信端)
主要负责 PC 端“协会”模块和微信端 2014.07-2015.07

本项目是为深圳房地产中介协会开发的服务管理系统。
1. 使用 AngularJS+Bootstrap 搭建，前后端分离式团队开发，使用 SVN 管理项目代码; 
2. 使用 Respond.js、html5.js、es5-shim.min.js 插件兼容 IE6、7、8;
3. 使用到 Animate.css 实现常用过渡动画;
4. 使用 ocLazyLoad.js 实现按需加载;
5. 使用 angular-locale_zh-cn.js 实现日期选框;
6. 使用保利卫视和乐视 Tv 视频插件提供视频播放和断点续播。
`
      }
    },
    created() {
      this.makeResume()
    },

    methods: {
      makeResume: async function () {
        await this.progressivelyShowStyle(0)
        await this.progressivelyShowResume()
        await this.progressivelyShowStyle(1)
        await this.showHtml()
        await this.progressivelyShowStyle(2)
      },
      showHtml: function () {
        return new Promise((resolve, reject) => {
          this.enableHtml = true
          resolve()
        })
      },
      progressivelyShowStyle(n) {
        return new Promise((resolve, reject) => {
          let interval = this.interval
          let showStyle = (async function () {
            let style = this.fullStyle[n]
            if (!style) { return }
            // 计算前 n 个 style 的字符总数
            let length = this.fullStyle.filter((_, index) => index <= n).map((item) => item.length).reduce((p, c) => p + c, 0)
            let prefixLength = length - style.length
            if (this.currentStyle.length < length) {
              let l = this.currentStyle.length - prefixLength
              let char = style.substring(l, l + 1) || ' '
              this.currentStyle += char
              if (style.substring(l - 1, l) === '\n' && this.$refs.styleEditor) {
                this.$nextTick(() => {
                  this.$refs.styleEditor.goBottom()
                })
              }
              setTimeout(showStyle, interval)
            } else {
              resolve()
            }
          }).bind(this)
          showStyle()
        })
      },
      progressivelyShowResume() {
        return new Promise((resolve, reject) => {
          let length = this.fullMarkdown.length
          let interval = this.interval
          let showResume = () => {
            if (this.currentMarkdown.length < length) {
              this.currentMarkdown = this.fullMarkdown.substring(0, this.currentMarkdown.length + 1)
              let lastChar = this.currentMarkdown[this.currentMarkdown.length - 1]
              let prevChar = this.currentMarkdown[this.currentMarkdown.length - 2]
              if (prevChar === '\n' && this.$refs.resumeEditor) {
                this.$nextTick(() => this.$refs.resumeEditor.goBottom())
              }
              setTimeout(showResume, interval)
            } else {
              resolve()
            }
          }
          showResume()
        })
      }
    }
  }

</script>

<style scoped>
  #resume {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  html {
    min-height: 100vh;
    min-width: 100vw;
  }
  *{
    box-sizing: border-box;
  }
</style>
