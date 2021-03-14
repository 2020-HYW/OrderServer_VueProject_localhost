<template>
  <div class="winView">
    <div class="view">
      <router-view/>
    </div>
    <div class="navigation" v-show="!isMark">
      <div class="navigation-icon" v-for="(item,index) in navigationList" :key="index" @click="chooseIcon(index)">
        <!--下面的router-link 暂且用div代替-->
        <router-link :to="{path:item.path}" :class="[{'icon-click':iconColor[index]},'icon-item']">
          <img :src="item.pic" alt="">
          <div class="name">{{item.name}}</div>
        </router-link>
      </div>
    </div>
    <!-- <img src="./img/订单.png" alt=""> -->

  </div>
</template>
<script>
import {mapState} from 'vuex'
export default {
  data(){
    return{
      // navigationList:[],
      iconColor:[false,false,true]
    }
  },
  computed:{
    winH(){
      return document.documentElement.clientHeight || document.body.clientHeight
    },
    winW(){
      return document.documentElement.clientWidth || document.body.clientWidth
    },
    navigationList(){
      if(this.isGuestLogin){
        // 食客的导航条
        return [
          {
            name:'吃饭',
            pic: require("./img/米饭.png"),
            path:'/homePage'
          },
          {
            name:'订单',
            pic: require('./img/订单.png'),
            path:'/userOrder'
          },
          {
            name:'我的',
            pic: require('./img/个人中心2.png'),
            path:'/userMe'
          },
        ]
      }else{
        // 商家的导航条
        return [
          {
            name:'店铺',
            pic: require("./img/商铺.png"),
            path:'/shop_page'
          },
          {
            name:'订单',
            pic: require('./img/订单.png'),
            path:'/order_page'
          },
          {
            name:'个人',
            pic: require('./img/个人中心2.png'),
            path:'/personal_center'
          },
        ]
      }
    },
    ...mapState([
      'isMark','isGuestLogin'
    ])
  },
  methods:{
    chooseIcon(num){
      if(this.isGuestLogin){
        // 食客导航条
        this.iconColor = Array.apply(null,{length:3}).map((item,index)=>{
          if(index == num){
            return true
            }else{
              return false
            }
          })
        switch (num) {
          case 0:
            this.navigationList[0].pic = require("./img/米饭2.png")
            this.navigationList[1].pic = require("./img/订单.png")
            this.navigationList[2].pic = require("./img/个人中心.png")
            break;
          case 1:
            this.navigationList[0].pic = require("./img/米饭.png")
            this.navigationList[1].pic = require("./img/订单2.png")
            this.navigationList[2].pic = require("./img/个人中心.png")
            break;
          case 2:
            this.navigationList[0].pic = require("./img/米饭.png")
            this.navigationList[1].pic = require("./img/订单.png")
            this.navigationList[2].pic = require("./img/个人中心2.png")
            break;
          default:
            break;
        }
      }else{
        // 商家导航条
        this.iconColor = Array.apply(null,{length:3}).map((item,index)=>{
          if(index == num){
            return true
            }else{
              return false
            }
          })
        switch (num) {
          case 0:
            this.navigationList[0].pic = require("./img/商铺2.png")
            this.navigationList[1].pic = require("./img/订单.png")
            this.navigationList[2].pic = require("./img/个人中心.png")
            break;
          case 1:
            this.navigationList[0].pic = require("./img/商铺.png")
            this.navigationList[1].pic = require("./img/订单2.png")
            this.navigationList[2].pic = require("./img/个人中心.png")
            break;
          case 2:
            this.navigationList[0].pic = require("./img/商铺.png")
            this.navigationList[1].pic = require("./img/订单.png")
            this.navigationList[2].pic = require("./img/个人中心2.png")
            break;
          default:
            break;
        }

      }

    }
  },
}
</script>
<style lang="less">
@import './app.less';
</style>
