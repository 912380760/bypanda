import Highlight from 'highlight.js';
marked.setOptions({
  highlight: function(code, lang, callback) {
    let temp = Highlight.highlightAuto(code, ['js','css','html','less']);
    return temp.value;
  }
});

/********************************  文章1  ***************************************/
/********************************  文章1  ***************************************/
let article1 = marked(`
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
\`\`\`
var canvas = document.querySelector('canvas');
var context = canvas.getContext('2d');
// 清除画布
context.clearRect(0, 0, canvas.width, canvas.height);
\`\`\`
###### 2. canvas画布的不断绘制
在以前我们都是使用定时器进行绘制，但是现在建议使用requestAnimationFrame来实现刷新绘制，为了向下兼容，我们一般会做类似下面的处理：
\`\`\`
// requestAnimationFrame的向下兼容处理
if (!window.requestAnimationFrame) {
  window.requestAnimationFrame = function(fn) {
    setTimeout(fn, 17);
  };
}
\`\`\`
于是，动效绘制大致路数会变成这样：
\`\`\`
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
\`\`\`
而上面的draw()就是在canvas画布上绘制图形的代码了，但如果仅仅上面代码还不够，如果是同一个位置不断刷新，我们看到的还是静止不动的效果，还差一个运动变量。

###### 3. 需要一个运动坐标变量 
假设我们就有一个圆圈圈，同时ball.x就表示此圆圈圈的水平坐标位置，则，代码套路可以是这样：
\`\`\`
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
\`\`\`
然而，实际项目中，很少，就只有一个圆圈圈，而是一大波的圆圈圈，此时上面的变量设置就会有问题，哪有那么多变量让你设置呢！通常有两种处理方法，一种是变量管理，有一个大变量，变量里面放的都是小变量，类似于[{},{},{},...]这种数据结构；还有一种是走实例化对象，变量存储在实例对象上，很显然，后面一种对变量的管理要更加方便和易于理解。

###### 4. 实例对象管理canvas图形颗粒变量
假设圆圈圈实例名称是Ball，则有：
\`\`\`
var Ball = function () {
  this.x = 0;

  this.draw = function () {
    // 根据此时x位置重新绘制圆圈圈
    // ...
  };
};
\`\`\`
于是：
\`\`\`
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
\`\`\`
###### 5. 随机多个实例对象坐标尺寸透明度等属性
假设现在有10个圆圈圈，如果每个圈圈的起始位置和运动速度都是一样的，是很无趣的，此时，我们就可以借助Math.random()构建随机属性，半径啊，位移速度啊，坐标都可以，如下代码：
\`\`\`
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
\`\`\`
###### 6. 补全圆圈圈的canvas绘制
canvas画圆直接API手册上就有，例如这里：
\`\`\`
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
\`\`\`
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

\`\`\`
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
\`\`\`
###### 5. 掌握常见的曲线函数
也就是要有一定的数学功力，无论是CSS3的transform变幻还是我们平时所见的各种动画效果，其本质上都是数学函数运动和矩阵变换，因此，要想再图形可视化以及视觉动效领域有所建树，数学不能差。

六角星实际上是两个等边三角形组成，且六个顶点正好在一个圆上，如下图所示：

![](/static/images/article/1/star.png)

所以我们只要根据圆心和圆弧公式就可以求得六个点的坐标位置了，计算公式为：
\`\`\`
x = a + r * cosθ
y = b + r * sinθ
\`\`\`
其中，(a,b)是圆心坐标，r是半径大小，θ是弧度大小，在六角星中，弧度间隔都是1/6弧度，因此，6个坐标点分别是：
\`\`\`
var arrPos = [
  [a + r * Math.cos(0), b + r * Math.sin(0)],
  [a + r * Math.cos(Math.PI * 2 / 3), b + r * Math.sin(Math.PI * 2 / 3)],
  [a + r * Math.cos(Math.PI * 2 / -3), b + r * Math.sin(Math.PI * 2 / -3)],
  [a + r * Math.cos(Math.PI / 3), b + r * Math.sin(Math.PI / 3)],
  [a + r * Math.cos(Math.PI / -3), b + r * Math.sin(Math.PI / -3)],
  [a + r * Math.cos(Math.PI), b + r * Math.sin(Math.PI)]
]
\`\`\`
然后，就可以类似下面3点连线填充绘制了：
\`\`\`
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
\`\`\`
然后，只要确定6个场景，星星的中心坐标位置，就能将所有的星座绘制起来了。

然后，有了这些基本功，配合本文介绍的canvas动效实现的常见套路，就能实现最终想要的效果。

好了，就这些，感谢阅读，欢迎交流！
`);

/********************************  文章2  ***************************************/
/********************************  文章2  ***************************************/
let article2 = marked(`
##### 一、JS获取前一个访问页面的URL地址document.referrer
要获取前一个访问页面的URL地址前后端语言都可以，例如PHP的是$_SERVER['HTTP_REFERER']，JavaScript的就是document.referrer。

我们平常开发，虽然和URL打交道也算比较频繁，但是，似乎很少使用document.referrer。我起初以为是兼容性不好，后来测试发现ie7都支持，那就奇怪了，为何document.referrer用的不多呢？

我想了一下，可能有下面几个原因：
+ 后端小伙伴帮我们搞定了相关需求；
+ 只有一些访问数据统计脚本才非常在意上一个访问页面的url地址是什么；
+ 如果我们希望实现的功能是返回上一页，可以使用history.go(-1)或者history.back()，我们并不需要知道上一个访问页面具体的地址是什么。
综合以上几点，导致平时开发很少使用document.referrer。

但是最近做了一个移动端项目，是我第一次在正式项目中使用document.referrer，这里跟大家分享一下相关的实践。

场景是这样的，移动端无论是原生app还是传统的网页，返回上页是一个比较强烈的需求，如下截图所示：

![](/static/images/article/2/wap.png)

几乎所有的内页都有这么一个返回上一页的按钮

此返回上一页相关HTML代码如下：
\`\`\`
<a href="javascript:history.go(-1)" class="header-back jsBack">返回</a>
\`\`\`
在大部分场景下，上面办法可以满足我们的交互需求，但是，在有些时候，上面的代码就有些心有力而气不足，因为当前页面的referrer并不总是存在的。

比方说用户是通过微信分享进来的，直接进入了内页，此时是没有上一页的，返回按钮再怎么点击都没有任何反应，就会让用户很奇怪，十有八九会认为是实现了bug，则会让用户对产品的品质抱有疑虑，那问题可就大了。

怎么办呢！后来我想了一招，那就是如果发现浏览器没有上一页来源信息，我们就把返回按钮的链接改成首页的链接地址，这样无论什么时候，用户点击返回按钮一定是会有反应的，并且返回首页从逻辑上讲也是合情合理的。而这里判断是否有没有来源信息就是使用这里的document.referrer，当浏览器得不到上一页的来源信息的时候，document.referrer的返回值就是空字符串''，于是乎，就有类似下面的代码：

\`\`\`
if (document.referrer === '') {
  // 没有来源页面信息的时候，改成首页URL地址
  $('.jsBack').attr('href', '/');
}
\`\`\`
于是乎，返回按钮的逻辑就天衣无缝了。
##### 二、哪些场景下无法获得上一页referrer信息
+ 直接在浏览器地址栏中输入地址；
+ 使用location.reload()刷新（location.href或者location.replace()刷新有信息）；
+ 在微信对话框中，点击链接进入微信自身的浏览器；
+ 扫码进入QQ或者微信的浏览器；
+ 从https的网站直接进入一个http协议的网站（Chrome下亲测）
+ a标签设置rel="noreferrer"（兼容IE7+);
+ meta标签来控制不让浏览器发送referer；

例如：
\`\`\`
<meta content="never" name="referrer">
\`\`\`
兼容性如下图：

![](/static/images/article/2/jianrong.png)

iOS浏览器目前还是使用的老版本的规范值，包括：never, always, origin, default。对于Android浏览器，5.0版本开始支持。基本上，在移动端，使用meta标签来控制referer信息的发送与否已经可以在实际项目中使用了。
`);

/********************************  文章3  ***************************************/
/********************************  文章3  ***************************************/
let article3 = marked(`
##### 一、变量是个好东西
在任何语言中，变量的有一点作用都是一样的，那就是可以降低维护成本，附带还有更高性能，文件更高压缩率的好处。

随着CSS预编译工具Sass/Less/Stylus的关注和逐渐流行，CSS工作组迅速跟进CSS变量的规范制定，并且，很多浏览器已经跟进，目前，在部分项目中已经可以直接使用了。

![](/static/images/article/3/jianrong.png)

hrome/Firefox/Safari浏览器都是绿油油的，兼容性大大超出我的预期，于是果断尝鲜记录下语法用法和特性。

##### 二、CSS变量var()语法和用法和特性
CSS中原生的变量定义语法是：--*，变量使用语法是：var(--*)，其中*表示我们的变量名称。关于命名这个东西，各种语言都有些显示，例如CSS选择器不能是数字开头，JS中的变量是不能直接数值的，但是，在CSS变量中，这些限制通通没有，例如：
\`\`\`
.root {
  --1: #369;
}
body {
  background-color: var(--1);
}
\`\`\`
但是，不能包含$，[，^，(，%等字符，普通字符局限在只要是“数字[0-9]”“字母[a-zA-Z]”“下划线_”和“短横线-”这些组合，但是可以是中文，日文或者韩文，例如：
\`\`\`
body {
  --深蓝: #369;
  background-color: var(--深蓝);
}
\`\`\`
所以，我们就可以直接使用中文名称作为变量，即使英语4级没过的小伙伴也不会有压力了，我们也不需要随时挂个翻译器在身边了。

无论是变量的定义和使用只能在声明块{}里面，例如，下面这样是无效的：
\`\`\`
--深蓝: #369;
body {
  background-color: var(--深蓝);
}
\`\`\`
变量的定义，或者说声明跟CSS计数器的声明类似的，你应该摆脱Sass/Less等预编译工具语法先入为主的语法影响，把CSS的原生变量理解为一种CSS属性。

这样，你就对其权重和变量应用规则要容易理解地多。

例如下面这个例子：
\`\`\`
:root { --color: purple; }
div { --color: green; }
#alert { --color: red; }
* { color: var(--color); }

<p>我的紫色继承于根元素</p>
<div>我的绿色来自直接设置</div>
<div id='alert'>
  ID选择器权重更高，因此阿拉是红色！
  <p>我也是红色，占了继承的光</p>
</div>
\`\`\`
变量也是跟着CSS选择器走的，如果变量所在的选择器和使用变量的元素没有交集，是没有效果的。例如#alert定义的变量，只有id为alert的元素才能享有。如果你想变量全局使用，则你可以设置在:root选择器上；

当存在多个同样名称的变量时候，变量的覆盖规则由CSS选择器的权重决定的，但并无!important这种用法，因为没有必要，!important设计初衷是干掉JS的style设置，但对于变量的定义则没有这样的需求。

**CSS属性名可以走变量吗?**

类似下面这样：
\`\`\`
body {
  --bc: background-color;    
  var(--bc): #369;
}
\`\`\`
答案是“不可以”，要是可以支持的话，那CSS的压缩可就要逆天了，估计所有的属性都会变成1~2个字符。

**CSS变量支持同时多个声明吗？**
不好意思，类似不了，语法上就根本不支持。

**CSS变量使用完整语法**

CSS变量使用的完整语法为：var( [, ]? )，用中文表示就是：var( <自定义属性名> [, <默认值 ]? )，

意思就是，如果我们使用的变量没有定义（注意，仅限于没有定义），则使用后面的值作为元素的属性值。举个例子：
\`\`\`
.box {
  --1: #369;
}
body {
  background-color: var(--1, #cd0000);
}
\`\`\`
则此时的背景色是#cd0000：

**CSS变量不合法的缺省特性**

请看下面这个例子：
\`\`\`
body {
  --color: 20px;
  background-color: #369;
  background-color: var(--color, #cd0000);
}
\`\`\`
请问，此时body的背景色是？
\`\`\`
A. transparent    B. 20px     C. #369      D. #cd0000
\`\`\`
答案是…………………………A. transparent

不知大家答对了没有！

这是CSS变量非常有意思的一个点，对于CSS变量，只要语法是正确的，就算变量里面的值是个乱七八糟的东西，也是会作为正常的声明解析，如果发现变量值是不合法的，例如上面背景色显然不能是20px，则使用背景色的缺省值，也就是默认值代替，于是，上面CSS等同于：
\`\`\`
body {
  --color: 20px;
  background-color: #369;
  background-color: transparent;
}
\`\`\`
千万不能想当然得认为等同于background-color:20px，这也是为什么上面要强调CSS默认值的使用仅限于变量未定义的情况，并不包括变量不合法。

**CSS变量的空格尾随特性**

请看下面这个例子：

\`\`\`
body {
  --size: 20;   
  font-size: var(--size)px;
}
\`\`\`
请问，此时body的font-size大小是多少？

如果你以为是20px就太天真了，实际上，此处font-size:var(--size)px等同于font-size:20 px，注意，20后面有个空格，所以，这里的font-size使用的是body元素默认的大小。因此，就不要妄图取消就使用一个数值来贯穿全场，还是使用稳妥的做法：
\`\`\`
body {
  --size: 20px;   
  font-size: var(--size);
}
\`\`\`
或者使用CSS3 calc()计算：
\`\`\`
body {
  --size: 20;   
  font-size: calc(var(--size) * 1px);
}
\`\`\`
此时，body的font-size大小才是20px，

**CSS变量的相互传递特性**

就是说，我们在CSS变量定义的时候可以直接引入其他变量给自己使用，例如：
\`\`\`
body {
  --green: #4CAF50;   
  --backgroundColor: var(--green);
}
\`\`\`
或者更复杂的使用CSS3 calc()计算，例如：
\`\`\`
body {
  --columns: 4;
  --margins: calc(24px / var(--columns));
}
\`\`\`
对于复杂布局，CSS变量的这种相互传递和直接引用特性可以简化我们的代码和实现成本，尤其和动态布局在一起的时候，无论是CSS的响应式后者是JS驱动的布局变化。

我们来看一个CSS变量与响应式布局的例子

默认进去是4栏，如下图：

![](/static/images/article/3/lizi.png)

随着浏览器宽度减小，4栏可能就变成3栏，2栏甚至1栏，我们实际开发的时候，显然不仅仅是栏目数量变化，宽度小，往往意味着访问设备尺寸有限，此时我们往往会缩小空白间距以及文字字号大小，这样，有限屏幕才能显示更多内容。

也就是说，当我们响应式变化的时候，改变的CSS属性值不是1个，而是3个或者更多，如果我们有3个响应点，是不是就至少需要9个CSS声明？但是，由于我们有了CSS变量，同时，CSS变量可以传递，当我们遭遇响应点的时候，我们只需要改变一个CSS属性值就可以了。

下面就是本demo核心CSS代码（只需要改变--columns这一个变量即可）：
\`\`\`
.box {
  --columns: 4;
  --margins: calc(24px / var(--columns));
  --space: calc(4px * var(--columns));
  --fontSize: calc(20px - 4 / var(--columns));
}
@media screen and (max-width: 1200px) {
  .box {
    --columns: 3;
  }
}
@media screen and (max-width: 900px) {
  .box {
    --columns: 2;
  }
}
@media screen and (max-width: 600px) {
  .box {
    --columns: 1;
  }
}
\`\`\`
于是，我们在2栏下的效果就是这样，字号，间距随着栏目数量的减小也一并减小了，然后每栏之间间距是扩大了：

![](/static/images/article/3/lizi2.png)

有没有觉得CSS越来越屌了呢！哈哈~
`);

