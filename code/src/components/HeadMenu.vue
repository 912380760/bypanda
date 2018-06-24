<template>
  <div>
    <el-menu
      :default-active="activeIndex2"
      class="el-menu-demo menu"
      mode="horizontal"
      @select="handleSelect"
      background-color="#101010"
      text-color="#9d9d9d"
      style="font-weight: bold;"
      active-text-color="#fff">
      <el-menu-item class="w130" @click="goRoute('/')" index="1">Home</el-menu-item>
      <!-- <el-submenu class="w130" index="2">
        <template slot="title">{{Technology}}</template>
        <el-menu-item @click="goRoute('/Technology', item.text)" :index="item.index" v-for="(item, index) in TechnologyArr" :key="index" >{{item.text}}</el-menu-item>
      </el-submenu>
      <el-submenu class="w130" index="3">
        <template slot="title">{{Other}}</template>
        <el-menu-item @click="goRoute('/Other', item.text)" :index="item.index" v-for="(item, index) in OtherArr" :key="index" >{{item.text}}</el-menu-item>
      </el-submenu> -->
      <el-menu-item class="w130" index="4" @click="goRoute('/about')" >ABOUT</el-menu-item>
      <el-menu-item class="w130" index="5" @click="goRoute('/resume')" >RESUME</el-menu-item>
      <!-- <el-menu-item index="5" >
        <el-input
          placeholder="请输入搜索内容"
          v-model="searchText">
          <i
            class="el-icon-search el-input__icon"
            slot="suffix" @click="search(searchText)">
          </i>
        </el-input>
      </el-menu-item> -->
    </el-menu>
  </div>
</template>

<script>
export default {
  name: 'headMenu',
  props: [],
  data() {
    return {
      activeIndex2: '1',
      searchText: '',
      TechnologyArr: [
        {
          index: '2-1',
          text: 'Javascript',
        },
        {
          index: '2-2',
          text: 'JQuery',
        },
        {
          index: '2-3',
          text: 'ES6',
        },
        {
          index: '2-4',
          text: 'Regexp',
        },
        {
          index: '2-5',
          text: 'Vue',
        },
        {
          index: '2-6',
          text: 'Angular',
        },
        {
          index: '2-7',
          text: 'Webpack',
        },
        {
          index: '2-8',
          text: 'CSS',
        },
      ],
      OtherArr: [
        {
          index: '3-1',
          text: 'Chrome DevTools',
        },
        {
          index: '3-2',
          text: 'Git',
        },
        {
          index: '3-3',
          text: 'WAP',
        },
      ],

      Technology: 'Technology',
      Other: 'Other',
    }
  },
  methods: {
    // 获取点击导航
    handleSelect(key, keyPath) {
      // this.$router.push('/resume')
      console.log(key, keyPath);
    },
    // 搜索
    search(searchText) {
      console.log(searchText);
    },
    fetchData() {
      console.log(111)
    },

    // 路由跳转
    goRoute(path, query) {
      if(path === 'Technology' || path === 'other') {
        this[path] = query;
      }
      this.$router.push({ 
        path,
        query: {
          key: query,
        },
      })
    },
  },
  mounted () {
    console.log(this.$route)
    let routeName = this.$route.name;
    let key = this.$route.query.key;
    switch (routeName) {
      case 'about':
        this.activeIndex2 = '4';
        break;
      case 'index':
        this.activeIndex2 = '1';
        break;
      case 'technology':
        switch (key) {
          case 'Javascript':
            this.activeIndex2 = '2-1';
            break;
          case 'JQuery':
            this.activeIndex2 = '2-2';
            break;
          case 'ES6':
            this.activeIndex2 = '2-3';
            break;  
          case 'Regexp':
            this.activeIndex2 = '2-4';
            break;  
          case 'Vue':
            this.activeIndex2 = '2-5';
            break;  
          case 'Angular':
            this.activeIndex2 = '2-6';
            break;  
          case 'Webpack':
            this.activeIndex2 = '2-7';
            break;  
          case 'CSS':
            this.activeIndex2 = '2-8';
            break;  
          default:
            break;
        }
        break;
      case 'other':
        switch (key) {
          case 'Chrome DevTools':
            this.activeIndex2 = '3-1';
            break;
          case 'Git':
            this.activeIndex2 = '3-2';
            break;
          case 'WAP':
            this.activeIndex2 = '3-3';
            break;  
          default:
            break;
        } 
        break;
      default:
        break;
    }
  },
}
</script>

<style lang="less" scoped>
.menu{
  display: flex;
  justify-content: center;
  position: fixed;
  z-index: 2;
  width: 100%;
  top: 0;
}
.w130{
  width: 150px;
  text-align: center;
}
</style>



