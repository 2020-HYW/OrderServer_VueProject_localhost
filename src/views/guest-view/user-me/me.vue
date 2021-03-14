<template>
  <div class="me-bg">
    <div class="U-main-info">
     <div class="user-name" v-if="hasLogin">
      <div>{{userInfo.userName}}</div>
      <img src="./img/退出登录.png" alt="" @click="logOut">
     </div>
     <div class="user-name" v-if="!hasLogin">
      <img src="./img/登录.png" alt="" class="login" @click="loginHandle">
      <div @click="loginHandle">登录</div>
      <img src="./img/退出登录.png" alt="" @click="logOut">
     </div>
     <transition name="fade1">
     <div class="personal-data-tip" v-if="hasUserDetail" @click="adduserData">请完善个人资料<img src="./img/修改.png" alt=""></div>
     </transition>
     <div class="btns">
        <img src="./img/下拉.png" alt="" class="btn1" @click="showDetail">
        <div class="text">联系方式</div>
        <img src="./img/添加.png" alt="" class="btn2" @click="adduserData">
     </div>


    </div>
    <!--<transition name="fade">-->
      <add-user-info v-if="addUsrInfo" @sendData='acceptAddData' @addBack='addBackCallback'></add-user-info>
      <edit-info @editInfo='editInfoHandle' v-if="editInfoShow" :userInfo='editData' @editBack='editBackHandle'></edit-info>
    <!--</transition>-->
    <!--<transition name="fade">-->
    <div class="contact_info" v-if="appearDetail">
      <div class="info_path" v-for="(item,index) in contact_info" :key="index">
        <div class="top">
          <span class="name">{{item.name}}</span>
          <span class="phone">{{item.phone}}</span>
        </div>
        <div class="middle">
          <div class="address">
            <transition name="fade">
            <span class="default-icon" v-show="contact_info[index].isDefault">默认</span>
            </transition>
            <span>{{item.address}}</span>
          </div>
          <div class="edit-btn"><img src="./img/修改2.png" alt="" @click="editContactInfo(index)"></div>
        </div>
        <div class="bottom">
          <div class="default-choose">
            <input type="radio" name="" :id="index" :value="index" v-model="defaultAddress" @change="changeDefault">
            <label :for="index">默认地址</label>
          </div>
          <div class="trash"><img src="./img/垃圾桶.png" alt="" @click='deleteInfo(index)'></div>
        </div>
      </div>
    </div>
    <!--</transition>-->
  </div>