/********************************  文章4  ***************************************/
/********************************  文章4  ***************************************/
let article4 = marked(`
##### 目标
我checkout到的版本是[这个位置](https://github.com/vuejs/vue/tree/706c67d1d013577fdbfab258bca78557419cba7c)，在这个版本中，我们可以发现：代码中主要是observer和emitter这些东西，这些是以后实现数据绑定以及$watch的关键基础。所以我们把本篇的学习目标定位为：“如何监听一个对象的变化” 具体要实现效果如下图所示。

![](/static/images/article/4/demo1.gif)

注：这个版本build出来的vue代码运行是会报错了，根据错误提示，很容易定位到错误原因是src/internal/init.js文件头部少引了observer和util，添加上就好了。

##### 思路
我们有两个难点需要解决。

第一：当对象的某个属性变化的时候，如何触发自定义的回调函数？
答案：ES5中新添加了一个方法：[Object.defineProperty](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty) ，通过这个方法，可以自定义getter和setter函数，从而在获取对象属性和设置对象属性的时候能够执行自定义的回调函数。

第二：对象往往是一个深层次的结构，对象的某个属性可能仍然是一个对象，这种情况怎么处理？
比如说
\`\`\`
let data = {
  user: {
    name: "liangshaofeng",
    age: "24"
  },
  address: {
    city: "beijing"
  }
};
\`\`\`
答案：递归算法，也就是下面代码中的walk函数。如果对象的属性仍然是一个对象的话，那么继续new一个Observer，直到到达最底层的属性位置。

下面是实现的具体代码。

##### 代码
\`\`\`
// 观察者构造函数
function Observer(data) {
  this.data = data;
  this.walk(data)
}

let p = Observer.prototype;

// 此函数用于深层次遍历对象的各个属性
// 采用的是递归的思路
// 因为我们要为对象的每一个属性绑定getter和setter
p.walk = function (obj) {
  let val;
  for (let key in obj) {
    // 这里为什么要用hasOwnProperty进行过滤呢？
    // 因为for...in 循环会把对象原型链上的所有可枚举属性都循环出来
    // 而我们想要的仅仅是这个对象本身拥有的属性，所以要这么做。
    if (obj.hasOwnProperty(key)) {
      val = obj[key];

      // 这里进行判断，如果还没有遍历到最底层，继续new Observer
      if (typeof val === 'object') {
        new Observer(val);
      }

      this.convert(key, val);
    }
  }
};

p.convert = function (key, val) {
  Object.defineProperty(this.data, key, {
    enumerable: true,
    configurable: true,
    get: function () {
      console.log('你访问了' + key);
      return val
    },
    set: function (newVal) {
      console.log('你设置了' + key);
      console.log('新的' + key + ' = ' + newVal)
      if (newVal === val) return;
      val = newVal
    }
  })
};

let data = {
  user: {
    name: "liangshaofeng",
    age: "24"
  },
  address: {
    city: "beijing"
  }
};

let app = new Observer(data);
\`\`\`
##### 遗留问题
上面实现的代码还有很多问题。

比如：

- 只监听的对象的变化，没有处理数组的变化。
- 当你重新set的属性是对象的话，那么新set的对象里面的属性不能调用getter和setter。比如像下图所示，重新设置的job属性就不在带有自定义的getter和setter了，不再提示“你访问了job"这些字样。

![](/static/images/article/4/bug1.gif)

参考资料：
- [https://segmentfault.com/a/1190000004384515](https://segmentfault.com/a/1190000004384515)
- [http://jiongks.name/blog/vue-code-review/](http://jiongks.name/blog/vue-code-review/)
`);

/********************************  文章5  ***************************************/
/********************************  文章5  ***************************************/
let article5 = marked(`
##### 前言
Vue.js 包装了被观察数组的变异方法，故它们能触发视图更新。被包装的方法有：
* push()
* pop()
* shift()
* unshift()
* splice()
* sort()
* reverse()

出处：[https://cn.vuejs.org/v2/guide/list.html#变异方法](https://cn.vuejs.org/v2/guide/list.html#%E5%8F%98%E5%BC%82%E6%96%B9%E6%B3%95)

Vue.js 不能检测到下面数组变化：
* 直接用索引设置元素，如 vm.items[0] = {}；
* 修改数据的长度，如 vm.items.length = 0。

出处：[https://cn.vuejs.org/v2/guide/list.html#注意事项](https://cn.vuejs.org/v2/guide/list.html#%E6%B3%A8%E6%84%8F%E4%BA%8B%E9%A1%B9)

为什么说明文档中提到只有某些特定方法才能触发视图更新呢？我们可以从vue的源码中找到答案。

##### 奇技淫巧
这次checkout的版本更上次一样，都是[这个位置](https://github.com/vuejs/vue/tree/706c67d1d013577fdbfab258bca78557419cba7c)。

相关的源码是这两个地方。
- observe/array-augmentations.js
- observe/observer.js // line 38
整体思路是什么呢？ → **通过重新包装数据中数组的push、pop等常用方法**。注意，这里重新包装的只是数据数组（也就是我们要监听的数组，也就是vue实例中拥有的data数据）的方法，而不是改变了js原生Array中的原型方法。

为什么不能修改原生Array的原型方法呢？这道理很显然，因为我们是在写一个框架，而非一个应用，我们不应该过多地影响全局。如果你真得采取了这种糟糕的方法，想象以下场景：”你在一个应用中使用了vue，但是你在vue实例以外定义了一些数组，你改变这些与vue无关的数组的时候，居然触发了vue的方法！！“这能忍？？

##### 代码实现
\`\`\`
const aryMethods = ['push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse'];
const arrayAugmentations = [];

aryMethods.forEach((method)=> {

  // 这里是原生Array的原型方法
  let original = Array.prototype[method];

  // 将push, pop等封装好的方法定义在对象arrayAugmentations的属性上
  // 注意：是属性而非原型属性
  arrayAugmentations[method] = function () {
    console.log('我被改变啦!');

    // 调用对应的原生方法并返回结果
    return original.apply(this, arguments);
  };

});

let list = ['a', 'b', 'c'];
// 将我们要监听的数组的原型指针指向上面定义的空数组对象
// 别忘了这个空数组的属性上定义了我们封装好的push等方法
list.__proto__ = arrayAugmentations;
list.push('d');  // 我被改变啦！ 4

// 这里的list2没有被重新定义原型指针，所以就正常输出
let list2 = ['a', 'b', 'c'];
list2.push('d');  // 4
\`\`\`
PS：如果不能理解这里的proto，请翻看《Javascript的高级程序设计》第148页，以及参看[这个答案](https://stackoverflow.com/questions/9959727/proto-vs-prototype-in-javascript/9959753#9959753)，多看几遍你就懂了。（吐槽：每次碰到js原型都不好描述.....）

##### 有问题？
ok，目前为止我们已经实现了如何监听数组的变化了。

但是，我们仔细回想一下，难道只能通过作者那样的方法来实现吗？不觉得直接重新定义proto指针有点奇怪吗？有其他实现的方法吗？

我们回到最开始的目标：

**对于某些特定的数组（数据数组），他们的push等方法与原生Array的push方法不一样，但是其他的又都一样。**

这不就是经典的继承问题吗？ 子类和父类很像，但是呢，子类有点地方又跟父类不同

我们只需要继承父类，然后重写子类的prototype中的push方法不就可以了吗？红宝书告诉我们组合继承才是最常用的继承方法啊！（请参考红宝书第168页）难道是作者糊涂了？（想到这儿，我心里一阵窃喜，拜读了作者的代码这么久，终于让我发现一个bug了，不过好像也算不上是bug）

废话不多说，我赶紧自己用组合继承实现了一下。
\`\`\`
function FakeArray() {
  Array.call(this,arguments);
}

FakeArray.prototype = [];
FakeArray.prototype.constructor = FakeArray;

FakeArray.prototype.push = function () {
  console.log('我被改变啦');
  return Array.prototype.push.call(this,arguments);
};

let list = ['a','b','c'];

let fakeList = new FakeArray(list);
\`\`\`
结果如下图所示

![](/static/images/article/5/demo1.png)

虽然我成功地重新定义push方法，但是为什么fakeList是一个空对象呢？

原因是：构造函数默认返回的本来就是this对象，这是一个对象，而非数组。Array.call(this,arguments);这个语句返回的才是数组。

那么我们能不能将Array.call(this,arguments);直接return出来呢？

不能。原因有两个：

- 如果我们return这个返回的数组，这个数组是由原生的Array构造出来的，所以它的push等方法依然是原生数组的方法，无法到达重写的目的。
- 如果我们return这个返回的数组，其实最后fakeList === [[['a','b','c']]]，它变成了一个数组的数组的数组，因为list本身是一个数组，arguments用封装了一层数组，new Array本身接收数组作为参数的时候本来就会返回包裹这个数组的数组，new Array(['a', 'b']) === [['a', 'b']]，所以就变成三层数组了。

shit.....太麻烦了！看来还是没有办法通过组合继承的模式来实现一开始的目标。

##### 后话
目前为止，我们已经知道如何监听对象和数组的变化了，下一步应该做什么呢？

答案是：实现一个watch库
`);

/********************************  文章6  ***************************************/
/********************************  文章6  ***************************************/
let article6 = marked(`
##### 问题具象
我们可以把问题具象化为下面的例子

\`\`\`
// html
<div id="app">
  <p>姓名:{{user.name}}</p>
  <p>年龄:{{user.age}}</p>
</div>
\`\`\`
\`\`\`
// js
const app = new Bue({
  el: '#app',
  data: {
    user: {
      name: 'youngwind',
      age: 24，
    }
  }
});
\`\`\`
问题是：**如何做到当user.name或者user.age发生改变的时候，html上的DOM元素也发生相应的改变呢？**

##### 笨拙的做法
先来看看我一开始采取的办法。

思路：**因为数据所有属性的变化都会冒泡到顶层，所以我只需要在数据顶层注册一个事件。当任意一个属性发生改变的时候，我都重新遍历DOM模板，把{{user.name}}这些转换成实际值，在内存中拼接成fragment，最后把生成的新fragment整块地替换掉原先的DOM结构。**

这里比较简单，我就不多说了，可以直接去看[这个版本的源码](https://github.com/youngwind/bue/blob/58593b9f6108f26d831798b7c19f9999f9b9634e/src/instance/compile.js)

实现效果如下图所示。

![](/static/images/article/6/rough.gif)

但是这样的做法非常粗暴，存在不少问题。

- 当我修改非DOM相关的数据的时候，居然也会触发DOM的重新渲染！（如图，city压根就没渲染在DOM中，所以修改它不应该触发DOM的更新）
- 当我修改DOM相关的任意一个属性的时候，它会渲染更新整个DOM，而不是我改哪儿它更新哪儿。

基于上述两个缺陷，这种做法肯定不能忍。那么，我们来看看怎么解决它们。

##### 指令Directive
想要做到：**只更新数据变动相关的DOM，必须有个这样的对象，将DOM节点和对应的数据一一映射起来**，这里引入Directive（指令）的概念，它的构造函数和原型方法如下所示。
\`\`\`
/**
 * 指令构造函数
 * @param name {string} 值为"text", 代表是文本节点
 * @param el {Element} 对应的DOM元素
 * @param vm {Bue} bue实例
 * @param expression {String} 指令表达式，例如 "name"
*  @param attr {String} 值为'nodeValue', 代表数据值对应的书节点的值
 * @constructor
 */
function Directive(name, el, vm, expression) {
  this.name = name;  // 指令的名称， 对于普通的文本节点来说，值为"text"
  this.el = el;              // 指令对应的DOM元素
  this.vm = vm;          // 指令所属bue实例
  this.expression = expression;       // 指令表达式，例如 "name"
  this.attr = 'nodeValue';        
  this.update();
}

// 这是指令的更新方法。当对应的数据发生改变了，就会执行这个方法
// 可以看出来，这个方法就是用来更新nodeValue的
Directive.prototype.update = function () {
  this.el[this.attr] = this.vm.$data[this.expression];
  console.log(\`更新了DOM-${this.expression}\`);
};
\`\`\`
关键实现思路：
在遍历DOM模板的过程中，当遍历到文本节点："{{name}}"的时候，会先将其中的表达式"name"匹配出来，然后新建一个空的textNode，也就是上面的this.el，插入到这个文本节点的前面，最后remove掉这个文本节点。这样，就实现了用一个程序生成的textNode代替原来的textNode，从而实现每个textNode都跟它的表达式一一对应起来。
可以直接去看[这个版本的源码](https://github.com/youngwind/bue/tree/89c0d93071d117eddb9b85edde96fb6e13173d66)
具体实现的效果如下图所示。

![](/static/images/article/6/directive.gif)

从图中我们可以看到，bue的实例app中多出了_directive属性，它是一个数组，存放的是在遍历DOM模板的时候解析出来的若干条指令。当数据发生变化的时候，会找到对应的指令，然后执行对应指令上面的update方法。

这样我们就实现了**只更新数据变动对应的那一个部分DOM**。

然而，这样子还是存在其他问题。
- 每次数据发生改变的时候，我都需要循环_directive数组，匹配expression的值才能找到对应的指令，这显然是效率很低的，最好是能够做到对象键值索引的那种。
- 倘若我想实现像vue的$watch那样的API，该怎么办呢？显然光靠Directive是不行的。因为$watch对应仅仅是一个回调函数，根本与DOM无关，不会有el和attr这些东西。
##### Binding、Watcher
为了解决上述的两个问题，我们引入Binding和Watcher这两个“类”（Binding是为了解决键值索引，Watcher是为了解决$watch）。那么，Binding、Watcher、Directive这三者之间是什么关系呢？我们来看看下面这张图。

![](/static/images/article/6/finish.png)

从图中我们可以看到。有一个_rootBind对象，它的属性就是按照DOM模板中用到的数据层层深入排列下去的。（因为我们在模板中只用到了user.name和user.age，所以这里只有这两个属性）。而且，在每个属性上有一个_subs数组。这个数组其实就是subscibe订阅的意思，里面存放的是一系列Watcher。这些Watcher代表着当此属性数据发生改变的时候，就会循环遍历_subs里面的Watcher，执行里面的update方法。

那么，Watcher又跟我们上面实现的Directive什么关系呢？是包含的关系。也就是说，Watcher是一个观察容器，它既可以装载Directive，这时候cb是更新DOM的函数，从而实现数据变动的时候更新DOM；也可以装载$watch，这时候cb是自定义的回调函数，从而实现数据变动的时候执行自定义回调函数。

这就是vue实现动态数据绑定的三大核心概念。
实现效果如下：

![](/static/images/article/6/finish.gif)

参考资料
- [http://6174.github.io/articles/thinking-in-vue-two.html](http://6174.github.io/articles/thinking-in-vue-two.html)
- [http://jiongks.name/blog/vue-code-review/](http://jiongks.name/blog/vue-code-review/)
- [http://www.mamicode.com/info-detail-490.html](http://www.mamicode.com/info-detail-490.html)
`);

