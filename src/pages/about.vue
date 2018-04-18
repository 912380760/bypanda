<template>
  <div>
    <HeadMenu/>

    <div id="aboutPage">
      <div class="about" id="about">
        <div class="about-left">
          <p class="about-content">Front-end developer with practical experience in project management and creative direction; Dedicated to page interaction and componentization development.</p>
          <div class="line"></div>
          <p class="about-last">Web Developer - Front-End Engineer - Interface Interaction Engineer</p>
        </div>
        <div class="about-right">
          <img src="../assets/images/about/自拍美颜.png" alt="" class="img">
        </div>
      </div>
      
      <div id="portfolio" class="por">
        <div class="title-box">
          <div class="line"></div>
          <div class="h2"><span>PORTFOLIO</span></div>	
        </div>
        
        <ul class="por-content">
          <li>
            <a href="https://www.whalegogo.com" target="_blank">
              <img src="../assets/images/about/whalegogoPC.png" alt="">
            </a>
            <p>www.whalegogo.com PC</p>
          </li>
          <li>
            <a href="https://m.whalegogo.com" target="_blank">
              <img src="../assets/images/about/whalegogoWAP.png" alt="">
            </a>	
            <p>m.whalegogo.com WAP</p>
          </li>
          <li>
            <a href="http://www.dgtle.com" target="_blank">
              <img src="../assets/images/about/dgtlePC.png" alt="">
            </a>	
            <p>www.dgtle.com PC</p>
          </li>
          <li>
            <a href="http://www.dgtle.com" target="_blank">
              <img src="../assets/images/about/dgtleWAP.png" alt="">
            </a>	
            <p>www.dgtle.com WAP</p>
          </li>
          <li>
            <a href="http://www.xchuxing.com" target="_blank">
              <img src="../assets/images/about/xinchuxingPC.png" alt="">
            </a>	
            <p>www.xchuxing.com PC</p>
          </li>
          <li>
            <a href="http://www.xchuxing.com" target="_blank">
              <img src="../assets/images/about/xinchuxingWAP.png" alt="">
            </a>		
            <p>www.xchuxing.com WAP</p>
          </li>
        </ul>
      </div>
    
      <div id="contact" class="contact">
        <div class="title-box">
          <div class="line"></div>
          <div class="h2"><span>CONTACT ME</span></div>	
        </div>
        <div class="content">
          <div class="content-left">
            <div class="input">
              <input type="text" placeholder="Name" id="userName" required >	
              <label for="userName">Name</label>
            </div>
            <div class="input">
              <input type="text" placeholder="Email Address" id="emailAddress" required >	
              <label for="emailAddress">Email Address</label>
            </div>
            <div class="input">
              <input type="text" placeholder="Phone Number" id="phoneNumber">	
              <label for="phoneNumber">Phone Number</label>
            </div>
            <div class="input" style="margin-bottom: 40px;">
              <input type="text" placeholder="Message" id="message">	
              <label for="message">Message</label>
            </div>
            <button class="btn btn-text btn-lg" style="color: #666">send</button>
          </div>
          <div class="content-right">
            <p>Would you like to contact me? If you want more information about me, or my experience, ask my resume, advice on how to solve your Sudoku problem, random questions about the universe, or the meaning of life, Or even just want to chat with me.</p>
            <p>I promise to reply A.S.A.P.</p>
            <p class="right-bottom">Note: No spam/soliciting pour moi, merci.</p>
          </div>
        </div>
      </div>
      
      <footer class="footer">
        <div class="footer-about">
          <div class="footer-left">
            <h3>ABOUT THIS PAGE</h3>
            <div>
              <p>Made with <i class="fa fa-fw fa-coffee"></i> and <i class="fa fa-fw fa-music"></i></p>
              <p>by ZhiLong Huang.</p>
            </div>
          </div>
          <div class="footer-right">
            <h3>AROUND THE WEB</h3>
            <ul>
              <li>
                <a href="https://github.com/912380760" target='_blank'>
                  <i class="fa fa-fw fa-github"></i>
                </a>
              </li>
              <li>
                <el-tooltip placement="top">
                  <div slot="content"><img src="../assets/images/index/WXHY.png" style="width: 160px;" alt=""></div>
                  <a href="javascript:;">
                    <i class="fa fa-fw fa-weixin"></i>
                  </a>
                </el-tooltip>
              </li>
              <li>
                <el-tooltip placement="top">
                  <div slot="content"><img src="../assets/images/index/QQHY.png" style="width: 160px;" alt=""></div>
                  <a href="javascript:;">
                    <i class="fa fa-fw fa-qq"></i>
                  </a>
                </el-tooltip>
              </li>
            </ul>
          </div>
        </div>
        <div class="footer-bottom">ZhiLong Huang © 2017. All Rights Reversed</div>
      </footer>
    </div>
    
  </div>
</template>

<script>
import HeadMenu from '@/components/HeadMenu.vue';
export default {
  name: 'about',
  components: {
    HeadMenu,
  },
  computed: {

  },
  data () {
    return {

    }
  },
  methods: {

  },
  mouted () {

  },
}
</script>

