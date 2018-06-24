<template>
	<div class="yangxiuting">
		<div class="anim">
  		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 900">
				<g fill="none" fill-rule="evenodd">
					<!-- 木 -->
					<path stroke="#faf51f" d="M 7 133 h 46 v -58 h 21 v 58 h 42 v 21 h -42 v 50 L 86 193 L 122 233 L 107 246 L 74 209 v 150 h -21 v -158 L 14 281 L 5 256 L 48 153 h -41 Z"/>

					<!-- 杨的右边 -->
					<path stroke="#faf51f" d="M 119 90 h 153 v 21 L 151 185 h 133 v 169 h -94 v -21 h 72 v -125 h -34 L 136 358 L 122 339 L 206 205 h -33 L 96 318 L 82 301 L 151 205 h -40 v -21 L 229 111 h -111 Z"/>

					<!-- 禾 -->
					<path stroke="#faf51f" d="M 569 87 h -243 v 21 h 114 v 32 h -125 v 21 h 103 L 306 215 L 319 234 L 440 162 v 50 h 21 v -50 L 583 230 L 595 209 L 480 159 h 108 v -21 h -127 v -32 h 108 Z" />

					<!-- 乃 -->
					<path stroke="#faf51f" d="M 353 221 h 167 v 21 L 504 266 h 60 v 85 h -96 v -21 h 71 v -44 h -62 v -21 L 494 241 h -75 L 328 360 L 315 340 L 397 241 h -44 Z"/>

					<!-- 女 -->
					<path stroke="#faf51f" d="M 607 133 h 28 L 642 72 L 661 76 L 655 133 h 45 v 21 L 675 275 L 709 308 L 694 324 L 666 295 L 615 353 L 605 337 L 649 280 L 615 244 L 631 153 h -26 Z "/>
					<path stroke="#faf51f" d="M 650 153 h 29 L 654 258 L 634 237 Z"/>

					<!-- 亭 -->
					<path stroke="#faf51f" d="M 784 102 L 772 78 L 792 71 L 809 102 h 85 v 21 h -193 v -21 Z" />
					<path stroke="#faf51f" d="M 729 139 h 137 v 65 h -21 v -11 h -95 v 11 h -21 Z" />
					<path stroke="#faf51f" d="M 749 156 h 98 v 21 h -98 Z" />
					<path stroke="#faf51f" d="M 702 260 v -46 h 196 v 46 h -21 v -28 h -158 v 28 Z" />
					<path stroke="#faf51f" d="M 731 260 h 136 v 21 h -56 v 80 h -73 v -21 h 52 v -59 h -62 Z" />

					<!-- 5 -->
					<path stroke="#faf51f" d="M 270 400 h -260 v 135 h 230 v 95 h -230 v 30 h 260 v -160 h -230 v -70 h 230 Z"  />

					<!-- 2 -->
					<path stroke="#faf51f" d="M 310 400 h 260 v 135 h -230 v 95 h 230 v 30 h -260 v -160 h 230 v -70 h -230 Z"  />

					<!-- 0 -->
					<path stroke="#faf51f" d="M 610 400 h 260 v 260 h -260 Z M 640 430 h 200 v 200 h -200 Z"  />
				</g>
			</svg>
		</div>
	</div>
</template>

<script>
import anime from 'animejs'
export default {
	data() {
		return {

		}
	},
	mounted() {
		var pathEls = document.querySelectorAll('path');
		for (var i = 0; i < pathEls.length; i++) {
			var pathEl = pathEls[i];
			var offset = anime.setDashoffset(pathEl);
			pathEl.setAttribute('stroke-dashoffset', offset);
			anime({
				targets: pathEl,
				strokeDashoffset: [offset, 0],
				duration: 2000,
				delay: 500,
				loop: true,
				direction: 'alternate',
				easing: 'easeInOutSine',
				autoplay: true,
			});
		}
	},
}
</script>

<style lang="less" scoped>
.yangxiuting {
	background: #000;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  overflow: hidden;
  width: 100vw;
  height: 100vh;
}
.anim, .anim svg {
  position: relative;
  width: 50vw;
  height: 50vh;
}
@media (max-width: 800px) {
  .anim, .anim svg {
		position: relative;
		// left: 20px;
		// top: 20px;
		width: 80vw;
		height: 80vh;
	}
}
.anim path {
  stroke-width: 2;
}
</style>
