<template>
<div>
  <div class="F-data-model" v-show="!isMask">
    <div class="F-bg">
      <div class="F-box">
      <!-- 商铺名称-->
        <div class="path">
          <div class="message">
            <div class="tip-info">店铺名称：</div>
            <div class="choose-info">
              <input type="text" class="input-text" v-model.trim="shopName">
            </div>
          </div>
          <transition name="fade">
          <div class="warn-info" v-show="showNameWarn">
            <img src="./img/警告.png" alt="">
            店铺名称 不宜超过 8 个字
          </div>
          </transition>
        </div>
        <!--店铺图片-->
        <div class="path">
          <div class="message">
            <div class="tip-info">店铺照片：</div>

            <div class="input-img">
              <img :src="shopPicUrl" alt="" ref="choosedPic">
              <input type="file" class="option" @change="handleShopImg" ref="shopImg">
            </div>
          </div>
          <!--记得选择图片-->
          <transition name="fade">
          <div class="picTip" v-show="!hasShopImg">
            <img src="./img/提醒.png" alt="">
            记得选择图片
          </div>
          </transition>
          <!--商铺图片不能超过2M-->
          <transition name="fade">
          <div class="picSize" v-show="shopImgSize">
            <img src="./img/警告.png" alt="">
            图片 不能超过2M
          </div>
          </transition>
          <!--食物图片类型-->
          <transition name="fade">
          <div class="picType" v-show="shopImgType">
            <img src="./img/警告.png" alt="">
            图片 只能以 .jpeg / .jpg / .png 结尾
          </div>
          </transition>

        </div>
        <!--联系方式-->
        <div class="path">
          <div class="message">
            <div class="tip-info">联系电话：</div>
            <div class="choose-info">
              <input type="number" class="input-text" v-model.trim="phone">
            </div>
          </div>
          <transition name="fade">
          <div class="warn-info" v-show="phoneWarn">
            <img src="./img/警告.png" alt="">
            请输入正确的 手机号
          </div>
          </transition>
        </div>
        <!--店铺地址-->
        <div class="path">
          <div class="message">
            <div class="tip-info">店铺地址：</div>
            <div class="choose-info">
              <textarea class="input-text" v-model.trim="address"></textarea>
            </div>
          </div>
          <transition name="fade">
          <div class="warn-info" v-show="addressWarn">
            <img src="./img/警告.png" alt="">
            店铺地址 不宜超过 30个字 请简要书写
          </div>
          </transition>
        </div>
        <!--营业时间-->
        <div class="path">
          <div class="message">
            <div class="tip-info">营业时间：</div>
            <div class="choose-info">
              <div class="time-box">
              <!--循环三次按钮-->
              <template v-for="index in this.forNum">
                <div class="business-time-box">
                  <div class="start-time" @click="appearMark(index)">
                  {{allTimeList[index-1].one}}:{{allTimeList[index-1].two}}
                  </div>
                  <div class="center-line" @click="appearMark(index)"></div>
                  <div class="end-time" @click="appearMark(index)">
                  {{allTimeList[index-1].three}}:{{allTimeList[index-1].four}}
                  </div>
                  <div class="btn" @click="reduceBtn(index)">
                    <img src="./img/减少.png" alt="">
                  </div>
                  <div class="btn" @click="addBtn(index)">
                    <img src="./img/添加2.png" alt="">
                  </div>
                </div>
              </template>
              </div>
            </div>
          </div>
          <!--警告信息-->
          <transition name="fade">
          <div class="warn-info" v-show="showNameWarn">
            <img src="./img/警告.png" alt="">
            食物名称 不宜超过7个字
          </div>
          </transition>
          <!--警告信息 不能再减少-->
          <transition name="fade">
          <div class="warn-info" v-show="reduceWarn">
            <img src="./img/警告.png" alt="">
            最少填 1个 营业时间段
          </div>
          </transition>
          <!--警告信息 不能再增加-->
          <transition name="fade">
          <div class="warn-info" v-show="addWarn">
            <img src="./img/警告.png" alt="">
            营业时间 最多填 3 个时间段
          </div>
          </transition>
          <!--时间重叠警告timeOverlap-->
          <transition name="fade">
          <div class="warn-info" v-show="timeOverlap">
            <img src="./img/警告.png" alt="">
            时间段 之间存在 重叠部分 请修改
          </div>
          </transition>
        </div>
        <!--商店类型-->
        <div class="path">
          <div class="message">
            <div class="tip-info">商铺类型：</div>
            <div class="choose-info">
              <textarea class="input-text" v-model.trim="shopType"></textarea>
              <span :class="[isDown?'choose-button':'choose-button-up']" @click="showChooses">
                <img src="./img/下拉.png" alt="">
              </span>
            </div>
          </div>
          <div :class="{typeTotalText:isShowTotalText}">{{typeTotalText}}</div>
          <transition name="fade">
          <div class="choose-tip" v-show="chooseOption">
            <!--checkbox 提示信息-->
            <template v-for="(item,index) in tipOptionList">
              <div :class="['btn-box',{'click-btn-box':isClick[index]}]" :key="index">
                <div class="btn" ref="btnBox" @click="clickBtnBox(index)">
                  <label :for="`Option${index}`" class="lableTab">
                    <div class="textNode">{{item}}</div>
                    <input type="checkbox" v-model="letter" :value="item" :id="`Option${index}`" class="inputTab">
                  </label>
                </div>
              </div>
            </template>
          </div>
          </transition>
          <transition name="fade">
          <div class="warn-info" v-show="shopTypeWarn">
            <img src="./img/警告.png" alt="">
            商铺类型 不宜超过11个字 请简要填写
          </div>
          </transition>
        </div>
        <!--公告/提示-->
        <div class="path">
          <div class="message">
            <div class="tip-info">公告/提示：</div>
            <div class="choose-info">
              <textarea type="text" class="input-text" v-model.trim="notices"></textarea>
            </div>
          </div>
          <transition name="fade">
          <div class="warn-info" v-show="noticesWarn">
            <img src="./img/警告.png" alt="">
            公告 不宜超过25个字 请简要书写
          </div>
          </transition>
        </div>
        <!--****营业资质-->
        <div class="path">
          <div class="message">
            <div class="tip-info">营业资质：</div>

            <div class="input-img">
              <img :src="businessCertificateUrl" alt="" ref="choosedPic2">
              <input type="file" class="option" @change="handleC" ref="CPic">
            </div>
          </div>
          <!--记得选择图片-->
          <transition name="fade">
          <div class="picTip" v-show="!hasPicC">
            <img src="./img/提醒.png" alt="">
            记得选择图片
          </div>
          </transition>
          <!--商铺图片不能超过2M-->
          <transition name="fade">
          <div class="picSize" v-show="picSizeC">
            <img src="./img/警告.png" alt="">
            图片 不能超过2M
          </div>
          </transition>
          <!--食物图片类型-->
          <transition name="fade">
          <div class="picType" v-show="picTypeC">
            <img src="./img/警告.png" alt="">
            图片 只能以 .jpeg / .jpg / .png 结尾
          </div>
          </transition>

        </div>
        <!--出餐时间-->
        <div class="path">
          <div class="message">
            <div class="tip-info">出餐时间：</div>
            <div class="choose-info">
              <input type="number" class="input-text" v-model.trim="mealTime">
              <div class="unit">分钟</div>
            </div>

          </div>
          <transition name="fade">
          <div class="warn-info" v-show="mealTimeWarn">
            <img src="./img/警告.png" alt="">
            出餐时间 不宜超过 100 分钟
          </div>
          </transition>
        </div>
        <!--配送费用-->
        <div class="path">
          <div class="message">
            <div class="tip-info">配送费用：</div>
            <div class="choose-info">
              <input type="number" class="input-text" v-model.trim="cost">
              <div class="unit">元</div>
            </div>
          </div>
          <transition name="fade">
          <div class="warn-info" v-show="costWarn">
            <img src="./img/警告.png" alt="">
            配送费用 不宜超过 10 元
          </div>
          </transition>
        </div>
        <!--配送时间-->
        <div class="path">
          <div class="message">
            <div class="tip-info">配送时间：</div>
            <div class="choose-info">
              <input type="number" class="input-text" v-model.trim="dTime">
              <div class="unit">分钟</div>
            </div>
          </div>
          <transition name="fade">
          <div class="warn-info" v-show="dTimeWarn">
            <img src="./img/警告.png" alt="">
            配送时间 不宜超过 180分钟
          </div>
          </transition>
        </div>
      </div>
      <!--发送按钮-->
      <div class="sendDataTip" v-show="showSendDataTip">
        <img src="./img/警告.png" alt="">
        数据有误！请修改数据
      </div>
      <div @click="sendData" class="sendData">
        <div class="sendText">提交数据</div>
      </div>
      <!--返回按钮-->
      <div @click="backPreviousPage" class="sendData">
        <div class="sendText">返回</div>
      </div>
    </div>
  </div>
  <div class="mask" v-show="isMask" :style="{height:winH-60+'px', width:winW+'px'}" @click.self="back">
    <div class="business-time-box">
      <transition name="fade">
      <div v-show="!businessHourWarn" @click="back">点击其他区域返回</div>
      </transition>
      <div class="time-box">
        <div class="business-time-box-inner">
          <div class="start-time">
            {{startHour}}:{{startMinute}}
          </div>
          <div class="center-line"></div>
          <div class="end-time">
            {{endHour}}:{{endMinute}}
          </div>
        </div>
        <!--时间选择器-->
        <div class="time-box-inner">
          <div class="choose-time">
            <div class="hour">
              <div class="itemH">
                <div class="item" v-for="i in hourItem" @click="startHourHandle(i)">{{i}}</div>
              </div>
            </div>
            <div class="hour">
              <div class="itemH">
                <div class="item" v-for="i in minuteItem" @click="startMinuteHandle(i)">{{i}}</div>
              </div>
            </div>
          </div>

          <div class="time-center-line"></div>

          <div class="choose-time">
            <div class="hour">
              <div class="itemH">
                <div class="item" v-for="i in hourItem" @click="endHourHandle(i)">{{i}}</div>
              </div>
            </div>
            <div class="hour">
              <div class="itemH">
                <div class="item" v-for="i in minuteItem" @click="endMinuteHandle(i)">{{i}}</div>
              </div>
            </div>
          </div>
        </div>
        <!--警告信息-->
        <transition name="fade">
        <div class="warn-info" v-show="businessHourWarn">
          <img src="./img/警告.png" alt="">
          请正确填写 '开始' 和 '结束' 时间
        </div>
        </transition>
      </div>
    </div>
  </div>
