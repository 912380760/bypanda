<template>
  <div class="test">
    <canvas id="c" @click="click" @touchstart="click"></canvas>
    <div class="text-box" @click="click" @touchstart="click">
      <div class="texts" v-if="num === -1" :key="-1">前点击屏幕！</div>
      <div class="text0 text" v-if="num === 0" :key="0">{{text}}</div>
      <div class="text1 text" v-if="num === 1" :key="1">{{text}}</div>
      <div class="text2 text" v-if="num === 2" :key="2">{{text}}</div>
      <div class="text3 text" v-if="num === 3" :key="3">{{text}}</div>
      <div class="text4 text" v-if="num === 4" :key="4">{{text}}</div>
      <div class="text5 text" v-if="num === 5" :key="5">{{text}}</div> 
      <div class="text6 text" v-if="num === 6" :key="6">{{text}}</div> 
      <div class="text7 text" v-if="num === 7" :key="7">{{text}}</div> 
      <div class="text8 text" v-if="num === 8" :key="8">{{text}}</div>
      <div class="text9 text" v-if="num === 9" :key="9">{{text}}</div> 
      <div class="text10 text" v-if="num === 10" :key="10">{{text}}</div> 
      <div class="text11 text" v-if="num === 11" :key="11">{{text}}</div> 
      <div class="text12 text" v-if="num === 12" :key="12">{{text}}</div> 
      <div class="text13 text" v-if="num === 13" :key="13">{{text}}</div> 
      <div class="text14 text" v-if="num === 14" :key="14">{{text}}</div> 
      <div class="text15 text" v-if="num === 15" :key="15">{{text}}</div> 
      <div class="text16 text" v-if="num === 16" :key="16">{{text}}</div> 
      <div class="text17 text" v-if="num === 17" :key="17">{{text}}</div>  
      <div class="text18 text" id="text" v-if="num > 17" :key="18">前继续点击！</div> 
    </div>
  </div>
</template>

