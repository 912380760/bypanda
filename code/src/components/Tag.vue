<template>
  <div id="tag"></div>
</template>

<script>
import SVG3DTagCloud from '../assets/SVG3DTagCloud.js'
var entries = [ 
  { label: 'Javascript', url: '/Technology?key=Javascript', target: '_self' },
  { label: 'JQuery', url: '/Technology?key=JQuery', target: '_self' },
  { label: 'ES6', url: '/Technology?key=ES6', target: '_self' },
  { label: 'Regexp', url: '/Technology?key=Regexp', target: '_self' },
  { label: 'Vue', url: '/Technology?key=Vue', target: '_self' },
  { label: 'Angular', url: '/Technology?key=Angular', target: '_self' },
  { label: 'Webpack', url: '/Technology?key=Webpack', target: '_self' },
  { label: 'CSS', url: '/Technology?key=CSS', target: '_self' },
  { label: 'Chrome DevTools', url: '/Other?key=Chrome DevTools', target: '_self' },
  { label: 'Git', url: '/Other?key=Git', target: '_self' },
  { label: 'WAP', url: '/Other?key=WAP', target: '_self' },
];
    
var settings = {
    entries: entries,
    width: '100%',
    height: '100%',
    radius: '65%',
    radiusMin: 75,
    bgDraw: true,
    bgColor: '#111',
    opacityOver: 1.00,
    opacityOut: 0.05,
    opacitySpeed: 6,
    fov: 800,
    speed: .26,
    fontFamily: 'Oswald, Arial, sans-serif',
    fontSize: '18',
    fontColor: '#fff',
    fontWeight: 'bold',//bold
    fontStyle: 'normal',//italic 
    fontStretch: 'normal',//wider, narrower, ultra-condensed, extra-condensed, condensed, semi-condensed, semi-expanded, expanded, extra-expanded, ultra-expanded
    fontToUpperCase: true
};

export default {
  mounted () {
    SVG3DTagCloud(document.getElementById("tag"), settings);
  }
}
</script>

