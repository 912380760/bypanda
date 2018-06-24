<template>
  <div class="test">
    <canvas id="c" @click="click" @touchstart="click"></canvas>
    <div class="text-box" @click="click" @touchstart="click">
      <div class="text0 text" v-if="num === 0" :key="0">{{text}}</div>
      <div class="text1 text" v-if="num === 1" :key="1">{{text}}</div>
      <div class="text2 text" v-if="num === 2" :key="2">{{text}}</div>
      <div class="text3 text" v-if="num === 3" :key="3">{{text}}</div>
      <div class="text4 text" v-if="num === 4" :key="4">{{text}}</div>
      <div class="text5 text" v-if="num === 5" :key="5">{{text}}</div> 
      <div class="text6 text" v-if="num === 6" :key="6">{{text}}</div> 
      <div class="text7 text" v-if="num === 7" :key="7">{{text}}</div> 
      <div class="text8 text" v-if="num === 8" :key="8">{{text}}</div> 
      <div class="text9 text" id="text" v-if="num > 8" :key="9">{{num + 1}}</div> 
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
        '5月19日 晴 她今天竟然还没向我要礼物，这个仇我先记下来！',
        '来这边已经一个多月了，很想你，很想见到你。',
        '我是个很压抑自己情绪的人，木纳，不解风情，从我口中说出的情话惜字如金，请你谅解。',
        '我觉得我们有几个问题可以花时间思考和沟通。',
        '我们未来的职业规划？',
        '我们现在的相处方式会不会让双方觉得太累了？',
        '双方的感情需求是什么？',
        '最后',
        '我把我的整个灵魂都给你，连同它的怪癖，耍小脾气，忽明忽暗，它真讨厌，只有一点好，爱你。',
      ],
    }
  },
  methods: {
    click() {
      this.num++;
      
      if (this.num > 22) {
        return this.$router.push({
          name: 'yangxiuting',
        })
      }

      if (this.num < 10) {
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
  #text {
    font-size: 100px;
  }

  @media (max-width: 800px) {
    .text {
      padding: 0 30px;
      font-size: 30px;
    }
  }
</style>
