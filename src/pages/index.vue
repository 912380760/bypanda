<template>
  <div>
  <!--======================================== 头部组件 ========================================-->
    <Head-Menu ></Head-Menu>

  <!--======================================== 文章卡片 ========================================-->
    <div class="Topstory-container">
      <div class="Topstory-mainColumn">
        <div class="TopstoryMain">

         <!--======================================== 文章卡片 ========================================-->
          <div class="article" v-for="(item, index) in indexData" :key="index">
            <h4>{{item.title}}</h4>
            <p style="line-height: 32px;">
              <el-tag v-for="(tagItem, index) in item.tag" style="margin-right:10px;" :key="index">{{tagItem.text}}</el-tag>
              <!-- <a :href="`/${tagItem.url}?key=${tagItem.text}`" v-for="(tagItem, index) in item.tag" :key="index">{{tagItem.text}}</a> -->
              <span style="color: #777;font-size: 10px;float: right;line-height: 32px;">
                {{`${new Date(item.time).getFullYear()}年${new Date(item.time).getMonth() + 1}月${new Date(item.time).getDate()}日`}}
              </span>
            </p>
            <p v-for="(takeawayItem, index) in item.takeaway" :key="index">{{takeawayItem}}</p>
            <div v-html="item.content" v-show="item.state"></div>
            <!-- <a href="javascript:;" @click="item.state = !item.state;" v-if="!item.state">展开全文...</a> -->
            <el-button type="primary" @click="item.state = !item.state;" v-if="!item.state" :key="'abc'">展开全文...</el-button>
            <el-button type="success" v-else @click="item.state = !item.state;" :key="'aaa'">收起文章</el-button>
            <!-- <a href="javascript:;" @click="item.state = !item.state;" v-else>收起文章</a> -->
          </div>
          
          <!--======================================== 分页器 ========================================-->
          <!-- <div class="pagination">
            <el-pagination
              background
              layout="prev, pager, next"
              :total="50">
            </el-pagination>
          </div> -->
        </div>
      </div>
      <div class="TopstorySideBar">
        <div class="is-fixed">
          <div class="Card" style="height: 250px;padding: 0 10px;">
            <img src="../assets/images/index/shuai.png" class="loginImg" alt="">
            <h4 class="introduceH1">Dragon</h4>
            <p class="introduceP">
              如果说我看得比别人更远些，那是因为我站在巨人的肩膀上。
              <br>
              <!-- <a href="">GitHub</a> <a href="">微博</a> -->
            </p>
          </div>
          <div class="Card" style="height: 250px;">
            <br>
            <br>
            <img src="../assets/images/index/WX.png" class="HeadImg" alt="">
            <br>
            <h6 style="text-align: center;color: #777;">扫码改需求</h6>
          </div>
          <div class="Card about-my" style="height: 290px;">
            <div class="footer-right">
              <h3 style="margin-bottom: 20px;">AROUND THE WEB</h3>
              <ul>
                <li>
                  <a href="https://github.com/912380760" target='_blank'>
                    <i class="fa fa-fw fa-github"></i>
                  </a>
                </li>
                <li>
                  <a href="https://www.linkedin.com/in/%E5%BF%97%E9%BE%99-%E9%BB%84-6b880110a/" target='_blank'>
                    <i class="fa fa-fw fa-linkedin"></i>
                  </a>
                </li>
                <li>
                  <el-tooltip placement="top">
                    <div slot="content"><img src="../assets/images/index/WXHY.png" style="width: 160px;" alt=""></div>
                    <a href="javascript:;">
                      <i class="fa fa-fw fa-weixin"></i>
                    </a>
                  </el-tooltip>
                </li>
                <li>
                  <el-tooltip placement="top">
                    <div slot="content"><img src="../assets/images/index/QQHY.png" style="width: 160px;" alt=""></div>
                    <a href="javascript:;">
                      <i class="fa fa-fw fa-qq"></i>
                    </a>
                  </el-tooltip>
                </li>
              </ul>
            </div>
          </div>
          <!-- <div class="Card" style="height: 290px;">
            <Tag></Tag>
          </div> -->
        </div>
      </div>
    </div>
  <!--======================================== 文章卡片 ========================================-->

  </div>
</template>

