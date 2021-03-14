<template>
<div class="C-box">
  <div class="C-main" v-if="mainView2">
    <div class="C-main-path">
      <div v-for="(item,index) in typeList" :key="index" @mousedown="typeStart" @mouseout="typeEnd" ref="tabType" :class="['C-type-path',{'C-isOpacity':TopacityArr[index]}]">
        <div class="C-name">{{item.food_tab}}</div>
        <transition name='typedelete'>
        <div class="C-delete-btn" v-show="TisShowDelete[index]">
          <img src="./img/删除2.png" alt="" @click="deleteTypeBtn">
          <img src="./img/修改2.png" alt="" @click="editBut(index)">
        </div>
        </transition>
      </div>
      <div class="C-back" @click="typeBackHandle">
        <span class="back-name">返</span>
        <span class="back-name">回</span>
      </div>
      <div class="C-page-buttom">
        已经滚动到页面底部
      </div>
    </div>
    <div class="C-add-type">
      <img src="./img/添加.png" alt=""@click="addType">
    </div>
    <!--移动的模块-->

    <div class="C-move-path" v-show="isShowMove" :style="{top:moveTop+'px'}">
      <div class="C-name">{{cacheData2[0].food_tab}}</div>
    </div>
  </div>
  <insert-food v-if="showInsertPage" @typeSendDate='typeDataCallback' @backType2='insertBack'></insert-food>
  <edit-type v-if="showEditPage" @edit="editCallback" :value="editDatas" @backType='editBackHandle'></edit-type>