/********************************  文章7  ***************************************/
/********************************  文章7  ***************************************/
let article7 = marked(`
##### 一、现代web之前的window.self和self
对于web页面，在默认状况下，下面4个写法都是等同的：
\`\`\`
window === self                  // true
window.window === window.self    // true
window.self === self             // true
window.window === self           // true
\`\`\`
这种有意思的现象就不禁会让人疑惑了，既然都是相等的，那window.self和self还有什么出现的意义呢？直接全部使用window不就好了？

其实真实情况还就是这样，并没有需要self出场的理由，唯一可能有作用的就是更语义地判断当前页面是否作为iframe嵌入了，直接：
\`\`\`
parent === self   // true表示作为iframe嵌入，false则表示被iframe嵌入了
\`\`\`
结果，上面一行iframe内信息就显示parent === self为false，主页面上的parent === self为true。

除此之外，基本上就没有在实际项目中出现的机会，因此，“JS中有个全局self对象”这件事怕是很多小伙伴都不知道，因为用之甚少。

当然，注意这里标题前提——现代web之前！换句话说，在HTML5一些新特性出来之前，全局的self就是个没什么实用价值的半吊子。但是，随着HTML5一些新特性的到来，self开始慢慢登上正式的舞台，最常见的就是用在Service Workers或者Web Workers中。

##### 二、Service Workers, Web Workers下的self
无论是出来有段时间的Web Workers或者说是新晋宠儿Service Workers，本质上都是开启了另外的线程。

传统的web页面的JavaScript脚本是单线程的，这个线程我们可以理解为“窗体线程”，就是要和浏览器窗口打交道的，主要作用就是实现浏览器窗体内的元素交互效果，因此只要是全局对象，都可以使用window对象来获取。

但是，Workers开辟的新线程是没有“窗体”这个概念的，都是在浏览器背后悄悄运行的线程，没有窗体的概念也就意味着没有window对象。

换句话说，Service Workers和Web Workers相关的脚本中是不能使用window这个对象的。那问题来了，我们希望在全局作用域里面做事情该怎么办呢？

好，此时，self的价值就出现了！

在non-window上下文的环境中，我们可以使用self来表示全局作用域，注意，只能是光秃秃的self，window.self这样的写法是不行的。

举个简单的例子，假设我们注册一个Service Workers，Workers脚本在sw-test.js中，如下：
\`\`\`
navigator.serviceWorker.register('/sw-test.js');
\`\`\`
则我们希望Service Workers注册完毕干点什么事情，就可以在sw-test.js中这么写：
\`\`\`
self.addEventListener('install', function(event) {
  // ...
});
\`\`\`
`);


/********************************  文章8  ***************************************/
/********************************  文章8  ***************************************/
let article8 = marked(`
\`\`\`
resize  
// css3属性，控制元素是否可以拉伸
// 语法：resize: none|both|horizontal|vertical|initial|inherit; 
// none 不可改变，both 允许改变，horizontal 水平方向，vertical 垂直方向
// 注意：如果希望此属性生效，需要设置元素的 overflow 属性，值可以是 auto、hidden 或 scroll。
// 用例：textarea禁止拉伸
resize: none;  

user-select
// 非标准属性，控制用户是否可以选中文本、图片等
// 语法user-select: auto|none|text|all;
// auto 浏览器的默认值，none 不允许选中，text 可以选中，all 可以选中，点击选中时会选中全部内容，包括子节点内容
// 用例：文字、图片不可选中
user-select: none;

::placeholder
// css3伪元素，控制input、textarea等元素的placeholder样式
// 兼容性
::-webkit-input-placeholder  // Chrome/Opera/Safari 
::-moz-placeholder // Firefox 19+ 
:-ms-input-placeholder // IE 10+ 

font-smooth
// 非标准属性，控制字体平滑度
// 兼容性:只适用Mac OS X / macOS 
// 用例: 让字体更纤细，看起来更轻
-webkit-font-smoothing: antialiased;
-moz-osx-font-smoothing: grayscale;

min 与 max
// 给元素的高度/宽度设置一个最低/最高限制，
// 语法：px|%|inherit
// % 基于包含它的块级对象的百分比高度
// 用例：让一个p标签宽度不大于300px，小于300宽度自动。用于不确定高宽的元素，给元素一个高宽限制，让元素高宽符合预期
min-width: 300px;
width: auto;

outline
// 绘制于元素周围的一条线，位于边框边缘的外围，可起到突出元素的作用
// 语法：outline-color outline-style outline-width
// 和边框一样，有3个属性，分别为颜色、样式、宽度
// 用例：点击input时取消元素边框边缘的颜色
outline: none;

object-fit
// css3属性，以特定的规则调整图片或视频大小以适应容器
// 语法：fill|contain|cover|none|scale-down
// fill 拉伸到容器大小
// contain 保持宽高比例、并把元素放大或缩小放到容器里
// cover 保持宽高比例，并把元素居中裁切放到到容器里
// none 图片按原本的大小显示
// scale-down 使用none或contain两个规则中较小的那个

cursor
// 移动到元素时光标的形状
// 语法：url|关键字|x y
// url,只有在Windows和Linux上才支持指定一个图片路径，图片格式浏览器兼容不同
// 关键字：pointer 手型, none 不显示
// x y,光标出现的位置
// 用例：设置div鼠标移动上去显示手型
cursor: pointer;

box-sizinglex
// css3属性，更改计算元素宽度和高度的默认盒子模型
// 语法：content-box|border-box
// content-box 默认值，边框和padding计算额外高宽，盒子高宽 = 边框+padding+width+margin
// border-box width值包含边框和padding，盒子高宽 = width+margin

line-clamp
// 
display: -webkit-box;
-webkit-line-clamp: 2;
\`\`\`

object-fit:

![](/static/images/article/8/objectfit.png)
`);

/********************************  文章9  ***************************************/
/********************************  文章9  ***************************************/
let article9 = marked(`
##### xxx-of-type
\`\`\`
// .a的父元素下的所有元素根据标签类型分成N个数组，所有数组里的第一个元素 && 这个元素的class为.a
.a:first-of-type		  
// p的父元素下的所有p里的第一个p && 这个P的class为.a
p.a:first-of-type 	  
// 最后一个元素...
last-of-type			    
// 第N个元素...
nth-of-child(n)  		  
// 倒数第N个元素...
nth-last-of-child(n)	
// 唯一子元素...
only-of-child			    
\`\`\`

##### xxx-child
\`\`\`
// .a的父元素下第一个子元素 && 这个元素class为.a
.a:first-child 	      
// 最后一个元素...
last-of-child		      
// 第N个元素...
nth-child(n)  	      
// 倒数第N个元素...
nth-last-child(n)	    
// 唯一子元素...
only-child		        
\`\`\`

##### [attribute]
\`\`\`
// 选择带有 target 属性所有元素
[target]  		 
// 选择 target="_blank" 的所有元素     
[target=_blank]  	  
// 选择 title 属性包含单词 "flower" 的所有元素。
[title~=flower]  	  
// 选择 lang 属性值以 "en" 开头的所有元素
[lang|=en]  		    
// 选择其 src 属性值以 "https" 开头的每个 <a> 元素。
a[src^="https"]  	  
// 选择其 src 属性以 ".pdf" 结尾的所有 <a> 元素。
a[src$=".pdf"]	    
// 选择其 src 属性中包含 "abc" 子串的每个 <a> 元素。
a[src*="abc"]		    
//选择带有以 "it" 开头的 lang 属性值的每个 p
p:lang(it)		      
\`\`\`

##### element
\`\`\`
// 选择所有 <div> 元素和所有 <p> 元素。
div,p  	
// 选择 <div> 元素内部的所有 <p> 元素。
div p		
// 选择父元素为 <div> 元素的所有 <p> 元素。
div>p		
// 选择紧接在 <div> 元素之后的所有 <p> 元素。
div+p		
// 选择前面有 <p> 元素的每个 <ul> 元素。
p~ul		
\`\`\`

##### a
\`\`\`
// 选择所有未被访问的链接。
a:link 		  
// 选择所有已被访问的链接。
a:visited		
// 选择活动链接。
a:active		
// 选择鼠标指针位于其上的链接。
a:hover		  
\`\`\`

##### p
\`\`\`
// 选择每个 <p> 元素的首字母。
p:first-letter  
// 选择每个 <p> 元素的首行。
p:first-line		
\`\`\`

##### form
\`\`\`
// 选择获得焦点的 input 元素。
input:focus		  
// 选择每个启用的 <input> 元素。
input:enabled		
// 选择每个禁用的 <input> 元素
input:disabled  
// 选择每个被选中的 <input> 元素。
input:checked		
\`\`\`

##### 伪元素
\`\`\`
// 在每个 <p> 元素的内容之前插入内容。
p:before		
// 在每个 <p> 元素的内容之后插入内容。
p:after		  
\`\`\`

##### 其他
\`\`\`
// 选择文档的根元素。
:root			      
// 选择没有子元素的每个 <p> 元素（包括文本节点）
p:empty		      
// 选择当前活动的 #news 元素
#news:target	  
// 选择非 <p> 元素的每个元素
:not(p)		      
// 选择被用户选取的元素部分
::selection	    
\`\`\`
`);

/********************************  文章10  ***************************************/
/********************************  文章10  ***************************************/
let article10 = marked(`
提供回退机制通常是一种很好的做法，这样可以确保你的网站不会在低版本浏览器中挂掉，只是看起来没有那么炫而已。

使用样式声明的层叠机制：

例子：一个渐变色作为背景
\`\`\`
background: rgb(255, 128, 0);
background: -moz-linear-gradient(0deg, yellow, red); 
background: -o-linear-gradient(0deg, yellow, red); 
background: -webkit-linear-gradient(0deg, yellow, red); 
background: linear-gradient(90deg, yellow, red);
\`\`\`

使用Modernizr(http://modernizr.com/)检测工具，这些工具会给<html>添加辅助类：

列子：给h1添加文字阴影
\`\`\`
h1 { color: gray; }
.textshadow h1 {
  color: transparent; 
  text-shadow: 0 0 .3em gray;
}
\`\`\`

使用@supports，可以视为原生的Modernizr，：
列子：
\`\`\`
h1 { color: gray; }
@supports (text-shadow: 0 0 .3em gray) { 
  h1 {
    color: transparent;
    text-shadow: 0 0 .3em gray;
	}
}
\`\`\`
但在眼下，还必须慎用 @supports。在上面的例子中，我们想要的文本 投影效果只会在那些支持 text-shadow 且同时支持 @supports 规则的浏览 器中生效。这个范围明显比我们所期望的要窄。IE不支持这个属性。

自己写js来实现特性检测然后给根元素添加辅助类，核心思路就是在任一元素的 element.style 对象上检查该属性是否存在，如果我们想要检测某个具体的属性值是否支持，那就需要把它赋给对应 的属性，然后再检查浏览器是不是还保存着这个值。

例子：
\`\`\`
// 检测是否支持某个css属性值
function testProperty(property) {
  var root = document.documentElement;
	if (property in root.style) { 
	  root.classList.add(property.toLowerCase()); 
	  return true;
	} 
  root.classList.add('no-' + property.toLowerCase());
	return false; 
}

// 检测是是否支持某个具体的属性值
function testValue(id, value, property) { 
	var dummy = document.createElement('p'); 	
	dummy.style[property] = value;
	if (dummy.style[property]) { 
	  root.classList.add(id); 
	  return true;
	}
  root.classList.add('no-' + id);
	return false; 
}
\`\`\`
浏览器兼容性查询
[https://caniuse.com](https://caniuse.com)
`);

/********************************  文章11  ***************************************/
/********************************  文章11  ***************************************/
let article11 = marked(`
![](/static/images/article/11/vue生命周期钩子中文.jpg)
**beforeCreate**: 在实例初始化之后调用，还不能调用vue里的属性和方法

**created**: 在实例创建完成后被立即调用。可以使用vue里的属性和方法，然而，挂载阶段还没开始，$el 属性目前不可见。这里写DOM操作并不安全。

**beforeMount**: 在挂载开始之前被调用：相关的 render 函数首次被调用。render函数用于渲染DOM

下列钩子在服务器端渲染期间不被调用，渲染完成后才会调用：

**mounted**: DOM渲染挂载完成，注意 mounted 不会承诺所有的子组件也都一起被挂载。如果你希望等到整个视图都渲染完毕，可以用 vm.$nextTick

例子：
\`\`\`
mounted: function () {
  this.$nextTick(() => {
    
  })
}
\`\`\`
**beforeUpdate**: 子父组件传递数据更新前或VUEX数据更新前并且页面使用了这数据，才触发钩子

**updated**: 和beforeUpdate类似，视图因为数据重新渲染完成后触发，并且和mounted一样，并不保证所有的子组件也一起渲染完成，可以用 vm.$nextTick

**beforeDestroy**: 实例销毁之前调用。在这一步，实例仍然完全可用。

**destroyed**: Vue 实例销毁后调用。调用后，实例指示的所有东西都会解绑定，所有的事件监听器会被移除，所有的子实例也会被销毁。指示的所有东西都会解绑定，所有的事件监听器会被移除，所有的子实例也会被销毁。
`);

