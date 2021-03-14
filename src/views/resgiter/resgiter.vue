<template>
  <div class="G-bg-login" :style="{height:winH+'px'}">
    <div class="G-login" v-show="!load">
      <div class="G-info">
        <div class="G-name">用户名：</div>
        <div class="G-input"><input type="text" v-model="userName"></div>
      </div>
      <div class="G-info">
        <div class="G-name">密码：</div>
        <div class="G-input"><input type="password" v-model="password"></div>
      </div>
      <div class="G-info">
        <div class="G-name">确认密码：</div>
        <div class="G-input"><input type="password" v-model="password2"></div>
      </div>
      <div class="G-btn-choose">
        <div class="btn" @click="identifyBtn(index)" v-for="(item,index) in identifyArr" :key="index">
          <img :src="item.url" alt="">
          <div :class="['text',{isclick:fontColor[index]}]">{{item.text}}</div>
        </div>

      </div>
      <div class="G-warn">
      <transition name="fade">
        <div class="warn" v-show="passwordWarn">
          <img src="./img/警告.png" alt="" >
          <span class="scene1">两次密码不一样 请修改密码</span>
        </div>
        </transition>
        <transition name="fade">
        <div class="warn" v-show="chooseWarn">
          <img src="./img/提醒.png" alt="" >
          <span class="scene2">请选择 商家 或 游客</span>
        </div>
        </transition>

      </div>
      <div class="G-warn">
      <transition name="fade">
        <div class="warn" v-show="blockWarn">
          <img src="./img/警告.png" alt="" >
          <span class="scene1">请完善信息</span>
        </div>
        </transition>

      </div>
      <div class="G-warn">
      <transition name="fade">
        <div class="warn" v-show="userNameWarn">
          <img src="./img/警告.png" alt="" >
          <span class="scene1">用户名已注册</span>
        </div>
        </transition>

      </div>
      <div class="G-confirm-btn">
        <div class="btn" @click="loginHandle">注册并登录</div>
      </div>
      <div class="register-btn">
        <span @click="toRegister2">已有账号，立即登录</span>
      </div>
    </div>
    <div class="G-loading" v-show="load">
      <img src="./img/加载.gif" alt="">
      加载中...
    </div>
  </div>
</template>
<script>
import { mapMutations } from 'vuex'
import API from '../../api/login/login'
import guest from '../../api/guest/guest'
export default {
  data(){
    return{
      userName : '',
      password : '',
      password2 :'',
      identifyArr : [{url:require("./img/商家.png"),text:'商家'},{url:require("./img/吃饭.png"),text:'食客'}],
      fontColor : [false,false],
      identify : '',
      chooseWarn : false,
      passwordWarn : false,
      userNameWarn : false,
      load : false,
      blockWarn:false

    }
  },
  methods:{
     ...mapMutations(['keepToken','guestLogin','isMarkHandle']),
    identifyBtn(num){
      if(num == 0){
        this.identifyArr = [{url:require("./img/商家2.png"),text:'商家'},{url:require("./img/吃饭.png"),text:'食客'}]
        this.fontColor = [true,false]
        this.identify = 'business'
      }else if(num == 1){
        this.identifyArr = [{url:require("./img/商家.png"),text:'商家'},{url:require("./img/吃饭2.png"),text:'食客'}]
        this.fontColor = [false,true]
        this.identify = 'guest'
      }else{
        this.identifyArr =[{url:require("./img/商家.png"),text:'商家'},{url:require("./img/吃饭.png"),text:'食客'}]
        this.fontColor = [false,false]
        this.identify = ''
      }

    },
    loginHandle(){
      if(this.userName.length == 0 || this.password.length == 0 || this.password2.length == 0 ){
        this.blockWarn = true
        setTimeout(()=>{this.blockWarn = false},2000)
      }
      ///
      if(this.identify == ''){
        this.chooseWarn = true
        setTimeout(()=>{this.chooseWarn = false},2000)
      }
      if(this.password != this.password2){
        this.passwordWarn = true
        console.log('1'+this.password)
        console.log('2'+this.password2)
        setTimeout(()=>{this.passwordWarn = false},2000)
      }

      //
      if(this.userName.length != 0 && this.password.length != 0 && this.identify != '' && this.password2.length != 0 && this.password == this.password2){
        this.login = true
        var data = {
          "user_name":this.userName,
          "login_password":this.password,
          "identity":this.identify}
        API.register(data).then((res)=>{
          console.log(res)
          if(!res.data.hasRegister){
            // 注册成功
            console.log('注册成功')
            API.login(data).then((res)=>{
              if(res.data.success){
                console.log('登录成功')
                var datas = {
                  shopId : res.data.shop_id,
                  userName : res.data.user_name,
                  token : res.data.token
                }
                this.$store.commit('keepToken',datas)
                this.login = false
                // console.log('登录成功')
                // 在这里判断登录的是食客还是商家 虽然都有shopID但不影响，因为食客用不到
                if(this.identify == 'business'){
                  var localStorageDate = {
                    shopId : res.data.shop_id,
                    userName : res.data.user_name,
                    token : res.data.token,
                    identify : this.identify
                  }
                  localStorage.setItem('shopLoginDatas',JSON.stringify(localStorageDate))
                  this.$router.push({name:'personalCenter'})
                  this.$store.commit('businessLogin')
                  this.$store.commit('isMarkHandle')
                  // console.log(this.$store.state.userInfo)
                }else{
                  var localStorageDate = {
                    shopId : res.data.shop_id,
                    userName : res.data.user_name,
                    token : res.data.token,
                    identify : this.identify
                  }
                  localStorage.setItem('shopLoginDatas',JSON.stringify(localStorageDate))
                  // this.$store.dispatch('getAllShopInfo')
                  this.$store.commit('guestLogin')
                  this.$store.commit('isMarkHandle')
                  this.$router.push({name: 'userMe'})
                  guest.addBaseInfo({
                    user_name: res.data.user_name,
                    identity : 'guest'
                  })
                  // this.$store.commit('isMarkHandle')
                }
              }
            })




          }else{
            // 注册失败
            this.login = false
            this.userNameWarn = true
            setTimeout(()=>{this.userNameWarn = false},4000)
            console.log('注册失败')
          }
          // console.log(res)
          })
      }

    },
    toRegister2(){
      console.log('即将跳转')
      this.$router.push({name:'userLogin'})
    }
  },
  computed:{
    winH(){
      return document.documentElement.clientHeight || document.body.clientHeight
    },
    winW(){
      return document.documentElement.clientWidth || document.body.clientWidth
    },
  }
}
</script>
<style lang="less">
@import "./resgiter.less";
</style>
