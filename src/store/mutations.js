export default{
  isMarkHandle(state){
    state.isMark = !state.isMark
  },
  // 把商店注册的信息传入vux中的shop_message 中
  editShopInfo(state,editData){
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
    deepCopy(state.shop_message,editData)
  },
  foodListUpdata(state,datas){
    // this.food_list.splice(this.tabNum,1,value)
    state.shop_message.food_list.splice(datas.place, 1, datas.data)
  },
  foodTypeUpdata(state,datas){
    state.shop_message.food_list = datas.data.slice()
  },
  keepToken(state,datas){
    state.userInfo.shopId = datas.shopId
    state.userInfo.userName = datas.userName
    state.userInfo.token = datas.token
  },
  getShopInfo(state,datas){
    function deepCopy(newObj, oldObj){
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
    state.shopInfo.findShopList = datas.findShopList
    deepCopy(state.shopInfo.message, datas.message)
    // console.log(datas.message)

  },
  // 注册商店信息后修改shopID
  editShopID(state,datas){
    state.userInfo.shopId = datas.shopId
  },
  // 食客登录
  guestLogin(state){
    state.isGuestLogin = true
  },
  // 商家登录
  businessLogin(state){
    state.isGuestLogin = false
  },
  // 获取指定商店的信息
  getDetailShopMessage(state,data){
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
    deepCopy(state.detailShopInfo,data)
  },
  //存储contact_info信息
  saveContactInfo(state,data){
    if(data != []){
      state.guestContactInfo = data.slice()
    }
  }
}
