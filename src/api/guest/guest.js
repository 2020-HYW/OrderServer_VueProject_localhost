import axios from '../../api/index'
export default {

    // 查找所有的商店信息
    findAllShopInfo(){
      return axios.request({
        url:'/guest/allShopList',
        method : 'get'

      })
    },
    findDetailShopInfo(data){
      return axios.request({
        url:'/guest/findShop',
        method:'post',
        data
      })
    },
    addBaseInfo(data){
      return axios.request({
        url:'/guest/addBaseInfo',
        method:'post',
        data
      })
    },
    addContactInfo(data){
      return axios.request({
        url:'/guest/addContactInfo',
        method:'post',
        data
      })
    },
    //食客在进入个人页面前获取 guestData中的全部信息
    getUserContactInfo(){
      return axios.request({
        url:'/guest/getUserContactInfo',
        method : 'get'
      })
    },
    //食客在进入个人页面前获取 guestData中的全部信息
    sendOrderInfo(data){
      return axios.request({
        url:'/guest/sendOrderInfo',
        method : 'post',
        data
      })
    },
    // 获取食客的订单信息
    acceptUserOrderInfo(){
      return axios.request({
        url:'/guest/acceptUserOrderInfo',
        method: 'get'
      })
    }


}
// export default HomePageAPI
