<template>
  <div class="order-detail-OD-bg" :style="{height:winH+'px',width:winW+'px'}" @click.self="backHandle">
    <div class="order-detail-OD-order-info">
      <div class="OID-shop-info">
        <img :src="orderInfo.shopPic" alt="">
        <div class="OD-name">{{orderInfo.shopName}}</div>
      </div>
      <div class="OD-food-info-list">
        <div class="OD-detail" v-for="(item,index) in orderInfo.shopCar" :key='index'>
          <div class="OD-left">
            <img :src="item.food_img" alt="">
            <div class="OD-inner">
              <div class="OD-name">{{item.food_name}}</div>
              <div class="OD-price">￥{{item.price}}</div>
            </div>
          </div>
          <div class="OD-right">
            <div class="OD-num">x{{item.food_num}}</div>
          </div>
        </div>
        <div class="OD-allPrice">
          <div>共{{orderInfo.shopCar.length}}件商品,共{{orderInfo.allPrice}}元</div>
        </div>
      </div>
      <div class="OD-user-info">
        <div class="OD-user">
          <div class="OD-top">
            <div class="OD-left">
              <div class="OD-name">{{orderInfo.name}}</div>
              <div class="OD-phone">{{orderInfo.phone}}</div>
            </div>
          </div>
          <div class="OD-address">地址：{{orderInfo.address}}</div>
        </div>
        <div class="OD-order">
          <div class="OD-order-num">订单号:{{orderInfo.orderNum}}</div>
          <div class="OD-date">交易时间：{{orderInfo.dateFilter}}</div>
        </div>
      </div>
      <div class="OD-confirm">
        <div class="OD-pay" @click="backHandle">返回</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data(){
    return{
      orderInfo:{}

    }
  },
  components:{
  },
  computed:{
    winH(){
      return document.documentElement.clientHeight || document.body.clientHeight
    },
    winW(){
      return document.documentElement.clientWidth || document.body.clientWidth
    }
  },
  methods:{
    backHandle(){
      this.$emit('back')
    }
  },
  created(){
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
    deepCopy(this.orderInfo,this.data)
  },
  props:{
    data:{
      type:Object,
      default:function(){
        return {
          shopName:'',
          shopId:'',
          shopPic:'',
          allPrice:'',
          user_name:'',
          identity:'',
          name:'',
          phone:'',
          address:'',
          date: Date.now(),
          dateFilter:'',
          orderNum:'',
          shopCar:[{
            food_img:"",
            food_name:'',
            price:'',
            food_num:'',
            food_id:''
          }]
        }
      }
    }
  }
}
</script>
<style lang="less">
@import './order-detail.less';
</style>