</template>
<script>
import addUserInfo from './add-user-info/add-user-info.vue'
import editInfo from './edit-user-info/edit-user-info.vue'
import { mapState,mapMutations } from 'vuex'
import guestAPI from '../../../api/guest/guest'
export default {
  data(){
    return{
      // name:'',
      // phone:'',
      // address:'',
      contact_info:[],
      defaultAddress:'',
      appearDetail:false,
      addUsrInfo:false,
      editInfoShow:false,
      editData:{},
      contactNum :'',
      hasUserDetail:false
    }
  },
  components:{
    addUserInfo,
    editInfo
  },
  computed:{
    ...mapState(['userInfo']),
    hasLogin(){
      if(this.userInfo.userName != ''){
        return true
      }else{
        return false
      }
    }
  },
  methods:{
    ...mapMutations(['saveContactInfo']),
    logOut(){
      console.log('退出登录')
      // 删除localStory中的信息
      localStorage.removeItem('shopLoginDatas')
      //跳转到登录页面
      // this.$store.commit('isMarkHandle')
      this.$router.push({path:'/'})
    },
    loginHandle(){
      this.$router.push({path:'/'})
    },
    showDetail(){
      this.addUsrInfo = false
      this.appearDetail = !this.appearDetail
      var num = ''
      this.contact_info.map((item,index)=>{
        if(item.isDefault){
          num = index
        }
      })
      this.defaultAddress = num
      // console.log(num)

    },
    adduserData(){
      this.appearDetail = false
      this.addUsrInfo = !this.addUsrInfo
    },
    acceptAddData(value){
      // value的值是传来的值 合并到当前的 全部联系方式的集合后再发送给后端
      this.appearDetail = true
      this.addUsrInfo = false
      this.contact_info.push(value)
      this.hasUserDetail = false
      // 判断新建的数据是否为默认数据 先判断的
      if(value.isDefault == true){
        // console.log('最后一个是默认')
        var cacheArr = []
        // 设置默认选项的按钮
        this.defaultAddress = this.contact_info.length - 1
        //把其他的isDefault都变成false
        // var infoLength = this.contact_info.length
        // console.log(infoLength)
        cacheArr = this.contact_info.map((item,index)=>{
          if(index == (this.contact_info.length -1)){
            return {
              name:item.name,
              phone:item.phone,
              address:item.address,
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
        // console.log(cacheArr)
        this.contact_info = cacheArr.slice()
        this.$store.commit('saveContactInfo',this.contact_info)
        var data = {
          contact_info:cacheArr
        }
        guestAPI.addContactInfo(data)
      }else{
        console.log('最后一个不是默认')
        // 向服务器中填入数据
        this.$store.commit('saveContactInfo',this.contact_info)
        var data = {
          contact_info:this.contact_info
        }
        guestAPI.addContactInfo(data)
      }
    },
    editInfoHandle(value){
      // value的值是传来的值 合并到当前的 全部联系方式的集合后再发送给后端
      this.appearDetail = true
      this.editInfoShow = false
      // 判断新建的数据是否为默认数据 先判断的 contactNum
      if(value.isDefault == true){
        // console.log('最后一个是默认')
        var cacheArr = []
        this.defaultAddress = this.contactNum
        // 除了 contactNum 把其他的isDefault都变成false
        cacheArr = this.contact_info.map((item,index)=>{
          if(index == this.contactNum){
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
        this.contact_info = cacheArr.slice()
        this.$store.commit('saveContactInfo',this.contact_info)
        var data = {
          contact_info:cacheArr
        }
        guestAPI.addContactInfo(data)
      }else{
        // console.log('最后一个不是默认')
        // 向服务器中填入数据
        this.contact_info.splice(this.contactNum,1,value)
        this.$store.commit('saveContactInfo',this.contact_info)
        var data = {
          contact_info:this.contact_info
        }
        guestAPI.addContactInfo(data)
      }
    },

    changeDefault(){
      this.defaultAddress
      var newInfoArr = this.contact_info.map((item,index)=>{
        if(this.defaultAddress == index){
          return {
            name:item.name,
            phone:item.phone,
            address:item.address,
            isDefault:true
          }
        }else{
          return {
            name:item.name,
            phone:item.phone,
            address:item.address,
            isDefault:false
          }
        }
      })
      this.contact_info = newInfoArr.slice()
      this.$store.commit('saveContactInfo',this.contact_info)
      var data = {
          contact_info:newInfoArr
        }
        guestAPI.addContactInfo(data)
    },
    // 点击修改按钮
    editContactInfo(num){
      this.appearDetail = false
      this.contactNum = num
      this.editInfoShow = !this.editInfoShow
      // this.contact_info[num]
      this.editData = {
        name2:this.contact_info[num].name,
        phone2:this.contact_info[num].phone,
        address2:this.contact_info[num].address,
        isDefaule2:this.contact_info[num].isDefault
      }
    },
    // 点击删除按钮
    deleteInfo(num){
      console.log('删除按钮被触发')
      this.contact_info.splice(num,1)
      this.$store.commit('saveContactInfo',this.contact_info)
      var data = {
        contact_info:this.contact_info
      }
      guestAPI.addContactInfo(data)
      console.log(this.contact_info.length)
      if(this.contact_info.length == 0){
        this.hasUserDetail = true

      }
    },
    editBackHandle(){
      this.editInfoShow = false
    },
    addBackCallback(){
      this.addUsrInfo = false
    }

  },
  created(){
    guestAPI.getUserContactInfo().then(res=>{
      // commit('guestDataHandle',res.data[0])
      // console.log(res.data[0].user_name)
      if(res.data[0].contact_info.length > 0){
        this.contact_info = res.data[0].contact_info.slice()
        this.$store.commit('saveContactInfo',this.contact_info)
        this.hasUserDetail = false
      }else{
        this.hasUserDetail = true
      }
    })
  }
}
</script>
<style lang="less">
@import './me.less';
</style>
