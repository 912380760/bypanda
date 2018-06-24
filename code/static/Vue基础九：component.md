##### 使用组件
###### 全局注册 
::Vue.component(tagName, options)::

```
Vue.component('my-component', {
  // 选项
})

<my-component></my-component>
```

###### 局部注册

```
var Child = {
  template: '<div>A custom component!</div>'
}

new Vue({
  // ...
  components: {
    // <my-component> 将只在父组件模板中可用
    'my-component': Child
  }
})
```

###### DOM 模板解析注意事项
当使用 DOM 作为模板时 (例如，使用 **el** 选项来把 Vue 实例挂载到一个已有内容的元素上)，你会受到 HTML 本身的一些限制，因为 Vue 只有在浏览器解析、规范化模板之后才能获取其内容。尤其要注意，像 **ul**、**ol**、**table**、**select** 这样的元素里允许包含的元素有限制，而另一些像 **option** 这样的元素只能出现在某些特定元素的内部。

```
// 在自定义组件中使用这些受限制的元素时会导致一些问题，例如：
<table>
  <my-row>...</my-row>
</table>

// 自定义组件 <my-row> 会被当作无效的内容，因此会导致错误的渲染结果。变通的方案是使用特殊的 is 特性：
<table>
  <tr is="my-row"></tr>
</table>
```

> 应当注意，如果使用来自以下来源之一的字符串模板，则没有这些限制：  
> <script type="text/x-template">  
> JavaScript 内联模板字符串  
> .vue 组件  

###### data 必须是函数

###### 组件组合
在 Vue 中，父组件通过 **prop** 给子组件下发数据，子组件通过事件给父组件发送消息。

##### Prop
###### 使用 Prop 传递数据
子组件要显式地用 ::props:: 选项声明它预期的数据：

```
Vue.component('child', {
  // 声明 props
  props: ['message'],
  // 就像 data 一样，prop 也可以在模板中使用
  // 同样也可以在 vm 实例中通过 this.message 来使用
  template: '<span>{{ message }}</span>'
})
```

###### camelCase vs. kebab-case
HTML 特性是不区分大小写的。所以，当使用的不是字符串模板时，camelCase (驼峰式命名) 的 prop 需要转换为相对应的 kebab-case (短横线分隔式命名)：

```
Vue.component('child', {
  // 在 JavaScript 中使用 camelCase
  props: ['myMessage'],
  template: '<span>{{ myMessage }}</span>'
})

<!-- 在 HTML 中使用 kebab-case -->
<child my-message="hello!"></child>
```

###### 动态 Prop
用 ::v-bind:: 来动态地将 prop 绑定到父组件的数据。每当父组件的数据变化时，该变化也会传导给子组件。
如果你想把一个对象的所有属性作为 prop 进行传递，可以使用不带任何参数的 v-bind (即用 v-bind 而不是 v-bind:prop-name)。例如，已知一个 todo 对象

```
todo: {
  text: 'Learn Vue',
  isComplete: false
}
<todo-item v-bind="todo"></todo-item>

将等价于：
<todo-item
  v-bind:text="todo.text"
  v-bind:is-complete="todo.isComplete"
></todo-item>
```

###### 字面量语法 vs 动态语法
初学者常犯的一个错误是使用字面量语法传递数值：

```
<!-- 传递了一个字符串 "1" -->
<comp some-prop="1"></comp>

<!-- 传递真正的数值 -->
<comp v-bind:some-prop="1"></comp>
```

###### 单向数据流
Prop 是单向绑定的：当父组件的属性变化时，将传导给子组件，但是反过来不会。这是为了防止子组件无意间修改了父组件的状态，来避免应用的数据流变得难以理解。

> 注意在 JavaScript 中对象和数组是引用类型，指向同一个内存空间，如果 prop 是一个对象或数组，在子组件内部改变它会影响父组件的状态。  

###### Prop 验证
可以为组件的 prop 指定验证规则。如果传入的数据不符合要求，Vue 会发出警告。

```
Vue.component('example', {
  props: {
    // 基础类型检测 (`null` 指允许任何类型)
    propA: Number,
    // 可能是多种类型
    propB: [String, Number],
    // 必传且是字符串
    propC: {
      type: String,
      required: true
    },
    // 数值且有默认值
    propD: {
      type: Number,
      default: 100
    },
    // 数组/对象的默认值应当由一个工厂函数返回
    propE: {
      type: Object,
      default: function () {
        return { message: 'hello' }
      }
    },
    // 自定义验证函数
    propF: {
      validator: function (value) {
        return value > 10
      }
    }
  }
})
```

type 可以是下面原生构造器：
* String
* Number
* Boolean
* Function
* Object
* Array
* Symbol
> 当 prop 验证失败，Vue 会抛出警告 (如果使用的是开发版本)。注意 prop 会在组件实例创建之前进行校验，所以在 default 或 validator 函数里，诸如 data、computed 或 methods 等实例属性还无法使用。  

##### 非 Prop 特性
可以把特性直接添加到组件上 (不需要事先定义 prop)，除了 class 和 style 特性，这两个特性的值都会做合并 (merge) 操作，其他特性都会覆盖原有值。

```
bs-date-input data-3d-date-picker="true"></bs-date-input>
```

##### 自定义事件