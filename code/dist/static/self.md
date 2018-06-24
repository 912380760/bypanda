##### 一、现代web之前的window.self和self
对于web页面，在默认状况下，下面4个写法都是等同的：
```
window === self                  // true
window.window === window.self    // true
window.self === self             // true
window.window === self           // true
```
这种有意思的现象就不禁会让人疑惑了，既然都是相等的，那window.self和self还有什么出现的意义呢？直接全部使用window不就好了？

其实真实情况还就是这样，并没有需要self出场的理由，唯一可能有作用的就是更语义地判断当前页面是否作为iframe嵌入了，直接：
```
parent === self   // true表示作为iframe嵌入，false则表示被iframe嵌入了
```
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
```
navigator.serviceWorker.register('/sw-test.js');
```
则我们希望Service Workers注册完毕干点什么事情，就可以在sw-test.js中这么写：
```
self.addEventListener('install', function(event) {
  // ...
});
```