/********************************  文章12  ***************************************/
/********************************  文章12  ***************************************/
let article12 = marked(`
##### 插值
###### 文本插值：v-text  {{}}
如果值是null、undefined、false、true都会转成字符串插值进去，v-text会覆盖节点的文本节点和子节点

###### HTML插值：v-html
和v-text一样会覆盖节点里的内容，参数必须符合[[标签规范]]。

###### 属性：v-bind
如果值为null、undefined、false则属性值不会被渲染
缩写：
\`\`\`
<!-- 完整语法 -->
<a v-bind:href="url">...</a>

<!-- 缩写 -->
<a :href="url">...</a>
\`\`\`

###### 事件：v-on
获取原生事件对象，可以通过给事件添加参数$event，参数位置随意
缩写：
\`\`\`
<!-- 完整语法 -->
<a v-on:click="doSomething">...</a>

<!-- 缩写 -->
<a @click="doSomething">...</a>
\`\`\`

###### 使用JavaScript 表达式
以上指令都可以使用javascript表达式，但不能执行语句和流程控制，可以使用三元表达式。模板表达式只能访问全局变量的一个白名单，如 Math 和 Date ，不能访问自定义的全局变量。

正确实例：
\`\`\`
{{ number + 1 }}

{{ ok ? 'YES' : 'NO' }}

{{ message.split('').reverse().join('') }}

<div v-bind:id="'list-' + id"></div>
\`\`\`
错误实例：
\`\`\`
<!-- 这是语句，不是表达式 -->
{{ var a = 1 }}

<!-- 流控制也不会生效，请使用三元表达式 -->
{{ if (ok) { return message } }}
\`\`\`

##### 指令
指令的职责是，当表达式的值改变时，将其产生的连带影响，响应式地作用于 DOM。
###### 参数
一些指令能够接收一个“参数”，在指令名称之后以冒号表示。

###### 修饰符
以半角句号 . 指明的特殊后缀，用于指出一个指令应该以特殊方式绑定。

高级扩展：[render渲染函数](https://cn.vuejs.org/v2/guide/render-function.html)
`);

/********************************  文章13  ***************************************/
/********************************  文章13  ***************************************/
let article13 = marked(`
##### 数组的v-for
我们用 v-for 指令根据一组数组的选项列表进行渲染。v-for 指令需要使用 item in items 形式的特殊语法，items 是源数据数组并且 item 是数组元素迭代的别名。

\`\`\`
<ul id="example-1">
  <li v-for="item in items"></li>
</ul>
\`\`\`

###### of  and in
你也可以用 of 替代 in 作为分隔符，因为它是最接近 JavaScript 迭代器的语法。下面两个是等价的

\`\`\`
<div v-for="item of items"></div>
<div v-for="item in items"></div>
\`\`\`

###### index
在 v-for 块中，我们拥有对父作用域属性的完全访问权限，参数只能在v-for中使用。v-for 还支持一个可选的第二个参数为当前项的索引。

\`\`\`
<ul id="example-2">
  <li v-for="(item, index) in items"></li>
</ul>
\`\`\`

##### 对象的v-for
你也可以用 v-for 通过一个对象的属性来迭代。在遍历对象时，是按 Object.keys() 的结果遍历。

\`\`\`
<ul id="v-for-object" class="demo">
  <li v-for="value in object">
    {{ value }}
  </li>
</ul>

<script>
new Vue({
  el: '#v-for-object',
  data: {
    object: {
      firstName: 'John',
      lastName: 'Doe',
      age: 30
    }
  }
})
</script>

结果：
John
Doe
30
\`\`\`

###### 第二个的参数为键名

\`\`\`
<div v-for="(value, key) in object">
  {{ key }}: {{ value }}
</div>

结果：
firstName: John
lastName: Doe
age: 30
\`\`\`

###### 第三个参数为索引

\`\`\`
<div v-for="(value, key, index) in object">
  {{ index }}. {{ key }}: {{ value }}
</div>

结果：
0. firstName: John
1. lastName: Doe
2. age: 30
\`\`\`

##### Key
为了给 Vue 一个提示，以便它能跟踪每个节点的身份，从而重用和重新排序现有元素，你需要为每项提供一个唯一 key 属性。理想的 key 值是每项都有的且唯一的 id。一般使用index作为key值。

##### 数组更新检测
Vue 包含一组观察数组的变异方法，这些方法如下：
\`\`\`
push()
pop()
shift()
unshift()
splice()
sort()
reverse()
\`\`\`

非变异 (non-mutating method) 方法，例如：filter(), concat() 和 slice() 。这些不会改变原始数组，但总是返回一个新数组。当使用非变异方法时，可以用新数组替换旧数组

###### 注意事项
由于 JavaScript 的限制，Vue 不能检测以下变动的数组：
1. 当你利用索引直接设置一个项时，例如：vm.items[indexOfItem] = newValue，vm.items[0] ++;
2. 当你修改数组的长度时，例如：vm.items.length = newLength

为了解决第一类问题，以下两种方式：

\`\`\`
// Vue.set
Vue.set(example1.items, indexOfItem, newValue)
Vue.set(example1.items, 0, ++vm.items[0])
// 在组件内使用：
this.$set(this.items, indexOfItem, newValue)
this.$set(this.items, 0, ++this.items[0])

// Array.prototype.splice
example1.items.splice(indexOfItem, 1, newValue)
\`\`\`

为了解决第二类问题，你可以使用 splice：

\`\`\`
example1.items.splice(newLength)
\`\`\`

###### 对象更改检测注意事项
是由于 JavaScript 的限制，Vue 不能检测对象属性的添加或删除，但是，可以使用 Vue.set(object, key, value) 方法向嵌套对象添加一个响应式属性。

\`\`\`
Vue.set(vm.userProfile, 'age', 27)

组件内使用：
Vue.$set(this.userProfile, 'age', 27)
\`\`\`

有时你可能需要为已有对象赋予多个新属性，比如使用 Object.assign() 或 _.extend()。

\`\`\`
vm.userProfile = Object.assign({}, vm.userProfile, {
  age: 27,
  favoriteColor: 'Vue Green'
})

// 在组件内使用：
this.items = Object.assign({}, this.items, {
  age: 27,
  favoriteColor: 'Vue Green'
})
\`\`\`

###### 显示过滤/排序结果
有时，我们想要显示一个数组的过滤或排序副本，而不实际改变或重置原始数据。在这种情况下，可以创建返回过滤或排序数组的计算属性。

在计算属性不适用的情况下 (例如，在嵌套 v-for 循环中) 你可以使用一个 method 方法：

\`\`\`
<li v-for="n in even(numbers)">{{ n }}</li>
\`\`\`

###### 整数
v-for 也可以取整数。在这种情况下，它将重复多次模板。

\`\`\`
<div>
  <span v-for="n in 10">{{ n }} </span>
</div>
\`\`\`
`);


/********************************  文章14  ***************************************/
/********************************  文章14  ***************************************/
let article14 = marked(`
##### 使用方法：
\`\`\`
computed: {
  message() {
    return xxxx
  }
},
\`\`\`

##### 计算属性缓存
计算属性是基于它们的依赖进行缓存的，计算属性里所有关联this的值都会成为依赖，计算属性只有在它的相关依赖发生改变时才会重新求值。

例如：
\`\`\`
// 这个例子里：a发生改变并不会重新计算，只有this.b发生改变才会重新计算
let a = 1;
computed: {
  message() {
    this.b;
    return a;
  }
}
\`\`\`

##### 计算属性的 setter
set里面不能设置计算属性本身，这样会出现死循环，因为set会触发get，get又会触发set。计算属性值必须在页面中使用才会触发，不适用不会触发。

例如：
\`\`\`
computed: {
  fullName: {
    // getter
    get: function () {
      return this.firstName + ' ' + this.lastName
    },
    // setter
    set: function (newValue) {
      var names = newValue.split(' ')
      this.firstName = names[0]
      this.lastName = names[names.length - 1]
    }
  }
}
\`\`\`

##### watch
使用方法：
\`\`\`
watch: {
  // 如果 \`question\` 发生改变，这个函数就会运行
  question: function (newQuestion, oldQuestion) {
      
  }
},
\`\`\`
`);


/********************************  文章15  ***************************************/
/********************************  文章15  ***************************************/
let article15 = marked(`
##### Class
新增的class并不会影响节点本身的其他class值
###### 对象语法
\`\`\`
// active 这个 class 存在与否将取决于数据属性 isActive 的 布尔值
<div :class="{ active: isActive }"></div>
\`\`\`

###### 数组语法
\`\`\`
<div :class="[activeClass, errorClass]"></div>

<script>
data: {
  activeClass: 'active',
  errorClass: 'text-danger'
}
</script>

// 渲染为：
<div class="active text-danger"></div>
\`\`\`

##### Style
对象语法和数组语法与class一样，所有通过vue添加的样式会自动添加兼容前缀。
###### 多重值 VUE 2.3.0+ 
可以为 style 绑定中的属性提供一个包含多个值的数组，常用于提供多个带前缀的值，例如：
\`\`\`
// 这样写只会渲染数组中最后一个被浏览器支持的值。在本例中，如果浏览器支持不带浏览器前缀的 flexbox，那么就只会渲染 display: flex。
<div :style="{ display: ['-webkit-box', '-ms-flexbox', 'flex'] }"></div>
\`\`\`
`);


/********************************  文章16  ***************************************/
/********************************  文章16  ***************************************/
let article16 = marked(`
##### v-if  v-else  v-if-else(VUE2.1.0新增)
v-else、v-if-else 元素必须紧跟在带 v-if 或者 v-else-if 的元素的后面，否则它将不会被识别。

###### key管理可复用的元素
VUE是惰性的，通常会复用已有元素而不是从头开始渲染。如果需要完全独立渲染，只需添加一个具有唯一值的 key 属性；例：
\`\`\`
<template v-if="loginType === 'username'">
  <label>Username</label>
  <input placeholder="Enter your username" key="username-input">
</template>
<template v-else>
  <label>Email</label>
  <input placeholder="Enter your email address" key="email-input">
</template>
\`\`\`

##### v-show
* v-if 是“真正”的条件渲染，因为它会确保在切换过程中条件块内的事件监听器和子组件适当地被销毁和重建。
* v-show只是简单地基于 CSS 进行切换。
一般来说，v-if 有更高的切换开销，而 v-show 有更高的初始渲染开销。因此，如果需要非常频繁地切换，则使用 v-show 较好；如果在运行时条件很少改变，则使用 v-if 较好。
`);


/********************************  文章17  ***************************************/
/********************************  文章17  ***************************************/
let article17 = marked(`
##### 监听事件
可以用 v-on 指令监听 DOM 事件，内联的事件里只能写表达式，不能写判断和控制语句，里面的变量是vue里的data里的变量。

\`\`\`
<button @click="counter += 1">Add 1</button>
\`\`\`

##### 接受方法
v-on 还可以接收一个需要调用的方法名称

\`\`\`
<button @click="greet">Greet</button>
\`\`\`

访问原始的 DOM 事件。可以用特殊变量 $event 把它传入方法：

\`\`\`
<button v-on:click="warn($event)">Submit</button>
\`\`\`

##### 事件修饰符
* .stop            阻止单击事件继续传播
* .prevent      提交事件不再重载页面
* .capture       添加事件监听器时使用事件捕获模式
* .self              只当在 event.target 是当前元素自身时触发处理函数
* .once            事件将只会触发一次，2.1.4 新增
* .passive        滚动事件的默认行为 (即滚动行为) 将会立即触发，2.3.0 新增

> 注意：  
> 使用修饰符时，顺序很重要；相应的代码会以同样的顺序产生。因此，用 @click.prevent.self 会阻止所有的点击，而 @click.self.prevent 只会阻止对元素自身的点击。  
>   
> 不要把 .passive 和 .prevent 一起使用，因为 .prevent 将会被忽略，同时浏览器可能会向你展示一个警告。请记住，.passive 会告诉浏览器你不想阻止事件的默认行为。  

\`\`\`
<!-- 阻止单击事件继续传播 -->
<a v-on:click.stop="doThis"></a>

<!-- 提交事件不再重载页面 -->
<form v-on:submit.prevent="onSubmit"></form>

<!-- 修饰符可以串联 -->
<a v-on:click.stop.prevent="doThat"></a>

<!-- 只有修饰符 -->
<form v-on:submit.prevent></form>

<!-- 添加事件监听器时使用事件捕获模式 -->
<!-- 即元素自身触发的事件先在此处处理，然后才交由内部元素进行处理 -->
<div v-on:click.capture="doThis">...</div>

<!-- 只当在 event.target 是当前元素自身时触发处理函数 -->
<!-- 即事件不是从内部元素触发的 -->
<div v-on:click.self="doThat">...</div>

<!-- 点击事件将只会触发一次 -->
<a v-on:click.once="doThis"></a>
\`\`\`

##### 按键修饰符
###### keyCode

\`\`\`
<!-- 只有在 \`keyCode\` 是 13 时调用 \`vm.submit()\` -->
<input v-on:keyup.13="submit">
\`\`\`

###### 按键别名
* .enter
* .tab
* .delete (捕获“删除”和“退格”键)
* .esc
* .space
* .up
* .down
* .left
* .right

可以通过全局 config.keyCodes 对象自定义按键修饰符别名：

\`\`\`
// 可以使用 \`v-on:keyup.f1\`
Vue.config.keyCodes.f1 = 112
\`\`\`

###### 自动匹配按键修饰符 2.5.0 新增
你也可直接将 [KeyboardEvent.key](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values) 暴露的任意有效按键名来作为修饰符。
在下面的例子中，处理函数仅在 $event.key === 'PageDown' 时被调用。

\`\`\`
<input @keyup.page-down="onPageDown">
\`\`\`

###### 系统修饰键 2.1.0 新增
* .ctrl
* .alt
* .shift
* .meta

> 注意：  
> 修饰键与常规按键不同，在和 keyup 事件一起用时，事件触发时修饰键必须处于按下状态。换句话说，只有在按住 ctrl 的情况下释放其它按键，才能触发 keyup.ctrl。而单单释放 ctrl 也不会触发事件。  
>   
> 在 Mac 系统键盘上，meta 对应 command 键 (⌘)。在 Windows 系统键盘 meta 对应 Windows 徽标键 (⊞)。在 Sun 操作系统键盘上，meta 对应实心宝石键 (◆)。在其他特定键盘上，尤其在 MIT 和 Lisp 机器的键盘、以及其后继产品，比如 Knight 键盘、space-cadet 键盘，meta 被标记为“META”。在 Symbolics 键盘上，meta 被标记为“META”或者“Meta”。  

\`\`\`
<!-- Alt + C -->
<input @keyup.alt.67="clear">

<!-- Ctrl + Click -->
<div @click.ctrl="doSomething">Do something</div>
\`\`\`

###### .exact 修饰符 2.5.0 新增
修饰符允许你控制由精确的系统修饰符组合触发的事件。

\`\`\`
<!-- 即使 Alt 或 Shift 被一同按下时也会触发 -->
<button @click.ctrl="onClick">A</button>

<!-- 有且只有 Ctrl 被按下的时候才触发 -->
<button @click.ctrl.exact="onCtrlClick">A</button>

<!-- 没有任何系统修饰符被按下的时候才触发 -->
<button @click.exact="onClick">A</button>
\`\`\`

###### 鼠标按钮修饰符 2.2.0 新增
* .left
* .right
* .middle   鼠标中间键

##### 为什么在 HTML 中监听事件?
1. 扫一眼 HTML 模板便能轻松定位在 JavaScript 代码里对应的方法。
2. 因为你无须在 JavaScript 里手动绑定事件，你的 ViewModel 代码可以是非常纯粹的逻辑，和 DOM 完全解耦，更易于测试。
3. 当一个 ViewModel 被销毁时，所有的事件处理器都会自动被删除。你无须担心如何自己清理它们。
`);



