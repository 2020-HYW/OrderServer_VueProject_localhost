import axios from '../../api/index'
export default {
    login(data){
      return axios.request({
        // home/foodslist?page=12
        url:`/business/login`,
        method: 'post',
        data
      })
    },
    // /category
    register(data){
      return axios.request({
        url:'/business/register',
        method: 'post',
        data
      })
    },
    //保存商店信息
    saveShopInfo(){
      return axios.request({
        url:'/business/shopAllMessage',
        method : 'get'
      })
    },
    // 注册商店信息并保存 商店的shopID
    shopResgiter(data){
      return axios.request({
        url:'/business/editShopResgiter',
        method: 'post',
        data
      })
    },
    // 修改商家页面信息
    editShopInfo(data){
      return axios.request({
        url: '/business/editShopMessage',
        method : 'post',
        data
      })
    },
    // 修改食物列表信息
    editShopfoodList(data){
      return axios.request({
        url : '/business/editShopfoodList',
        method : 'post',
        data
      })
    },
    findShopOrder(data){
      return axios.request({
        url:'/business/findShopOrder',
        method : 'post',
        data
      })
    }
}
// export default HomePageAPI
