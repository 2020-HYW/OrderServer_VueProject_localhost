<template>
<div class="D-box-shop">
  <div class="D-main-shop" v-if="!showEditInfo">
    <!--<div class="bg" :style="{width:winW+'px'}" v-if="!showLoading">-->
    <div class="D-bg" :style="{width:winW+'px'}" v-if="!showLoading">
      <div class="D-shop-info">
        <div class="D-contact-info">
          <div class="D-name-and-address">
            <p class="D-name">{{shopInfo.shopName}}</p>
            <p class="D-address">店铺地址：{{shopInfo.shopAddress}}</p>
            <p class="D-address">联系方式：{{shopInfo.shopPhone}}</p>
          </div>
          <div class="D-phone-btn">
            <div>
              <img src="./img/设置.png" alt="" @click="editInfoHandle">
              <div class="D-text">编辑</div>
            </div>
          </div>
        </div>
        <div class="D-order-info">
          <div class="D-shop-pic">
            <div class="D-pic">
              <img :src="shopInfo.shopPic" alt="">
            </div>
          </div>
          <p class="D-title">商家信息</p>
          <p class="D-shop-type">商家品类：{{shopInfo.shopType}}</p>
          <p class="D-business-hours">营业时间：{{hoursString}}</p>
        </div>
        <div class="D-business_certificate">
          <div>查看营业资质</div>
        </div>
      </div>

    </div>
    <!--<div v-if="showLoading" class="D-load">-->
    <div v-if="showLoading" class="D-load">
      <div class="D-pic">
        <img src="./img/加载.gif" alt="">
      </div>
      <div class="D-text">请去'个人'页面，创建店铺</div>

    </div>
  </div>
  <edit-info v-if="showEditInfo" @editInfoCallback='callbackHandle' @backPage='backHandle'></edit-info>
</div>
</template>
<script>
import editInfo from './edit-info'
import { mapMutations } from 'vuex'
export default {
  data(){
    return{
      shopInfo : {
        shopName:'',
        shopAddress:'',
        shopPic:'',
        shopType:'',
        businessHours:[],
        shopPhone: ''
      },
      showLoading : true,
      showEditInfo : false
    }
  },
  computed:{
    winW(){return document.body.clientWidth},
    winH(){
      return document.documentElement.clientHeight || document.body.clientHeight
    },
    hoursString(){
      var hoursArr = this.shopInfo.businessHours.map((item)=>{
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
    }
  },
  components:{editInfo},
  methods:{

    editInfoHandle(){
      this.showEditInfo = !this.showEditInfo
      // 关闭底部tab栏
      this.$store.commit('isMarkHandle')
    },
    callbackHandle(){
      this.showEditInfo = !this.showEditInfo
      // 关闭底部tab栏
      this.$store.commit('isMarkHandle')
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
      deepCopy(this.shopInfo, this.$store.state.shop_message)

    },
    backHandle(){
      this.showEditInfo = !this.showEditInfo
      // 关闭底部tab栏
      this.$store.commit('isMarkHandle')
    },
    ...mapMutations(['isMarkHandle'])
  },
  mounted(){

  },
  beforeRouteEnter(to,from,next){
   next(vm => {
     if(!vm.$store.state.shopInfo.findShopList){
       console.log('没数据显示loading效果')
       vm.showLoading = true
     }else{
      //  console.log('有数据显示数据')
       vm.showLoading = false
      //  console.log(vm.$store.state.shop_message)
       function deepCopy(newObj, oldObj){
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
       deepCopy(vm.shopInfo, vm.$store.state.shopInfo.message)
     }
   })
  }

}
</script>
<style lang="less">
@import './shop.less';
</style>
