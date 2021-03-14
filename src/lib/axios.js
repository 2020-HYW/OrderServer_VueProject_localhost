// 此文件的作用主要是对 axios 进行一些基本内容的配置 和封装
import axios from 'axios'
import baseURL from '../config'
import store from '../store/index'
// 创建一个 类 可以调用这个类创建 实例
class HttpRequest {
  constructor (baseUrl = baseURL) {
    this.baseUrl = baseUrl
    this.queue = {}
  }
  // 默认配置
  defaultOptions(){
    const config = {
      baseURL : this.baseURL,
      headers : {
        //
        Authorization : ''
      },
    }
    if(store.state.userInfo.token != ''){
      config.headers.Authorization = `Bearer ${store.state.userInfo.token}`
    }
    return config
  }
  // 创建拦截器
  interceptors(instance,url){
    // 请求拦截器
    instance.interceptors.request.use(config=>{
      // 添加全局loading 效果
      if(!Object.keys(this.queue).length){
        console.log('loading')

      }
      this.queue[url] = true
      return config;
    },error=>Promise.reject(error))
    // 响应拦截器
    instance.interceptors.response.use(res=>{
      delete this.queue.url
      console.log('loading结束')
      return res;
    },error=>{
      delete this.queue.url
      return Promise.reject(error)
    })
  }

  // 创建 axios 实例 并传入相应配置
  request(options){
    options = Object.assign(this.defaultOptions(),options);
    const instance = axios.create();
    this.interceptors(instance,options.url)
    return instance(options);
  }
}
export default HttpRequest