</div>
</template>
<script>
import API from '../../../../../api/login/login'
import EditFood from '../food-list-sort/edit-food/edit-food.vue'
import insertFood from '../insert-type'
import editType from './edit-type/edit-type.vue'
export default {
  data(){
    return{
      typeList:[],
      // typeScrollTop:'',
      cacheData2:[{food_tab:'',tab_id:'',child_food_list:[]}],
      cacheArr2:'',
      cacheDeleteArr:'',
      cacheDeleteData:'',
      isShowMove:false,
      moveTop:'',
      startTab:'',
      // 半透明的模块数组
      TopacityArr:[],
      startSecond:'',
      Ttimer:'',
      isLongPass:false,
      longPassSceond:1500,
      TstartX:'',
      TisShowDelete:[],
      showInsertPage:false,
      mainView2:true,
      showEditPage:false,
      editDatas:{},
      editNum:''



    }
  },
  components:{
    insertFood,
    editType,
    EditFood
  },
  watch:{
    TopacityArr(){
      return Array.apply(null,{length:this.typeList.length}).map(()=>false)
    },
    TisShowDelete(){
      return Array.apply(null,{length:this.typeList.length}).map(()=>false)
    }
  },
  methods:{
    typeStart(evt){
      //判断是否长按
      this.startSecond = Date.now()
      // console.log('开始')
      // 记录开始点击的X轴
      this.TstartX = evt.targetTouches[0].clientX;
      // 计算一个 容器的 高度
      const CHeight = this.$refs.tabType[0].clientHeight
      // 有多少个容器
      const CNum = this.typeList.length
      // 判断点击的是第几个容器
      var typeTop = evt.target.offsetTop;
      var i = 1
       for(i ; i<=CNum; i++ ){
        if(i * CHeight > typeTop){
          console.log('从第'+i+'个对象')
          this.startTab = i
          break;
        }
      }
      // 1.5后自动显示半透明
      this.Ttimer = setTimeout(()=>{
        // 把按下的元素显示成半透明
        this.TopacityArr.splice((i-1),1,true)
        // console.log('我被执行了吗？')
      },this.longPassSceond)


    },
    typeMove(evt){
      // console.log('移动中')
      //元素移动前 判断是否 是长按操作
      const moveSecond = Date.now()
      if( moveSecond - this.startSecond > 1500){
        //是一个长按操作
        //标记状态
        this.isLongPass = true
        //处理将要被移动的元素
        // 这个是页面滚动出去的高度
        // var chooseHeight2 = evt.targetTouches[0].pageY;
        // this.typeScrollTop = CHeight - chooseHeight2
        //将起始的那个tab缓存出去
        this.cacheData2 = this.typeList.slice((this.startTab-1),this.startTab)
        // 同样缓存删除列表
        this.cacheDeleteArr = this.TisShowDelete.slice()
        this.cacheDeleteData = this.TisShowDelete.slice((this.startTab-1),this.startTab)
        // 将整个数据缓存出去
        this.cacheArr2 = this.typeList.slice()
        // 显示 移动中缓存的模块
        this.isShowMove = true
        // 把按下的元素显示成半透明 * 其实可以不用写
        // this.TopacityArr[(this.startTab-1)] = true

        this.moveTop = evt.changedTouches[0].pageY
      }

    },
    typeEnd(evt){
      // 无论是否是长按的操作都要进行的操作
      this.startSecond = ''
      clearTimeout(this.Ttimer)
      //判断是否是长按操作
      if(this.isLongPass){
        // console.log('是一个长按操作')
        //是长按操作
        // 隐藏 移动中缓存的模块
        this.isShowMove = false
        // 计算放下去元素距离页面顶部的高度
        var typeTop2 = evt.changedTouches[0].pageY
        // console.log(this.typeScrollTop)
        // 计算一个容器的高度
        const CHeight2 = this.$refs.tabType[0].clientHeight
        // 有多少个容器
        const CNum2 = this.typeList.length
        for(var i = 1 ; i<=CNum2; i++ ){
          if(i * CHeight2 > typeTop2){
            console.log('到'+i+'个对象')
            // 提取最后一个对象
            const lastTab = this.cacheArr2.slice((i-1),i)
            const lastOpacityTab = this.cacheDeleteArr.slice((i-1),i)
            // console.log('第一个对象：'+this.cacheData2)
            // console.log('最后一个对象：'+lastTab)
            // 先用最后一个对象 替换 开始点击的位置
            this.cacheArr2.splice((this.startTab-1),1,lastTab[0])
            this.cacheDeleteArr.splice((this.startTab-1),1,lastOpacityTab[0])
            // 在用第一个对象放在 按下去 i 的位置
            this.cacheArr2.splice((i-1),1,this.cacheData2[0])
            this.cacheDeleteArr.splice((i-1),1,this.cacheDeleteData[0])
            // 在给this.typeList 重新赋值
            this.typeList = this.cacheArr2
            this.TisShowDelete = this.cacheDeleteArr.slice()
            // console.log(this.TopacityArr)

            // 清空数据
            this.cacheArr2 = ''
            this.cacheData2 = [{food_tab:'',tab_id:'',child_food_list:[]}]
            this.cacheDeleteArr = ''
            this.cacheDeleteData = ''
            this.startTab = ''
            // 把所有的元素都设置回正常
            this.TopacityArr = Array.apply(null,{length:this.typeList.length}).map(()=>false)
            // 把长按标志变成false
            this.isLongPass = false

            break;
          }
        }

      }else{
        // 以防万一

        // console.log('不是一个长按操作')
        // 记录放下的x轴位置
        const TendX = evt.changedTouches[0].clientX
        // 判断左拉还是右拉
        if((TendX - this.TstartX)>70){
          // 从左往右拉 隐藏 删除按钮
          // console.log('隐藏删除按钮')
          this.TisShowDelete.splice((this.startTab-1),1,false)
          // this.isShowDelete[(this.startDiv-1)] = false
        }else if((this.TstartX - TendX)>70){
          // 从右往左拉 显示 删除按钮
          // console.log('显示删除按钮')
          // this.isShowDelete[(this.startDiv-1)] = true
          this.TisShowDelete.splice((this.startTab-1),1,true)

        }else{
          // console.log('什么也没发生')
        }
      }




    },
    addType(){
      this.showInsertPage = true
      this.mainView2 = false
    },
    // 添加食物类型的 回调函数
    typeDataCallback(value){
      this.showInsertPage = false
      this.typeList.push(value)
      this.mainView2 = true
      // 添加食物列表的类型后返回的数据
      // console.log('typeList:'+this.typeList[0].food_tab)

    },
    // 点击返回按钮 触发的函数
    typeBackHandle(){
      const sendData = {
        food_list : this.typeList
      }
      API.editShopfoodList(sendData).then((res)=>{
        console.log(res)
        if(res.data.success){
          console.log('食物类型插入成功')
          this.$emit('typeBackCallback',this.typeList)
        }else{
          console.log('食物类型插入失败')
        }
      })

    },
    deleteTypeBtn(){
      this.typeList.splice((this.startTab-1),1)
      this.TopacityArr.splice((this.startTab-1),1)
      this.TisShowDelete.splice((this.startTab-1),1)
    },
    editBut(num){
      console.log('编辑按钮')
      //发送给组件的数据
      var data = this.typeList.slice(num,num+1)
      this.editDatas = data[0],
      this.editNum = num
      console.log(`点击第${num}个编辑按钮`)
      this.mainView2 = false
      this.showEditPage = true
    },
    //编辑按钮的回调函数
    editCallback(value){
      this.typeList.splice(this.editNum,1,value)
      this.mainView2 = true
      this.showEditPage = false
    },
    editBackHandle(){
      this.mainView2 = true
      this.showEditPage = false
    },
    insertBack(){
      this.mainView2 = true
      this.showInsertPage = false
    }
  },
  beforeMount(){
    // 第一时间 要把prop中的数据 传入 sendTypeData 中
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
  // 把prop中的值拷贝到this.sendData中
  deepCopy(this.typeList,this.typeInfo)
  // console.log('typeList:'+this.typeList)
  },
  mounted(){
    document.addEventListener('touchstart', this.typeStart, false);
    document.addEventListener('touchend', this.typeEnd, false);
    document.addEventListener('touchmove', this.typeMove,false);
    // 设置点击时的那个元素变半透明数组
    this.TopacityArr = Array.apply(null,{length:this.typeList.length}).map(()=>false)
    this.TisShowDelete = Array.apply(null,{length:this.typeList.length}).map(()=>false)
  },
  destroyed(){
    document.removeEventListener('touchstart', this.typeStart, false);
    document.removeEventListener('touchend', this.typeEnd, false);
    document.removeEventListener('touchmove', this.typeMove,false);
  },
  props:{
    typeInfo:{
      type: Array,
      default:[]
    }
  }
}
</script>
<style lang="less">
@import './type-sort.less';
</style>