/********************************  文章18  ***************************************/
/********************************  文章18  ***************************************/
let article18 = marked(`
##### 基础使用
你可以用 v-model 指令在表单 input 及 textarea 元素上创建双向数据绑定。它会根据控件类型自动选取正确的方法来更新元素。

> 注意：  
> 在文本区域插值 (textarea) 并不会生效，应用 v-model 来代替。  

###### text and textarea

\`\`\`
</input v-model="message" placeholder="edit me">

<textarea v-model="message"></textarea>
\`\`\`

###### checkbox
单个复选框，绑定到布尔值：

\`\`\`
</input type="checkbox" id="checkbox" v-model="checked">
<label for="checkbox">{{ checked }}</label>
\`\`\`

多个复选框，绑定到同一个数组：

\`\`\`
<div id='example-3'>
  <input type="checkbox" id="jack" value="Jack" v-model="checkedNames">
  <label for="jack">Jack</label>
  <input type="checkbox" id="john" value="John" v-model="checkedNames">
  <label for="john">John</label>
  <input type="checkbox" id="mike" value="Mike" v-model="checkedNames">
  <label for="mike">Mike</label>
  <br>
  <span>Checked names: {{ checkedNames }}</span>
</div>

<script>
	new Vue({
		el: '#example-3',
		data: {
			checkedNames: []
		}
	})
</script>
\`\`\`

###### radio

\`\`\`
<div id="example-4">
  <input type="radio" id="one" value="One" v-model="picked">
  <label for="one">One</label>
  <br>
  <input type="radio" id="two" value="Two" v-model="picked">
  <label for="two">Two</label>
  <br>
  <span>Picked: {{ picked }}</span>
</div>

<script>
	new Vue({
		el: '#example-4',
		data: {
			picked: ''
		}
	})
</script>	
\`\`\`

###### select
> 注意：  
> 如果 v-model 表达式的初始值未能匹配任何选项，select 元素将被渲染为“未选中”状态。在 iOS 中，这会使用户无法选择第一个选项。因为这样的情况下，iOS 不会触发 change 事件。因此，更推荐像上面这样提供一个值为空的禁用选项。  

单选时：

\`\`\`
<div id="example-5">
  <select v-model="selected">
    <option disabled value="">请选择</option>
    <option>A</option>
    <option>B</option>
    <option>C</option>
  </select>
  <span>Selected: {{ selected }}</span>
</div>

<script>
	new Vue({
		el: '...',
		data: {
			selected: ''
		}
	})
</script>
\`\`\`

多选时 (绑定到一个数组)：

\`\`\`
<div id="example-6">
  <select v-model="selected" multiple style="width: 50px;">
    <option>A</option>
    <option>B</option>
    <option>C</option>
  </select>
  <br>
  <span>Selected: {{ selected }}</span>
</div>

<script>
	new Vue({
		el: '#example-6',
		data: {
			selected: []
		}
	})
</script>	
\`\`\`

###### 值绑定
对于单选按钮，复选框及选择框的选项，v-model 绑定的值通常是静态字符串 

\`\`\`
<!-- 当选中时，\`picked\` 为字符串 "a" -->
<input type="radio" v-model="picked" value="a">

<!-- \`toggle\` 为 true 或 false -->
<input type="checkbox" v-model="toggle">

<!-- 当选中时，\`selected\` 为字符串 "abc" -->
<select v-model="selected">
  <option value="abc">ABC</option>
</select>
\`\`\`

但是有时我们可能想把值绑定到 Vue 实例的一个动态属性上，这时可以用 v-bind 实现，并且这个属性的值可以不是字符串。

\`\`\`
单选框
<input type="radio" v-model="pick" v-bind:value="a">
// 当选中时
vm.pick === vm.a

选择框的选项
<select v-model="selected">
    <!-- 内联对象字面量 -->
  <option v-bind:value="{ number: 123 }">123</option>
</select>
// 当选中时
typeof vm.selected // => 'object'
vm.selected.number // => 123
\`\`\`

复选框
> 这里的 true-value 和 false-value 特性并不会影响输入控件的 value 特性，因为浏览器在提交表单时并不会包含未被选中的复选框。如果要确保表单中这两个值中的一个能够被提交，(比如“yes”或“no”)，请换用单选按钮。  

\`\`\`
<input
  type="checkbox"
  v-model="toggle"
  true-value="yes"
  false-value="no"
>
// 当选中时
vm.toggle === 'yes'
// 当没有选中时
vm.toggle === 'no'
\`\`\`

##### 修饰符
###### .lazy
在默认情况下，v-model 在每次 input 事件触发后将输入框的值与数据进行同步 (除了上述输入法组合文字时)。你可以添加 lazy 修饰符，从而转变为使用 change 事件进行同步：

\`\`\`
<!-- 在“change”时而非“input”时更新 -->
<input v-model.lazy="msg" >
\`\`\`

###### .number（没测出来有什么用，可能手机浏览器有用）
如果想自动将用户的输入值转为数值类型，可以给 v-model 添加 number 修饰符：

\`\`\`
<input v-model.number="age" type="number">
\`\`\`

###### .trim（没测出来有什么用，好像本身就会自动过滤）
如果要自动过滤用户输入的首尾空白字符，可以给 v-model 添加 trim 修饰符：

\`\`\`
<input v-model.trim="msg">
\`\`\`

##### 可以在自定义组件上使用v-model
要了解更多，请参阅组件指南中的[自定义输入组件](https://cn.vuejs.org/v2/guide/components.html#%E4%BD%BF%E7%94%A8%E8%87%AA%E5%AE%9A%E4%B9%89%E4%BA%8B%E4%BB%B6%E7%9A%84%E8%A1%A8%E5%8D%95%E8%BE%93%E5%85%A5%E7%BB%84%E4%BB%B6)。
`);



/********************************  文章19  ***************************************/
/********************************  文章19  ***************************************/
let article19 = marked(`
##### 使用组件
###### 全局注册 
Vue.component(tagName, options)

\`\`\`
Vue.component('my-component', {
  // 选项
})

<my-component></my-component>
\`\`\`

###### 局部注册

\`\`\`
var Child = {
  template: '<div>A custom component!</div>'
}

new Vue({
  // ...
  components: {
    // <my-component> 将只在父组件模板中可用
    'my-component': Child
  }
})
\`\`\`

###### DOM 模板解析注意事项
当使用 DOM 作为模板时 (例如，使用 **el** 选项来把 Vue 实例挂载到一个已有内容的元素上)，你会受到 HTML 本身的一些限制，因为 Vue 只有在浏览器解析、规范化模板之后才能获取其内容。尤其要注意，像 **ul**、**ol**、**table**、**select** 这样的元素里允许包含的元素有限制，而另一些像 **option** 这样的元素只能出现在某些特定元素的内部。

\`\`\`
// 在自定义组件中使用这些受限制的元素时会导致一些问题，例如：
<table>
  <my-row>...</my-row>
</table>

// 自定义组件 <my-row> 会被当作无效的内容，因此会导致错误的渲染结果。变通的方案是使用特殊的 is 特性：
<table>
  <tr is="my-row"></tr>
</table>
\`\`\`

应当注意，如果使用来自以下来源之一的字符串模板，则没有这些限制：  
- script type="text/x-template"  
- JavaScript 内联模板字符串  
- .vue 组件  

###### data 必须是函数

###### 组件组合
在 Vue 中，父组件通过 **prop** 给子组件下发数据，子组件通过事件给父组件发送消息。

##### Prop
###### 使用 Prop 传递数据
子组件要显式地用 ::props:: 选项声明它预期的数据：

\`\`\`
Vue.component('child', {
  // 声明 props
  props: ['message'],
  // 就像 data 一样，prop 也可以在模板中使用
  // 同样也可以在 vm 实例中通过 this.message 来使用
  template: '<span>{{ message }}</span>'
})
\`\`\`

###### camelCase vs. kebab-case
HTML 特性是不区分大小写的。所以，当使用的不是字符串模板时，camelCase (驼峰式命名) 的 prop 需要转换为相对应的 kebab-case (短横线分隔式命名)：

\`\`\`
Vue.component('child', {
  // 在 JavaScript 中使用 camelCase
  props: ['myMessage'],
  template: '<span>{{ myMessage }}</span>'
})

<!-- 在 HTML 中使用 kebab-case -->
<child my-message="hello!"></child>
\`\`\`

###### 动态 Prop
用 ::v-bind:: 来动态地将 prop 绑定到父组件的数据。每当父组件的数据变化时，该变化也会传导给子组件。
如果你想把一个对象的所有属性作为 prop 进行传递，可以使用不带任何参数的 v-bind (即用 v-bind 而不是 v-bind:prop-name)。例如，已知一个 todo 对象

\`\`\`
todo: {
  text: 'Learn Vue',
  isComplete: false
}
<todo-item v-bind="todo"></todo-item>

将等价于：
<todo-item
  v-bind:text="todo.text"
  v-bind:is-complete="todo.isComplete"
></todo-item>
\`\`\`

###### 字面量语法 vs 动态语法
初学者常犯的一个错误是使用字面量语法传递数值：

\`\`\`
<!-- 传递了一个字符串 "1" -->
<comp some-prop="1"></comp>

<!-- 传递真正的数值 -->
<comp v-bind:some-prop="1"></comp>
\`\`\`

###### 单向数据流
Prop 是单向绑定的：当父组件的属性变化时，将传导给子组件，但是反过来不会。这是为了防止子组件无意间修改了父组件的状态，来避免应用的数据流变得难以理解。

> 注意在 JavaScript 中对象和数组是引用类型，指向同一个内存空间，如果 prop 是一个对象或数组，在子组件内部改变它会影响父组件的状态。  

###### Prop 验证
可以为组件的 prop 指定验证规则。如果传入的数据不符合要求，Vue 会发出警告。

\`\`\`
Vue.component('example', {
  props: {
    // 基础类型检测 (\`null\` 指允许任何类型)
    propA: Number,
    // 可能是多种类型
    propB: [String, Number],
    // 必传且是字符串
    propC: {
      type: String,
      required: true
    },
    // 数值且有默认值
    propD: {
      type: Number,
      default: 100
    },
    // 数组/对象的默认值应当由一个工厂函数返回
    propE: {
      type: Object,
      default: function () {
        return { message: 'hello' }
      }
    },
    // 自定义验证函数
    propF: {
      validator: function (value) {
        return value > 10
      }
    }
  }
})
\`\`\`

type 可以是下面原生构造器：
* String
* Number
* Boolean
* Function
* Object
* Array
* Symbol
> 当 prop 验证失败，Vue 会抛出警告 (如果使用的是开发版本)。注意 prop 会在组件实例创建之前进行校验，所以在 default 或 validator 函数里，诸如 data、computed 或 methods 等实例属性还无法使用。  

##### 非 Prop 特性
可以把特性直接添加到组件上 (不需要事先定义 prop)，除了 class 和 style 特性，这两个特性的值都会做合并 (merge) 操作，其他特性都会覆盖原有值。

\`\`\`
bs-date-input data-3d-date-picker="true"></bs-date-input>
\`\`\`
`);


/********************************  文章20  ***************************************/
/********************************  文章20  ***************************************/
let article20 = marked(`
##### 第一章 JavaScript简介
###### 1.1 JavaScript简史
###### 1.2 JavaScript实现
- 一个完整的JavaScript实现应该由三个不同的部分组成：核心（ECMAScript）、文档对象模型（DOM）、浏览器对象模型（BOM）。
- ECMAScript：提供核心语言功能；DOM：提供访问和操作网页内容的方法和接口；BOM：提供与浏览器交互的方法和接口。
###### 1.3 JavaScript版本

##### 第二章 在HTML中使用JavaScript
###### 2.1 script元素
- 标签的位置：为了避免浏览器在呈现页面时出现明显的延迟，现代Web应用程序一般都把全部JavaScript引用放在 body 元素中页面内容的后面。
- 延迟脚本：defer属性表明脚本在执行时不会影响页面的构造，脚本会被延迟到整个页面都解析完毕后再运行；只适用于外部脚本文件。
\`\`\`
<script defer="defer" src="example.js"></script>
\`\`\`
- 异步脚本：async属性表示当前脚本不必等待其他脚本，也不必阻塞文档呈现，告诉浏览器立即下载文件，且并不保证标记为async的脚本按照他们的先后顺序执行；只适用于外部脚本文件。
\`\`\`
<script async src="example1.js"></script>
<script async src="example2.js"></script>
\`\`\`
###### 2.2 嵌入代码与外部文件
###### 2.3 文档模式
- 混杂模式与标准模式；开启标准模式：
\`\`\`
<!-- HTML 5 -->
<!DOCTYPE html>
\`\`\`
###### 2.4 noscript元素

##### 第三章 基本概念
###### 3.1 语法
- 区分大小写：ECMAScript中的一切都区分大小写。
- 严格模式：在严格模式下，ECMAScript 3 中的一些不确定的行为将得到处理，而且对某些不安全的操作也会抛出错误。在顶部添加如下代码：
\`\`\`
"use strict"
\`\`\`
###### 3.2 关键字和保留字
###### 3.3 变量
给未经声明的变量赋值在严格模式下会导致抛出 ReferenceError 错误。
###### 3.4 数据类型
typeof操作符，用来检测变量的数据类型。

5种简单数据类型：Undefined、Null、Boolean、Number、String；1种复杂数据类型（引用类型）：Object。
- Undefined类型：使用var声明变量但未对其加以初始化时，这个变量的值就是undefined。
- Null类型：null值表示一个空对象指针；只要意在保存对象的变量还没有真正保存对象，就应该明确地让该变量保存null值。
- Boolean类型：其他类型转换为Boolean类型，使用函数Boolean()。
- Number类型：其他类型转换为Number类型，常用函数parseInt()，转换字符串时，如果第一个字符不是数字字符或者负号，会返回NaN，第二个参数可选，表示进制
- String类型：字符串是不可变的；其他类型转换为String类型，使用函数toString()或String()或加一个空字符串（1+’’）。
- Object类型

创建对象的方法：
\`\`\`
var o = new Object();
\`\`\`
创建Object对象的实例并为其添加属性或方法，就可以创建自定义对象；

Object类型是所有它的实例的基础，具有下列属性和方法：
- constructor：保留着用于创建当前对象的函数即构造函数；
- hasOwnProperty(propertyName)：用于检查给定的属性在当前对象实例中是否存在；
- isPrototypeOf(object)：用于检查传入的对象是否是传入对象的原型；
- propertyIsEnumerable()；toLocaleString()；
- toString()：返回对象的字符串表示；
- valueOf()：返回对象的字符串、数值或布尔值表示；

###### 3.5 操作符
在比较字符串时，实际比较的是两个字符串中对应位置的每个字符的字符编码值。
\`\`\`
"23" < "3"   // true
\`\`\`
- 在比较数值和字符串时，字符串都会被被转换成数值，然后再以数值方式与另一个数值比较；如果不能转换成数值，就转换成NaN。
- 任何操作数与NaN进行比较，结果都是false。
\`\`\`
NaN == NaN  // false
NaN === NaN  // false
NaN &gt; NaN  // false
NaN &lt; NaN  // false
\`\`\`
- 相等（==） 全等（===）：全等只在两个操作数未经转换就相等的情况下返回true。
\`\`\`
"55" == 55  // true
"55" === 55  // false
\`\`\`
- 条件操作符
\`\`\`
variable = boolean_expression ? true_value : false_value;
\`\`\`
###### 3.6 语句
- 由于ECMAScript中不存在块级作用域，因此在循环内部定义的变量也可以在外部访问到：
\`\`\`
for (var i = 0; i &lt; 10; i++) {
  var j = 1;
}
console.log(i, j);  // 10 1
\`\`\`
- for-in 语句可以用来枚举对象的属性。
\`\`\`
for (property in expression) {
  ...
}
\`\`\`

- break 和 continue 语句与 label 语句联合使用：多发生在循环嵌套的情况下。

\`\`\`
var num = 0;

outermost:
for (var i = 0; i &lt; 10; i++) {
  for (var j = 0; j &lt; 10; j++) {
    if (i == 5 &amp;&amp; j ==5) {
      break outermost;
    }
    num++;
  }
}

console.log(num);  // 55
\`\`\`

###### 3.7 函数
- 函数参数：参数在内部是用一个数组来表示的，函数接收到的始终都是这个数组，而不关心数组中包含哪些函数；通过arguments对象来访问这个参数数组；命名的参数只提供便利，但不是必需的；arguments对象中的值与对应的命名参数的内存空间是独立的，但它们的值会同步。

\`\`\`
function example(name, age) {
	console.log('arguments:', arguments);
	console.log('name:', name, 'age:', age);
	name = 'DIYgod';
	console.log(arguments[0]);
}
example('Anotherhome', '556', 'www.anotherhome.net');

// arguments: ["Anotherhome", "556", "www.anotherhome.net"]
// name: Anotherhome age: 556
// DIYgod
\`\`\`
`);



