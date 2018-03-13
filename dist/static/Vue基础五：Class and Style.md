##### Class
新增的class并不会影响节点本身的其他class值
###### 对象语法
```
active 这个 class 存在与否将取决于数据属性 isActive 的 布尔值
<div :class="{ active: isActive }"></div>
```

###### 数组语法
```
<div :class="[activeClass, errorClass]"></div>

data: {
  activeClass: 'active',
  errorClass: 'text-danger'
}

渲染为：
<div class="active text-danger"></div>
```

##### Style
对象语法和数组语法与class一样，所有通过vue添加的样式会自动添加兼容前缀。
###### 多重值 VUE 2.3.0+ 
可以为 style 绑定中的属性提供一个包含多个值的数组，常用于提供多个带前缀的值，例如：
```
这样写只会渲染数组中最后一个被浏览器支持的值。在本例中，如果浏览器支持不带浏览器前缀的 flexbox，那么就只会渲染 display: flex。
<div :style="{ display: ['-webkit-box', '-ms-flexbox', 'flex'] }"></div>
```

