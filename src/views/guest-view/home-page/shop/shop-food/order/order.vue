<template>
  <div class="K-bg" :style="{height:winH+'px',width:winW+'px'}" @click.self="cancleHandle">
    <div class="order-info">
      <div class="shop-info">
        <img :src="orderInfo.shopPic" alt="">
        <div class="name">{{orderInfo.shopName}}</div>
      </div>
      <div class="food-info">
        <div class="detail" v-for="(item,index) in orderInfo.shopCar" :key='index'>
          <div class="left">
            <img :src="item.food_img" alt="">
            <div class="inner">
              <div class="name">{{item.food_name}}</div>
              <div class="price">￥{{item.price}}</div>
            </div>
          </div>
          <div class="right">
            <div class="num">x{{item.food_num}}</div>
          </div>
        </div>
        <div class="allPrice">
          <div>共{{foodNum}}件商品,共{{orderInfo.allPrice}}元</div>
        </div>
      </div>
      <div class="user-info">
        <div class="user">
          <div class="top">
            <div class="left">
              <div class="name">{{orderInfo.name}}</div>
              <div class="phone">{{orderInfo.phone}}</div>
            </div>
            <div class="right">
              <img src="./img/修改2.png" alt="" @click="editUserHandle">
              <img src="./img/下拉.png" alt="" @click="showUserArrHandle">
            </div>
          </div>
          <div class="address">地址：{{orderInfo.address}}</div>
        </div>
        <transition name="fade">
        <div v-if="showUserArr">
          <div class="userArr" v-for="(item,index1) in guestContactInfoCopy" @click="chooseuserHandle(index1)">
            <div>
              <div class="top">
                <div class="name">{{item.name}}</div>
                <div class="phone">{{item.phone}}</div>
              </div>
              <div class="address">地址：{{item.address}}</div>
            </div>
            <div class="input">
              <input type="radio" v-model="chooseUser" :value="index1">
            </div>
          </div>
        </div>
        </transition>
        <div class="order">
          <div class="order-num">订单号:{{orderInfo.orderNum}}</div>
          <div class="date">交易时间：{{orderInfo.dateFilter}}</div>
        </div>
      </div>
      <div class="confirm">
        <div class="cancel" @click="cancleHandle">取消</div>
        <div class="pay" @click="payHandle">支付</div>
      </div>
    </div>
    <transition name="fade2">
    <edit-info @editInfo='editInfoHandle' v-if="editInfoShow" :userInfo='editData' @editBack='editBackHandle'></edit-info>
    </transition>
  </div>
</template>
<script>
import {mapState} from 'vuex'
import editInfo from './edit-info/edit-info.vue'
import guestAPI from '../../../../../../api/guest/guest'
export default {
  data(){
    return{
      /* orderInfo:{
        shopName:'第一饭堂',
        shopId:'123456',
        shopPic:'http://localhost:4399/uploads/upload_4b10996c4260810e48f974c312b8f3d1.jpg',
        allPrice:'16',
        user_name:'HYW',
        identity:'guest',
        name:'黄先生',
        phone:'13760040351',
        address:'虚拟网路',
        date: Date.now(),
        dateFilter:'2021-02-18 10:13:35',
        orderNum:'888888888888888',
        shopCar:[{
          food_img:"http://localhost:4399/uploads/upload_d4600044fdbb62b55242abec50fdb29c.png",
          food_name:'土豆焖牛腩',
          price:'16',
          food_num:1,
          food_id:'123456789'
        }]
      }, */
      orderInfo:{},
      chooseUser:'',
      guestContactInfoCopy:[],
      showUserArr:false,
      editInfoShow:false,
      editData:{}
    }
  },
  components:{
    editInfo
  },
  computed:{
    foodNum(){
      if(this.orderInfo.shopCar != []){
        return this.orderInfo.shopCar.length
      }else{
        return 0
      }
    },
    winH(){
      return document.documentElement.clientHeight || document.body.clientHeight
    },
    winW(){
      return document.documentElement.clientWidth || document.body.clientWidth
    },
    ...mapState(['guestContactInfo'])
  },
  methods:{
    chooseuserHandle(num){
      this.showUserArr = false
      this.orderInfo.name = this.guestContactInfoCopy[num].name
      this.orderInfo.phone = this.guestContactInfoCopy[num].phone
      this.orderInfo.address = this.guestContactInfoCopy[num].address
      this.chooseUser = num
    },
    showUserArrHandle(){
      this.showUserArr = !this.showUserArr
    },
    editUserHandle(){
      // 修改按钮
      this.editInfoShow = !this.editInfoShow
      if(this.chooseUser != ''){
        // 已经选择过了
        this.editData = {
          name2 : this.orderInfo.name,
          phone2 : this.orderInfo.phone,
          address2 : this.orderInfo.address,
          isDefaule2 : this.guestContactInfoCopy[this.chooseUser].isDefault,
        }
      }else{
        //因为没选择过所以默认是弄 true 本来也是true
        this.editData = {
          name2 : this.orderInfo.name,
          phone2 : this.orderInfo.phone,
          address2 : this.orderInfo.address,
          isDefaule2 : true,
        }
      }
    },
    editBackHandle(){
      this.editInfoShow = false
    },
    //修改后的回调函数
    editInfoHandle(value){
      // value的值是传来的值 合并到当前的 全部联系方式的集合后再发送给后端
      // this.appearDetail = true
      this.editInfoShow = false
      this.orderInfo.name = value.name
      this.orderInfo.phone = value.phone
      this.orderInfo.address = value.address
      // 判断新建的数据是否为默认数据 先判断的 contactNum
      if(value.isDefault == true){
        // console.log('最后一个是默认')
        var cacheArr = []
        // this.defaultAddress = this.contactNum
        // 除了 contactNum 把其他的isDefault都变成false
        cacheArr = this.guestContactInfoCopy.map((item,index)=>{
          if(index == this.chooseUser){
            return {
              name:value.name,
              phone:value.phone,
              address:value.address,
              isDefault:true
            }
          }else{
            // console.log(index)
            return {
              name:item.name,
              phone:item.phone,
              address:item.address,
              isDefault:false
            }
          }
        })
        // 向服务器中填入数据
        this.guestContactInfoCopy = cacheArr.slice()
        this.$store.commit('saveContactInfo',this.guestContactInfoCopy)
        var data = {
          contact_info:cacheArr.slice()
        }
        guestAPI.addContactInfo(data)
      }else{
        // console.log('最后一个不是默认')
        // 向服务器中填入数据
        this.guestContactInfoCopy.splice(this.contactNum,1,value)
        this.$store.commit('saveContactInfo',this.guestContactInfoCopy)
        var data = {
          contact_info:this.guestContactInfoCopy
        }
        guestAPI.addContactInfo(data)
      }
    },
    cancleHandle(){
      this.$emit('cancel')
    },
    payHandle(){
      guestAPI.sendOrderInfo({orderInfo :this.orderInfo}).then(res=>{
        if(res.data.success){
          console.log('数据提交成功')
          this.$emit('success')
        }else{
          console.log('数据提交失败')
          this.$emit('fail')
        }
      })
    }
  },
  created(){
    this.guestContactInfoCopy = this.guestContactInfo.slice()
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
    console.log(this.orderInfo)
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
@import './order.less';
</style>
