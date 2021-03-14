<template>
  <div class="OP-bg">
    <div class="OP-main" v-for="(item1,index1) in orderArr" :key="index1">
      <div class="top">
        <div class="time">{{item1.dateFilter}}</div>
        <div class="order-num">订单号:{{item1.orderNum}}</div>
      </div>
      <div class="middle">
        <div class="order-info" v-for="(item2,index2) in item1.shopCar" :key="index2">
          <div class="left">
            <img :src="item2.food_img" alt="">
            <div class="name-price">
              <div class="name">{{item2.food_name}}</div>
              <div class="price">￥{{item2.price}}</div>
            </div>
          </div>
          <div class="num">x{{item2.food_num}}</div>
        </div>
      </div>
      <div class="total">
      共{{item1.shopCar.length}}件商品,共{{item1.allPrice}}元
      </div>
      <div class="bottom">
        <div class="user-info">
          <span class="user-name">联系人:{{item1.name}}</span>
          <span class="phone">电话:{{item1.phone}}</span>
        </div>
        <div class="address">地址:{{item1.address}}</div>
      </div>
    </div>
    <div class="bottom-text">已经滑动到底部</div>
  </div>
</template>
<script>
import API from '../../../api/login/login'
export default {
  data(){
    return{
      orderArr:[]

    }
  },
  created(){
    if(this.$store.state.userInfo.shopId != ''){
      API.findShopOrder({shopId:this.$store.state.userInfo.shopId}).then(res=>{
        this.orderArr = res.data.slice()
      })
    }
  }

}
</script>
<style lang="less">
@import './order-page.less';
</style>
