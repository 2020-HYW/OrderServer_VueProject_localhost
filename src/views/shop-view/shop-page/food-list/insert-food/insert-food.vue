<template>
<div class="B-bg">
  <div class="B-box">
    <div class="B-path">
      <div class="B-message">
        <div class="B-tip-info">食物名称：</div>
        <div class="B-choose-info">
          <input type="text" class="B-input-text" v-model.trim="foodName">
        </div>
      </div>
      <transition name="fade">
      <div class="B-warn-info" v-show="showNameWarn">
        <img src="./img/警告.png" alt="">
        食物名称 不宜超过7个字
      </div>
      </transition>
    </div>

    <div class="B-path">
      <div class="B-message">
        <div class="B-tip-info">食物图片：</div>

        <div class="B-input-img">
          <img src="./img/添加.png" alt="" ref="choosedPic">
          <input type="file" class="B-option" @change="handleImg" ref="foodPic">
        </div>
      </div>
      <!--记得选择图片-->
      <transition name="fade">
      <div class="B-picTip" v-show="!hasPic">
        <img src="./img/提醒.png" alt="">
        记得选择图片
      </div>
      </transition>
      <!--食物图片不能超过2M-->
      <transition name="fade">
      <div class="B-picSize" v-show="picSize">
        <img src="./img/警告.png" alt="">
        图片 不能超过5M
      </div>
      </transition>
      <!--食物图片类型-->
      <transition name="fade">
      <div class="B-picType" v-show="picType">
        <img src="./img/警告.png" alt="">
        图片 只能以 .jpeg / .jpg / .png 结尾
      </div>
      </transition>

    </div>

    <div class="B-path">
      <div class="B-message">
        <div class="B-tip-info">主要原料：</div>
        <div class="B-choose-info">
          <textarea class="B-input-text" v-model.trim="mainMaterial"></textarea>
          <span :class="[isDown?'B-choose-button':'B-choose-button-up']" @click="showChooses">
            <img src="./img/下拉.png" alt="">
          </span>
        </div>
      </div>
      <div :class="{'B-materialTotalText':isShowTotalText}">{{materialTotalText}}</div>
      <transition name="fade">
      <div class="B-choose-tip" v-show="chooseOption">
        <!--checkbox 提示信息-->
        <template v-for="(item,index) in tipOptionList">
          <div :class="['B-btn-box',{'B-click-btn-box':isClick[index]}]" :key="index">
            <div class="B-btn" ref="btnBox" @click="clickBtnBox(index)">
              <label :for="`Option${index}`" class="B-lableTab">
                <div class="B-textNode">{{item}}</div>
                <input type="checkbox" v-model="letter" :value="item" :id="`Option${index}`" class="B-inputTab">
              </label>
            </div>
          </div>
        </template>




      </div>
      </transition>
      <transition name="fade">
      <div class="B-warn-info" v-show="showMaterialWarn">
        <img src="./img/警告.png" alt="">
        主要原料 不宜超过11个字 请简要填写
      </div>
      </transition>
    </div>

    <div class="B-path">
      <div class="B-message">
        <div class="B-tip-info">月售份数：</div>
        <div class="B-choose-info">
          <input type="number" class="B-input-text" v-model.trim="monthSale">
        </div>
      </div>
      <transition name="fade">
      <div class="B-warn-info" v-show="showSaleWarn">
        <img src="./img/警告.png" alt="">
        请填写 确切的 月售份数
      </div>
      </transition>
    </div>

    <div class="B-path">
      <div class="B-message">
        <div class="B-tip-info">食物价格：</div>
        <div class="B-choose-info">
          <input type="number" class="B-input-text" v-model.trim="price">
        </div>
      </div>
      <transition name="fade">
      <div class="B-warn-info" v-show="showPriceWarn">
        <img src="./img/警告.png" alt="">
        请填写 实在的 食物价格
      </div>
      </transition>
    </div>
    <!--测试-->
    <!--<button @click="cesi">测试</button>-->

  </div>
    <!--发送按钮-->
    <div class="B-sendDataTip" v-show="showSendDataTip">
      <img src="./img/警告.png" alt="">
      数据有误！请修改数据
    </div>
    <div @click="sendData" class="B-sendData">
      <div class="B-sendText">提交数据</div>
    </div>
    <div @click="backPage3" class="B-sendData">
      <div class="B-sendText">返回</div>
    </div>

</div>

