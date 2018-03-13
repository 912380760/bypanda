提供回退机制通常是一种很好的做 法，这样可以确保你的网站不会在低版本浏览器中挂掉，只是看起来没有 那么炫而已。

使用样式声明的层叠机制：
例子：一个渐变色作为背景
```
background: rgb(255, 128, 0);
background: -moz-linear-gradient(0deg, yellow, red); background: -o-linear-gradient(0deg, yellow, red); background: -webkit-linear-gradient(0deg, yellow, red); background: linear-gradient(90deg, yellow, red);
```

使用Modernizr(http://modernizr.com/)检测工具，这些工具会给<html>添加辅助类：
列子：给h1添加文字阴影
```
h1 { color: gray; }
.textshadow h1 {
	color: transparent; 
	text-shadow: 0 0 .3em gray;
}
```

使用@supports，可以视为原生的Modernizr，：
列子：
```
h1 { color: gray; }
@supports (text-shadow: 0 0 .3em gray) { 
  	h1 {
	  color: transparent;
	  text-shadow: 0 0 .3em gray; 
	}
}
// 但在眼下，还必须慎用 @supports。在上面的例子中，我们想要的文本 投影效果只会在那些支持 text-shadow 且同时支持 @supports 规则的浏览 器中生效。这个范围明显比我们所期望的要窄。IE不支持这个属性。
```

自己写js来实现特性检测然后给根元素添加辅助类，核心思路就是在任一元素的 element.style 对象上检查该属性是否存在，如果我们想要检测某个具体的属性值是否支持，那就需要把它赋给对应 的属性，然后再检查浏览器是不是还保存着这个值。
例子：
```
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
```
浏览器兼容性查询

[https://caniuse.com](https://caniuse.com)