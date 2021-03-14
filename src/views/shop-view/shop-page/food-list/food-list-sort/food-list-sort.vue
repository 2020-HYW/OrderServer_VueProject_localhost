<template>
  <div>
    <div class="A-box" :style="{width:winW+'px'}" v-if="mainView">
      <!--<div class="A-right-p" :style="{height:winH-55+'px'}">-->
      <div class="A-right-p">
        <div class="A-food-tab">
          <div class="A-food-title">{{sendData.food_tab}}</div>
          <!--为下面添加 mousedown 和 mouseout事件-->

          <div v-for="(item,index) in sendData.child_food_list" :key="index" :class="[{'opacityBox':opacityArr[index]},'A-tab']" @mousedown="handleStart" @mouseout="handleEnd" ref="box">
            <div class="A-food-pic">
              <img :src=item.food_img alt="">
            </div>
            <div class="A-text-info">
              <p class="A-food-name">{{item.food_name}}</p>
              <p class="A-main-material">主要原料:{{item.main_material}}</p>
              <p class="A-food-month-sale">月售{{item.food_month_sale}}份</p>
              <div class="A-price-and-button">
                <div class="A-price">￥{{item.price}}</div>
                <!--排序操作在这里执行-->
                <div class="A-buttonI" >
                  <img src="./img/添加.png" alt="">
                </div>
              </div>
            </div>
            <transition name='deleteBtn'>
            <div class="delete" v-show="isShowDelete[index]" @click="deleteHandle">
              <div class="word">删</div>
              <div class="word">除</div>
            </div>
            </transition>
            <!--编辑食物列表按钮-->
            <transition name='deleteBtn'>
            <div class="editBtn" v-show="isShowDelete[index]" @click="editHandle(index)">
              <div class="word2">编</div>
              <div class="word2">辑</div>
            </div>
            </transition>

          </div>
        </div>
        <div class="backBtn" @click="backHandle">
          <div class="btnName">
            <span class="word">返</span>
            <span class="word">回</span>
          </div>
        </div>
        <div class="A-shopMessage">
          已经滑动到底部
        </div>

      </div>
      <!--下面这个是 移动的模块-->
      <div class="A-moveBox" v-show="isbox" ref="moveBox" :style="{top:TOP+'px',width:winW+'px'}">
        <div class="A-box-border">
          <div class="A-food-pic">
            <img :src=cacheData[0].food_img alt="">
          </div>
          <div class="A-text-info">
            <p class="A-food-name">{{cacheData[0].food_name}}</p>
            <p class="A-main-material">主要原料:{{cacheData[0].main_material}}</p>
            <p class="A-food-month-sale">月售{{cacheData[0].food_month_sale}}份</p>
            <div class="A-price-and-button">
              <div class="A-price">￥{{cacheData[0].price}}</div>
              <div class="A-buttonI" >
                <img src="./img/添加.png" alt="">
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="add-food" @click="addFoodHandle">
        <div class="up">
          <img src="./img/上拉.png" alt="">
        </div>
        <div class="add">
          <img src="./img/加.png" alt="">
        </div>
      </div>

    </div>
    <insert-food v-if="insertFoodBtn" @foodDataCallback="addFoodCallback" @back2='pagebackHandle2'></insert-food>
    <edit-food v-if="editFoodBtn" @editCallback='editCallbackHandle' :editInfo='editDefaultData' @back='pagebackHandle'></edit-food>

  </div>


