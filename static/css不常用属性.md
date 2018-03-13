```
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
```

object-fit:

![](/static/images/article/8/objectfit.png)