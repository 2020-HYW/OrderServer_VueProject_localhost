<template>
  <div class="shop" :style="{width:winW+'px'}">
    <div class="shop-box" v-show="!isMark">
      <div class="shop-head" >
        <div class="bg-pic">
          <img :src="shopPic" alt="">
        </div>
        <div class="shop-info">
          <div class="top-path">
            <div class="left-path">
              <p class="shop-name">{{shopName}}</p>
              <div class="shop-tip">
                <span class="meal-time">商铺类型：{{shopType}}</span>
                <span>·</span>
                <span class="month-sale">出餐时间：{{mealTime}}分钟</span>
              </div>
            </div>
            <div class="right-path">
              <img :src="shopPic" alt="">
            </div>
          </div>
          <div class="bottom-path">
            <p class="shop-notice">公告：{{shopNotices}}</p>
          </div>
        </div>
      </div>
      <div class="blockDiv"></div>
      <div :class="[isFixed?'navigation-tabs':'fixedTop']" ref="navigationTabs">
      <!--<div class="navigation-tabs" ref="navigationTabs">-->

        <router-link :to="{name:'foodList'}" tag="div">点餐</router-link><br>
        <router-link :to="{name:'comment'}" tag="div">评价</router-link><br>
        <router-link :to="{name:'shopInfo'}" tag="div">商家</router-link><br>
      </div>
    </div>

    <router-view/>

  </div>
</template>
<script>
import {mapState} from 'vuex'
import VueRouter from 'vue-router'
export default {
  name:'shop-page',
  data(){
    return{
      scrollTop : 0,
      tabsTop : 2
    }
  },
  computed:{
    winW(){return document.body.clientWidth},
    isFixed(){
      return this.scrollTop < this.tabsTop ? true : false
    },
    shopName(){
      return this.$store.state.shopInfo.message.shopName
    },
    shopPic(){
      return this.$store.state.shopInfo.message.shopPic
    },
    mealTime(){
      return this.$store.state.shopInfo.message.mealTime
    },
    shopType(){
      return this.$store.state.shopInfo.message.shopType
    },
    shopNotices(){
      return this.$store.state.shopInfo.message.shopNotices
    },
    ...mapState(['isMark'])
  },
  methods:{
    foodListScroll(){

      // console.log(document.body.scrollHeight)
    },
    scrollHandle(event){
      // console.log('tab的高'+this.$refs.navigationTabs.offsetTop)
      // console.log('滚动条的高：'+event.currentTarget.scrollY)
      this.scrollTop = event.currentTarget.scrollY
      // console.log(this.scrollTop)

    }
  },
  mounted(){
    window.addEventListener('scroll',this.scrollHandle)
    // document.addEventListener('scroll',this.scrollHandle)
    const navigateTabTop = this.$refs.navigationTabs.offsetTop
    this.tabsTop = navigateTabTop;
    // console.log(this.tabsTop)

  },
  watch:{

  },
  router: new VueRouter({
    mode: 'history',
    routes:[
      {
        path:'/shop_info',
        name:'shopInfo',
        component:()=>import('./shop/shop.vue')
      },
      {
        path:'/shop_page',
        name:'foodList',
        component:()=>import('./food-list/food-list.vue')
      },
      {
        path:'/comment',
        name:'comment',
        component:()=>import('./comment/comment.vue')
      }
    ]
  })
}
</script>
<style lang="less">
@import './shop-page.less';
</style>
