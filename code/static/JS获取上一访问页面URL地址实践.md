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
```
<a href="javascript:history.go(-1)" class="header-back jsBack">返回</a>
```
在大部分场景下，上面办法可以满足我们的交互需求，但是，在有些时候，上面的代码就有些心有力而气不足，因为当前页面的referrer并不总是存在的。

比方说用户是通过微信分享进来的，直接进入了内页，此时是没有上一页的，返回按钮再怎么点击都没有任何反应，就会让用户很奇怪，十有八九会认为是实现了bug，则会让用户对产品的品质抱有疑虑，那问题可就大了。

怎么办呢！后来我想了一招，那就是如果发现浏览器没有上一页来源信息，我们就把返回按钮的链接改成首页的链接地址，这样无论什么时候，用户点击返回按钮一定是会有反应的，并且返回首页从逻辑上讲也是合情合理的。而这里判断是否有没有来源信息就是使用这里的document.referrer，当浏览器得不到上一页的来源信息的时候，document.referrer的返回值就是空字符串''，于是乎，就有类似下面的代码：

```
if (document.referrer === '') {
  // 没有来源页面信息的时候，改成首页URL地址
  $('.jsBack').attr('href', '/');
}
```
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
```
<meta content="never" name="referrer">
```
兼容性如下图：

![](/static/images/article/2/jianrong.png)

iOS浏览器目前还是使用的老版本的规范值，包括：never, always, origin, default。对于Android浏览器，5.0版本开始支持。基本上，在移动端，使用meta标签来控制referer信息的发送与否已经可以在实际项目中使用了。