<script>
import HeadMenu from '@/components/HeadMenu.vue';
import Tag from '@/components/Tag.vue';
import indexData from '@/assets/indexData.js';
// 按时间戳冒泡排序
function bubbleSort(items) {
  let item = JSON.parse(JSON.stringify(items)); 
  let i, j;
	for (i = 0; i < item.length - 1; i++)
		for (j = 0; j < item.length - 1 - i; j++)
			if (item[j].time < item[j + 1].time) {
				[item[j], item[j + 1]] = [item[j + 1], item[j]];
			}
	return item;
}
let data = bubbleSort(indexData);
console.log(data);



export default {
  name: 'index',
  components: {
    HeadMenu,
    Tag,
  },
  computed: {

  },
  data() {
    return {
      indexData: data,
    }  
  },
  methods: {
    article1Methods() {
      var canvas = document.querySelector('#canvasArticle1');
      var context = canvas.getContext('2d');

      // 存储实例
      var store = {};

      // 实例方法
      var Ball = function () {
        // 随机x坐标也就是横坐标，以及变化量moveX，以及半径r
        this.x = Math.random() * canvas.width;
        this.moveX = Math.random();
        this.r = 5 + 5 * Math.random();
        
        this.draw = function () {
          // 根据此时x位置重新绘制圆圈圈
          context.beginPath();
          context.fillStyle="#369";
          context.arc(this.x, canvas.height / 2, this.r, 0, Math.PI*2); 
          context.closePath();
          context.fill();
        };
      };

      // 假设10个圆圈圈
      for (var indexBall = 0; indexBall < 10; indexBall += 1) {
        store[indexBall] = new Ball();
      }

      // 绘制画布上10个圆圈圈
      var draw = function () {
        for (var index in store) {
          // 位置变化
          store[index].x += store[index].moveX;
          if (store[index].x > canvas.width) {
            // 移动到画布外部时候从左侧开始继续位移
            store[index].x = -2 * store[index].r;
          }
          // 根据新位置绘制圆圈圈
          store[index].draw();
        }
      };

      // 画布渲染
      var render = function () {
        // 清除画布
        context.clearRect(0, 0, canvas.width, canvas.height);
        
        // 绘制画布上所有的圆圈圈
        draw();

        // 继续渲染
        requestAnimationFrame(render);
      };

      render();
    },
  },
  mounted() {
  },
};
</script>

<style scoped lang="less">
.Topstory-container{
  display: flex;
  align-items: flex-start;
  position: relative;
  width: 1030px;
  padding: 61px 0 16px;
  margin: 10px auto;
}
  .Topstory-mainColumn{
    margin-right: 10px;
  }
    .TopstoryMain{
      width: 730px;
      height: 1000px;
      padding-bottom: 20px;
    }
      .article{
        padding: 20px 20px;
        background: #fff;
        margin-bottom: 10px;
      }
      .Card{
        border-radius: 4px;
        margin-bottom: 10px;
        background: #fff;
        overflow: hidden;
        border-radius: 2px;
        box-shadow: 0 1px 3px rgba(26,26,26,.1);
        box-sizing: border-box;
      }

  .TopstorySideBar{
    width: 290px;
    font-size: 14px;
  }
    .is-fixed{
      position: fixed;
      width: inherit;
    }
.tanwan{
  width: 100%;
  height: 100%;
  object-fit: cover;
}    

.HeadImg{
  margin: 0 auto;
  display: block;
}

.loginImg{
  width: 130px;
  height: 130px;
  object-fit: cover;
  margin: 0 auto;
  display: block;
}
.introduceH1{
  text-align: center;
}
.introduceP{
  text-align: center;
  color: #777;
}
.articleOl{
  padding: 0 20px;

  li {
    list-style: initial;
  }
}
.pagination{
  background: #fff;
  padding: 10px;
  margin-bottom: 20px;
}
.footer-right{
  display: flex;
  flex-wrap: wrap;
  align-content: center;
  justify-content: center;
  height: 290px;

  ul{
    display: flex;
    margin: 0 auto;

    a{
      display: block;
      color: rgba(0,0,0,.5);
      width: 50px;
      height: 50px;
      border-radius: 50%;
      border: 2px solid rgba(0,0,0,.5);
      line-height: 50px;
      font-size: 24px;
      margin-right: 10px;
      background: rgba(0,0,0,.1);
      text-align: center;

      &:hover{
        background: #007bff;
        color: #fff;
      }
    }
  }
}
</style>

<style lang="less">
.article{
  img{
    max-width: 690px;
  }
}
</style>


