<template>
  <div>
    <canvas class="canvas" id="canvas" width="909" height="903"></canvas>
  </div>
</template>

<script>
export default {
  name: 'canvasStar',
  data () {
    return {
      isInit: false,
    }
  },
  methods: {
    // 初始化星空背景图
    initCanvas() {
      setTimeout(() => {
        let canvas = document.getElementById('canvas'),
        ctx = canvas.getContext('2d'),
        w = canvas.width = document.body.offsetWidth,
        h = canvas.height = document.body.offsetHeight,

        hue = 217,
        stars = [],
        count = 0,
        maxStars = 1200;

        let canvas2 = document.createElement('canvas'),
        ctx2 = canvas2.getContext('2d');
        canvas2.width = 100;
        canvas2.height = 100;
        let half = canvas2.width / 2,
        gradient2 = ctx2.createRadialGradient(half, half, 0, half, half, half);
        gradient2.addColorStop(0.025, '#fff');
        gradient2.addColorStop(0.1, 'hsl(' + hue + ', 61%, 33%)');
        gradient2.addColorStop(0.25, 'hsl(' + hue + ', 64%, 6%)');
        gradient2.addColorStop(1, 'transparent');

        ctx2.fillStyle = gradient2;
        ctx2.beginPath();
        ctx2.arc(half, half, half, 0, Math.PI * 2);
        ctx2.fill();

        // End cache

        function random(min, max) {
          if (arguments.length < 2) {
            max = min;
            min = 0;
          }

          if (min > max) {
            let hold = max;
            max = min;
            min = hold;
          }

          return Math.floor(Math.random() * (max - min + 1)) + min;
        }

        function maxOrbit(x, y) {
          let max = Math.max(x, y),
            diameter = Math.round(Math.sqrt(max * max + max * max));
          return diameter / 2;
        }

        let Star = function() {

          this.orbitRadius = random(maxOrbit(w, h));
          this.radius = random(60, this.orbitRadius) / 12;
          this.orbitX = w / 2;
          this.orbitY = h / 2;
          this.timePassed = random(0, maxStars);
          this.speed = random(this.orbitRadius) / 900000;
          this.alpha = random(2, 10) / 10;

          count++;
          stars[count] = this;
        }

        Star.prototype.draw = function() {
          let x = Math.sin(this.timePassed) * this.orbitRadius + this.orbitX,
            y = Math.cos(this.timePassed) * this.orbitRadius + this.orbitY,
            twinkle = random(10);

          if (twinkle === 1 && this.alpha > 0) {
            this.alpha -= 0.05;
          } else if (twinkle === 2 && this.alpha < 1) {
            this.alpha += 0.05;
          }

          ctx.globalAlpha = this.alpha;
          ctx.drawImage(canvas2, x - this.radius / 2, y - this.radius / 2, this.radius, this.radius);
          this.timePassed += this.speed;
        }

        for (let i = 0; i < maxStars; i++) {
          new Star();
        }

        function animation() {
          ctx.globalCompositeOperation = 'source-over';
          ctx.globalAlpha = 0.8;
          ctx.fillStyle = 'hsla(' + hue + ', 64%, 6%, 1)';
          ctx.fillRect(0, 0, w, h)

          ctx.globalCompositeOperation = 'lighter';
          for (let i = 1, l = stars.length; i < l; i++) {
            stars[i].draw();
          };

          window.requestAnimationFrame(animation);
        }
        animation();
      }, 1000);
    },

    // 初始化连线背景图
    initCanvas2() {
      setTimeout(() => {
        let canvas = document.getElementById('canvas'),
        ctx = canvas.getContext('2d')
        canvas.width = document.body.offsetWidth;
        canvas.height = document.body.offsetHeight;
        ctx.lineWidth = .3;
        ctx.strokeStyle = (new Color(150)).style;
        let mousePosition = {
          x: 30 * canvas.width / 100,
          y: 30 * canvas.height / 100
        };
        let dots = {
          nb: 750,
          distance: 50,
          d_radius: 100,
          array: []
        };

        

        function colorValue(min) {
          return Math.floor(Math.random() * 255 + min);
        }

        function createColorStyle(r, g, b) {
          return 'rgba(' + r + ',' + g + ',' + b + ', 0.8)';
        }

        function mixComponents(comp1, weight1, comp2, weight2) {
          return (comp1 * weight1 + comp2 * weight2) / (weight1 + weight2);
        }

        function averageColorStyles(dot1, dot2) {
          let color1 = dot1.color,
            color2 = dot2.color;
          let r = mixComponents(color1.r, dot1.radius, color2.r, dot2.radius),
            g = mixComponents(color1.g, dot1.radius, color2.g, dot2.radius),
            b = mixComponents(color1.b, dot1.radius, color2.b, dot2.radius);
          return createColorStyle(Math.floor(r), Math.floor(g), Math.floor(b));
        }

        function Color(min) {
          min = min || 0;
          this.r = colorValue(min);
          this.g = colorValue(min);
          this.b = colorValue(min);
          this.style = createColorStyle(this.r, this.g, this.b);
        }

        function Dot() {
          this.x = Math.random() * canvas.width;
          this.y = Math.random() * canvas.height;
          this.vx = -.5 + Math.random();
          this.vy = -.5 + Math.random();
          this.radius = Math.random() * 2;
          this.color = new Color();
          // console.log(this);
        }
        Dot.prototype = {
          draw: function () {
            ctx.beginPath();
            ctx.fillStyle = this.color.style;
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
            ctx.fill();
          }
        };

        function createDots() {
          for (let i = 0; i < dots.nb; i++) {
            dots.array.push(new Dot());
          }
        }

        function moveDots() {
          for (let i = 0; i < dots.nb; i++) {
            let dot = dots.array[i];
            if (dot.y < 0 || dot.y > canvas.height) {
              dot.vx = dot.vx;
              dot.vy = -dot.vy;
            } else if (dot.x < 0 || dot.x > canvas.width) {
              dot.vx = -dot.vx;
              dot.vy = dot.vy;
            }
            dot.x += dot.vx;
            dot.y += dot.vy;
          }
        }

        function connectDots() {
          for (let i = 0; i < dots.nb; i++) {
            for (let j = 0; j < dots.nb; j++) {
              let i_dot = dots.array[i];
              let j_dot = dots.array[j];
              if ((i_dot.x - j_dot.x) < dots.distance && (i_dot.y - j_dot.y) < dots.distance && (i_dot.x - j_dot.x) > -dots.distance && (i_dot.y - j_dot.y) > -dots.distance) {
                if ((i_dot.x - mousePosition.x) < dots.d_radius && (i_dot.y - mousePosition.y) < dots.d_radius && (i_dot.x - mousePosition.x) > -dots.d_radius && (i_dot.y - mousePosition.y) > -dots.d_radius) {
                  ctx.beginPath();
                  ctx.strokeStyle = averageColorStyles(i_dot, j_dot);
                  ctx.moveTo(i_dot.x, i_dot.y);
                  ctx.lineTo(j_dot.x, j_dot.y);
                  ctx.stroke();
                  ctx.closePath();
                }
              }
            }
          }
        }

        function drawDots() {
          for (let i = 0; i < dots.nb; i++) {
            let dot = dots.array[i];
            dot.draw();
          }
        }

        function animateDots() {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          moveDots();
          connectDots();
          drawDots();
          requestAnimationFrame(animateDots);
        }
        $('canvas').on('mousemove', function (e) {
          mousePosition.x = e.pageX;
          mousePosition.y = e.pageY;
        });
        $('canvas').on('mouseleave', function (e) {
          mousePosition.x = canvas.width / 2;
          mousePosition.y = canvas.height / 2;
        });
        createDots();
        requestAnimationFrame(animateDots);
      }, 1000);
    },

    // 鱿鱼须背景图
    initCanvas3() {
      document.addEventListener('touchmove', function (e) {
            e.preventDefault()
        });
        var canvasRibbon = document.getElementById('canvas'),
            ctx = canvasRibbon.getContext('2d'),    // 获取canvas 2d上下文
            dpr = window.devicePixelRatio || 1, // the size of one CSS pixel to the size of one physical pixel.
            width = document.body.offsetWidth,     // 返回窗口的文档显示区的宽高
            height = window.innerHeight - 60,
            RIBBON_WIDE = 90,
            path,
            math = Math,
            r = 0,
            PI_2 = math.PI * 2,    // 圆周率*2
            cos = math.cos,   // cos函数返回一个数值的余弦值（-1~1）
            random = math.random;   // 返回0-1随机数
        canvasRibbon.width = width * dpr;     // 返回实际宽高
        canvasRibbon.height = height * dpr;
        ctx.scale(dpr, dpr);    // 水平、竖直方向缩放
        ctx.globalAlpha = 0.6;  // 图形透明度
        function init() {
            ctx.clearRect(0, 0, width, height);     // 擦除之前绘制内容
            path = [{x: 0, y: height * 0.7 + RIBBON_WIDE}, {x: 0, y: height * 0.7 - RIBBON_WIDE}];
            // 路径没有填满屏幕宽度时，绘制路径
            while (path[1].x < width + RIBBON_WIDE) {
                draw(path[0], path[1])     // 调用绘制方法
            }
        }
        // 绘制彩带每一段路径
        function draw(start, end) {
            ctx.beginPath();    // 创建一个新的路径
            ctx.moveTo(start.x, start.y);   // path起点
            ctx.lineTo(end.x, end.y);   // path终点
            var nextX = end.x + (random() * 2 - 0.25) * RIBBON_WIDE,
                nextY = geneY(end.y);
            ctx.lineTo(nextX, nextY);
            ctx.closePath();
            r -= PI_2 / -50;
            // 随机生成并设置canvas路径16进制颜色
            ctx.fillStyle = '#' + (cos(r) * 127 + 128 << 16 | cos(r + PI_2 / 3) * 127 + 128 << 8 | cos(r + PI_2 / 3 * 2) * 127 + 128).toString(16);
            ctx.fill();     // 根据当前样式填充路径
            path[0] = path[1];    // 起点更新为当前终点
            path[1] = {x: nextX, y: nextY}     // 更新终点
        }
        // 获取下一路径终点的y坐标值
        function geneY(y) {
            var temp = y + (random() * 2 - 1.1) * RIBBON_WIDE;
            return (temp > height || temp < 0) ? geneY(y) : temp
        }
        document.onclick = init;
        document.ontouchstart = init;
        init();
    },
  },
  mounted () {
    this.$nextTick(() => {
      this.initCanvas3();
    })
  }
}
</script>

<style lang="less" scoped>
.canvas{
  position: fixed;
  top: 60px;
  z-index: -1;
  background: #eee;
}
</style>