/********************************  文章21  ***************************************/
/********************************  文章21  ***************************************/
let article21 = marked(`
##### 第四章 变量、作用域和内存问题
###### 4.1 基本类型和引用类型的值
- 在操作对象时，实际上是在操作对象的引用而不是实际的对象。
- 从一个变量向另一个变量复制基本类型的值时，会创建这个值的一个副本；从一个变量向另一个变量复制引用类型的值时，复制的是指向存储在堆中的一个对象的指针，复制之后两个变量指向同一个对象。

\`\`\`
var o1 = {};
var o2 = o1;
o1.name = 'DIYgod';
console.log(o2.name);  // DIYgod

var n1 = 1;
var n2 = n1;
n1 = 2;
console.log(n2);  // 1
\`\`\`

- 传递参数：参数只能按值传递，参数为对象时，在函数内部访问的是同一个对象。

\`\`\`
function setName(o) {
  o.name = 'DIYgod';
  o = {};
  o.name = 'Anotherhome';
}

var p = {};
setName(p);
console.log(p.name);  // DIYgod
\`\`\`

- 确定一个值是哪种基本类型可以使用typeof操作符，而确定一个值是哪种引用类型可以使用instanceof操作符。

###### 4.2 执行环境及作用域

- 执行环境有全局执行环境和函数执行环境之分；每个执行环境都有一个与之关联的变量对象；每次进入一个新执行环境，都会创建一个用于搜索变量和函数的作用域链，作用链的前端是当前执行的代码所在的变量环境，最后一个对象是全局执行环境的变量对象。
- 查询标识符：从作用域链的前端开始，向上逐级查询，找到后搜索结果停止，没有找到则一直追溯到全局环境的变量对象。

###### 4.3 垃圾回收
- 最常用的垃圾搜集方式是标记清除：垃圾回收器在运行时会给存储在内存中的所有变量都加上标记，然后去掉环境中的变量以及被环境中的变量引用的变量的标记，而在此之后还有标记的变量被视为准备删除的变量，因为这些变量无法被访问到了。
- 优化内存占用：为执行中的代码只保存必要的数据；一旦数据不再有用，最好通过将其值设置为null来释放其引用——解除引用；解除引用的作用是让其值脱离执行环境，以便垃圾搜集器下次运行时将其回收。

##### 第五章 引用类型
###### 5.1 Object类型
- 创建Object实例：使用Object构造函数；对象字面量。

\`\`\`
// new 操作符法
var o1 = new Object();
o1.name = 'DIYgod';
o1.age = 20;

// 对象字面量表示法
var o1 = {
  name: 'DIYgod',
  age: 20
}
\`\`\`

- 访问对象属性：点表示法；方括号表示法。建议使用点表示法。

\`\`\`
// 点表示法
console.log(o.name);

// 方括号表示法
console.log(o['name']);

var n = 'name';
console.log(o[n]);

console.log(o['first name'];
\`\`\`

###### 5.2 Array类型
- 创建数组：使用Array构造函数；使用数组字面量表示法。

\`\`\`
var a1 = new Array();
var a2 = new Array(20);
var a3 = new Array('red', 'blue', 'green');

var a4 = [];
var a5 = ['red', 'blue', 'green'];
\`\`\`

- 利用length在末尾添加新项。

\`\`\`
var a = ['a', 'b'];
a[a.length] = 'c';
\`\`\`

- 检测数组：Array.isArray()（解决了存在两个以上全局执行环境时instanceof检测结果出错的情况）。
- 栈方法和队列方法：push()添加一项到数组末尾；pop()移除数组末尾一项；shift()移除数组第一项；unshift()；添加一项到数组前端。
- 重排序

reverse()：反转数组项的顺序。

sort()：默认将数组项转换成字符串然后升序排列。可以接收一个比较函数作为参数。

比较函数接收两个参数，如果第一个参数位于第二个参数之前则返回一个负数，相等则返回0，第二个参数位于第一个参数之前则返回一个负数。

\`\`\`
var a = [0, 1, 15, 10, 5];
a.sort();
console.log(a)  // [0, 1, 10, 15, 5]

function compare(value1, value2) {
  return value1 - value2;
}
a.sort(compare);
console.log(a)  // [0, 1, 5, 10, 15]
\`\`\`

- 操作方法
concat()：添加项

\`\`\`
var a1 = ['red', 'green', 'blue'];
var a2 = a1.concat('yellow', ['black', 'brown']);
console.log(a2)  // ["red", "green", "blue", "yellow", "black", "brown"]
\`\`\`

slice()：截取

\`\`\`
var a = ["red", "green", "blue", "yellow", "black", "brown"];
console.log(a.slice(1), a.slice(1, 4))  // ["green", "blue", "yellow", "black", "brown"] ["green", "blue", "yellow"]
\`\`\`

splice()：删除插入替换

\`\`\`
var a = ["red", "green", "blue", "yellow", "black", "brown"];
console.log(a.splice(2, 1), a);  // 删除项; ["blue"] ["red", "green", "yellow", "black", "brown"]
console.log(a.splice(1, 0, 'yellow', 'orange'), a);  // 插入项; [] ["red", "yellow", "orange", "green", "yellow", "black", "brown"]
console.log(a.splice(1, 1, 'red', 'purple'), a);  // 替换项; ["yellow"] ["red", "red", "purple", "orange", "green", "yellow", "black", "brown"]
\`\`\`

- 位置方法：indexOf() lastIndexOf() 接收两个参数：要查找的项和（可选）查找起点位置的索引；indexOf()从前往后查找，lastIndexOf()从后往前查找；返回要查找的项的位置，没找到则返回-1。

\`\`\`
var a = ["red", "purple", "orange", "green", "red", "yellow", "black", "brown"];
console.log(a.indexOf('red'));  // 0
console.log(a.lastIndexOf('red'));  // 4
console.log(a.indexOf('red', 1));  // 4
console.log(a.lastIndexOf('red', 1));  // 0
\`\`\`

- 迭代方法：every() some() filter() map() forEach()。

\`\`\`
var a = [1, 2, 3, 4, 5, 4, 3, 2, 1];

var everyResult = a.every(function (item, index, array) {
  return (item &gt; 2);
});
console.log(everyResult);  // false

var someResult = a.some(function (item, index, array) {
  return (item &gt; 2);
});
console.log(someResult);  // true

var filterResult = a.filter(function (item, index, array) {
  return (item &gt; 2);
});
console.log(filterResult);  // [3, 4, 5, 4, 3]

var mapResult = a.map(function (item, index, array) {
  return (item * 2);
});
console.log(mapResult);  // [2, 4, 6, 8, 10, 8, 6, 4, 2]

var forEachResult = a.forEach(function (item, index, array) {
  console.log(item);
});
console.log(forEachResult);  // undefined
\`\`\`

- 归并方法

\`\`\`
var a = [1, 2, 3, 2, 1];

var sum1 = a.reduce(function (prev, cur, index, array) {
  console.log(index);  // 1 2 3 4
  return prev + cur;
});
console.log(sum1);  // 9

var sum2 = a.reduceRight(function (prev, cur, index, array) {
  console.log(index);  // 3 2 1 0
  return prev + cur;
});
console.log(sum2);  // 9
\`\`\`

###### 5.3 Date类型
- 创建日期对象：月份基于0（一月是0，二月是1…）。

\`\`\`
var d1 = new Date();

var d2 = new Date(2015, 2, 5, 17, 55, 55);  // 2015年3月5日下午5点55分55秒
\`\`\`

- 获取调用时的日期和时间和毫秒数，可以用来分析代码。

\`\`\`
var start = Date.now();
doSomething();
var stop = Date.now();
var result = stop - start;
\`\`\`

日期格式化方法：local表示以特定于地区的格式显示。

\`\`\`
var d2 = new Date(2015, 2, 5, 17, 55, 55);
d2.toString();  // "Thu Mar 05 2015 17:55:55 GMT+0800 (CST)"
d2.toDateString();  // "Thu Mar 05 2015"
d2.toTimeString();  // "17:55:55 GMT+0800 (CST)"
d2.toLocaleString();  // "2015/3/5 下午5:55:55"
d2.toLocaleDateString();  // "2015/3/5"
d2.toLocaleTimeString();  // "下午5:55:55"
\`\`\`

###### 5.4 RegExp类型

- 创建一个正则表达式：
pattern部分是正则表达式

flags，标志，标明正则表达式的行为：g 全局模式；i 不区分大小写；m 多行模式

\`\`\`
var exp1 = / pattern / flags
var exp2 = new RegExp('pattern', 'flags');
\`\`\`

- 实例方法：
exec()：返回第一个匹配项信息的数组，数组第一项是与整个模式匹配的字符串，其他项是与模式中的捕获组匹配的字符串；还包含两个额外的属性，index 和 input。

\`\`\`
var text = "I'm DIYgod, and this is Anotherhome";
var pattern = /and( this( is)?)?/gi;
var matches = pattern.exec(text);
console.log(matches.index);  // 12
console.log(matches.input);  // I'm DIYgod, and this is Anotherhome
console.log(matches[0]);  // and this is
console.log(matches[1]);  //  this is
console.log(matches[2]);  //  is
\`\`\`

test()：在模式与该参数匹配的情况下返回true，否则返回false。

\`\`\`
var text = "I'm DIYgod, and this is Anotherhome";
var pattern = /DIYgod/;
var matches = pattern.test(text);
console.log(matches);  // true
\`\`\`

- RegExp构造函数包含一些属性，适用于作用域中的所有正则表达式，记录一些最近一次正则表达式操作的信息。

###### 5.5 Function类型
- 定义函数，函数实际上是 Function 类型的实例，因此函数也是对象。

\`\`\`
// 使用函数声明语法
function f1 (n1, n2) {
	return n1 + n2;
}

// 使用函数表达式
var f2 = function (n1, n2) {
	return n1 + n2;
};

// 使用构造函数，不推荐
var f3 = new Function('n1', 'n2', 'return n1 + n2');
\`\`\`

- 函数名是一个指向函数对象的指针。

\`\`\`
function f1 (n1, n2) {
  return n1 + n2;
}
var f2 = f1;
f1 = null;
console.log(f2(1, 1));  // 2
\`\`\`

- ECMAScript中没有函数重载。
- 函数声明与函数表达式的区别：解释器会率先读取函数声明，并使其在执行任何代码之前可用（函数声明提升）；函数表达式必须等到解释器执行到它所在行才会真正被解释执行。

\`\`\`
console.log(f1(1, 1));  // 2
function f1 (n1, n2) {
  return n1 + n2;
}

console.log(f2(1, 1));  // Uncaught TypeError: f2 is not a function
var f2 = function(n1, n2) {
  return n1 + n2;
}
\`\`\`

- 函数内部属性
- 函数的arguments对象的callee属性：是一个指针，指向拥有这个arguments对象的函数。可以在递归时减小函数和函数名的耦合。

\`\`\`
// 明显第二种写法更好一些

function factorial1 (num) {
  if (num &lt;= 1) {
    return 1;
  }
  else {
    return num * factorial1(num - 1);
  }
}

function factorial2 (num) {
  if (num &lt;= 1) {
    return 1;
  }
  else {
    return num * arguments.callee(num - 1);
  }
}
\`\`\`

caller属性：保存着当前函数的函数的引用。

\`\`\`
function outer() {
  inner();
}
function inner() {
  console.log(arguments.callee.caller);  // function outer()...
}
outer();
\`\`\`

- 函数属性和方法

length属性：表示函数希望接收的命名参数的个数。

\`\`\`
function f (n1, n2) {
  return n1 + n2;
}
console.log(f.length);  // 2
\`\`\`

apply() call()：用来改变函数的this对象的值。

\`\`\`
window.color = 'red';
var o = {
	color: 'blue'
};

function sayColor (n1, n2) {
	console.log(this.color);
	return n1 + n2;
}

sayColor(1, 1);  // red
o.sayColor = sayColor;
o.sayColor();  // blue

// 使用call和apply可以消除对象与方法的耦合关系
sayColor.call(window, 1, 1);  // red
sayColor.call(o, 1, 1);  // blue

sayColor.apply(window, [1, 1]);  // red
sayColor.apply(o, [1, 1]);  // blue
\`\`\`

###### 5.6 基本包装类型

Boolean类型、Number类型、String类型

暂时跳过

###### 5.7 单体内置对象
Global对象、Math对象

暂时跳过
`);


