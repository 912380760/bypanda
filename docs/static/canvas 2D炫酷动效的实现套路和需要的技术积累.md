####  一、canvas动效眼见为实
Gif截屏效果如下：

![](/static/images/article/1/canvas.gif)

上面这个看上去还有点小酷，看上去比较有实现难度的动画效果，实际上都是由一些非常基础的知识累积而成，而且都是有套路可循的。
##### 二、canvas 2D炫酷动效的实现的基本套路
目前在web领域，基本上看到那些酷酷的2d动效，都是canvas实现的，flash已经基本上都被淘汰了，canvas效果的实现，无需安装任何插件，IE9及其以上浏览器支持，至少在移动端，大家可以放心大胆使用，甚至webGL 3D效果都可以尝鲜。 

无论是雪花飘，星星动还是粒子飞，其canvas实现都是一样的套路，这里就讲讲我的理解：
###### 1. 了解canvas画布的工作原理
实际上，canvas的工作原理和我们的显示器是一样的，都是不断的刷新绘制，刷新绘制，只不过显示器的刷新是实时的，而canvas的刷新手手动触发的，当然如果我们只想在canvas上实现静态的效果，是没必要不断刷新的。

举个简单例子，如果我们希望一个圆圈圈从画布左边移到画布右边的效果，我们可以在第1秒的时候让圆圈圈在最左边，然后下一秒的时候，先用黑板擦把我们的圆圈圈擦掉，然后再重新画圆圈圈再往右偏一点的样子，就这样不断擦不断绘，我们肉眼看到的就是一个动画效果了，有点类似于放电影。

一般来讲，清除画布使用下面的代码：
```
var canvas = document.querySelector('canvas');
var context = canvas.getContext('2d');
// 清除画布
context.clearRect(0, 0, canvas.width, canvas.height);
```
###### 2. canvas画布的不断绘制
在以前我们都是使用定时器进行绘制，但是现在建议使用requestAnimationFrame来实现刷新绘制，为了向下兼容，我们一般会做类似下面的处理：
```
// requestAnimationFrame的向下兼容处理
if (!window.requestAnimationFrame) {
  window.requestAnimationFrame = function(fn) {
    setTimeout(fn, 17);
  };
}
```
于是，动效绘制大致路数会变成这样：
```
var canvas = document.querySelector('canvas');
var context = canvas.getContext('2d');

// 画布渲染
var render = function () {
  // 清除画布
  context.clearRect(0, 0, canvas.width, canvas.height);

  // 绘制
  draw();

  // 继续渲染
  requestAnimationFrame(render);
};

render();
```
而上面的draw()就是在canvas画布上绘制图形的代码了，但如果仅仅上面代码还不够，如果是同一个位置不断刷新，我们看到的还是静止不动的效果，还差一个运动变量。

###### 3. 需要一个运动坐标变量 
假设我们就有一个圆圈圈，同时ball.x就表示此圆圈圈的水平坐标位置，则，代码套路可以是这样：
```
var canvas = document.querySelector('canvas');
var context = canvas.getContext('2d');

// 坐标变量
var x = 0;

// 绘制方法
var draw = function () {
  ball.x = x;
};

// 画布渲染
var render = function () {
  // 清除画布
  context.clearRect(0, 0, canvas.width, canvas.height);

  // 位置变化
  x++;
  
  // 绘制
  draw();

  // 继续渲染
  requestAnimationFrame(render);
};

render();
```
然而，实际项目中，很少，就只有一个圆圈圈，而是一大波的圆圈圈，此时上面的变量设置就会有问题，哪有那么多变量让你设置呢！通常有两种处理方法，一种是变量管理，有一个大变量，变量里面放的都是小变量，类似于[{},{},{},...]这种数据结构；还有一种是走实例化对象，变量存储在实例对象上，很显然，后面一种对变量的管理要更加方便和易于理解。

###### 4. 实例对象管理canvas图形颗粒变量
假设圆圈圈实例名称是Ball，则有：
```
var Ball = function () {
  this.x = 0;

  this.draw = function () {
    // 根据此时x位置重新绘制圆圈圈
    // ...
  };
};
```
于是：
```
var canvas = document.querySelector('canvas');
var context = canvas.getContext('2d');

// 存储实例
var store = {};

// 实例方法
var Ball = function () {
  this.x = 0;
  
  this.draw = function () {
      // 根据此时x位置重新绘制圆圈圈
      // ...
  };
};

// 假设就一个圆圈圈
store[0] = new Ball();

// 绘制画布上所有的圆圈圈的方法
var draw = function () {
  // 位置变化
  store[0].x++;
  // 根据新位置绘制圆圈圈
  store[0].draw();
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
```
###### 5. 随机多个实例对象坐标尺寸透明度等属性
假设现在有10个圆圈圈，如果每个圈圈的起始位置和运动速度都是一样的，是很无趣的，此时，我们就可以借助Math.random()构建随机属性，半径啊，位移速度啊，坐标都可以，如下代码：
```
var canvas = document.querySelector('canvas');
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
    // ...
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
```
###### 6. 补全圆圈圈的canvas绘制
canvas画圆直接API手册上就有，例如这里：
```
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
```
于是，就可以看到下面这个效果

