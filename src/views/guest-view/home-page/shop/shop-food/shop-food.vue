<template>
  <div>
    <div class="P-U-box" :style="{width:winW+'px'}">
      <div class="P-U-main">
        <div class="P-left-p" :style="{height:winH-55+'px'}">
          <div class="P-inner">
            <div v-for="(item,index) in food_list" :key="item.tab_id" :class="['P-food-tab','P-active']" @click="tabHandle(index)"
            ref="leftTab">
              {{item.food_tab}}
            </div>

          </div>
          <div class="P-blockPlace"></div>
        </div>
        <div class="P-right-p" :style="{height:winH-55+'px'}">
          <div class="P-food-tab" v-for="(item,index1) in food_list" :key="item.tab_id">
            <div class="P-food-title" ref="tabTitle">{{item.food_tab}}</div>
            <div v-for="(item2,index2) in item.child_food_list" :key="item2.food_id" class="P-tab">
              <div class="P-food-pic">
                <img :src=item2.food_img alt="">
              </div>
              <div class="P-text-info">
                <p class="P-food-name">{{item2.food_name}}</p>
                <p class="P-main-material">主要原料:{{item2.main_material}}</p>
                <p class="P-food-month-sale">月售{{item2.food_month_sale}}份</p>
                <div class="P-price-and-button">
                  <div class="P-price">￥{{item2.price}}</div>
                  <div class="P-buttonI" >
                    <img src="./img/减少.png" alt="" class="reduce" @click="reduceGood(index1,index2)" v-show="buyFoodArr[index1][index2]">
                    <div class="num" v-show="buyFoodArr[index1][index2]">{{buyFoodArr[index1][index2]}}</div>
                    <img src="./img/添加.png" alt="" class="add" @click="addGood(index1,index2)">
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="P-shopMessage">
            已经滑动到底部
          </div>
        </div>
      </div>
      <div class="P-shopping-car-list" v-show="shopCarShow">
        <div class="SC-top">
          <div class="SC-cost">配送费￥{{orderInfo.distributionCost}}元</div>
          <div class="SC-clear-list">
            <img src="./img/垃圾桶.png" alt="">
            <div class="text">清空购物车</div>
          </div>
        </div>
        <div class="SC-list" v-for="(item,index) in shoppingCarArr" :key="index">
          <div class="SC-pic">
            <img :src="item.food_img" alt="">
          </div>
          <div class="SC-info">
            <div class="SC-name">{{item.food_name}}</div>
            <div class="SC-price">￥{{item.price}}</div>
          </div>
          <div class="SC-btns">
            <img src="./img/减少.png" alt="" class="reduce" @click="reduceGood(item.num1,item.num2)">
            <div class="SC-num">{{buyFoodArr[item.num1][item.num2]}}</div>
            <img src="./img/添加.png" alt="" class="add" @click="addGood(item.num1,item.num2)">
          </div>
        </div>
      </div>
      <div :class="['P-bottom-shopping-car',{'P-bottom-shopCar':hasGood}]">
        <div class="shop-car">
          <div :class="['car-circle',{'active-circle':hasGood}]">
            <img :src="shopCarPic" alt="">
            <div class="good-num" v-show="hasGood">{{goodNum}}</div>
          </div>
        </div>
        <div class="all-page" @click="shoppingCar">
          <div class="price">￥{{totalPrice}}</div>
          <div class="tip">配送费:{{orderInfo.distributionCost}}元</div>
        </div>
        <div :class="['to-pay',{'toPayActive':hasGood}]" @click="payBtnHandle">去支付</div>
      </div>

    </div>
    <transition name='fade2'>
    <order :data="orderDetailInfo" v-if="showOrder" @cancel="cancelHandle" @success='successHandle' @fail='failHandle'></order>
    </transition>
    <transition name='fade2'>
    <data-warn v-show="noDataInCar"></data-warn>
    </transition>
    <transition name='fade2'>
    <user-warn v-show="noUserInfo"></user-warn>
    </transition>
    <transition name='fade2'>
    <success v-show="successShow"></success>
    </transition>
  </div>


