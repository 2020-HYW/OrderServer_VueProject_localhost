<template>
  <div>
    <div class="box" :style="{width:winW+'px'}" v-show="normalPageShow">
      <div class="left-p" :style="{'max-height':winH-55+'px'}" ref="leftP">
        <div class="typeBtn" @click="editTypeShow">
          <div :class="['typeBtnIcon',{'typeBtnIcon-active':editBtnShow}]" >
            <img src="./img/下拉.png" alt="">
          </div>
          <transition name="fade">
          <div class="edit" v-show="editBtnShow" @click="editTypeHandle">
            <div class="btn">编辑</div>
          </div>
          </transition>
        </div>
        <div class="inner" v-if="food_list != []">
          <div v-for="(item,index) in food_list" :key="item.tab_id" :class="['food-tab',{'active-Tab':isClickTab[index]}]" @click="tabHandle(index)"
          ref="leftTab">
            {{item.food_tab}}
          </div>

        </div>
        <div class="blockPlace"></div>
      </div>
      <div class="right-p" :style="{'max-height':winH-55+'px'}" ref="rightPath" v-if="food_list != []">
        <div class="food-tab" v-for="(item,index) in food_list" :key="item.tab_id">
        <!--标题框-->
          <div class="food-title" ref="tabTitle">
            <div class="name">{{item.food_tab}}</div>
            <div :class="['left-push',{'left-push-active':isLeftPush[index]}]">
              <img src="./img/左拉.png" alt="" @click="leftPushHandle(index)">
              <transition name="leftpush">
              <div class="sort" @click="sortHandle(index)" v-show="isLeftPush[index]">
                <span>编</span>
                <span>辑</span>
              </div>
              </transition>
            </div>
          </div>
          <div v-for="item2 in item.child_food_list" :key="item2.food_id" class="tab">
            <div class="food-pic">
              <img :src=item2.food_img alt="">
            </div>
            <div class="text-info">
              <p class="food-name">{{item2.food_name}}</p>
              <p class="main-material">主要原料:{{item2.main_material}}</p>
              <p class="food-month-sale">月售{{item2.food_month_sale}}份</p>
              <div class="price-and-button">
                <div class="price">￥{{item2.price}}</div>
                <!--排序操作在这里执行-->
                <div class="buttonI" >
                  <img src="./img/添加.png" alt="">
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="shopMessage">
          已经滑动到底部
        </div>
      </div>
    </div>

    <food-list-sort :food_list="propData" v-if="foodListSortShow" @sortListHandle="backCallback"></food-list-sort>

    <type-sort v-if="typeSortShow" :typeInfo="food_list" @typeBackCallback='typeDataBackHandle'></type-sort>
  </div>


</template>
<script>
import FoodListSort from './food-list-sort'
import typeSort from './type-sort'
import { mapMutations } from 'vuex'
import API from '.././../../../api/login/login'
export default {
  data(){
    return{
      food_list:[],
      normalPageShow : true,
      foodListSortShow : false,
      propData:{},
      tabNum:'',
      // scrollTop:'',
      isClickTab:'',
      isLeftPush:[],
      foodListLength:'',
      editBtnShow:false,
      typeSortShow:false




    }
  },
  components:{
    FoodListSort,
    typeSort
  },

  computed:{
    winW(){
      return document.body.clientWidth
    },
    winH(){
      return document.documentElement.clientHeight || document.body.clientHeight
    },




  },
  watch:{
    foodListLength(){
      // 计算数据的长度 然后方便 右侧点击的时候显示 按钮 不同的效果
      return this.food_list.length
    },
    isLeftPush(){
      return Array.apply(null,{length:this.foodListLength}).fill(false)
    }
  },
  methods:{
    tabHandle(index){
      this.$nextTick(()=>{
        const sortedArr = this.$refs.tabTitle.slice()
        sortedArr[index].scrollIntoView({behavior: "smooth", block: "center"})

      })
      // this.$refs.tabTitle[index].scrollIntoView({behavior: "smooth", block: "center"})
      // 点击后显示按钮效果
      this.isClickTab = Array.apply(null,{length:this.foodListLength}).map((item,num)=>{
        if(num == index){
          return item = true
        }else{
          return item = false
          }
        })
      // .2s后 关闭效果
      setTimeout(()=>{
        this.isClickTab = ''
      },200)

    },
    sortHandle(num){
      // 把num 传入 this.tabNum中 方便等会 回调修改数据时使用
      this.tabNum = num;
      // 把该显示的显示回来
      this.normalPageShow = false,
      this.foodListSortShow = true,
      // 取消 商店头部和底部导航栏的显示
      this.$store.commit('isMarkHandle')
      // 获取food_list中的第num条数据
      this.propData = this.food_list[num]
      // 记录当前点击的 滚动的高度
      // this.scrollTop = event.currentTarget.scrollY
    },
    // 食物列表返回的数据
    backCallback(value){
      console.log('我已经返回')
      // 修改数据 vue 对数组的变化不是响应式的
      this.food_list.splice(this.tabNum,1,value)
      this.$store.commit('foodListUpdata',{
        place : this.tabNum,
        data : value
      })
      var sendData = {
        food_list : this.food_list
      }
      API.editShopfoodList(sendData).then((res)=>{
        if(res.data.success){
          console.log('数据修改成功')
          // 将正常页显示，排序也隐藏
          this.normalPageShow = true;
          this.foodListSortShow = false;
        }else{
          console.log('数据修改失败')
        }
      })
      // 移动回刚才的高度
      // window.scroll(0, this.scrollTop)
    },
    leftPushHandle(index){
      // 点击后显示按钮效果
      // this.isLeftPush[index] = !this.isLeftPush[index]
      this.isLeftPush.splice(index,1,!this.isLeftPush[index])
      // console.log(this.isLeftPush)
      // console.log(this.isLeftPush)
    },
    editTypeShow(){
      this.editBtnShow = !this.editBtnShow
    },
    editTypeHandle(){
      // 出现 食物类型排序页面
      this.typeSortShow = true
      // 关闭当前页面
      this.normalPageShow = false,
      // 取消 商店头部和底部导航栏的显示
      this.$store.commit('isMarkHandle')
    },
    typeDataBackHandle(value){
      this.food_list = value
      this.$store.commit('foodTypeUpdata',{data:value})
      // 出现 食物类型排序页面
      this.typeSortShow = false
      // 关闭当前页面
      this.normalPageShow = true,
      // 取消 商店头部和底部导航栏的显示
      this.$store.commit('isMarkHandle')
    },
    ...mapMutations(['foodListUpdata','isMarkHandle'])
  },
  mounted(){
    window.addEventListener('scroll',this.scrollHandle)
    this.foodListLength = this.food_list.length
    this.isLeftPush = Array.apply(null,{length:this.foodListLength}).fill(false)
    //  console.log(this.isLeftPush)

  },
  beforeUpdate(){
    this.foodListLength = this.food_list.length
  },

  beforeRouteEnter(to,from,next){
   next(vm => {
      if(vm.$store.state.shopInfo.findShopList){

        vm.food_list = vm.$store.state.shopInfo.message.food_list.slice()
      }

   })
  }


}
</script>
<style lang="less">
@import './food-list.less';
</style>