<script>
import anime from 'animejs'
import { mapState } from 'vuex'
export default {
  computed: mapState({
  }),
  data() {
    return {
      num: -1,
      textList: [
        '2018.1.22. 看你照片的第一眼，我对我朋友说，她的微信我要定了，于是在这一天我们成为了微信好友',
        '刚认识你时，这期间《前任3：再见前任》在热映以及《旅行青蛙》火爆朋友圈，你说你要开始佛系~',
        '1月份的尾巴，2月份的前奏，我开始每天"骚扰"你，只想早点了解你',
        '在微信聊天中，不知道我的微信防撤回有没有吓到你，不小心防下来的锅我就甩给脚本了，毕竟技术无罪~ 哈哈哈',
        '2018.2.14,你在东北过了情人节，讲真，我那时好想说我们一起过吧！不过显然不可能，就算你不在东北，第二天也是除夕',
        '春节假期，应该是咱们聊天时长最多的期间，我记得我妈对我说：晚上的时候挺早睡的，怎么还起得那么晚？',
        '我很想对我妈说：因为每天都跟你未来的儿媳妇聊天聊到快天亮~',
        '2018.3.3 我们见面了，第1次见面，我带了台switch，有次跟同事说我第一次去见妹纸带了台switch跟她玩了一下午，然后就被同事笑了一下午',
        '我说我室友用春节期间订婚了，对方只用半个月就了解了对方，我对你说半年我可以了解你么，你说半年可能还不够。',
        '2018.3.17 我们第2次见面了，那天咱们逛了下壹方城，最后也没能把你拐来南山，还让我舍友鄙视我太早回来了',
        '之后，我提完辞职开始找工作，我菲律宾的朋友问我要不要去他那里，工资比深圳高了很多，我犹豫了。',
        '我跟你说了菲律宾的工作，得到你全力支持，我知道了咱们之间除了好朋友之外好像少了点基础感情',
        '4月份，我问你：能不能接受异地恋么？你问我：是不是想放弃？哈哈哈，那时真没放弃的想法 ',
        '2018.4.7，我们第3次见面，那天天气太糟糕，唯一不糟糕的是和你留下合照，那时心里美滋滋~',
        '4.9我出国了，到现在一个多月的时间，可能异国以及频繁的聊天让我们少了话题，开始渐渐的显示出了我直男的本性',
        '这几天~ 我开始想放弃了，然后我就在这周六也就是昨天，放在钱包的上个月工资就被偷了，或许这就是报应~',
        '如果。。。  算了不说如果，说了也没用了，两三年时间确实太长，祝你早日找到你的那个他啦！'
      ],
    }
  },
  methods: {
    click() {
      this.num++;
      console.log(this.num)
      if (this.num >= 19) {
        return this.$router.push({
          name: 'xinrui1',
        })
      }

      if (this.num < 24) {
        this.text = this.textList[this.num];
        setTimeout(() => {
          let cssSelector = anime({
            targets: `.text-box .text${this.num}`,
            translateY: 350,
            opacity: 1,
          });
        }, 50)
      } 
      
    },
  },
  mounted() {
    this.$nextTick(() => {
      var c = document.getElementById("c");
      var ctx = c.getContext("2d");
      var cH;
      var cW;
      var bgColor = "#FF6138";
      var animations = [];
      var circles = [];

      var colorPicker = (function() {
        var colors = ["#FF6138", "#FFBE53", "#2980B9", "#282741"];
        var index = 0;
        function next() {
          index = index++ < colors.length-1 ? index : 0;
          return colors[index];
        }
        function current() {
          return colors[index]
        }
        return {
          next: next,
          current: current
        }
      })();

      function removeAnimation(animation) {
        var index = animations.indexOf(animation);
        if (index > -1) animations.splice(index, 1);
      }

      function calcPageFillRadius(x, y) {
        var l = Math.max(x - 0, cW - x);
        var h = Math.max(y - 0, cH - y);
        return Math.sqrt(Math.pow(l, 2) + Math.pow(h, 2));
      }

      function addClickListeners() {
        document.addEventListener("touchstart", handleEvent);
        document.addEventListener("mousedown", handleEvent);
      };

      function handleEvent(e) {
          if (e.touches) { 
            e.preventDefault();
            e = e.touches[0];
          }
          var currentColor = colorPicker.current();
          var nextColor = colorPicker.next();
          var targetR = calcPageFillRadius(e.pageX, e.pageY);
          var rippleSize = Math.min(200, (cW * .4));
          var minCoverDuration = 750;
          
          var pageFill = new Circle({
            x: e.pageX,
            y: e.pageY,
            r: 0,
            fill: nextColor
          });
          var fillAnimation = anime({
            targets: pageFill,
            r: targetR,
            duration:  Math.max(targetR / 2 , minCoverDuration ),
            easing: "easeOutQuart",
            complete: function(){
              bgColor = pageFill.fill;
              removeAnimation(fillAnimation);
            }
          });
          
          var ripple = new Circle({
            x: e.pageX,
            y: e.pageY,
            r: 0,
            fill: currentColor,
            stroke: {
              width: 3,
              color: currentColor
            },
            opacity: 1
          });
          var rippleAnimation = anime({
            targets: ripple,
            r: rippleSize,
            opacity: 0,
            easing: "easeOutExpo",
            duration: 900,
            complete: removeAnimation
          });
          
          var particles = [];
          for (var i=0; i<32; i++) {
            var particle = new Circle({
              x: e.pageX,
              y: e.pageY,
              fill: currentColor,
              r: anime.random(24, 48)
            })
            particles.push(particle);
          }
          var particlesAnimation = anime({
            targets: particles,
            x: function(particle){
              return particle.x + anime.random(rippleSize, -rippleSize);
            },
            y: function(particle){
              return particle.y + anime.random(rippleSize * 1.15, -rippleSize * 1.15);
            },
            r: 0,
            easing: "easeOutExpo",
            duration: anime.random(1000,1300),
            complete: removeAnimation
          });
          animations.push(fillAnimation, rippleAnimation, particlesAnimation);
      }

      function extend(a, b){
        for(var key in b) {
          if(b.hasOwnProperty(key)) {
            a[key] = b[key];
          }
        }
        return a;
      }

      var Circle = function(opts) {
        extend(this, opts);
      }

      Circle.prototype.draw = function() {
        ctx.globalAlpha = this.opacity || 1;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);
        if (this.stroke) {
          ctx.strokeStyle = this.stroke.color;
          ctx.lineWidth = this.stroke.width;
          ctx.stroke();
        }
        if (this.fill) {
          ctx.fillStyle = this.fill;
          ctx.fill();
        }
        ctx.closePath();
        ctx.globalAlpha = 1;
      }

      var animate = anime({
        duration: Infinity,
        update: function() {
          ctx.fillStyle = bgColor;
          ctx.fillRect(0, 0, cW, cH);
          animations.forEach(function(anim) {
            anim.animatables.forEach(function(animatable) {
              animatable.target.draw();
            });
          });
        }
      });

      var resizeCanvas = function() {
        cW = window.innerWidth;
        cH = window.innerHeight;
        c.width = cW * devicePixelRatio;
        c.height = cH * devicePixelRatio;
        ctx.scale(devicePixelRatio, devicePixelRatio);
      };

      (function init() {
        resizeCanvas();
        if (window.CP) {
          // CodePen's loop detection was causin' problems
          // and I have no idea why, so...
          window.CP.PenTimer.MAX_TIME_IN_LOOP_WO_EXIT = 6000; 
        }
        window.addEventListener("resize", resizeCanvas);
        addClickListeners();
        if (!!window.location.pathname.match(/fullcpgrid/)) {
          startFauxClicking();
        }
        handleInactiveUser();
      })();

      function handleInactiveUser() {
        var inactive = setTimeout(function(){
          fauxClick(cW/2, cH/2);
        }, 1000);
        
        function clearInactiveTimeout() {
          clearTimeout(inactive);
          document.removeEventListener("mousedown", clearInactiveTimeout);
          document.removeEventListener("touchstart", clearInactiveTimeout);
        }
        
        document.addEventListener("mousedown", clearInactiveTimeout);
        document.addEventListener("touchstart", clearInactiveTimeout);
      }

      function startFauxClicking() {
        setTimeout(function(){
          fauxClick(anime.random( cW * .2, cW * .8), anime.random(cH * .2, cH * .8));
          startFauxClicking();
        }, anime.random(200, 900));
      }

      function fauxClick(x, y) {
        var fauxClick = new Event("mousedown");
        fauxClick.pageX = x;
        fauxClick.pageY = y;
        document.dispatchEvent(fauxClick);
      }
    })
  },
}
</script>


<style lang="less" scoped>
  canvas {
    display: block;
    width: 100vw;
    height: 100vh;
    cursor: pointer; 
  }
  .text-box {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100vw;
    height: 100vh;
    position: absolute;
    top: 0;
    left: 0;
  }
  .text {
    padding: 0 240px;
    font-size: 40px;
    color: #fff;
    user-select: none;
    // text-align: center;
    position: relative;
    top: -350px;
    opacity: 0.6;
  }
   .texts {
    padding: 0 240px;
    font-size: 40px;
    color: #fff;
    user-select: none;
    opacity: 0.6;
  }

  @media (max-width: 800px) {
    .text,.texts {
      padding: 0 30px;
      font-size: 30px;
    }
    
  }
</style>
