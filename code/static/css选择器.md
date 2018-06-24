##### xxx-of-type
```
.a:first-of-type		  //  .a的父元素下的所有元素根据标签类型分成N个数组，所有数组里的第一个元素 && 这个元素的class为.a
p.a:first-of-type 	  //  p的父元素下的所有p里的第一个p && 这个P的class为.a
last-of-type			    //  最后一个元素...
nth-of-child(n)  		  //	第N个元素...
nth-last-of-child(n)	//  倒数第N个元素...
only-of-child			    //  唯一子元素...
```

##### xxx-child
```
.a:first-child 	      //  .a的父元素下第一个子元素 && 这个元素class为.a
last-of-child		      //  最后一个元素...
nth-child(n)  	      //	第N个元素...
nth-last-child(n)	    //  倒数第N个元素...
only-child		        //  唯一子元素...
```

##### [attribute]
```
[target]  		      //  选择带有 target 属性所有元素
[target=_blank]  	  //  选择 target="_blank" 的所有元素
[title~=flower]  	  //  选择 title 属性包含单词 "flower" 的所有元素。
[lang|=en]  		    //  选择 lang 属性值以 "en" 开头的所有元素
a[src^="https"]  	  //  选择其 src 属性值以 "https" 开头的每个 <a> 元素。
a[src$=".pdf"]	    //  选择其 src 属性以 ".pdf" 结尾的所有 <a> 元素。
a[src*="abc"]		    //  选择其 src 属性中包含 "abc" 子串的每个 <a> 元素。
p:lang(it)		      //	选择带有以 "it" 开头的 lang 属性值的每个 p
```

##### element
```
div,p  	//  选择所有 <div> 元素和所有 <p> 元素。
div p		//	选择 <div> 元素内部的所有 <p> 元素。
div>p		// 	选择父元素为 <div> 元素的所有 <p> 元素。
div+p		//	选择紧接在 <div> 元素之后的所有 <p> 元素。
p~ul		//	选择前面有 <p> 元素的每个 <ul> 元素。
```

##### a
```
a:link 		  // 	选择所有未被访问的链接。
a:visited		//  选择所有已被访问的链接。
a:active		//	选择活动链接。
a:hover		  //	选择鼠标指针位于其上的链接。
```

##### p
```
p:first-letter  //  选择每个 <p> 元素的首字母。
p:first-line		//	选择每个 <p> 元素的首行。
```

##### form
```
input:focus		  //	选择获得焦点的 input 元素。
input:enabled		//	选择每个启用的 <input> 元素。
input:disabled  //  选择每个禁用的 <input> 元素
input:checked		//	选择每个被选中的 <input> 元素。
```

##### 伪元素
```
p:before		//  在每个 <p> 元素的内容之前插入内容。
p:after		  //	在每个 <p> 元素的内容之后插入内容。
```

##### 其他
```
:root			      // 	选择文档的根元素。
p:empty		      //  选择没有子元素的每个 <p> 元素（包括文本节点）
#news:target	  //	选择当前活动的 #news 元素
:not(p)		      //	选择非 <p> 元素的每个元素
::selection	    //	选择被用户选取的元素部分
```