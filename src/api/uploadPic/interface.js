import axios from '../../api/index'
export default {
    upload_pic(data){
      return axios.request({
        url:'/pic',
        method: 'post',
        file
      })
    }
}
// export default HomePageAPI
