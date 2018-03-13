##### 数组的v-for
我们用 v-for 指令根据一组数组的选项列表进行渲染。v-for 指令需要使用 item in items 形式的特殊语法，items 是源数据数组并且 item 是数组元素迭代的别名。

```
<ul id="example-1">
  <li v-for="item in items"></li>
</ul>
```

###### of  and in
你也可以用 of 替代 in 作为分隔符，因为它是最接近 JavaScript 迭代器的语法。下面两个是等价的

```
<div v-for="item of items"></div>
<div v-for="item in items"></div>
```

###### index
在 v-for 块中，我们拥有对父作用域属性的完全访问权限，参数只能在v-for中使用。v-for 还支持一个可选的第二个参数为当前项的索引。

```
<ul id="example-2">
  <li v-for="(item, index) in items"></li>
</ul>
```

##### 对象的v-for
你也可以用 v-for 通过一个对象的属性来迭代。在遍历对象时，是按 Object.keys() 的结果遍历。

```
<ul id="v-for-object" class="demo">
  <li v-for="value in object">
    {{ value }}
  </li>
</ul>

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

结果：
John
Doe
30
```

###### 第二个的参数为键名

```
<div v-for="(value, key) in object">
  {{ key }}: {{ value }}
</div>

结果：
firstName: John
lastName: Doe
age: 30
```

###### 第三个参数为索引

```
<div v-for="(value, key, index) in object">
  {{ index }}. {{ key }}: {{ value }}
</div>

结果：
0. firstName: John
1. lastName: Doe
2. age: 30
```

##### Key
为了给 Vue 一个提示，以便它能跟踪每个节点的身份，从而重用和重新排序现有元素，你需要为每项提供一个唯一 key 属性。理想的 key 值是每项都有的且唯一的 id。一般使用index作为key值。

##### 数组更新检测
Vue 包含一组观察数组的变异方法，这些方法如下：
```
push()
pop()
shift()
unshift()
splice()
sort()
reverse()
```

非变异 (non-mutating method) 方法，例如：filter(), concat() 和 slice() 。这些不会改变原始数组，但总是返回一个新数组。当使用非变异方法时，可以用新数组替换旧数组

###### 注意事项
由于 JavaScript 的限制，Vue 不能检测以下变动的数组：
1. 当你利用索引直接设置一个项时，例如：vm.items[indexOfItem] = newValue，vm.items[0] ++;
2. 当你修改数组的长度时，例如：vm.items.length = newLength

为了解决第一类问题，以下两种方式：

```
// Vue.set
Vue.set(example1.items, indexOfItem, newValue)
Vue.set(example1.items, 0, ++vm.items[0])
// 在组件内使用：
this.$set(this.items, indexOfItem, newValue)
this.$set(this.items, 0, ++this.items[0])

// Array.prototype.splice
example1.items.splice(indexOfItem, 1, newValue)
```

为了解决第二类问题，你可以使用 splice：

```
example1.items.splice(newLength)
```

###### 对象更改检测注意事项
是由于 JavaScript 的限制，Vue 不能检测对象属性的添加或删除，但是，可以使用 Vue.set(object, key, value) 方法向嵌套对象添加一个响应式属性。

```
Vue.set(vm.userProfile, 'age', 27)

组件内使用：
Vue.$set(this.userProfile, 'age', 27)
```

有时你可能需要为已有对象赋予多个新属性，比如使用 Object.assign() 或 _.extend()。

```
vm.userProfile = Object.assign({}, vm.userProfile, {
  age: 27,
  favoriteColor: 'Vue Green'
})

// 在组件内使用：
this.items = Object.assign({}, this.items, {
  age: 27,
  favoriteColor: 'Vue Green'
})
```

###### 显示过滤/排序结果
有时，我们想要显示一个数组的过滤或排序副本，而不实际改变或重置原始数据。在这种情况下，可以创建返回过滤或排序数组的计算属性。

在计算属性不适用的情况下 (例如，在嵌套 v-for 循环中) 你可以使用一个 method 方法：

```
<li v-for="n in even(numbers)">{{ n }}</li>
```

###### 整数
v-for 也可以取整数。在这种情况下，它将重复多次模板。

```
<div>
  <span v-for="n in 10">{{ n }} </span>
</div>
```