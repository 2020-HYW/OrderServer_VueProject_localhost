export default {
  isMark : false,
  shop_message:{
    shopName:'',
    shopId:'',
    shopPic:"",
    shopPhone:'',
    shopAddress:'',
    businessHours:[{startTime:'',endTime:''},{startTime:'',endTime:''}],
    shopType:'',
    shopNotices:'',
    businessCertificate:'',
    mealTime:'',
    distributionCost:'',
    distributionTime:'',
    food_list:[
      {
        food_tab:'',
        tab_id:'',
        child_food_list:[
          {
            food_name:'',
            food_img:'',
            main_material:'',
            food_month_sale:'',
            price:'',
            food_id: '',
          }
        ]
      }
    ]
  },
  //
  userInfo:{
    shopId:'',
    userName:'',
    token:''
  },
  shopInfo:{
    findShopList:'',
    message:{}
  },
  isGuestLogin: false,
  // 食客接收所有的店家数据
  // allShopInfo:[
  //   {
  //     shopName:'',
  //     shopId:'',
  //     shopPic:'',
  //     shopType:'',
  //     mealTime:'',
  //     distributionCost:'',
  //     businessHours:[],
  //     shopNotices:'',
  //     _id:''
  //   }
  // ],
  detailShopInfo:{},
  // guestContactInfo:[],
  // guestOrderInfo:[],
  guestContactInfo:[]

}
