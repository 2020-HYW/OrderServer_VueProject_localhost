import guestAPI from '../api/guest/guest'
export default{
  // async getAllShopInfo({commit}){
  //   guestAPI.findAllShopInfo().then(res=>{
  //     // console.log(res)
  //     // console.log('成功请求数据')
  //     commit('acceptAllShopData',res.data)
  //   })
  // },
  // 食客用户进入个人 前先从数据库获取 联系方式的全部数据
  // async acceptGuestData({commit}){
  //   guestAPI.getUserContactInfo().then(res=>{
  //     commit('guestDataHandle',res.data[0])
  //     console.log(res.data[0].user_name)
  //   })
  // }
}