/********************************  文章22  ***************************************/
/********************************  文章22  ***************************************/
let article22 = marked(`
##### 第六章 面向对象的程序设计
###### 6.1 理解对象
两种属性：数据属性和访问器属性。特性：描述属性的各种特征，是为了实现JavaScript引擎用的，不能直接访问。

数据属性，有4个特性：

- [[Configurable]]：表示能否通过 delete 删除属性从而重新定义属性，能否修改属性的特性，能否把属性修改为访问器属性。
- [[Enumerable]]：表示能否通过 for-in 循环返回属性。
- [[Writeable]]：表示能否修改属性的值。
- [[Value]]：包含这个属性的数据值。

访问器属性，有4个特性：

- [[Configurable]]：表示能否通过 delete 删除属性从而重新定义属性，能否修改属性的特性，能否把属性修改为数据属性。
- [[Enumerable]]：表示能否通过 for-in 循环返回属性。
- [[Get]]：在读取属性时调用的函数。
- [[Set]]：在写入属性时调用的函数。

定义及读取特性：
Object.defineProperty() 

Object.defineProperties() 

Object.getOwnPropertyDescriptor()

###### 6.2 创建对象
工厂模式：虽然解决了创建多个相似对象的问题，但却没有解决对象识别的问题。

\`\`\`
function createPerson(name, age, job) {
  var o = new Object();
  o.name = name;
  o.age = age;
  o.job = job;
  o.sayName = function () {
    console.log(this.name);
  }
  return o;
}
var p1 = createPerson('DIYgod', 20, 'Software Engineer');
var p2 = createPerson('Anotherhome', 2, 'Website');
\`\`\`

构造函数模式。（构造函数应该以大写字母开头）

\`\`\`
function Person(name, age, job) {
  this.name = name;
  this.age = age;
  this.job = job;
  this.sayName = function () {
    console.log(this.name);
  }
}
var p1 = new Person('DIYgod', 20, 'Software Engineer');
var p2 = new Person('Anotherhome', 2, 'Website');

// p1 p2 分别保存着 Person 的一个不同的实例，这两个对象都有一个 constructor 属性，该属性指向Person
console.log(p1.constructor);  // function Person(name, age, job) {...

console.log(p1 instanceof Object);  // true
console.log(p1 instanceof Person);  // true
\`\`\`

这种方法会经历4个步骤：

- 创建一个新对象
- 将构造函数的作用域赋给新对象（this指向这个新对象）
- 执行构造函数中的代码（为新对象添加属性）
- 返回新对象

构造函数的问题：每个方法都要在每个实例上重新创建一遍。

\`\`\`
console.log(p1.sayName === p2.sayName);  // false
\`\`\`

原型模式：每个函数都有一个 prototype 属性，这个属性是一个指针，指向一个对象（函数的原型对象），这个对象包含可以由该类型的所有实例共享的属性和方法。

\`\`\`
// 组合使用构造函数模式与原型模式
function Person(name, age, job) {
  this.name = name;
  this.age = age;
  this.job = job;
}
Person.prototype.sayName = function () {
  console.log(this.name);
}
var p1 = new Person('DIYgod', 20, 'Software Engineer');
var p2 = new Person('Anotherhome', 2, 'Website');

console.log(p1.sayName === p2.sayName);  // true
\`\`\`

理解原型对象：

- 只要创建一个新函数，就会根据一组特定的规则为该函数创建一个 prototype 属性，指向原型对象
- 默认所有原型对象都会获得一个 constructor 属性，指向 prototype 属性所在函数
- 调用构造函数创建新实例后，实例将有一个 proto 属性，指向构造函数的原型对象，指针叫[[Prototype]]，默认原型指向Object
- 实例与构造函数没有直接关系
- 读取属性：搜索先从对象实例本身开始，如果没找到，搜索原型对象
- 使用 isPrototype() 来检测构造函数和实例之间是否有关系
- 使用 hasOwnProperty() 来检测属性存在于实例中还是原型中
- 原型与 in 操作符

\`\`\`
// in操作符会在通过对象能够访问到属性时返回true
console.log('name' in p1);  // true

// 枚举属性
for (var prop in p1) {
  console.log(prop);  // name age job sayName
}
\`\`\`

用对象字面量重写原型对象

\`\`\`
function Person() {
}
Person.prototype = {
  constructor: Person,  // 这里重写了prototype，不再默认有constructor属性
  name: 'DIYgod',
  age: 20
};
\`\`\`

动态原型模式、寄生构造函数模式、稳妥构造函数模式

###### 6.3 继承
JavaScript中最常用的继承：组合继承。融合了原型链和构造函数的优点。

\`\`\`
function SuperType(name) {
  this.name = name;
  this.color = ['red', 'blue', 'green'];
}
SuperType.prototype.sayName = function () {
  console.log(this.name);
}

function SubType(name, age) {
  SuperType.call(this, name);  // 借用构造函数
  this.age = age;
}
SubType.prototype = new SuperType();  // 原型链
SubType.prototype.constructor = SubType;  // construcotr在上一句中被重写
SubType.prototype.sayAge = function () {
  console.log(this.age);
}

var instance = new SubType('DIYgod', 20);
instance.sayName();  // DIYgod
instance.sayAge();  // 20
\`\`\`

确定原型和实例的关系。接上例：

\`\`\`
console.log(instance instanceof SuperType);  // true
console.log(SuperType.prototype.isPrototypeOf(instance));  // true
\`\`\`

原型式继承、寄生式继承、寄生组合式继承
`);


/********************************  文章23  ***************************************/
/********************************  文章23  ***************************************/
let article23 = marked(`
##### 第七章 函数表达式
###### 7.1 递归
###### 7.2 闭包
- 闭包是有权访问另一个函数作用域中的变量的函数。
- （作用域链见4.2）在外部函数内部定义的内部函数将包含外部函数的活动对象添加到它的作用域中；外部函数执行完毕后，其活动对象不会被销毁，因为内部函数的作用域链仍然在引用这个活动对象；外部函数执行完毕后，内部函数仍然可以访问到其定义的所有变量。

\`\`\`
function outer () {
  var name = 'DIYgod';
  return function () {
    console.log(name);
  }
}
var inner = outer();
inner();  // DIYgod
inner = null;  // 解除对outer内部的匿名函数的引用，以便释放内存
\`\`\`

闭包只能取得包含函数中任何变量的最后一个值。

\`\`\`
function createFunction () {
  var result = [];
  for (var i = 0; i &lt; 10; i++) {
    result[i] = function () {
      return i;
    }
  }
  return result;
}
console.log(createFunction()[0]());  // 10
console.log(createFunction()[1]());  // 10
// 返回的都是同一个变量i
\`\`\`

匿名函数的this通常会指向window。

\`\`\`
var name = 'The Window';
var object = {
  name: 'My Object',
  getNameFunc: function () {
    return function () {
      return this.name;
    }
  }
}
console.log(object.getNameFunc()());  // The Window
\`\`\`

###### 7.3 模仿块级作用域
用匿名函数来模仿块级作用域：第一个括号的作用是将函数声明转换成函数表达式（函数声明不能通过后面加括号来调用），第二个括号来调用这个函数。

\`\`\`
(function () {
  var i = 9;
  console.log(i);  // 9
})();
console.log(i);  // Uncaught ReferenceError: i is not defined
\`\`\`

###### 7.4 静态对象
- 任何在函数中定义的变量，都可以认为是私有变量。
- 有权访问私有变量和私有函数的公有方法称为特权方法。

\`\`\`
function MyObject() {
  // 私有变量和私有函数
  var privateVariable = 'DIYgod';
  function privateFunction() {
    console.log('lalala');
  }

  // 特权方法
  this.publicMethod = function () {
    console.log(privateVariable);
    privateFunction();
  };
}
var o = new MyObject();
o.publicMethod();  // DIYgod lalala
o.privateFunction();  // Uncaught TypeError: o.privateFunction is not a function
\`\`\`
`);


/********************************  文24  ***************************************/
/********************************  文24  ***************************************/
let article24 = marked(`
##### 第十三章 事件
###### 13.1事件流
- 事件冒泡：事件开始时由最具体的元素接收，然后逐级向上传播到较为不具体的节点；IE9、FireFox、Chrome 和 Safari 将事件一直冒泡到 window 对象。
- 事件捕获：由于老版本的浏览器不支持，因此很少有人使用事件捕获。
- “DOM2级事件”规定的事件流包括三个阶段：事件捕获阶段、处于目标阶段和事件冒泡阶段。
###### 13.2 事件处理程序
HTML事件处理程序：扩展作用域，在函数内部可以像访问局部变量一样访问document及该元素本身的成员，栗子：

\`\`\`
<input type="button" value="Click Me" onclick="alert(value)">
\`\`\`

如果是一个表单输入元素，则作用域中还会包含访问表单元素的入口，栗子：

\`\`\`
<form method="post">
  <input type="text" name="username" value="">
  <input type="button" value="Echo username" onclick="alert(username.value)">
</form>
\`\`\`

缺点：①存在时差问题，解析函数之前就触发事件会引发错误 ②扩展处理程序的作用域链在不同浏览器中会导致不同结果 ③导致HTML和JavaScript代码紧密耦合。

DOM0级事件处理程序

\`\`\`
// 绑定事件处理程序
var btn = document.getElementById('myButton');
btn.onclick = function () {
  console.log(this.id);    // myButton
}

// 删除事件处理程序
btn.onclick = null;
\`\`\`

以这种方式添加的事件处理程序会在事件流的冒泡阶段被处理。

DOM2级事件处理程序

addEventListener() 和 removeEventListener()

三个参数：要处理的事件名、作为事件处理程序的函数、在捕获阶段调用函数(true)还是在冒泡阶段调用函数(false，默认)

好处是可以添加多个事件处理程序，使用 addEventListener 添加的事件处理程序只能使用 removeEventListener移除，匿名函数无法移除。

IE事件处理程序

attachEvent() 和 detachEvent()

\`\`\`
var btn = document.getElementById('myButton');
btn.attachEvent('onclick', function () {
  console.log(this === window);    // myButton
});
\`\`\`

以这种方式添加的事件处理程序会在事件流的冒泡阶段被处理。

###### 13.3 事件对象
- 在触发DOM上的某个事件时，会产生一个事件对象event，这个对象包含着所有与事件有关的信息。只有在事件处理程序执行期间，event对象才会存在，一旦事件处理程序执行完成，event对象就会被销毁。
- 属性/方法：
currentTarget：正在处理事件的那个元素

target：事件的目标

type：事件类型

cancelable：可以阻止特定事件的默认行为

preventDefault()：阻止特定事件的默认行为

stopPropagation()：停止事件在DOM层次中的传播，即取消进一步的事件捕获或冒泡

eventPhase：事件出于事件流的阶段 捕获阶段为1 处于目标对象为2 冒泡阶段为3

###### 13.4 事件类型
UI事件、焦点事件、鼠标事件、滚轮事件、文本事件、键盘事件、合成事件、变动事件。

##### 第二十一章 Ajax与Comet
###### 21.1 XMLHttpRequest对象
用法

\`\`\`
var xhr = new XMLHttpRequest();
xhr.onreadystatechange = function () {
  if (xhr.readState === 4) {
    if (xhr.status &gt;= 200 &amp;&amp; xhr.status &lt; 300 || xhr.status === 304) {
      console.log(xhr.responseText);
    }
    else {
      console.log('Request was unsuccessful: ' + xhr.status);
    }
  }
};
xhr.open('get', 'example.php', true);
xhr.send(null);
\`\`\`

创建XHR对象：new XMLHttpRequest();

open()：启动一个请求以备发送；3个参数：请求类型、请求的URL、是否异步发送请求（同步必须等到服务器响应后再继续执行）；不会真正发送请求。

send()：发送请求；1个参数：发送的数据；不需要发送数据则必须传入null。

XHR对象的属性：

responseText 返回的文本

status 响应的HTTP状态。

HTTP状态码：
2xx 成功

3xx 重定向，304 Not Modified 表示请求的资源没有被修改，可以直接用浏览器中缓存的版本，302 Found 表示请求的资源现在临时从不同的URI响应请求

4xx 客户端错误，403 Forbidden，404 Not Found

5xx 服务器错误，500 Internal Server Error，503 Service Unavailable。

XHR的readyState属性：
0：未初始化

1：启动，已调用open()

2：发送，已调用send()

3：接收到部分响应数据

4：接收到全部响应数据

readystatechange事件：readystate属性的值由一个值变成另一个值，都会触发readystatechange事件。

###### 21.4 跨域资源共享
- CORS：使用自定义的HTTP头部让浏览器与服务器进行沟通，从而决定请求或响应是应该成功还是应该失败。IE中要使用XDR对象实现，其他浏览器XHR对象原生支持。
- 图像Ping：只能发送GET请求；无法访问服务器的响应文本。

\`\`\`
var img = new Image();
img.onload = img.onerror = function () {
	console.log('Done!');
};
img.src = 'http://api.hitokoto.us/rand?encode=jsc';
\`\`\`

JSONP：两部分组成 回调函数和数据。

\`\`\`
function myCallBack (data) {
	console.log(data.hitokoto);  // 像平常的你一样引发奇迹吧-
}
var script = document.createElement('script');
script.src = 'http://api.hitokoto.us/rand?encode=jsc&amp;fun=myCallBack';  // 返回一个包含在函数调用中的JSON，调用了myCallBack函数：myCallBack({"hitokoto":"...","author":"...",....});
document.body.insertBefore(script, document.body.firstChild);
\`\`\`

缺点：安全性不可靠；不容易判断请求失败。
`);


/********************************  文章25  ***************************************/
/********************************  文章25  ***************************************/
let article25 = marked(`

`);


/********************************  文章26  ***************************************/
/********************************  文章26  ***************************************/
let article26 = marked(`

`);


/********************************  文章27  ***************************************/
/********************************  文章27  ***************************************/
let article27 = marked(`

`);


/********************************  文章28  ***************************************/
/********************************  文章28  ***************************************/
let article28 = marked(`

`);

/********************************  文章29  ***************************************/
/********************************  文章29  ***************************************/
let article29 = marked(`

`);

/********************************  文章30  ***************************************/
/********************************  文章30  ***************************************/
let article30 = marked(`

`);

