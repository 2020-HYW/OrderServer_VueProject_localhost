<template>
  <div class="U-food-list" :style="{height:winH-55+'px'}">
    <div class="U-top">店铺列表</div>
    <div v-for="(item,index) in homePageData" :key="index" class="U-list" @click="clickShopHandle(index)">
      <div class="U-left">
        <div class="pic">
          <img :src="item.shopPic" alt="">
        </div>
      </div>
      <div class="U-right">
       <div>
        <div class="U-name">{{item.shopName}}</div>
        <div class="U-order-info">
          <span class="U-type">{{item.shopType}}</span>
          <span class="U-dot">·</span>
          <span class="U-meal-time">出餐时间: {{item.mealTime}}分钟</span>
        </div>
        <div class="U-notices">公告: {{item.shopNotices}}</div>
       </div>
      </div>
    </div>
    <div class="U-buttom">已经滑动到底部</div>

  </div>
</template>
<script>
import guestAPI from '../../../api/guest/guest'
import { mapActions, mapState} from 'vuex'
// import { mapState } from 'vuex'
export default {
  data(){
    return{
     homePageData:[]
    }
  },
  computed:{
    winH(){
      return document.documentElement.clientHeight || document.body.clientHeight
    },
    winW(){
      return document.documentElement.clientWidth || document.body.clientWidth
    },
    ...mapState(['allShopInfo'])
  },
  methods:{
    // ...mapActions(['getAllShopInfo']),
    clickShopHandle(num){
      const data = {
        shopId : this.homePageData[num].shopId
      }
      guestAPI.findDetailShopInfo(data).then(res=>{
        // console.log(res)
        this.$store.commit('getDetailShopMessage',res.data)
        // 发生跳转name: 'detailShop'
        this.$router.push({name: 'detailShop'})
      })
    }
  },
  created(){
    guestAPI.findAllShopInfo().then(res=>{
      if(res.data.length > 0){
        this.homePageData = res.data.slice()
      }
    })
  },
  beforeRouteEnter(to,from,next){
    next(vm=>{
      // vm.homePageData = vm.allShopInfo
    })
  },
  mounted(){
    // this.homePageData = this.allShopInfo

  }

}
</script>
<style lang="less">
@import './home.less';
</style>
