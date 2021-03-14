import axios from './index'
class apiList {
    get_food_category(num){
      return axios.request({
        url:`/foods/food_category?type=${num}`,
        method:'get'
      })
    }
    // http://localhost:4399/user/insert_user
    insert_user_register_message(user_message){
      return axios.request({
        url : '/user/insert_user',
        method : 'post',
        data:user_message
      })
    }
}
export default apiList
