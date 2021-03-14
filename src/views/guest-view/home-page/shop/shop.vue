<template>
  <div class="O-shop" :style="{width:winW+'px'}">
    <div class="O-shop-box">
      <div class="O-shop-head" >
        <div class="O-bg-pic">
          <div class="filter-box">
            <img :src="shopPic" alt="">
          </div>
        </div>
        <div class="O-back-div">
          <div class="O-back-btn" @click="backHomePageHandle">
            <img src="./img/返回.png" alt="">
          </div>
        </div>
        <div class="O-shop-info">
          <div class="O-top-path">
            <div class="O-left-path">
              <p class="O-shop-name">{{shopName}}</p>
              <div class="O-shop-tip">
                <span class="O-meal-time">商铺类型：{{shopType}}</span>
                <span>·</span>
                <span class="O-month-sale">出餐时间：{{mealTime}}分钟</span>
              </div>
            </div>
            <div class="O-right-path">
              <img :src="shopPic" alt="">
            </div>
          </div>
          <div class="O-bottom-path">
            <p class="O-shop-notice">公告：{{shopNotices}}</p>
          </div>
        </div>
      </div>
      <div class="O-blockDiv"></div>
      <div :class="[isFixed?'O-navigation-tabs':'O-fixedTop']" ref="navigationTabs">
        <router-link :to="{name:'shopFood'}" tag="div">点餐</router-link><br>
        <router-link :to="{name:'userShopComment'}" tag="div">评价</router-link><br>
        <router-link :to="{name:'userShopInfo'}" tag="div">商家</router-link><br>
      </div>
    </div>

    <router-view/>

  </div>
</template>
<script>
import {mapState,mapMutations} from 'vuex'
import VueRouter from 'vue-router'
import rootRouter from '../../../../router'
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
      return this.detailShopInfo.shopName
    },
    shopPic(){
      return this.detailShopInfo.shopPic
    },
    mealTime(){
      return this.detailShopInfo.mealTime
    },
    shopType(){
      return this.detailShopInfo.shopType
    },
    shopNotices(){
      return this.detailShopInfo.shopNotices
    },
    ...mapState(['detailShopInfo'])
  },
  methods:{
    ...mapMutations(['isMarkHandle']),
    scrollHandle(event){
      this.scrollTop = event.currentTarget.scrollY
    },
    backHomePageHandle(){
      // 返回根级别的router 需要引入根级别的 router
      this.$store.commit('isMarkHandle')
      rootRouter.push({name: 'homePage'})
    }
  },
  mounted(){
    window.addEventListener('scroll',this.scrollHandle)
    // document.addEventListener('scroll',this.scrollHandle)
    const navigateTabTop = this.$refs.navigationTabs.offsetTop
    this.tabsTop = navigateTabTop;
    // console.log(this.tabsTop)
    this.$store.commit('isMarkHandle')
    this.$router.push({name:'shopFood'})

  },
  watch:{

  },
  router: new VueRouter({
    mode: 'history',
    routes:[
      {
        path:'/user_shop_info',
        name:'userShopInfo',
        component:()=>import('./shop-info/shop-info.vue')
      },
      {
        path:'/shopFood',
        name:'shopFood',
        component:()=>import('./shop-food/shop-food.vue')
      },
      {
        path:'/user_shop_comment',
        name:'userShopComment',
        component:()=>import('./comment/comment.vue')
      }
    ]
  })
}
</script>
<style lang="less">
@import './shop.less';
</style>
