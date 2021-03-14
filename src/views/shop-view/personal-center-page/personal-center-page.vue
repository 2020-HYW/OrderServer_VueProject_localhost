<template>
  <div>
    <div class="G-box" v-if="!showEditInfo">
      <div class="G-main-message">
        <div class="G-left">
          <div class="G-name" v-if="hasShopID">{{centerInfo.shopName}}</div>
          <div class="G-name" v-if="!hasShopID" @click="loginHandle">创建店铺</div>
          <div class="G-motto">{{userName}}
            <div>
              <img src="./img/退出登录.png" alt="" @click="quitHandle">
              <!--<div class="text">离开</div>-->
            </div>
          </div>
        </div>
        <div class="G-shop-pic">
          <img :src="centerInfo.shopPic" alt="">
        </div>
      </div>
      <div class="G-address">
        <div class="G-text">店铺地址：{{centerInfo.shopAddress}}</div>
        <div class="G-text">公告：{{centerInfo.shopNotices}}</div>
      </div>
      <div class="G-btn">
        <div class="G-detail-btn" @click="detailInfo">详细信息
          <img src="./img/排序.png" alt="" v-show="!isShowDetail">
          <img src="./img/排序2.png" alt="" v-show="isShowDetail">
        </div>
        <div class="G-edit-btn">
          <img src="./img/设置.png" alt="" @click="editInfo">
          <div>编辑</div>
        </div>
      </div>
      <transition name="Ffade">
      <div class="G-detail-Message-box" v-show="isShowDetail">
        <div class="G-message">联系方式：{{centerInfo.shopPhone}}</div>
        <div class="G-message">营业时间：{{hoursString}}</div>
        <div class="G-message">店铺类型：{{centerInfo.shopType}}</div>
        <div class="G-message">出餐时间：{{centerInfo.mealTime}} 分钟</div>
        <div class="G-message">配送费￥：{{centerInfo.distributionCost}} 元</div>
        <div class="G-message">配送时间：{{centerInfo.distributionTime}} 分钟</div>
        <div class="G-message-E">营业执照：
            <img :src="centerInfo.businessCertificate" alt="">
        </div>
      </div>
      </transition>
      <!--<div class="quit">
        <div class="btn">退出登录</div>
      </div>-->

    </div>
    <edit-info v-if="showEditInfo" @editInfoCallback='callbackHandle' @backPage='backHandle'></edit-info>
  </div>

</template>
<script>
import API from '../../../api/login/login'
import editInfo from '../shop-page/shop/edit-info'
import { mapMutations } from 'vuex'
export default {
  data(){
    return{
      centerInfo:{
        shopName:'',
        shopId:'',
        shopPic:"",
        shopPhone:'',
        shopAddress:'',
        businessHours:[],
        shopType:'',
        shopNotices:'',
        businessCertificate:'',
        mealTime:'',
        distributionCost:'',
        distributionTime:'',
        food_list:[]
      },
      isShowDetail : false,
      showEditInfo: false,
      // hasLogin:false
      hasShopID:false,

    }

  },
  computed:{
    hoursString(){
      var hoursArr = this.centerInfo.businessHours.map((item)=>{
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
    userName(){
      return this.$store.state.userInfo.userName
    },
    winH(){
      return document.documentElement.clientHeight || document.body.clientHeight
    },
  },
  components:{editInfo},
  methods:{
    detailInfo(){
      this.isShowDetail = !this.isShowDetail
    },
    editInfo(){
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
      deepCopy(this.centerInfo, this.$store.state.shop_message)

    },
    backHandle(){
      this.showEditInfo = !this.showEditInfo
      // 关闭底部tab栏
      this.$store.commit('isMarkHandle')
    },
    ...mapMutations(['isMarkHandle','getShopInfo']),
    loginHandle(){
      this.$router.push({name:'shopRegister'})
      // 关闭底部tab栏
      this.$store.commit('isMarkHandle')
    },
    quitHandle(){
      //退出登录
      console.log('退出登录')
      // 删除localStory中的信息
      localStorage.removeItem('shopLoginDatas')
      //跳转到登录页面
      // this.$store.commit('isMarkHandle')
      this.$router.push({path:'/'})
    }

  },
  beforeRouteEnter(to,from,next){
   next(vm => {
     if(vm.$store.state.userInfo.shopId == "hasNoShop"){
       console.log('没数据显示loading效果')
       vm.hasShopID = false
       console.log('情况1')
     }else{
      //  console.log('有数据显示数据')
       vm.hasShopID = true
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
       API.saveShopInfo().then(res=>{
        //  console.log(res)
        // 请求数据 放入shopInfo中
        const datas = res.data
        vm.$store.commit('getShopInfo',datas)
        // 在shopInfo中找数据赋值给vm.centerInfo
        if(vm.$store.state.shopInfo.findShopList){
          deepCopy(vm.centerInfo, vm.$store.state.shopInfo.message)
        }else{
          vm.hasShopID = false
          console.log('情况2')
        }

       })
     }
   })
  }
}
</script>
<style lang="less">
@import './personal-center-page.less';
</style>