</div>
</template>
<script>
import axios from 'axios'
import { mapMutations } from 'vuex'
import API from '../../../../../api/login/login'
export default {
  data(){
    return{
      foodName:'',
      shopName:'',
      phone:'',
      address:'',
      notices:'',
      mealTime:'',
      cost:'',
      dTime:'',
      shopType:'',
      showNameWarn:false,

      shopNameWarn:false,
      hasShopImg:true,
      shopImgSize:false,
      shopImgType:false,
      phoneWarn:false,
      addressWarn:false,
      noticesWarn:false,
      mealTimeWarn:false,
      businessHourWarn:false,
      hasPicC:true,
      picSizeC:false,
      picTypeC:false,
      costWarn:false,
      dTimeWarn:false,
      showSendDataTip:false,
      chooseOption:false,
      shopTypeWarn:false,
      tipOptionList:['快餐','面馆','麻辣烫','清真','早餐','踩楼','家常菜','大排档','炸鸡店','汉堡店','pizza','西餐','牛排','饺子馆','包子铺','卤菜','烧腊店','云吞铺','面包店','火锅','特色菜','私房菜','猪肚鸡','酒楼','点心'],
      isClick:'',
      isDown:true,
      letter:[],
      hourItem:[],
      minuteItem:[],
      startHour:'00',
      startMinute:'00',
      endHour:'00',
      endMinute:'00',
      isMask:false,
      clickNum:[],
      forNum:1,
      reduceWarn:false,
      addWarn:false,
      timeOverlap:false,

      hasPic:false,
      showSendDataTip:false,
      picSize:false,
      picType:false,
      showPriceWarn:false,
      shopPicUrl:'',
      businessCertificateUrl:'',
      shopId : '',
      allTimeList:[{one:'00',two :'00',three:'00',four:'00'},{one:'00',two :'00',three:'00',four:'00'},{one:'00',two :'00',three:'00',four:'00'}],
      foodList:[]



    }
  },
  watch:{
    // 对输入的监视
    shopName(val){
      if(val.length > 8){
        this.showNameWarn = true
      }else{
        this.showNameWarn = false
      }
    },
    phone(val){
      // 手机
      var phoneReg = /^((\+?86)|(\(\+86\)))?(13[012356789][0-9]{8}|15[012356789][0-9]{8}|18[02356789][0-9]{8}|147[0-9]{8}|1349[0-9]{7})$/;
      // 固话
      // var phoneReg2 = /([0-9]{3,4}-)?[0-9]{7,8}/
      if(phoneReg.test(val)){
        this.phoneWarn = false
      }else{
        this.phoneWarn = true
      }

    },
    address(val){
      if(val.length > 30){
        this.addressWarn = true
      }else{
        this.addressWarn = false
      }
    },
    notices(val){
      if(val.length > 25){
        this.noticesWarn = true
      }else{
        this.noticesWarn = false
      }
    },
    mealTime(val){
      if(val > 100){
        this.mealTimeWarn = true
      }else{
        this.mealTimeWarn = false
      }
    },
    cost(val){
      if(val > 10){
        this.costWarn = true
      }else{
        this.costWarn = false
      }
    },
    dTime(val){
      if(val > 180){
        this.dTimeWarn = true
      }else{
        this.dTimeWarn = false
      }
    },
    shopType(val){
      if(val.length > 10){
        this.shopTypeWarn = true
      }else{
        this.shopTypeWarn = false
      }
    },
    // startHour(val){
    //   return val
    // },
    // startMinute(){},
    // endHour(){},
    // eNdMinute(){}

    //
  },
  computed:{
    typeTotalText(val){
      // var a = '/'
      if(this.letter.length <= 0 && this.shopType.length>=1){
        // console.log('1')
        if(this.shopType.length > 10){
          this.shopTypeWarn = true
        }else{
          this.shopTypeWarn = false
        }
        return `${this.shopType}`
      }else if(this.letter.length>=1 && this.shopType.length <= 0){
        // console.log('2')
        if(this.letter.join('').length > 10){
          this.shopTypeWarn = true
        }else{
          this.shopTypeWarn = false
        }
        return `${this.letter.join('/')}`
      }else if(this.letter.length <=0 && this.shopType.length <= 0){
        this.shopTypeWarn = false
        return ''
      }else{
        if((this.letter.join('')+this.shopType).length > 10){
          this.shopTypeWarn = true
        }else{
          this.shopTypeWarn = false
        }
        return `${this.letter.join('/')}/${this.shopType}`
      }

    },
    isShowTotalText(){
      if(this.typeTotalText.length<=0){
        return false
      }else{
        return true
      }
    },
    winH(){
      return document.documentElement.clientHeight || document.body.clientHeight
    },
    winW(){
      return document.body.clientWidth
    },
    // allTimeList(){
    //   return [{one:'00',two :'00',three:'00',four:'00'},{one:'00',two :'00',three:'00',four:'00'},{one:'00',two :'00',three:'00',four:'00'}]
    // }

  },
  methods:{
    handleShopImg(){
       // 把input type选中的图片显示出来
      var preview = this.$refs.choosedPic;
      var file = this.$refs.shopImg.files[0];
      var reader  = new FileReader();
        reader.addEventListener("load", function () {
        preview.src = reader.result;

      }, false);
      if (file) {
        reader.readAsDataURL(file);
        this.hasShopImg = true
      }
      ///

      if(this.hasShopImg){
        // 有图片 判断图片大小
        var size = this.$refs.shopImg.files[0].size
        if(size < 1048576){
          //图片 < 2M
          // console.log('picSize的判断 图片<2M')
          this.shopImgSize = false
        }else{
          // 图片 > 2M
          this.hasShopImg = true
          // console.log('picSize的判断 图片>2M')
          this.shopImgSize = true
        }
      }else{
        // 还没添加图片
        // console.log('picSize的判断 还没有图片')
        this.shopImgSize = false
      }
      // 图片类型
      if(this.hasShopImg){
        // 有图片 判断图片图片类型
        var picName = this.$refs.shopImg.files[0].name
        const dox =  picName.lastIndexOf('.')
        const suffix = picName.slice(dox)
        // .jpeg | .jpg | .png
        if( suffix == '.jpeg' || suffix == '.jpg' || suffix == '.png'){
          // console.log('picType判断 是一张图片')
          this.shopImgType = false
        }else{
          // 图片类型不对
          // console.log('picType判断 图片类型不对')
          this.shopImgType = true
        }
      }else{
        // 还没添加图片
        // console.log('picType判断 还没图片')
        this.shopImgType = false
      }
    },
    handleC(){
       // 把input type选中的图片显示出来
      var preview = this.$refs.choosedPic2;
      var file = this.$refs.CPic.files[0];
      var reader  = new FileReader();
        reader.addEventListener("load", function () {
        preview.src = reader.result;

      }, false);
      if (file) {
        reader.readAsDataURL(file);
        this.hasPicC = true
      }
      ///

      if(this.hasPicC){
        // 有图片 判断图片大小
        var size = this.$refs.CPic.files[0].size
        if(size < 1048576){
          //图片 < 2M
          // console.log('picSize的判断 图片<2M')
          this.picSizeC = false
        }else{
          // 图片 > 2M
          this.hasPicC = true
          // console.log('picSize的判断 图片>2M')
          this.picSizeC = true
        }
      }else{
        // 还没添加图片
        // console.log('picSize的判断 还没有图片')
        this.picSizeC = false
      }
      // 图片类型
      if(this.hasPicC){
        // 有图片 判断图片图片类型
        var picName = this.$refs.CPic.files[0].name
        const dox =  picName.lastIndexOf('.')
        const suffix = picName.slice(dox)
        // .jpeg | .jpg | .png
        if( suffix == '.jpeg' || suffix == '.jpg' || suffix == '.png'){
          // console.log('picType判断 是一张图片')
          this.picTypeC = false
        }else{
          // 图片类型不对
          // console.log('picType判断 图片类型不对')
          this.picTypeC = true
        }
      }else{
        // 还没添加图片
        // console.log('picType判断 还没图片')
        this.picTypeC = false
      }

      ////
    },
    sendData(){
      // 把图片发送给服务器获取 图片链接 返回给用户

      var filterData =  this.allTimeList.map((item)=>{
          if(item.one == '00' && item.two == '00' && item.three == '00' && item.four == '00'){
           //该项是一个空项 删除这一项
           return ''
          }else{
            // 该项有数值
            var startTime = item.one*60 + item.two*1
            var endTime = item.three*60 + item.four*1

            return {
              startTime:startTime,
              endTime:endTime
            }
          }
        })
        // 删除filterData 中的空对象
        for (let i = 0; i < filterData.length; i++) {
        if (filterData[i] == '') {
          filterData.splice(i, 1);
          i = i - 1;
        }
      }
        // console.log(`图片ref:${this.$refs.shopImg.files[0]}`)
        // console.log(filterData)
        // console.log(`名字长度：${this.shopName.length} && 电话长度：${this.phone.toString().length} && 有无图片：${this.hasShopImg} || 图片URL长度：${this.shopPicUrl.length} && 地址长度${this.address.length} && 商铺类型长度${this.typeTotalText.length} && 公告长度：${this.notices.length} && 有无图片：${this.hasPicC} || 商铺URL长度${this.businessCertificateUrl.length} && 出餐时间：${this.mealTime.toString().length} && 配送费：${this.cost.toString().length} && 配送时间：${this.dTime.toString().length} && 营业时间：${filterData.length}`)

      // 1.先判断是否都写完了   2.判断是否都写正确了
      if(this.shopName.length>0 && this.phone.toString().length>0 && (this.hasShopImg || this.shopPicUrl.length > 0) && this.address.length>0 && this.typeTotalText.length>0 && this.notices.length>0 && (this.hasPicC || this.businessCertificateUrl.length > 0 ) && this.mealTime.toString().length>0 && this.cost.toString().length>0 && this.dTime.toString().length >0 && filterData.length>0){
        //有数据
        if(this.showNameWarn || this.shopImgSize || this.shopImgType || this.phoneWarn || this.addressWarn || this.timeOverlap || this.noticesWarn || this.picSizeC || this.picTypeC || this.mealTimeWarn || this.costWarn || this.dTimeWarn){
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
          var returnShopImg = false
          var returnCpic = false
          var newShopImg = false
          var newCpic = false
          if(this.$refs.shopImg.files[0] != undefined){
            console.log('商铺图片更新')
            newShopImg = true
          }
          if(this.$refs.CPic.files[0] != undefined){
            newCpic = true
            console.log('运营资质图片更新')
          }
          var p1 = ''
          var p2 = ''
          if(newShopImg){
            const inputT = this.$refs.shopImg.files[0]
            var fromdata = new FormData()
            fromdata.append('file',inputT)
            p1 = axios.post('/pic',fromdata).then(res=>{
              this.shopPicUrl = res.data.url
              // console.log(res)
            })
            console.log('p1执行到了')
          }
          if(newCpic){
            const inputT2 = this.$refs.CPic.files[0]
            var fromdata2 = new FormData()
            fromdata2.append('file',inputT2)
            p2 = axios.post('/pic',fromdata2).then(res=>{
              this.businessCertificateUrl = res.data.url
            })
            console.log('p1执行到了')
          }
          // 发送数据前的判断
          if(newShopImg && newCpic){
            Promise.all([p1,p2]).then(()=>{

              var outPutData = {
                shopName : this.shopName,
                shopPic : this.shopPicUrl,
                shopPhone : this.phone,
                shopAddress : this.address,
                businessHours : filterData,
                shopType : this.typeTotalText,
                shopNotices : this.notices,
                businessCertificate : this.businessCertificateUrl,
                mealTime : this.mealTime,
                distributionCost : this.cost,
                distributionTime : this.dTime,
                // 这里特别
                // 补充一个shopId
                shopId : this.shopId,
                food_list: this.foodList.slice()
              }
              // 向服务器和vuex中修改数据
              var data ={
                shop_message : outPutData
              }
              API.editShopInfo(data).then((res)=>{
                if(res.data.success){
                  console.log('成功向数据库中插入修改后的数据')
                  console.log(outPutData)
                  this.$store.commit('editShopInfo',outPutData)
                  this.$emit('editInfoCallback')
                  console.log('两个图片都更新了')
                }else{
                  console.log('服务器插入数据失败请 重新点击提交')
                }
              })
              // --
            })
              // 发送数据
          }else if(newShopImg && !newCpic){
            Promise.all([p1]).then(()=>{

              var outPutData = {
                shopName : this.shopName,
                shopPic : this.shopPicUrl,
                shopPhone : this.phone,
                shopAddress : this.address,
                businessHours : filterData,
                shopType : this.typeTotalText,
                shopNotices : this.notices,
                businessCertificate : this.businessCertificateUrl,
                mealTime : this.mealTime,
                distributionCost : this.cost,
                distributionTime : this.dTime,
                // 这里特别
                // 补充一个shopId
                shopId : this.shopId,
                food_list: this.foodList.slice()
              }
              // 向服务器和vuex中修改数据
              var data ={
                shop_message : outPutData
              }
              API.editShopInfo(data).then((res)=>{
                if(res.data.success){
                  console.log('成功向数据库中插入修改后的数据')
                  console.log(outPutData)
                  this.$store.commit('editShopInfo',outPutData)
                  this.$emit('editInfoCallback')
                  console.log('只有商铺图片更新了')
                }else{
                  console.log('服务器插入数据失败请 重新点击提交')
                }
              })
              // --

            })

          }else if(newCpic && !newShopImg){
            Promise.all([p2]).then(()=>{
              var outPutData = {
                shopName : this.shopName,
                shopPic : this.shopPicUrl,
                shopPhone : this.phone,
                shopAddress : this.address,
                businessHours : filterData,
                shopType : this.typeTotalText,
                shopNotices : this.notices,
                businessCertificate : this.businessCertificateUrl,
                mealTime : this.mealTime,
                distributionCost : this.cost,
                distributionTime : this.dTime,
                // 这里特别
                // 补充一个shopId
                shopId : this.shopId,
                food_list: this.foodList.slice()
              }
              // 向服务器和vuex中修改数据
              var data ={
                shop_message : outPutData
              }
              API.editShopInfo(data).then((res)=>{
                if(res.data.success){
                  console.log('成功向数据库中插入修改后的数据')
                  console.log(outPutData)
                  this.$store.commit('editShopInfo',outPutData)
                  this.$emit('editInfoCallback')
                  console.log('只有资质图片更新了')
                }else{
                  console.log('服务器插入数据失败请 重新点击提交')
                }
              })
              // --
            })
          }else{
            //发送数据
            var outPutData = {
              shopName : this.shopName,
              shopPic : this.shopPicUrl,
              shopPhone : this.phone,
              shopAddress : this.address,
              businessHours : filterData,
              shopType : this.typeTotalText,
              shopNotices : this.notices,
              businessCertificate : this.businessCertificateUrl,
              mealTime : this.mealTime,
              distributionCost : this.cost,
              distributionTime : this.dTime,
              // 这里特别
              // 补充一个shopId
              shopId : this.shopId,
              food_list: this.foodList.slice()
            }
            // 向服务器和vuex中修改数据
              var data ={
                shop_message : outPutData
              }
              API.editShopInfo(data).then((res)=>{
                if(res.data.success){
                  console.log('成功向数据库中插入修改后的数据')
                  console.log(outPutData)
                  this.$store.commit('editShopInfo',outPutData)
                  this.$emit('editInfoCallback')
                  console.log('没有图片更新')
                }else{
                  console.log('服务器插入数据失败请 重新点击提交')
                }
              })
              // --
          }
        }
      }else{
        //有数据没填完 请补充数据
        this.showSendDataTip = true
        setTimeout(()=>{
          this.showSendDataTip = false
          // console.log('setTimeOut有执行')
        },1500)
        console.log('有数据没填完 请补充数据')
      }

    },
    backPreviousPage(){
      this.$emit('backPage')
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
    startHourHandle(index){
      this.startHour = index
      var startTime = (index*60 + this.startMinute)*1
      var endTime = (this.endHour*60 + this.endMinute)*1
      // console.log('开始时间：'+startTime)
      // console.log('结束时间：'+endTime)
      if(startTime < endTime){
        this.businessHourWarn = false
      }else{
        this.businessHourWarn = true
      }
    },
    startMinuteHandle(index){
      this.startMinute = index
      var startTime = (this.startHour*60 + index)*1
      var endTime = (this.endHour*60 + this.endMinute)*1
      // console.log('开始时间：'+startTime)
      // console.log('结束时间：'+endTime)
      if(startTime < endTime){
        this.businessHourWarn = false
      }else{
        this.businessHourWarn = true
      }
    },
    endHourHandle(index){
      this.endHour = index
      var startTime = (this.startHour*60 + this.startMinute)*1
      var endTime = (index*60 + this.endMinute)*1
      // console.log('开始时间：'+startTime)
      // console.log('结束时间：'+endTime)
      if(startTime < endTime){
        this.businessHourWarn = false
      }else{
        this.businessHourWarn = true
      }
    },
    endMinuteHandle(index){
      this.endMinute = index
      var startTime = (this.startHour*60 + this.startMinute)*1
      var endTime = (this.endHour*60 + index)*1
      // console.log('开始时间：'+startTime)
      // console.log('结束时间：'+endTime)
      if(startTime < endTime){
        this.businessHourWarn = false
      }else{
        this.businessHourWarn = true
      }
    },
    back(){
      switch(this.clickNum[0]){
        case 1:
          // console.log('第一个输入框被选中')
          this.allTimeList[0] = {
            one : this.startHour,
            two : this.startMinute,
            three : this.endHour,
            four : this.endMinute
          }
          break;
        case 2:
          // console.log('第二个输入框被选中')
          this.allTimeList[1] = {
            one : this.startHour,
            two : this.startMinute,
            three : this.endHour,
            four : this.endMinute
          }
          break;
        case 3:
          // console.log('第三个输入框被选中')
          this.allTimeList[2] = {
            one : this.startHour,
            two : this.startMinute,
            three : this.endHour,
            four : this.endMinute
          }
          break;
        default :
          console.log('什么也没有匹配到')
      }
      if(!this.businessHourWarn){
        this.isMask = false
        this.clickNum.pop()
        console.log(this.allTimeList)
        // 再返回的时候判断 allTimeList 中的数据是否连贯 如果(allTimeList 中有一条数据不需要判断)
        // 两条及以上时判断最后面两条数据的结尾和开始是否叠加
        var filterData =  this.allTimeList.map((item)=>{
          if(item.one == '00' && item.two == '00' && item.three == '00' && item.four == '00'){
           //该项是一个空项 删除这一项
           return ''
          }else{
            // 该项有数值
            var startTime = item.one*60 + item.two*1
            var endTime = item.three*60 + item.four*1

            return {
              startTime:startTime,
              endTime:endTime
            }
          }
        })
        // 删除filterData 中的空对象
        for (let i = 0; i < filterData.length; i++) {
        if (filterData[i] == '') {
          filterData.splice(i, 1);
          i = i - 1;
        }
      }
        console.log(filterData)
        if(filterData.length >= 2){
          // 如果有两条及以上的数据 就要判断这个数组最后两项的 是否重叠
          var data = filterData.slice(-2)
          console.log(data)
          if(data[0].endTime > data[1].startTime){
            //发生了错误 需要给提示
            this.timeOverlap = true
          }else{
            //
            this.timeOverlap = false
          }
        }

      }
      // console.log(this.allTimeList)
    },
    appearMark(num){
      this.isMask = true
      this.clickNum.push(num)
      console.log('点击的是'+num+'个输入框')
    },
    addBtn(num){
      if(!this.addBtn){
        //有错误不能点击
        console.log('有错误')
      }else{
        // console.log('增加')
        if(this.forNum >=3){
          this.addWarn = true
          setTimeout(()=>{
            this.addWarn =false
          },2000)
        }else{
          this.forNum +=1
        }
        console.log('没错误')

      }
      // console.log('增加的'+num)
    },
    reduceBtn(num){
      // console.log('减少')
      if(this.forNum <= 1){
        this.reduceWarn = true
        setTimeout(()=>{
          this.reduceWarn =false
        },2000)
      }else{
        this.forNum -= 1
        this.allTimeList.splice(num-1,1)
        this.allTimeList.push({one:'00',two:'00',three:'00',four:'00'})
      }
      // console.log('减少的'+num)
    },

    defaultDataHandle(){
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
      //给默认数据赋值
      var defaultDatas = {}
      deepCopy(defaultDatas,this.$store.state.shopInfo.message)
      this.shopName = defaultDatas.shopName
      this.shopId = defaultDatas.shopId
      this.shopPicUrl = defaultDatas.shopPic
      this.phone = defaultDatas.shopPhone*1
      this.address = defaultDatas.shopAddress
      this.shopType = defaultDatas.shopType
      this.notices = defaultDatas.shopNotices
      this.businessCertificateUrl = defaultDatas.businessCertificate
      this.mealTime = defaultDatas.mealTime*1
      this.cost = defaultDatas.distributionCost*1
      this.dTime = defaultDatas.distributionTime*1
      this.foodList = defaultDatas.food_list

    },
    ...mapMutations(['editShopInfo'])


  },
  created(){
    this.isClick = Array.apply(null,{length:25}).map(function(){return false})
    // this.hourItem = Array.apply(null,{length:24}).map()
    var hours = new Array(24).fill('').map((item,index)=>index)
    // console.log(a)
    this.hourItem = hours.map(item=>{
      if(item<10){
        return '0'+item
      }else{
        return item
      }
    })

    var minutes = new Array(60).fill('').map((item,index)=>index)
    this.minuteItem = minutes.map(item=>{
      if(item<10){
        return '0'+item
      }else{
        return new String(item)
      }
    })
    this.defaultDataHandle()

  },

}
</script>
<style lang="less">
@import './edit-info.less';
</style>