![](/static/images/article/1/dian.gif)

如果我们背景变成黑色，圆圈圈变成白色，尺寸再小一点，透明度再忽闪忽闪的变化，则就可以实现一个星空效果。这就是一开始星星连线联动动效demo中星空背景效果的实现套路。
##### 三、canvas 2D炫酷动效需要的技术积累
线和星星一起弹动的动效要比星空实现要复杂点，都大体上套路上是一样的，但是，所需要的技术积累要多一些，包括：
###### 1. 了解canvas动效原理
这个上一小节已经探讨过了，就是不断清除画布再绘制，清除再绘制。
###### 2. 一定的JS基本功
例如，了解实例对象的属性如何获取，以及上下文this指代什么；如何有效地遍历以及数据存储等等。

例如，本demo 6个星星所有坐标是个三维数组，并且，每个星座数组的个数都不一样，其中就涉及到查漏补缺的数据处理，但是，如果JS基本功扎实，这些都是手到擒来，分分钟就可以搞定的，反之，这效率怕是要大打折扣了。

###### 3. 知道如何运用一些动画算法
准备好前后两个场景每个星星的坐标位置，然后，位置变化的值走ElasticEaseOut算法，弹动效果就出来了。
###### 4. 了解canvas所有API，尤其基本的绘图API
如何使用canvas绘制线条，绘制圆，绘制不规则图形；如何描边，如何填充，如何控制透明度等等，都是必须要牢固掌握的。

因为，无论是是圆圈圈，还是角星星，都离不开这些基础的API绘制。

还需要了解图像绘制API，例如，本demo的星星，实际上还可以基于图片资源绘制，难度会稍微降低些，但可能要牺牲点效果。

又例如，demo中的虚线连接，语法很简单，只需要起点坐标和终点坐标就可以，渲染的时候，只要实时根据两个星星中心点（假设坐标分别是(x0,y0)和(x1,y1)）连线就可以了，永远跟着星星，星星弹动，线自然也跟着有弹动效果。

```
// 开始路径绘制
context.beginPath();
// 虚线设定
context.setLineDash([2,2]);
// 设置路径起点
context.moveTo(x0, y0);
// 绘制一条到终点点的直线
context.lineTo(x1, y1);
// 设置线宽
context.lineWidth = 1.0;
// 设置线的颜色
context.strokeStyle = '#fff'; 
// 进行线的着色，这时整条线才变得可见
context.stroke();
```
###### 5. 掌握常见的曲线函数
也就是要有一定的数学功力，无论是CSS3的transform变幻还是我们平时所见的各种动画效果，其本质上都是数学函数运动和矩阵变换，因此，要想再图形可视化以及视觉动效领域有所建树，数学不能差。

六角星实际上是两个等边三角形组成，且六个顶点正好在一个圆上，如下图所示：

![](/static/images/article/1/star.png)

所以我们只要根据圆心和圆弧公式就可以求得六个点的坐标位置了，计算公式为：
```
x = a + r * cosθ
y = b + r * sinθ
```
其中，(a,b)是圆心坐标，r是半径大小，θ是弧度大小，在六角星中，弧度间隔都是1/6弧度，因此，6个坐标点分别是：
```
var arrPos = [
  [a + r * Math.cos(0), b + r * Math.sin(0)],
  [a + r * Math.cos(Math.PI * 2 / 3), b + r * Math.sin(Math.PI * 2 / 3)],
  [a + r * Math.cos(Math.PI * 2 / -3), b + r * Math.sin(Math.PI * 2 / -3)],
  [a + r * Math.cos(Math.PI / 3), b + r * Math.sin(Math.PI / 3)],
  [a + r * Math.cos(Math.PI / -3), b + r * Math.sin(Math.PI / -3)],
  [a + r * Math.cos(Math.PI), b + r * Math.sin(Math.PI)]
]
```
然后，就可以类似下面3点连线填充绘制了：
```
context.beginPath();
context.moveTo(arrPos[0][0], arrPos[0][1]);
context.lineTo(arrPos[1][0], arrPos[1][1]);
context.lineTo(arrPos[2][0], arrPos[2][1]);
context.closePath();
context.fillStyle = '#fff';
context.fill();

context.beginPath();
context.moveTo(arrPos[3][0], arrPos[3][1]);
context.lineTo(arrPos[4][0], arrPos[4][1]);
context.lineTo(arrPos[5][0], arrPos[5][1]);
context.closePath();
context.fillStyle = '#fff';
context.fill();
```
然后，只要确定6个场景，星星的中心坐标位置，就能将所有的星座绘制起来了。

然后，有了这些基本功，配合本文介绍的canvas动效实现的常见套路，就能实现最终想要的效果。

好了，就这些，感谢阅读，欢迎交流！