<style lang="less" scoped>
  #aboutPage{
    background: #888;	
    font-family: 'Indie Flower', cursive;
  }
  .top-box{
    width: 100%;
    background: #fff;
    position: fixed;
    box-shadow: 0px 2px 2px 1px rgba(0, 0, 0, 0.1);
    top: 0;
    z-index: 2;
  }
  .top{
    margin: 0 auto;
    display: flex;
    width: 1280px;
    height: 100px;
    Justify-content: space-between;
    align-items: center;
    background: #fff;
    
    .logo{
      height: 80px;
      width: auto;
      margin-left: 10px;
      border-radius: 50%;
    }
    
    .tab{
      display: flex;
      align-items: center;
      margin-bottom: 0;
      
      .btn{
        cursor: pointer;
        font-weight: 600;
      }
      .m-r-10{
        margin-right: 10px;
      }
    }
  }

  .about{
    padding-top: 200px;
    width: 1280px;
    margin: 0 auto;
    color: #fff;
    display: flex;
    background: #aaa;
    
    .about-left{
      flex: 6;
      padding: 80px;
      padding-top: 0;
      
      .about-content{
        font-size: 20px;
        text-align: right;
      }
      .line{

        height: 6px;
        background: #fff;
        width: 50%;
        margin: 30px 0 30px 50%;
      }
      .about-last{
        font-size: 22px;
        text-align: right;
        font-weight: 600;
      }
    }
    
    .about-right{
      flex: 4;
      position: relative;
      
      .img{
        position: absolute;
        left: 0;
        right: 0;
        top: -50px;
        bottom: 0;
        margin: auto auto;
        width: 300px;
        border-radius: 50%;
      }
    }
  }

  .title-box{
    position: relative;
    height: 150px;
    width: 1280px;
    margin: 0 auto;
    background: #eee;

    .line{
      width: 100%;
      height: 150px;
      position: absolute;
      top: 0;
      display: flex;
      justify-content: center;
      align-items: center;

      &:before{
        content: '';
        height: 4px;
        width: 500px;
        background: #000;
      }
    }
    .h2{
      position: absolute;
      top: 0;
      width: 100%;
      height: 150px;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 0;

      span{
        background: #eee;
        padding: 0 20px;
        font-weight: 600;
      }
    }
  }
  .por{
    
    .por-content{
      width: 1280px;
      margin: 0 auto;
      padding: 0 20px 0 60px;
      display: flex;
      flex-wrap: wrap;
      background: #eee;
      border-bottom: 2px dashed rgba(0, 0, 0, 0.5);
      color: #666;
      
      li{
        padding: 0 40px 40px 0;
        width: 50%;
        
        img{
          width: 100%;
          height: 1164px;
        }	
        p{
          padding: 10px 0;
          font-size: 16px;
          font-weight: 600;
          text-align: center;
        }
      }
    }
  }

  .contact{
    .content{
      padding:0 60px 60px;
      width: 1280px;
      margin: 0 auto;
      background: #eee;
      display: flex;
      
      .content-left{
        flex: 1;
        padding-right: 60px;
        
        .input{
          border-bottom: 1px solid #bbb;
          position: relative;
          margin-bottom: 10px;
          padding-bottom: 10px;
          
          input{
            z-index: 1;
            position: relative;
            padding-right: 0;
            padding-left: 0;
            border: 0;
            top: 1.5em;
            border-radius: 0;
            font-size: 1.5em;
            background: 0 0;
            box-shadow: none;
            resize: none;
            width: 100%;
            outline: none;
            
            &:focus + label{
              top: -2.3em;
              opacity: 1;
              color: #007bff;
            }
          }
          label{
            display: block;
            z-index: 0;
            position: relative;
            top: 0;
            margin: 0;
            font-size: 1em;
            font-weight: 600;
            line-height: 1.764705882em;
            vertical-align: middle;
            vertical-align: baseline;
            opacity: 0;
            -webkit-transition: top .3s ease,opacity .3s ease;
            transition: top .3s ease,opacity .3s ease;
          }
        }
      }
      .content-right{
        padding-top: 40px;
        font-size: 20px;
        flex: 1;
        position: relative;
        color: #666;
        
        .right-bottom{
          position: absolute;
          bottom:0;
        }
      }
    }
  }

  .footer{
    color: #fff;
    background-color: #aaa;
    text-align: center;
    
    .footer-about{
      padding: 60px 0;
      width: 1280px;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
    }	
    .footer-bottom{
      font-weight: 600;
      font-size: 22px;
      padding: 25px 0;
      background: #007bff;
    }
  }

  .footer-left{
    padding-left: 40px;
    font-weight: 600;

    h3{
      margin-bottom: 30px;
    }
    p{
      font-size: 18px;
      margin-bottom: 5px;
    }
  }
  .footer-right{
    padding-right: 40px;

    h3{
      margin-bottom: 30px;
    }
    ul{
      display: flex;

      a{
        display: block;
        color: #fff;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        border: 2px solid #fff;
        line-height: 50px;
        font-size: 24px;
        margin-right: 10px;
        background: #aaa;

        &:hover{
          background: #fff;
          color: #007bff;
        }
      }
    }
  }

// 移动端自适应
@media (max-width: 600px) {
  .about{
    width: 100%;
    padding-top: 100px;

    .about-left{
      padding: 40px;
    }
  }
  .about-right{
    display: none;
  }

  .title-box{
    width: 100%;
  }
  
  .por .por-content{
    width: 100%;
    padding: 0;

    li{
      padding: 0 10px 0;
      width: 100%;
    }
  }
  .contact{
    display: none;
  }
  .footer .footer-about{
    width: 100%;
  }
  .footer-left{
    padding: 0;
    padding-right: 20px;
  }
  .footer-right{
    padding: 0;
  }
}
</style>

