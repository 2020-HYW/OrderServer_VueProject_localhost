<template>
  <div class="UO-bg">
    <div>
      <div class="UO-order-list" v-for="(item1,index1) in orderArr" :key="index1" @click="userDetailHandle(index1)">
        <div class="UO-shop-info">
          <div class="UO-name">{{item1.shopName}}</div>
        </div>
        <div class="UO-food-list">
          <div class="UO-food-info" v-for="(item2,index2) in item1.shopCar" :key="index2">
            <div class="UO-left">
              <img :src="item2.food_img" alt="">
              <div class="UO-middle">
                <div class="UO-name">{{item2.food_name}}</div>
                <div class="UO-price">￥{{item2.price}}</div>
              </div>
            </div>
            <div class="UO-num">x{{item2.food_num}}</div>
          </div>
          <div class="UO-order-info">
            <div class="UO-time">{{item1.dateFilter}}</div>
            <div class="UO-price">共{{item1.shopCar.length}}件商品，共{{item1.allPrice}}元</div>
          </div>
        </div>
      </div>
      <div class="bottom">已经滚动到底部</div>
    </div>
    <transition name="fade">
    <user-detail @back='backCallback' v-if="showUserDetail" :data="sendData"></user-detail>
    </transition>
  </div>
</template>
<script>
import guestAPI from '../../../api/guest/guest'
import userDetail from './order-detail/order-detail.vue'
export default {
  data(){
    return{
      orderArr:[],
      showUserDetail:false,
      sendData:{}
    }
  },
  components:{
    userDetail
  },
  computed:{
    winH(){
      return document.documentElement.clientHeight || document.body.clientHeight
    },
    winW(){
      return document.documentElement.clientWidth || document.body.clientWidth
    },
  },
  methods:{
    backCallback(){
      this.showUserDetail = false
    },
    userDetailHandle(num){
      this.showUserDetail = true
      function deepCopy(newObj, oldObj) {
        for (let key in oldObj) {
          // 获取属性值 oldObj[key]
          let item = oldObj[key];
          // 判断这个值是否是数组
          if (item instanceof Array) {
            newObj[key] = [];
            deepCopy(newObj[key], item);
          } else if (item instanceof Object) {
            // 判断这个值是否是对象
            newObj[key] = {};
            deepCopy(newObj[key], item);
          } else {
            // 简单数据类型，直接赋值
            newObj[key] = item;
          }
        }
      }
      deepCopy(this.sendData,this.orderArr[num])

    }
  },
  created(){
    guestAPI.acceptUserOrderInfo().then(res=>{
      if(res.data.length > 0){
         this.orderArr = res.data.slice()
       }
    })
  }
}
</script>
<style lang="less">
@import './user-order.less';
</style>
