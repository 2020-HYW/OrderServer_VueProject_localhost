<template>
  <div class="H-bg-login-G" :style="{height:winH+'px'}">
    <div class="H-login-G" v-show="!load">
      <div class="H-info">
        <div class="H-name">用户名：</div>
        <div class="H-input"><input type="text" v-model="userName"></div>
      </div>
      <div class="H-info">
        <div class="H-name">密码：</div>
        <div class="H-input"><input type="password" v-model="password"></div>
      </div>
      <div class="H-btn-choose">
        <div class="btn" @click="identifyBtn(index)" v-for="(item,index) in identifyArr" :key="index">
          <img :src="item.url" alt="">
          <div :class="['text',{isclick:fontColor[index]}]">{{item.text}}</div>
        </div>

      </div>
      <div class="H-warn">
      <transition name="fade">
        <div class="warn" v-show="passwordWarn">
          <img src="./img/警告.png" alt="" >
          <span class="scene1">用户名和密码不匹配</span>
        </div>
        </transition>
        <transition name="fade">
        <div class="warn" v-show="chooseWarn">
          <img src="./img/提醒.png" alt="">
          <span class="scene2">请选择 商家 或 游客</span>
        </div>
        </transition>

      </div>
      <div class="H-confirm-btn">
        <div class="btn" @click="loginHandle">登录</div>
      </div>
      <div class="register-btn">
        <span @click="toRegister">立即注册</span>
      </div>
    </div>
    <div class="H-loading" v-show="load">
      <img src="./img/加载.gif" alt="">
      加载中...
    </div>
  </div>
</template>
<script>
import { mapMutations } from 'vuex'
// import API from '../../../api/login/login'
import API from '../../api/login/login'
export default {
  data(){
    return{
      userName : '',
      password : '',
      identifyArr : [{url:require("./img/商家.png"),text:'商家'},{url:require("./img/吃饭.png"),text:'食客'}],
      fontColor : [false,false],
      identify : '',
      chooseWarn : false,
      passwordWarn : false,
      load : false
    }
  },
  methods:{
     ...mapMutations(['keepToken','isMarkHandle','guestLogin','businessLogin']),
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
      //1.判断身份有没有选
      if(this.identify == ''){
        this.chooseWarn = true
        setTimeout(()=>{this.chooseWarn = false},2000)
      }
      //2.判断选择的身份是 商家还是食客（商家需要完整的用户名/密码登录）食客则不需要用户名密码登录
      if(this.identify == 'business'){
        // 如果是商家登录
        if(this.userName.length == 0 || this.password.length == 0){
          this.passwordWarn = true
          setTimeout(()=>{this.passwordWarn = false},2000)
        }
        if(this.userName.length != 0 && this.password.length != 0 && this.identify != ''){
          this.login = true
          var data = {
            "user_name":this.userName,
            "login_password":this.password,
            "identity":this.identify}
          API.login(data).then((res)=>{

            if(res.data.success){
              // 登录成功
              var datas = {
                shopId : res.data.shop_id,
                userName : res.data.user_name,
                token : res.data.token
              }
              this.$store.commit('keepToken',datas)
              this.login = false
              console.log('登录成功')
              // 向loaclStorage 中存入登录数据
              var localStorageDate = {
                shopId : res.data.shop_id,
                userName : res.data.user_name,
                token : res.data.token,
                identify : this.identify
              }
              localStorage.setItem('shopLoginDatas',JSON.stringify(localStorageDate))

              this.$router.push({name:'personalCenter'})
              this.$store.commit('isMarkHandle')
              this.$store.commit('businessLogin')
            }else{
              // 登录失败
              this.login = false
              this.passwordWarn = true
              setTimeout(()=>{this.passwordWarn = false},4000)
              console.log('登录失败')
            }
            // console.log(res)
            })
        }


      }else if(this.identify == 'guest'){
        // 如果是食客
        // 1.判断有没有输入用户名/密码 如果有则需要完整登录 2.如果没有则可以直接登录
        if(this.userName == '' && this.password == ''){
          //啥都没选 直接登录
          this.$store.commit('guestLogin')
          this.$store.commit('isMarkHandle')
          this.$router.push({name: 'userMe'})
        }else{
          //需要完整登录
          //后期再调试 食客正式用户名密码登录
          if(this.userName.length != 0 && this.password.length != 0 && this.identify != ''){
          this.login = true
          var data = {
            "user_name":this.userName,
            "login_password":this.password,
            "identity":this.identify}
          API.login(data).then((res)=>{

            if(res.data.success){
              // 登录成功
              var datas = {
                shopId : res.data.shop_id,
                userName : res.data.user_name,
                token : res.data.token
              }
              this.$store.commit('keepToken',datas)
              this.login = false
              console.log('登录成功')
              // 向loaclStorage 中存入登录数据
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
              // console.log('后期再调试')
            }else{
              // 登录失败
              this.login = false
              this.passwordWarn = true
              setTimeout(()=>{this.passwordWarn = false},4000)
              console.log('登录失败')
            }
            })
          }

          ////

        }
      }


    },
    toRegister(){
      console.log('即将跳转')
      this.$router.push({name:'userRegister'})
    }
  },
  computed:{
    winH(){
      return document.documentElement.clientHeight || document.body.clientHeight
    },
    winW(){
      return document.documentElement.clientWidth || document.body.clientWidth
    },
  },
  created(){
    this.$store.commit('isMarkHandle')
  },
  beforeRouteEnter (to, from, next) {
    // 在进入路由前判断localStorage 有没有 shopLoginDatas 有则直接发送
    //this.$store.commit('keepToken',datas),并跳转到个人页面
    next(vm=>{
      var loginData = JSON.parse(localStorage.getItem('shopLoginDatas'))
      // console.log('localStorage中的数据'+loginData.userName)
      if(loginData != undefined){
        // localStorage中有数据 可以实现自动登录
        // 判断是食客还是商家
        console.log(loginData.identify)
        if(loginData.identify == 'business'){
          vm.$store.commit('keepToken',loginData)
          vm.$router.push({name:'personalCenter'})
          vm.$store.commit('isMarkHandle')
          vm.$store.commit('businessLogin')
        }else{
          vm.$store.commit('keepToken',loginData)
          vm.$store.commit('guestLogin')
          vm.$store.commit('isMarkHandle')
          vm.$router.push({name: 'userMe'})
        }
      }else{
        console.log('localStorage中没有数据需要登录操作')
      }
    })
  }

}
</script>
<style lang="less">
@import "./login.less";
</style>