export default [
  {
    title: 'canvas 2D动画',
    takeaway: ['目前在web领域，基本上看到那些酷酷的2d动效，都是canvas实现的，flash已经基本上都被淘汰了，canvas效果的实现，无需安装任何插件，IE9及其以上浏览器支持，至少在移动端，大家可以放心大胆使用，甚至webGL 3D效果都可以尝鲜。'],
    tag: [
      {
        text: 'CSS',
        url: 'Technology',
      },
      {
        text: 'Canvas',
        url: 'Technology',
      },
		],
		id: 1,
    time: 1519833600000,
    date: '2018/3/1',
    state: false,
    content: article1,
  },
  {
    title: 'JS获取上次访问页面URL地址',
    takeaway: [
      '但是最近做了一个移动端项目，是我第一次在正式项目中使用document.referrer，这里跟大家分享一下相关的实践。',
      '场景是这样的，移动端无论是原生app还是传统的网页，返回上页是一个比较强烈的需求，几乎所有的内页都有这么一个返回上一页的按钮。大部分场景下，上面办法可以满足我们的交互需求，但是，在有些时候……',
    ],
    tag: [
      {
        text: 'JavaScript',
        url: 'Technology',
      },
      {
        text: 'DOM',
        url: 'Technology',
      },
		],
		id: 2,
    time: 1519488000000,
    date: '2018/2/25',
    state: false,
    content: article2,
  },
  {
    title: 'CSS3变量var',
    takeaway: [
      '在任何语言中，变量的有一点作用都是一样的，那就是可以降低维护成本，附带还有更高性能，文件更高压缩率的好处。 ',
      '随着CSS预编译工具Sass/Less/Stylus的关注和逐渐流行，CSS工作组迅速跟进CSS变量的规范制定，并且，很多浏览器已经跟进，目前，在部分项目中已经可以直接使用了。',
    ],
    tag: [
      {
        text: 'CSS',
        url: 'Technology',
      },
      {
        text: 'CSS4',
        url: 'Technology',
      },
		],
		id: 3,
    time: 1519401600000,
    date: '2018/2/24',
    state: false,
    content: article3,
  },
  // {
  //   title: 'vue源码学习之三：实现动态数据绑定',
  //   takeaway: [
  //     '我们已经掌握了如何监听数据的变化，以及使用观察者模式和事件传递响应变化事件。那么，今天我们来看看，基于watch库，如何实现动态数据绑定？',
  //   ],
  //   tag: [
  //     {
  //       text: 'Vue',
  //       url: 'Technology',
  //     },
	// 	],
	// 	id: 4,
  //   time: 1506700800000,
  //   state: false,
  //   content: article6,
  // },
  // {
  //   title: 'vue源码学习之二：如何监听一个数组的变化',
  //   takeaway: [
  //     '继上一篇，文末我们提到另一个问题如何监听数组的变化？，今天我们就来解决这个问题。我们先来看一眼vue官方说明文档？',
  //   ],
  //   tag: [
  //     {
  //       text: 'Vue',
  //       url: 'Technology',
  //     },
	// 	],
	// 	id: 5,
  //   time: 1506528000000,
  //   state: false,
  //   content: article5,
  // },
  // {
  //   title: 'vue源码学习之一：如何监听一个对象的变化',
  //   takeaway: [
  //     '我们都知道，要想精通前端领域，研究分析成熟的框架是必不可少的一步。很多人可能都有这样的体会：“很努力地去阅读一些热门框架的源码，但是发现难度太高，花了很多时间却得不到什么，最终不得不放弃。',
  //     '我也一直被这个问题困扰，直到我想到了这样的一个方法。',
  //     '从成熟框架的早期源码开始看起，从作者的第一个commit开始看起，然后逐个的往前翻。这样一开始的代码量不多，多看几遍还是可以理解的。而且在这个过程中，就像电影回放一样，我们可以看到作者先写什么，后写什么，在哪些地方进行了什么样的改良，其中又不小心引入了什么bug，等等。'
  //   ],
  //   tag: [
  //     {
  //       text: 'Vue',
  //       url: 'Technology',
  //     },
	// 	],
	// 	id: 6,
  //   time: 1506355200000,
  //   state: false,
  //   content: article4,
  // },
  {
    title: 'self',
    takeaway: [
      '在HTML5一些新特性出来之前，全局的self就是个没什么实用价值的半吊子。但是，随着HTML5一些新特性的到来，self开始慢慢登上正式的舞台…',
    ],
    tag: [
      {
        text: 'Javascript',
        url: 'Technology',
      },
		],
		id: 7,
    time: 1517673600000,
    date: '2018/2/4',
    state: false,
    content: article7,
  },
  {
    title: 'css 不常用属性',
    takeaway: [
      '主要记录一些CSS中不常用但又偶尔需要使用的属性和使用语法',
    ],
    tag: [
      {
        text: 'CSS',
        url: 'Technology',
      },
		],
		id: 8,
    time: 1516464000000,
    date: '2018/1/21',
    state: false,
    content: article8,
  },
  {
    title: 'css选择器',
    takeaway: [
      'css选择器汇总，总有一款适合你',
    ],
    tag: [
      {
        text: 'CSS',
        url: 'Technology',
      },
		],
		id: 9,
    time: 1515254400000,
    date: '2018/1/7',
    state: false,
    content: article9,
  },
  {
    title: 'css回退机制',
    takeaway: [
      '提供回退机制通常是一种很好的做 法，这样可以确保你的网站不会在低版本浏览器中挂掉，只是看起来没有 那么炫而已。',
    ],
    tag: [
      {
        text: 'CSS',
        url: 'Technology',
      },
		],
		id: 10,
    time: 1512230400000,
    date: '2017/12/3',
    state: false,
    content: article10,
	},
	{
    title: 'Vue基础一：生命周期钩子',
    takeaway: [
      '每个 Vue 实例在被创建时都要经过一系列的初始化过程——例如，需要设置数据监听、编译模板、将实例挂载到 DOM 并在数据变化时更新 DOM 等。同时在这个过程中也会运行一些叫做生命周期钩子的函数，这给了用户在不同阶段添加自己的代码的机会。',
    ],
    tag: [
      {
        text: 'Vue',
        url: 'Technology',
      },
		],
		id: 11,
    time: 1476547200000,
    date: '2016/10/16',
    state: false,
    content: article11,
	},
	{
    title: 'Vue基础二：模板语法',
    takeaway: [
      'Vue.js 使用了基于 HTML 的模板语法，允许开发者声明式地将 DOM 绑定至底层 Vue 实例的数据。所有 Vue.js 的模板都是合法的 HTML ，所以能被遵循规范的浏览器和 HTML 解析器解析。',
    ],
    tag: [
      {
        text: 'Vue',
        url: 'Technology',
      },
		],
		id: 12,
    time: 1476547210000,
    date: '2016/10/16',
    state: false,
    content: article12,
	},
	{
    title: 'Vue基础三：v-for',
    takeaway: [
      'v-for的使用和技巧总结',
    ],
    tag: [
      {
        text: 'Vue',
        url: 'Technology',
      },
		],
		id: 13,
    time: 1476633600000,
    date: '2016/10/17',
    state: false,
    content: article13,
	},
	{
    title: 'Vue基础四：computed or watch',
    takeaway: [
      'computed和watch的使用和技巧总结',
    ],
    tag: [
      {
        text: 'Vue',
        url: 'Technology',
      },
		],
		id: 14,
    time: 1476720000000,
    date: '2016/10/18',
    state: false,
    content: article14,
	},
	{
    title: 'Vue基础五：Class and Style',
    takeaway: [
      '操作元素的 class 列表和内联样式是数据绑定的一个常见需求。因为它们都是属性，所以我们可以用 v-bind 处理它们：只需要通过表达式计算出字符串结果即可。不过，字符串拼接麻烦且易错。因此，在将 v-bind 用于 class 和 style 时，Vue.js 做了专门的增强。表达式结果的类型除了字符串之外，还可以是对象或数组。',
    ],
    tag: [
      {
        text: 'Vue',
        url: 'Technology',
      },
		],
		id: 15,
    time: 1476806400000,
    date: '2016/10/19',
    state: false,
    content: article15,
	},
	{
    title: 'Vue基础六：v-if and v-show',
    takeaway: [
      'v-if和v-show的使用和技巧总结',
    ],
    tag: [
      {
        text: 'Vue',
        url: 'Technology',
      },
		],
		id: 16,
    time: 1476892800000,
    date: '2016/10/20',
    state: false,
    content: article16,
	},
	{
    title: 'Vue基础七：v-on',
    takeaway: [
      'v-on使用技巧',
    ],
    tag: [
      {
        text: 'Vue',
        url: 'Technology',
      },
		],
		id: 17,
    time: 1476979200000,
    date: '2016/10/21',
    state: false,
    content: article17,
	},
	{
    title: 'Vue基础八：v-model',
    takeaway: [
      'v-on使用技巧',
    ],
    tag: [
      {
        text: 'Vue',
        url: 'Technology',
      },
		],
		id: 18,
    time: 1477065600000,
    date: '2016/10/22',
    state: false,
    content: article18,
	},
	{
    title: 'Vue基础九：component',
    takeaway: [
      '组件 (Component) 是 Vue.js 最强大的功能之一。组件可以扩展 HTML 元素，封装可重用的代码。在较高层面上，组件是自定义元素，Vue.js 的编译器为它添加特殊功能。在有些情况下，组件也可以表现为用 is 特性进行了扩展的原生 HTML 元素。',
    ],
    tag: [
      {
        text: 'Vue',
        url: 'Technology',
      },
		],
		id: 19,
    time: 1477152000000,
    date: '2016/10/23',
    state: false,
    content: article19,
	},
	{
    title: '《高三》读书笔记一',
    takeaway: [
      'JavaScript简介、在HTML中使用JavaScript、基本概念”',
    ],
    tag: [
      {
        text: 'Javascript',
        url: 'Technology',
      },
		],
		id: 20,
    time: 1465142400000,
    date: '2016/6/6',
    state: false,
    content: article20,
	},
	{
    title: '《高三》读书笔记二',
    takeaway: [
      '变量、作用域和内存问题、引用类型”',
    ],
    tag: [
      {
        text: 'Javascript',
        url: 'Technology',
      },
		],
		id: 21,
    time: 1465660800000,
    date: '2016/6/12',
    state: false,
    content: article21,
	},
	{
    title: '《高三》读书笔记三',
    takeaway: [
      '面向对象的程序设计”',
    ],
    tag: [
      {
        text: 'Javascript',
        url: 'Technology',
      },
		],
		id: 22,
    time: 1466265600000,
    date: '2016/6/19',
    state: false,
    content: article22,
	},
	{
    title: '《高三》读书笔记四',
    takeaway: [
      '函数表达式',
    ],
    tag: [
      {
        text: 'Javascript',
        url: 'Technology',
      },
		],
		id: 23,
    time: 1467475200000,
    date: '2016/7/3',
    state: false,
    content: article23,
	},
	{
    title: '《高三》读书笔记五',
    takeaway: [
      '事件、Ajax与Comet',
    ],
    tag: [
      {
        text: 'Javascript',
        url: 'Technology',
      },
		],
		id: 24,
    time: 1470153600000,
    date: '2016/8/3',
    state: false,
    content: article24,
	},
	// {
  //   title: 'Vue基础二：模板语法',
  //   takeaway: [
  //     'Vue.js 使用了基于 HTML 的模板语法，允许开发者声明式地将 DOM 绑定至底层 Vue 实例的数据。所有 Vue.js 的模板都是合法的 HTML ，所以能被遵循规范的浏览器和 HTML 解析器解析。',
  //   ],
  //   tag: [
  //     {
  //       text: 'Vue',
  //       url: 'Technology',
  //     },
	// 	],
	// 	id: 25,
  //   time: 1506355200000,
  //   state: false,
  //   content: article12,
	// },
	// {
  //   title: 'Vue基础二：模板语法',
  //   takeaway: [
  //     'Vue.js 使用了基于 HTML 的模板语法，允许开发者声明式地将 DOM 绑定至底层 Vue 实例的数据。所有 Vue.js 的模板都是合法的 HTML ，所以能被遵循规范的浏览器和 HTML 解析器解析。',
  //   ],
  //   tag: [
  //     {
  //       text: 'Vue',
  //       url: 'Technology',
  //     },
	// 	],
	// 	id: 26,
  //   time: 1506355200000,
  //   state: false,
  //   content: article12,
	// },
	// {
  //   title: 'Vue基础二：模板语法',
  //   takeaway: [
  //     'Vue.js 使用了基于 HTML 的模板语法，允许开发者声明式地将 DOM 绑定至底层 Vue 实例的数据。所有 Vue.js 的模板都是合法的 HTML ，所以能被遵循规范的浏览器和 HTML 解析器解析。',
  //   ],
  //   tag: [
  //     {
  //       text: 'Vue',
  //       url: 'Technology',
  //     },
	// 	],
	// 	id: 27,
  //   time: 1506355200000,
  //   state: false,
  //   content: article12,
	// },
	// {
  //   title: 'Vue基础二：模板语法',
  //   takeaway: [
  //     'Vue.js 使用了基于 HTML 的模板语法，允许开发者声明式地将 DOM 绑定至底层 Vue 实例的数据。所有 Vue.js 的模板都是合法的 HTML ，所以能被遵循规范的浏览器和 HTML 解析器解析。',
  //   ],
  //   tag: [
  //     {
  //       text: 'Vue',
  //       url: 'Technology',
  //     },
	// 	],
	// 	id: 28,
  //   time: 1506355200000,
  //   state: false,
  //   content: article12,
	// },
	// {
  //   title: 'Vue基础二：模板语法',
  //   takeaway: [
  //     'Vue.js 使用了基于 HTML 的模板语法，允许开发者声明式地将 DOM 绑定至底层 Vue 实例的数据。所有 Vue.js 的模板都是合法的 HTML ，所以能被遵循规范的浏览器和 HTML 解析器解析。',
  //   ],
  //   tag: [
  //     {
  //       text: 'Vue',
  //       url: 'Technology',
  //     },
	// 	],
	// 	id: 29,
  //   time: 1506355200000,
  //   state: false,
  //   content: article12,
	// },
	// {
  //   title: 'Vue基础二：模板语法',
  //   takeaway: [
  //     'Vue.js 使用了基于 HTML 的模板语法，允许开发者声明式地将 DOM 绑定至底层 Vue 实例的数据。所有 Vue.js 的模板都是合法的 HTML ，所以能被遵循规范的浏览器和 HTML 解析器解析。',
  //   ],
  //   tag: [
  //     {
  //       text: 'Vue',
  //       url: 'Technology',
  //     },
	// 	],
	// 	id: 30,
  //   time: 1506355200000,
  //   state: false,
  //   content: article12,
	// },
]