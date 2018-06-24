##### 问题具象
我们可以把问题具象化为下面的例子

```
// html
<div id="app">
  <p>姓名:{{user.name}}</p>
  <p>年龄:{{user.age}}</p>
</div>
```
```
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
```
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
```
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
  console.log(`更新了DOM-${this.expression}`);
};
```
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

