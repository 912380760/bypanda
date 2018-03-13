##### 插值
###### 文本插值：v-text  {{}}
如果值是null、undefined、false、true都会转成字符串插值进去，v-text会覆盖节点的文本节点和子节点

###### HTML插值：v-html
和v-text一样会覆盖节点里的内容，参数必须符合[[标签规范]]。

###### 属性：v-bind
如果值为null、undefined、false则属性值不会被渲染
缩写：
```
<!-- 完整语法 -->
<a v-bind:href="url">...</a>

<!-- 缩写 -->
<a :href="url">...</a>
```

###### 事件：v-on
获取原生事件对象，可以通过给事件添加参数$event，参数位置随意
缩写：
```
<!-- 完整语法 -->
<a v-on:click="doSomething">...</a>

<!-- 缩写 -->
<a @click="doSomething">...</a>
```

###### 使用JavaScript 表达式
以上指令都可以使用javascript表达式，但不能执行语句和流程控制，可以使用三元表达式。模板表达式只能访问全局变量的一个白名单，如 Math 和 Date ，不能访问自定义的全局变量。

正确实例：
```
{{ number + 1 }}

{{ ok ? 'YES' : 'NO' }}

{{ message.split('').reverse().join('') }}

<div v-bind:id="'list-' + id"></div>
```
错误实例：
```
<!-- 这是语句，不是表达式 -->
{{ var a = 1 }}

<!-- 流控制也不会生效，请使用三元表达式 -->
{{ if (ok) { return message } }}
```

##### 指令
指令的职责是，当表达式的值改变时，将其产生的连带影响，响应式地作用于 DOM。
###### 参数
一些指令能够接收一个“参数”，在指令名称之后以冒号表示。

###### 修饰符
以半角句号 . 指明的特殊后缀，用于指出一个指令应该以特殊方式绑定。

高级扩展：[render渲染函数](https://cn.vuejs.org/v2/guide/render-function.html)