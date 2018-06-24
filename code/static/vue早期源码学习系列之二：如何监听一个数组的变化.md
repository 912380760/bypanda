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
```
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
```
PS：如果不能理解这里的proto，请翻看《Javascript的高级程序设计》第148页，以及参看[这个答案](https://stackoverflow.com/questions/9959727/proto-vs-prototype-in-javascript/9959753#9959753)，多看几遍你就懂了。（吐槽：每次碰到js原型都不好描述.....）

##### 有问题？
ok，目前为止我们已经实现了如何监听数组的变化了。

但是，我们仔细回想一下，难道只能通过作者那样的方法来实现吗？不觉得直接重新定义proto指针有点奇怪吗？有其他实现的方法吗？

我们回到最开始的目标：

**对于某些特定的数组（数据数组），他们的push等方法与原生Array的push方法不一样，但是其他的又都一样。**

这不就是经典的继承问题吗？ 子类和父类很像，但是呢，子类有点地方又跟父类不同

我们只需要继承父类，然后重写子类的prototype中的push方法不就可以了吗？红宝书告诉我们组合继承才是最常用的继承方法啊！（请参考红宝书第168页）难道是作者糊涂了？（想到这儿，我心里一阵窃喜，拜读了作者的代码这么久，终于让我发现一个bug了，不过好像也算不上是bug）

废话不多说，我赶紧自己用组合继承实现了一下。
```
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
```
结果如下图所示

![](/static/images/article/5/demo1.png)

虽然我成功地重新定义push方法，但是为什么fakeList是一个空对象呢？

原因是：构造函数默认返回的本来就是this对象，这是一个对象，而非数组。Array.call(this,arguments);这个语句返回的才是数组。

那么我们能不能将Array.call(this,arguments);直接return出来呢？

不能。原因有两个：

- 如果我们return这个返回的数组，这个数组是由原生的Array构造出来的，所以它的push等方法依然是原生数组的方法，无法到达重写的目的。
- 如果我们return这个返回的数组，其实最后fakeList === [[['a','b','c']]]，它变成了一个数组的数组的数组，因为list本身是一个数组，arguments用封装了一层数组，new Array本身接收数组作为参数的时候本来就会返回包裹这个数组的数组，new Array(['a', 'b']) === [['a', 'b']]，所以就变成三层数组了。

shit.....太麻烦了！看来还是没有办法通过组合继承的模式来实现一开始的目标。