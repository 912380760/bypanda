webpackJsonp([8],{DbXC:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=i("A5qe"),s=i.n(n),a=i("NYxO"),o={computed:Object(a.a)({}),data:function(){return{num:-1,textList:["2018.1.22. 看你照片的第一眼，我对我朋友说，她的微信我要定了，于是在这一天我们成为了微信好友","刚认识你时，这期间《前任3：再见前任》在热映以及《旅行青蛙》火爆朋友圈，你说你要开始佛系~",'1月份的尾巴，2月份的前奏，我开始每天"骚扰"你，只想早点了解你',"在微信聊天中，不知道我的微信防撤回有没有吓到你，不小心防下来的锅我就甩给脚本了，毕竟技术无罪~ 哈哈哈","2018.2.14,你在东北过了情人节，讲真，我那时好想说我们一起过吧！不过显然不可能，就算你不在东北，第二天也是除夕","春节假期，应该是咱们聊天时长最多的期间，我记得我妈对我说：晚上的时候挺早睡的，怎么还起得那么晚？","我很想对我妈说：因为每天都跟你未来的儿媳妇聊天聊到快天亮~","2018.3.3 我们见面了，第1次见面，我带了台switch，有次跟同事说我第一次去见妹纸带了台switch跟她玩了一下午，然后就被同事笑了一下午","我说我室友用春节期间订婚了，对方只用半个月就了解了对方，我对你说半年我可以了解你么，你说半年可能还不够。","2018.3.17 我们第2次见面了，那天咱们逛了下壹方城，最后也没能把你拐来南山，还让我舍友鄙视我太早回来了","之后，我提完辞职开始找工作，我菲律宾的朋友问我要不要去他那里，工资比深圳高了很多，我犹豫了。","我跟你说了菲律宾的工作，得到你全力支持，我知道了咱们之间除了好朋友之外好像少了点基础感情","4月份，我问你：能不能接受异地恋么？你问我：是不是想放弃？哈哈哈，那时真没放弃的想法 ","2018.4.7，我们第3次见面，那天天气太糟糕，唯一不糟糕的是和你留下合照，那时心里美滋滋~","4.9我出国了，到现在一个多月的时间，可能异国以及频繁的聊天让我们少了话题，开始渐渐的显示出了我直男的本性","这几天~ 我开始想放弃了，然后我就在这周六也就是昨天，放在钱包的上个月工资就被偷了，或许这就是报应~","如果。。。  算了不说如果，说了也没用了，两三年时间确实太长，祝你早日找到你的那个他啦！"]}},methods:{click:function(){var t=this;if(this.num++,this.num>=19)return this.$router.push({name:"xinrui1"});this.num<24&&(this.text=this.textList[this.num],setTimeout(function(){s()({targets:".text-box .text"+t.num,translateY:350,opacity:1})},50))}},mounted:function(){this.$nextTick(function(){var t,e,i=document.getElementById("c"),n=i.getContext("2d"),a="#FF6138",o=[],c=function(){var t=["#FF6138","#FFBE53","#2980B9","#282741"],e=0;return{next:function(){return e=e++<t.length-1?e:0,t[e]},current:function(){return t[e]}}}();function r(t){var e=o.indexOf(t);e>-1&&o.splice(e,1)}function u(i){i.touches&&(i.preventDefault(),i=i.touches[0]);for(var n,u,x,d,l=c.current(),_=c.next(),m=(n=i.pageX,u=i.pageY,x=Math.max(n-0,e-n),d=Math.max(u-0,t-u),Math.sqrt(Math.pow(x,2)+Math.pow(d,2))),h=Math.min(200,.4*e),f=new v({x:i.pageX,y:i.pageY,r:0,fill:_}),p=s()({targets:f,r:m,duration:Math.max(m/2,750),easing:"easeOutQuart",complete:function(){a=f.fill,r(p)}}),y=new v({x:i.pageX,y:i.pageY,r:0,fill:l,stroke:{width:3,color:l},opacity:1}),k=s()({targets:y,r:h,opacity:0,easing:"easeOutExpo",duration:900,complete:r}),w=[],g=0;g<32;g++){var C=new v({x:i.pageX,y:i.pageY,fill:l,r:s.a.random(24,48)});w.push(C)}var E=s()({targets:w,x:function(t){return t.x+s.a.random(h,-h)},y:function(t){return t.y+s.a.random(1.15*h,1.15*-h)},r:0,easing:"easeOutExpo",duration:s.a.random(1e3,1300),complete:r});o.push(p,k,E)}var v=function(t){!function(t,e){for(var i in e)e.hasOwnProperty(i)&&(t[i]=e[i])}(this,t)};v.prototype.draw=function(){n.globalAlpha=this.opacity||1,n.beginPath(),n.arc(this.x,this.y,this.r,0,2*Math.PI,!1),this.stroke&&(n.strokeStyle=this.stroke.color,n.lineWidth=this.stroke.width,n.stroke()),this.fill&&(n.fillStyle=this.fill,n.fill()),n.closePath(),n.globalAlpha=1};s()({duration:1/0,update:function(){n.fillStyle=a,n.fillRect(0,0,e,t),o.forEach(function(t){t.animatables.forEach(function(t){t.target.draw()})})}});var x=function(){e=window.innerWidth,t=window.innerHeight,i.width=e*devicePixelRatio,i.height=t*devicePixelRatio,n.scale(devicePixelRatio,devicePixelRatio)};function d(t,e){var i=new Event("mousedown");i.pageX=t,i.pageY=e,document.dispatchEvent(i)}x(),window.CP&&(window.CP.PenTimer.MAX_TIME_IN_LOOP_WO_EXIT=6e3),window.addEventListener("resize",x),document.addEventListener("touchstart",u),document.addEventListener("mousedown",u),window.location.pathname.match(/fullcpgrid/)&&function i(){setTimeout(function(){d(s.a.random(.2*e,.8*e),s.a.random(.2*t,.8*t)),i()},s.a.random(200,900))}(),function(){var i=setTimeout(function(){d(e/2,t/2)},1e3);function n(){clearTimeout(i),document.removeEventListener("mousedown",n),document.removeEventListener("touchstart",n)}document.addEventListener("mousedown",n),document.addEventListener("touchstart",n)}()})}},c={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"test"},[i("canvas",{attrs:{id:"c"},on:{click:t.click,touchstart:t.click}}),t._v(" "),i("div",{staticClass:"text-box",on:{click:t.click,touchstart:t.click}},[-1===t.num?i("div",{key:-1,staticClass:"texts"},[t._v("前点击屏幕！")]):t._e(),t._v(" "),0===t.num?i("div",{key:0,staticClass:"text0 text"},[t._v(t._s(t.text))]):t._e(),t._v(" "),1===t.num?i("div",{key:1,staticClass:"text1 text"},[t._v(t._s(t.text))]):t._e(),t._v(" "),2===t.num?i("div",{key:2,staticClass:"text2 text"},[t._v(t._s(t.text))]):t._e(),t._v(" "),3===t.num?i("div",{key:3,staticClass:"text3 text"},[t._v(t._s(t.text))]):t._e(),t._v(" "),4===t.num?i("div",{key:4,staticClass:"text4 text"},[t._v(t._s(t.text))]):t._e(),t._v(" "),5===t.num?i("div",{key:5,staticClass:"text5 text"},[t._v(t._s(t.text))]):t._e(),t._v(" "),6===t.num?i("div",{key:6,staticClass:"text6 text"},[t._v(t._s(t.text))]):t._e(),t._v(" "),7===t.num?i("div",{key:7,staticClass:"text7 text"},[t._v(t._s(t.text))]):t._e(),t._v(" "),8===t.num?i("div",{key:8,staticClass:"text8 text"},[t._v(t._s(t.text))]):t._e(),t._v(" "),9===t.num?i("div",{key:9,staticClass:"text9 text"},[t._v(t._s(t.text))]):t._e(),t._v(" "),10===t.num?i("div",{key:10,staticClass:"text10 text"},[t._v(t._s(t.text))]):t._e(),t._v(" "),11===t.num?i("div",{key:11,staticClass:"text11 text"},[t._v(t._s(t.text))]):t._e(),t._v(" "),12===t.num?i("div",{key:12,staticClass:"text12 text"},[t._v(t._s(t.text))]):t._e(),t._v(" "),13===t.num?i("div",{key:13,staticClass:"text13 text"},[t._v(t._s(t.text))]):t._e(),t._v(" "),14===t.num?i("div",{key:14,staticClass:"text14 text"},[t._v(t._s(t.text))]):t._e(),t._v(" "),15===t.num?i("div",{key:15,staticClass:"text15 text"},[t._v(t._s(t.text))]):t._e(),t._v(" "),16===t.num?i("div",{key:16,staticClass:"text16 text"},[t._v(t._s(t.text))]):t._e(),t._v(" "),17===t.num?i("div",{key:17,staticClass:"text17 text"},[t._v(t._s(t.text))]):t._e(),t._v(" "),t.num>17?i("div",{key:18,staticClass:"text18 text",attrs:{id:"text"}},[t._v("前继续点击！")]):t._e()])])},staticRenderFns:[]};var r=i("VU/8")(o,c,!1,function(t){i("DwPx")},"data-v-305f8ab8",null);e.default=r.exports},DwPx:function(t,e){}});
//# sourceMappingURL=8.53febd974dea7f22e2fd.js.map