</template>
<script>
import order from './order/order.vue'
import dataWarn from './no-data-warn/no-data-warn.vue'
import userWarn from './no-user-warn/no-user-warn.vue'
import success from './successTip.vue'
import rootRouter from '../../../../../router'
export default {
  data(){
    return{
      food_list:[],
      orderInfo:{},
      totalPrice:0,
      // hasGood:false,
      // goodNum:1,
      buyFoodArr:[],
      goodNum:0,
      shoppingCarArr:[],
      shopCarShow:false,
      orderDetailInfo:{},
      showOrder:false,
      noUserInfo:false,
      noDataInCar:false,
      successShow:false
    }
  },
  components:{
    order,
    dataWarn,
    userWarn,
    success
  },
  computed:{
    winW(){
      return document.body.clientWidth
    },
    winH(){
      return document.documentElement.clientHeight || document.body.clientHeight
    },
    shopCarPic(){
      if(this.hasGood){
        return require('./img/购物车满.png')
      }else{
        return require('./img/购物车空.png')
      }
    },
    hasGood(){
      if(this.goodNum != 0){
        return true
      }else{
        return false
      }
    }
  },
  methods:{
    tabHandle(index){
      this.$refs.tabTitle[index].scrollIntoView({behavior: "smooth", block: "center"})
    },
    addGood(num1,num2){
      // 给 shoppingCarArr添加数据
      var shopCarData = {
        food_name : this.food_list[num1].child_food_list[num2].food_name,
        food_img : this.food_list[num1].child_food_list[num2].food_img,
        price : this.food_list[num1].child_food_list[num2].price,
        food_id : this.food_list[num1].child_food_list[num2].food_id,
        _id : this.food_list[num1].child_food_list[num2]._id,
        num1,
        num2
      }
      // 判断shopingCarArr中有没有这个项，没有则添加
      var hasThisGood = 0
      this.shoppingCarArr.map(item=>{
        if(item.food_id == this.food_list[num1].child_food_list[num2].food_id){
          hasThisGood += 1
        }
      })
      if(hasThisGood == 0){
        this.shoppingCarArr.push(shopCarData)
      }

      // console.log(this.shoppingCarArr)
      // 在buyFoodArr:[]上进行+1操作
      var cacheData = this.buyFoodArr[num1][num2]
      cacheData += 1
      this.buyFoodArr[num1].splice(num2, 1, cacheData)
      // 判断goodNum
      var num = 0
      this.buyFoodArr.map(item=>{
        item.map(item2=>{
          if(item2 != 0){
            num = num*1 + item2*1
          }
        })
      })
      this.goodNum = num
      // 计算总价格 从this.shoppingCarArr和buyFoodArr[item.num1][item.num2] 计算总价格
      var allPrice = 0
      this.shoppingCarArr.map(item=>{
        allPrice += item.price * this.buyFoodArr[item.num1][item.num2]
      })
      this.totalPrice = allPrice + this.orderInfo.distributionCost

    },
    reduceGood(num1,num2){
      // 在buyFoodArr:[]上进行-1操作
      var cacheData = this.buyFoodArr[num1][num2]
      // 判断cacheData 是否等于0 如果不等于 0则执行-1操作 如果等于0 则不执行且让食客看不见
      if(cacheData > 0){
        cacheData -= 1
        this.buyFoodArr[num1].splice(num2, 1, cacheData)
      }else{
        this.buyFoodArr[num1].splice(num2, 1, 0)
        // 关闭操作
      }
      // 判断goodNum
      var num = 0
      this.buyFoodArr.map(item=>{
        item.map(item2=>{
          if(item2 != 0){
            num = num*1 + item2*1
          }
        })
      })
      this.goodNum = num
      // 结合this.buyFoodArr 对this.shoppingCarArr 进行操作
      this.shoppingCarArr = this.shoppingCarArr.filter(item=>{
        var goodNum = this.buyFoodArr[item.num1][item.num2]
        if(goodNum != 0){
          return true
        }else{
          return false
        }
      })
      // console.log(this.shoppingCarArr)
      // 计算总价格 从this.shoppingCarArr和buyFoodArr[item.num1][item.num2] 计算总价格
      var allPrice = 0
      this.shoppingCarArr.map(item=>{
        allPrice += item.price * this.buyFoodArr[item.num1][item.num2]
      })
      this.totalPrice = allPrice + this.orderInfo.distributionCost

    },
    shoppingCar(){
      //显示和关闭购物车
      this.shopCarShow = !this.shopCarShow
    },
    payBtnHandle(){
      // 先判断购物车有没有 数据
      if(this.shoppingCarArr.length >0){
        // 购物车有数据
        console.log('购物车有数据')
        if(this.$store.state.guestContactInfo.length > 0){
          //有联系方式
          var data = []
          this.shoppingCarArr.map(item=>{
            var shopCarInfo = {
              food_img : item.food_img,
              food_name : item.food_name,
              price : item.price,
              food_num : this.buyFoodArr[item.num1][item.num2],
              food_id : item.food_id,
              // _id : item._id
            }
            data.push(shopCarInfo)
          })
          var sendName = ''
          var sendPhone = ''
          var sendAddress = ''
          this.$store.state.guestContactInfo.map((item)=>{
            if(item.isDefault){
              sendName = item.name
              sendPhone = item.phone
              sendAddress = item.address
            }else{
              sendName = this.$store.state.guestContactInfo[0].name
              sendPhone = this.$store.state.guestContactInfo[0].phone
              sendAddress = this.$store.state.guestContactInfo[0].address
            }
          })

          function getUid(){
            var s = [];
            var hexDigits = "0123456789abcdef";
            for (var i = 0; i < 18; i++) {
                s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
            }
            s[14] = s[4] = s[9] = "-";
            var uuid = s.join("");
            // console.log(uuid)
            return uuid;
          }
          function formatDate() {
            var date = new Date();
            var year = date.getFullYear(); // 年
            var month = date.getMonth() + 1; // 月
            var day = date.getDate(); // 日
            var hour = date.getHours(); // 时
            hour = hour < 10 ? '0' + hour : hour; // 如果只有一位，则前面补零
            var minute = date.getMinutes(); // 分
            minute = minute < 10 ? '0' + minute : minute; // 如果只有一位，则前面补零
            var second = date.getSeconds(); // 秒
            second = second < 10 ? '0' + second : second; // 如果只有一位，则前面补零

            var result = `${year}-${month}-${day}:${hour}-${minute}-${second}`

            return result;
        }
          // 下面是要发送的信息
          var orderData = {
            shopName : this.orderInfo.shopName,
            shopId : this.orderInfo.shopId,
            shopPic : this.orderInfo.shopPic,
            allPrice : this.totalPrice,
            user_name : this.$store.state.userInfo.userName,
            identity : "guest",
            name : sendName,
            phone : sendPhone,
            address : sendAddress,
            date: Date.now(),
            dateFilter : formatDate(),
            orderNum: getUid(),
            // 还需要 添加 用户信息 和日期 user_name identity phone name address date
            shopCar : data.slice()
          }
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
          deepCopy(this.orderDetailInfo,orderData)
          this.showOrder = true

          //----------------
        }else{
          this.noUserInfo = true
          setTimeout(()=>{
            this.noUserInfo = false
          },1200)
        }
      }else{
        this.noDataInCar = true
        setTimeout(()=>{
            this.noDataInCar = false
          },1200)
      }
    },
    cancelHandle(){
      this.showOrder = false
    },
    successHandle(){
      this.showOrder = false
      this.successShow = true
      setTimeout(()=>{
        this.successShow = false
        rootRouter.push({name: 'homePage'})
        this.$store.commit('isMarkHandle')
      },1000)
    },
    failHandle(){
      this.showOrder = false
    }

  },
  mounted(){
    this.buyFoodArr = Array.apply(null,{length:this.food_list.length}).map((item,index)=>{
      var num = this.food_list[index].child_food_list.length
      return Array.apply(null,{length:num}).fill(0)
    })
    // console.log(this.buyFoodArr)
  },
  created(){

  },
  beforeRouteEnter(to,from,next){
    next(vm=>{
      vm.food_list = vm.$store.state.detailShopInfo.food_list.slice()
      vm.orderInfo = {
        shopName : vm.$store.state.detailShopInfo.shopName,
        shopId : vm.$store.state.detailShopInfo.shopId,
        shopPic : vm.$store.state.detailShopInfo.shopPic,
        shopPhone : vm.$store.state.detailShopInfo.shopPhone,
        shopAddress : vm.$store.state.detailShopInfo.shopAddress,
        shopType : vm.$store.state.detailShopInfo.shopType,
        shopNotices : vm.$store.state.detailShopInfo.shopNotices,
        businessCertificate : vm.$store.state.detailShopInfo.businessCertificate,
        mealTime : vm.$store.state.detailShopInfo.mealTime,
        distributionCost : vm.$store.state.detailShopInfo.distributionCost,
        distributionTime : vm.$store.state.detailShopInfo.distributionTime,
        _id : vm.$store.state.detailShopInfo._id,
        businessHours : vm.$store.state.detailShopInfo.businessHours
      }
    })
  }


}
</script>
<style lang="less">
@import './shop-food.less';
</style>
