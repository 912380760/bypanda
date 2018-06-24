##### 监听事件
可以用 v-on 指令监听 DOM 事件，内联的事件里只能写表达式，不能写判断和控制语句，里面的变量是vue里的data里的变量。

```
<button @click="counter += 1">Add 1</button>
```

##### 接受方法
v-on 还可以接收一个需要调用的方法名称

```
<button @click="greet">Greet</button>
```

访问原始的 DOM 事件。可以用特殊变量 $event 把它传入方法：

```
<button v-on:click="warn($event)">Submit</button>
```

##### 事件修饰符
* .stop            阻止单击事件继续传播
* .prevent      提交事件不再重载页面
* .capture       添加事件监听器时使用事件捕获模式
* .self              只当在 event.target 是当前元素自身时触发处理函数
* .once            事件将只会触发一次，2.1.4 新增
* .passive        滚动事件的默认行为 (即滚动行为) 将会立即触发，2.3.0 新增

> 注意：  
> 使用修饰符时，顺序很重要；相应的代码会以同样的顺序产生。因此，用 @click.prevent.self 会阻止所有的点击，而 @click.self.prevent 只会阻止对元素自身的点击。  
>   
> 不要把 .passive 和 .prevent 一起使用，因为 .prevent 将会被忽略，同时浏览器可能会向你展示一个警告。请记住，.passive 会告诉浏览器你不想阻止事件的默认行为。  

```
<!-- 阻止单击事件继续传播 -->
<a v-on:click.stop="doThis"></a>

<!-- 提交事件不再重载页面 -->
<form v-on:submit.prevent="onSubmit"></form>

<!-- 修饰符可以串联 -->
<a v-on:click.stop.prevent="doThat"></a>

<!-- 只有修饰符 -->
<form v-on:submit.prevent></form>

<!-- 添加事件监听器时使用事件捕获模式 -->
<!-- 即元素自身触发的事件先在此处处理，然后才交由内部元素进行处理 -->
<div v-on:click.capture="doThis">...</div>

<!-- 只当在 event.target 是当前元素自身时触发处理函数 -->
<!-- 即事件不是从内部元素触发的 -->
<div v-on:click.self="doThat">...</div>

<!-- 点击事件将只会触发一次 -->
<a v-on:click.once="doThis"></a>
```

##### 按键修饰符
###### keyCode

```
<!-- 只有在 `keyCode` 是 13 时调用 `vm.submit()` -->
<input v-on:keyup.13="submit">
```

###### 按键别名
* .enter
* .tab
* .delete (捕获“删除”和“退格”键)
* .esc
* .space
* .up
* .down
* .left
* .right

可以通过全局 config.keyCodes 对象自定义按键修饰符别名：

```
// 可以使用 `v-on:keyup.f1`
Vue.config.keyCodes.f1 = 112
```

###### 自动匹配按键修饰符 2.5.0 新增
你也可直接将 [KeyboardEvent.key](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values) 暴露的任意有效按键名来作为修饰符。
在下面的例子中，处理函数仅在 $event.key === 'PageDown' 时被调用。

```
<input @keyup.page-down="onPageDown">
```

###### 系统修饰键 2.1.0 新增
* .ctrl
* .alt
* .shift
* .meta

> 注意：  
> 修饰键与常规按键不同，在和 keyup 事件一起用时，事件触发时修饰键必须处于按下状态。换句话说，只有在按住 ctrl 的情况下释放其它按键，才能触发 keyup.ctrl。而单单释放 ctrl 也不会触发事件。  
>   
> 在 Mac 系统键盘上，meta 对应 command 键 (⌘)。在 Windows 系统键盘 meta 对应 Windows 徽标键 (⊞)。在 Sun 操作系统键盘上，meta 对应实心宝石键 (◆)。在其他特定键盘上，尤其在 MIT 和 Lisp 机器的键盘、以及其后继产品，比如 Knight 键盘、space-cadet 键盘，meta 被标记为“META”。在 Symbolics 键盘上，meta 被标记为“META”或者“Meta”。  

```
<!-- Alt + C -->
<input @keyup.alt.67="clear">

<!-- Ctrl + Click -->
<div @click.ctrl="doSomething">Do something</div>
```

###### .exact 修饰符 2.5.0 新增
修饰符允许你控制由精确的系统修饰符组合触发的事件。

```
<!-- 即使 Alt 或 Shift 被一同按下时也会触发 -->
<button @click.ctrl="onClick">A</button>

<!-- 有且只有 Ctrl 被按下的时候才触发 -->
<button @click.ctrl.exact="onCtrlClick">A</button>

<!-- 没有任何系统修饰符被按下的时候才触发 -->
<button @click.exact="onClick">A</button>
```

###### 鼠标按钮修饰符 2.2.0 新增
* .left
* .right
* .middle   鼠标中间键

##### 为什么在 HTML 中监听事件?
1. 扫一眼 HTML 模板便能轻松定位在 JavaScript 代码里对应的方法。
2. 因为你无须在 JavaScript 里手动绑定事件，你的 ViewModel 代码可以是非常纯粹的逻辑，和 DOM 完全解耦，更易于测试。
3. 当一个 ViewModel 被销毁时，所有的事件处理器都会自动被删除。你无须担心如何自己清理它们。