</template>
<script>
import insertFood from '../insert-food'
import editFood from './edit-food/edit-food.vue'
export default {
  data(){
    return{
      boxHeight:'',
      boxNum:'',
      startDiv:'',
      cacheArr:[],
      cacheData:[
        {
          food_name:'',
          food_img:'',
          main_material:'',
          food_month_sale:'',
          price:'',
          food_id:''
        }
      ],
      TOP:'',
      isbox:false,
      opacityArr:[],
      sendData:{
        food_tab:'',
        tab_id:'',
        child_food_list:[
          {
            food_name:'',
            food_img:'',
            main_material:'',
            food_month_sale:'',
            price:'',
            food_id:''
          }
        ]
      },
      // 删除按钮 显示 合集
      isShowDelete:[],
      // 按下去的时间,
      startTime:'',
      // 发生移动时的时间
      moveTime:'',
      // 设置按下去多长时间 发生拖拽效果
      second:1500,
      // 定时器
      timer:'',
      startX:'',
      insertFoodBtn:false,
      // 删除的集合
      isDeleteArr:[],
      cacheDeleteArr2:[],
      cacheDeleteData2:'',
      editDefaultData:{},
      mainView:true,
      editFoodBtn:false,
      editFoodNum:''

    }
  },
  components:{
    insertFood,
    editFood
  },
  watch:{
    opacityArr(){
      return Array.apply(null,{length:this.boxNum}).map(item=>{
        return item = false
      })
    },
    isShowDelete(){
      return Array.apply(null,{length:this.boxNum}).map(item=>{
        return item = false
      })
    },
    isDeleteArr(){
      return Array.apply(null,{length:this.boxNum}).map(item=>{
        return item = true
      })
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
    handleStart(evt){
      // 禁止移动

      //禁止页面滑动
        // evt.preventDefault();
      // 长按1.5s后即可以移动元素
      this.startTime = Date.now()
      // 这个是元素在页面中的高度 用来判断是第几个元素被触发
      var chooseHeight = evt.target.offsetTop;
      // 这个是用来计算 用户时候发生左右移动时使用的 记录下其实的X轴的位置
      this.startX = evt.targetTouches[0].clientX;
      // 判断这是第几个对象
      var i = 1
      // console.log(this.boxNum)
      for(i ; i<=this.boxNum; i++ ){
        if(i * this.boxHeight > chooseHeight){
          console.log('从第'+i+'个对象')
          this.startDiv = i

          break;
        }
      }
      // 1.5s后被选元素变成半透明 告诉用户改元素可以发生移动
      this.timer = setTimeout(()=>{
        this.opacityArr.splice((this.startDiv-1),1,true)
      },this.second)

    },
    handleMove(evt){
      //清除定时器
      // clearTimeout(this.timer)
      // 判断是下拉 还是 左拉
      this.moveTime = Date.now()
      if(this.moveTime-this.startTime >this.second ){
        // console.log('移动zhong')
        // 这是一个下拉动作 触发相关的操作
        // --第 this.startDiv 个元素变半透明
        this.opacityArr.splice((this.startDiv-1),1,true)
        // -缓存 传入的数据 到 cacheArr中
        this.cacheArr = this.sendData.child_food_list.slice()
        // -缓存 cacheArr 中 第i 到 cacheData中 slice 返回的是一个新数组
        this.cacheData = this.cacheArr.slice((this.startDiv-1),this.startDiv)
        //同样删除的数组也要
        this.cacheDeleteArr2 = this.isShowDelete.slice()
        this.cacheDeleteData2 = this.isShowDelete.slice((this.startDiv-1),this.startDiv)
        // 当移动时
        // 显示缓存的数据
        this.isbox = true

        this.TOP = evt.changedTouches[0].pageY
        // console.log(evt)
        // console.log(this.TOP)


      }else{
        // 左拉


      }
      // console.log('移动中...')
      // this.TOP = evt.changedTouches[0].pageY
    },
    handleEnd(evt){
      // console.log('放下了')
      // this.startTime=''
      clearTimeout(this.timer)
      if(this.moveTime-this.startTime >this.second ){
        // 这是一个下拉动作
        // console.log('这是一个下拉动作')
        this.isbox = false
        // 被选中物体 移动后 放下 在页面中的高度
        var chooseHeight = evt.changedTouches[0].pageY

        // 判断该物体 是第几个对象
        var i = 1
        for(i ; i<=this.boxNum; i++ ){
          if(i * this.boxHeight > chooseHeight){
            console.log('到'+i+'个对象')
            // 将第i个要替换的元素提取出来
            const endDiv = this.cacheArr.slice(i-1,i)
            // 同样删除列表也要
            const endDeleteBtn = this.cacheDeleteArr2.slice(i-1,i)
            //因为开始的 startDiv已经缓存在了 this.cacheData[0]
            // 所以应该先用 i 替换其实的位置上
            this.cacheArr.splice((this.startDiv-1),1,endDiv[0])
            this.cacheArr.splice((i-1),1,this.cacheData[0])
            // 同样删除列表也要
            this.cacheDeleteArr2.splice((this.startDiv-1),1,endDeleteBtn[0])
            this.cacheDeleteArr2.splice((i-1),1,this.cacheDeleteData2[0])
            // 将合并好的数据再付给 原来的值
            this.sendData.child_food_list = this.cacheArr
            this.isShowDelete = this.cacheDeleteArr2.slice()
            // 将缓存清空
            this.cacheArr = ''
            this.cacheData = [
              {
                food_name:'',
                food_img:'',
                main_material:'',
                food_month_sale:'',
                price:'',
                food_id:''
              }
            ]
            this.cacheDeleteArr2 = ''
            this.cacheDeleteData2 = ''
            // 清除所有的不透明
            this.opacityArr = Array.apply(null,{length:this.boxNum}).map(item=>{
              return item = false
            })
            // 清除起始和移动的时间
            this.startTime = ''
            this.moveTime = ''
            this.scrollTop = ''
            break;
          }
        }
      }else{
        //这不是一个下拉动作
        const endX = evt.changedTouches[0].clientX;
        // const endX = evt.target.offsetLeft;
        if((endX - this.startX)>70){
          // 从左往右拉 隐藏 删除按钮
          // console.log('隐藏删除按钮')
          this.isShowDelete.splice((this.startDiv-1),1,false)
          // this.isShowDelete[(this.startDiv-1)] = false
        }else if((this.startX - endX)>70){
          // 从右往左拉 显示 删除按钮
          // console.log('显示删除按钮')
          // this.isShowDelete[(this.startDiv-1)] = true
          this.isShowDelete.splice((this.startDiv-1),1,true)

        }else{
          // console.log('什么也没发生')
        }
      }


    },
    // 返回按钮 触发的函数
    backHandle(){
      // 不用返回上一页 因为是在一页中调用的
      //显示下方的tab栏
      this.$store.commit('isMarkHandle')
      //返回 修改后的数据
      this.$emit('sortListHandle',this.sendData)
    },

    // 增加按钮
    addFoodHandle(){
      // console.log('我被按下去了')
      this.insertFoodBtn = !this.insertFoodBtn
      this.mainView = false
    },
    addFoodCallback(value){
      console.log('我从食物注册页面 带着数据回来了')
      this.insertFoodBtn = !this.insertFoodBtn
      this.mainView = true
      // console.log(value)
      this.sendData.child_food_list.splice(this.boxNum,0,value)
      // console.log('打印出来的数据'+this.sendData)
      // window.reload()


    },
    deleteHandle(){
      // 删除操作
      console.log('执行删除')
      this.sendData.child_food_list.splice((this.startDiv-1),1)
      console.log('修改前：'+ this.opacityArr)
      this.opacityArr.splice((this.startDiv-1),1)
      this.isShowDelete.splice((this.startDiv-1),1)


    },
    editHandle(num){
      console.log('编辑按钮')
      this.mainView = false
      this.editFoodBtn = true
      // 传参
      const sendEditData = this.sendData.child_food_list.slice((this.startDiv-1),this.startDiv)
      this.editDefaultData = sendEditData[0]
      this.editFoodNum = num
    },
    editCallbackHandle(value){
      //传回来的回调函数
      console.log('我从编辑页面 带着数据回来了')
      // console.log(value)
      this.editFoodBtn = false
      this.mainView = true
      this.sendData.child_food_list.splice((this.editFoodNum),1,value)
    },
    pagebackHandle(){
      this.editFoodBtn = false
      this.mainView = true
    },
    pagebackHandle2(){
      this.insertFoodBtn = !this.insertFoodBtn
      this.mainView = true
    }


  },
  beforeMount(){
  // 第一时间 要把prop中的数据 传入 sendData 中
    // 定义一个深拷贝的方法
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
  deepCopy(this.sendData,this.food_list)
  // console.log(this.sendData)
  },
  mounted(){
    document.addEventListener('touchstart', this.handleStart, false);
    document.addEventListener('touchend', this.handleEnd, false);
    document.addEventListener('touchmove', this.handleMove, {passive: false});
    // document.addEventListener('scroll',this.scrollHandle,false)
    // 一个被选中的对象的高度
    this.boxHeight = this.$refs.box[0].clientHeight
    // console.log(`this.boxHeight:${this.boxHeight}`)
    // 这个屏幕一共有 divNum 个这样的对象
    // this.boxNum = this.$refs.box.length
    this.boxNum = this.sendData.child_food_list.length
    // console.log(`this.boxNum:${this.boxNum}`)
    // opacityArr 用于选取某个元素后 那个元素显示半透明
    this.opacityArr = Array.apply(null,{length:this.boxNum}).map(item=>{
      return item = false
    })
    // 删除的按钮
    this.isShowDelete = Array.apply(null,{length:this.boxNum}).map(item=>{
      return item = false
    })
    this.isDeleteArr = Array.apply(null,{length:this.boxNum}).map(item=>{
      return item = true
    })
  },
  beforeUpdate(){
    // 这个屏幕一共有 divNum 个这样的对象
    // this.boxNum = this.$refs.box.length
    this.boxNum = this.sendData.child_food_list.length
  },
  beforeDestroy(){
    document.removeEventListener('touchstart', this.handleStart, false);
    document.removeEventListener('touchend', this.handleEnd, false);
    document.removeEventListener('touchmove', this.handleMove,false);
  },
  props:{
    food_list : {
      type:Object,
      default:function(){
        return {
          food_tab:'',
          tab_id:'',
          child_food_list:[
            {
              food_name:'',
              food_img:'',
              main_material:'',
              food_month_sale:'',
              price:'',
              food_id: ''
            }
          ]
        }
      }
    }
  }


}
</script>
<style lang="less">
@import './food-list-sort.less';
</style>
