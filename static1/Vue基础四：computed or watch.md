##### 使用方法：
```
computed: {
  message() {
    return xxxx
  }
},
```

##### 计算属性缓存
计算属性是基于它们的依赖进行缓存的，计算属性里所有关联this的值都会成为依赖，计算属性只有在它的相关依赖发生改变时才会重新求值。

例如：
```
这个例子里：a发生改变并不会重新计算，只有this.b发生改变才会重新计算
let a = 1;
computed: {
  message() {
    this.b;
    return a;
  }
}
```

##### 计算属性的 setter
set里面不能设置计算属性本身，这样会出现死循环，因为set会触发get，get又会触发set。计算属性值必须在页面中使用才会触发，不适用不会触发。

例如：
```
computed: {
  fullName: {
    // getter
    get: function () {
      return this.firstName + ' ' + this.lastName
    },
    // setter
    set: function (newValue) {
      var names = newValue.split(' ')
      this.firstName = names[0]
      this.lastName = names[names.length - 1]
    }
  }
}
```

##### watch
使用方法：
```
watch: {
  // 如果 `question` 发生改变，这个函数就会运行
  question: function (newQuestion, oldQuestion) {
      
  }
},
```