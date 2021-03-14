<template>
  <div class="D-box" :style="{height:winH-60+'px'}">
    <div class="D-main">
      <div class="D-message">
        <div class="D-name">类型名称:</div>
        <input type="text" class="D-word" @input="typeInputHandle" v-model="DtypeName">
      </div>
      <div></div>
      <transition name="Dwarn">
      <div class="D-warn" v-show="DshowWarn">
        <div class="pic">
          <img src="./img/警告.png" alt="">
        </div>
        <div>类型名称 不宜超过5个字</div>
      </div>
      </transition>
      <div class="D-confirm" @click="DsendData">
        <div class="D-Cname">
          确认提交
        </div>
      </div>
      <div class="D-confirm" @click="backBtn">
        <div class="D-Cname">
          返回
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data(){
    return{
      DtypeName:'',
      DshowWarn:false,
      tabId:'',
      childFoodList:[]
    }
  },
  computed:{
    winW(){
      return document.body.clientWidth
    },
    winH(){
      return document.documentElement.clientHeight || document.body.clientHeight
    },
  },
  methods:{
    typeInputHandle(){
      if(this.DtypeName.length >5){
        this.DshowWarn = true
      }else{
        this.DshowWarn = false
      }
    },
    getUid(){
      var s = [];
      var hexDigits = "0123456789abcdef";
      for (var i = 0; i < 36; i++) {
          s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
      }
      s[14] = "4";
      s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);
      s[8] = s[13] = s[18] = s[23] = "-";

      var uuid = s.join("");
      // console.log(uuid)
      return uuid;
    },
    DsendData(){
      // console.log('我被触发了')
      // 首先判断有无数据
      if(this.DtypeName.length>0){
        //在判断有无错误
        if(!this.DshowWarn){
          const sendData = {
            food_tab: this.DtypeName,
            tab_id: this.tabId,
            child_food_list:this.childFoodList
          }
          // 发送给父组件
          this.$emit('edit',sendData)
        }else{
          this.DshowWarn = true
        }
      }else{
        this.DshowWarn = true
      }

    },
    backBtn(){
      console.log('返回按钮被点击')
      this.$emit('backType')
    }
  },
  created(){
    this.DtypeName = this.value.food_tab
    this.tabId = this.value.tab_id
    this.childFoodList = this.value.child_food_list

  },
  props:{
    value:{
      food_tab : '',
      tab_id:'',
      child_food_list:[]
    }
  }
}
</script>
<style lang="less">
@import './edit-type.less';
</style>