</template>
<script>
import axios from 'axios'
export default {
  data(){
    return{
      foodName:'',
      foodPic:'',
      mainMaterial:'',
      monthSale:'',
      price:'',
      showNameWarn:false,
      showMaterialWarn:false,
      showSaleWarn:false,
      showPriceWarn:false,
      letter:[],
      chooseOption:false,
      tipOptionList:['猪肉','牛肉','鱼肉','羊肉','兔肉','排骨','瘦肉','牛腩','鸡蛋','时蔬','生菜','通心菜','油麦菜','茄子','番茄','青瓜','韭菜','番薯','玉米','面粉'],
      isClick:'',
      isDown:true,
      hasPic:false,
      showSendDataTip:false,
      picSize:false,
      picType:false

    }
  },
  watch:{
    foodName:function(val){
      if(val.length > 6){
        this.showNameWarn = true
      }else{
        this.showNameWarn = false
      }
    },
    monthSale:function(val){
      if(val.length > 6){
        this.showSaleWarn = true
      }else{
        this.showSaleWarn = false
      }
    },
    price:function(val){
      if(val.length > 4){
        this.showPriceWarn = true
      }else{
        this.showPriceWarn = false
      }
    },
    // 主要原料监视
    mainMaterial:function(val){
      if(val.length > 10){
        this.showMaterialWarn = true
      }else{
        this.showMaterialWarn = false
      }
    }
    //
  },
  computed:{
    materialTotalText(){
      var a = '/'
      if(this.letter.length <= 0 && this.mainMaterial.length>=1){
        // console.log('1')
        if(this.mainMaterial.length > 10){
          this.showMaterialWarn = true
        }else{
          this.showMaterialWarn = false
        }
        return `${this.mainMaterial}`
      }else if(this.letter.length>=1 && this.mainMaterial.length <= 0){
        // console.log('2')
        if(this.letter.join('').length > 10){
          this.showMaterialWarn = true
        }else{
          this.showMaterialWarn = false
        }
        return `${this.letter.join('/')}`
      }else if(this.letter.length <=0 && this.mainMaterial.length <= 0){
        // console.log('3')
        this.showMaterialWarn = false
        return ''
      }else{
        // console.log('4')
        // console.log(this.mainMaterial.length)
        if((this.letter.join('')+this.mainMaterial).length > 10){
          this.showMaterialWarn = true
        }else{
          this.showMaterialWarn = false
        }

        return `${this.letter.join('/')}/${this.mainMaterial}`


      }

    },
    isShowTotalText(){
      if(this.materialTotalText.length<=0){
        return false
      }else{
        return true
      }
    },

  },
  methods:{
     handleImg(e){
       // 把input type选中的图片显示出来
      var preview = this.$refs.choosedPic;
      var file = this.$refs.foodPic.files[0];
      var reader  = new FileReader();
        reader.addEventListener("load", function () {
        preview.src = reader.result;

      }, false);
      if (file) {
        reader.readAsDataURL(file);
        this.hasPic = true
      }
      ///

      if(this.hasPic){
        // 有图片 判断图片大小
        var size = this.$refs.foodPic.files[0].size
        if(size < 5242880){
          //图片 < 2M
          // console.log('picSize的判断 图片<2M')
          this.picSize = false
        }else{
          // 图片 > 2M
          this.hasPic = true
          // console.log('picSize的判断 图片>2M')
          this.picSize = true
        }
      }else{
        // 还没添加图片
        // console.log('picSize的判断 还没有图片')
        this.picSize = false
      }
      // 图片类型
      if(this.hasPic){
        // 有图片 判断图片图片类型
        var picName = this.$refs.foodPic.files[0].name
        const dox =  picName.lastIndexOf('.')
        const suffix = picName.slice(dox)
        // .jpeg | .jpg | .png
        if( suffix == '.jpeg' || suffix == '.jpg' || suffix == '.png'){
          // console.log('picType判断 是一张图片')
          this.picType = false
        }else{
          // 图片类型不对
          // console.log('picType判断 图片类型不对')
          this.picType = true
        }
      }else{
        // 还没添加图片
        // console.log('picType判断 还没图片')
        this.picType = false
      }

      ////
    },
    showChooses(){
      console.log('我被点击了')
      this.chooseOption = !this.chooseOption
      this.isDown = !this.isDown
    },
    clickBtnBox(index){
      // 选中后 class样式发送变化
      this.isClick[index] = !this.isClick[index]

    },
    sendData(){
      // 把图片发送给服务器获取 图片链接 返回给用户

      // this.$refs.tabTitle[index].scrollIntoView({behavior: "smooth", block: "center"})
      // 1.先判断是否都写完了   2.判断是否都写正确了
      if(this.foodName.length>0 && this.hasPic && this.materialTotalText.length>0 && this.monthSale.length>0 && this.price.length>0){
        //有数据
        if(this.showNameWarn || this.showMaterialWarn || this.showSaleWarn || this.showPriceWarn || this.picSize || this.picType){
          //数据 有误
          console.log('数据 有误')
          this.showSendDataTip = true
          setTimeout(()=>{
            this.howSendDataTip = false
            console.log('setTimeOut有执行')
          },1500)
        }else{
          //数据无误 可以提交
          console.log('数据无误 可以提交')
          const inputT = this.$refs.foodPic.files[0]
          var fromdata = new FormData()
          fromdata.append('file',inputT)
          // console.log(fromdata.get('file'))

          axios.post('/pic',fromdata).then(res=>{
            // 获取到数据之后的操作
            //图片链接res.data.url
            const food_detail = {
              food_name :this.foodName,
              food_img : res.data.url,
              main_material : this.materialTotalText,
              food_month_sale : this.monthSale,
              price : this.price,
              food_id : this.getUid()
            }
            // console.log(food_detail)
            // 发送数据并传给 食物列表 编辑页
            this.$emit('foodDataCallback',food_detail)
          })

        }
      }else{
        //有数据没填完 请补充数据
        this.showSendDataTip = true
        setTimeout(()=>{
          this.showSendDataTip = false
          console.log('setTimeOut有执行')
        },1500)
        console.log('有数据没填完 请补充数据')
      }

    },
    backPage3(){
      this.$emit('back2')
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
    // cesi(){
    //   var a = this.getUid
    //   console.log(a)
    // }
  },
  created(){
    this.isClick = Array.apply(null,{length:25}).map(function(){return false})
  },
  mounted(){
    // console.log(`isClick:${this.isClick.length}`)
  }
}
</script>
<style lang="less">
@import './insert-food.less';
</style>
