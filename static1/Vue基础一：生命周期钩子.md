![](/static/images/article/11/vue生命周期钩子中文.jpg)
**beforeCreate**: 在实例初始化之后调用，还不能调用vue里的属性和方法

**created**: 在实例创建完成后被立即调用。可以使用vue里的属性和方法，然而，挂载阶段还没开始，$el 属性目前不可见。这里写DOM操作并不安全。

**beforeMount**: 在挂载开始之前被调用：相关的 render 函数首次被调用。render函数用于渲染DOM

下列钩子在服务器端渲染期间不被调用，渲染完成后才会调用：

**mounted**: DOM渲染挂载完成，注意 mounted 不会承诺所有的子组件也都一起被挂载。如果你希望等到整个视图都渲染完毕，可以用 vm.$nextTick

例子：
```
mounted: function () {
  this.$nextTick(() => {
    
  })
}
```
**beforeUpdate**: 子父组件传递数据更新前或VUEX数据更新前并且页面使用了这数据，才触发钩子

**updated**: 和beforeUpdate类似，视图因为数据重新渲染完成后触发，并且和mounted一样，并不保证所有的子组件也一起渲染完成，可以用 vm.$nextTick

**beforeDestroy**: 实例销毁之前调用。在这一步，实例仍然完全可用。

**destroyed**: Vue 实例销毁后调用。调用后，实例指示的所有东西都会解绑定，所有的事件监听器会被移除，所有的子实例也会被销毁。