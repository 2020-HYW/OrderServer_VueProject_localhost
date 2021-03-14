<template>
  <div class="add-personal-data">
    <div class="path">
      <div class="left">联系人:</div>
      <div class="right"><input type="text" v-model="name"></div>
    </div>
    <transition name='fade'>
    <div class="AU-warn" v-show="nameWarn">
      <img src="./img/警告.png" alt="">
      <div>联系人不宜超过10个字，请简要填写</div>
    </div>
    </transition>
    <div class="path">
      <div class="left">电话:</div>
      <div class="right"><input type="number" v-model="phone"></div>
    </div>
    <transition name='fade'>
    <div class="AU-warn" v-show="phoneWarn">
      <img src="./img/警告.png" alt="">
      <div>请正确填写电话</div>
    </div>
    </transition>
    <div class="path">
      <div class="left">收货地址:</div>
      <div class="right"><textarea v-model="address"></textarea></div>
    </div>
    <transition name='fade'>
    <div class="AU-warn" v-show="addressWarn">
      <img src="./img/警告.png" alt="">
      <div>收货地址不宜超过60个字，请简要填写</div>
    </div>
    </transition>

    <div class="path1">
      <input type="checkbox" name="" id="dA" :value="true" v-model="defaultAddress">
      <label for="dA">默认地址</label>
    </div>


    <transition name='fade'>
    <div class="AU-warn" v-show="allWarn">
      <img src="./img/警告.png" alt="">
      <div>填写内容有误，请修改后再提交</div>
    </div>
    </transition>

    <div class="confirm">
      <div @click="addBackHandle">返回</div>
      <div @click="sendDataHandle">提交</div>
    </div>
  </div>
</template>
<script>
export default {
  data(){
    return{
      phone:'',
      name:'',
      address:'',
      phoneWarn:false,
      nameWarn:false,
      addressWarn:false,
      allWarn:false,
      defaultAddress:false
    }
  },
  watch:{
    phone(val){
      var phoneReg = /^((\+?86)|(\(\+86\)))?(13[012356789][0-9]{8}|15[012356789][0-9]{8}|18[02356789][0-9]{8}|147[0-9]{8}|1349[0-9]{7})$/;
      if(phoneReg.test(val)){
        this.phoneWarn = false
      }else{
        this.phoneWarn = true
      }
    },
    name(val){
      if(val.length > 10){
        this.nameWarn = true
      }else{
        this.nameWarn = false
      }
    },
    address(val){
      if(val.length >60 ){
        this.addressWarn = true
      }else{
        this.addressWarn = false
      }
    }
  },
  methods:{
    sendDataHandle(){
      if(this.phone.length != '' && this.name.length != '' && this.address.length != ''){
        if(!this.phoneWarn && !this.nameWarn && !this.addressWarn){
          // 可以提交
          var data = {
            name:this.name,
            phone:this.phone,
            address:this.address,
            isDefault:this.defaultAddress
          }
          console.log(data)
          this.$emit('sendData',data)

        }else{
          this.allWarn = true
          setTimeout(()=>{
            this.allWarn = false
          },3000)
        }
      }else{
        this.allWarn = true
        setTimeout(()=>{
          this.allWarn = false
        },3000)
      }
    },
    addBackHandle(){
      this.$emit('addBack')
    }
  }

}
</script>
<style lang="less">
@import './add-user-info.less';
</style>
