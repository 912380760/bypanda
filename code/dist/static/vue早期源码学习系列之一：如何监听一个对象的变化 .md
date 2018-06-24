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
```
let data = {
  user: {
    name: "liangshaofeng",
    age: "24"
  },
  address: {
    city: "beijing"
  }
};
```
答案：递归算法，也就是下面代码中的walk函数。如果对象的属性仍然是一个对象的话，那么继续new一个Observer，直到到达最底层的属性位置。

下面是实现的具体代码。

##### 代码
```
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
```
##### 遗留问题
上面实现的代码还有很多问题。

比如：

- 只监听的对象的变化，没有处理数组的变化。
- 当你重新set的属性是对象的话，那么新set的对象里面的属性不能调用getter和setter。比如像下图所示，重新设置的job属性就不在带有自定义的getter和setter了，不再提示“你访问了job"这些字样。

![](/static/images/article/4/bug1.gif)

参考资料：
- [https://segmentfault.com/a/1190000004384515](https://segmentfault.com/a/1190000004384515)
- [http://jiongks.name/blog/vue-code-review/](http://jiongks.name/blog/vue-code-review/)
