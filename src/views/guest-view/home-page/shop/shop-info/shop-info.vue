<template>
<div class="bg" :style="{width:winW+'px'}">
  <div class="shop-info">
    <div class="contact-info">
      <div class="name-and-address">
        <p class="name">{{shopInfo.shop_name}}</p>
        <p class="address">店铺地址：{{shopInfo.shop_address}}</p>
      </div>
      <div class="phone-btn">
        <img src="./img/电话.png" alt="">
      </div>
    </div>
    <div class="order-info">
      <div class="shop-pic">
        <div class="pic">
          <img :src="shopInfo.shop_pic" alt="">
        </div>
      </div>
      <p class="title">商家信息</p>
      <p class="shop-type">商家品类：{{shopInfo.shop_type}}</p>
      <p class="business-hours">营业时间：{{hoursString}}</p>
    </div>
    <div class="business_certificate">
      <div>查看营业资质</div>
    </div>
  </div>

</div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  data(){
    return{
      shopInfo:{
        shop_name:'',
        shop_address:'',
        shop_pic:'',
        shop_type: '',
        business_hours:[],
        business_certificate:''
      }
    }
  },
  computed:{
    winW(){return document.body.clientWidth},
    winH(){return document.documentElement.clientHeight || document.body.clientHeight},
    hoursString(){
      var hoursArr = this.shopInfo.business_hours.map((item)=>{
        var start = item.startTime
        var hour1 = Math.floor(start/60)
        if(hour1<10){hour1 = '0' + hour1}
        var minute1 = start % 60
        if(minute1<10){minute1 = '0'+minute1}
        var end = item.endTime
        var hour2 = Math.floor(end/60)
        if(hour2<10){hour2 = '0' + hour2}
        var minute2 = end % 60
        if(minute2<10){minute2 = '0'+minute2}
        return `${hour1}:${minute1}-${hour2}:${minute2}`
      })
      return hoursArr.join(` | `)
    },
    ...mapState(['detailShopInfo'])
  },
  mounted(){
    // console.log(this.winW)
  },
  beforeRouteEnter(to,from,next){
    next(vm=>{
      vm.shopInfo.shop_name = vm.detailShopInfo.shopName
      vm.shopInfo.shop_address = vm.detailShopInfo.shopAddress
      vm.shopInfo.shop_pic = vm.detailShopInfo.shopPic
      vm.shopInfo.shop_type = vm.detailShopInfo.shopType
      vm.shopInfo.business_hours = vm.detailShopInfo.businessHours.slice()
      vm.shopInfo.business_certificate = vm.detailShopInfo.businessCertificate
    })
  }
}
</script>
<style lang="less">
@import './shop-info.less';
</style>
