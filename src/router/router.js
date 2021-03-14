export default [
  // 无论商家还是食客 首先进入的是登录页面
  {
    path:'/',
    component: () => import('../views/login/login.vue')
  },
  // 商家页面url
  {
    path:'/shop_page',
    name:'shopPage',
    component: () => import('../views/shop-view/shop-page/shop-page.vue')
  },
  {
    path:'/personal_center',
    name:'personalCenter',
    component: () => import('../views/shop-view/personal-center-page/personal-center-page.vue')
  },
  {
    path:'/order_page',
    name:'orderPage',
    component: () => import('../views/shop-view/order-page/order-page.vue')
  },
  {
    path:'/shopRegister',
    name:'shopRegister',
    component:()=>import('../views/shop-view/personal-center-page/shop-register/shop-register.vue')
  },
  {
    path:'/userRegister',
    name:'userRegister',
    component:()=>import('../views/resgiter/resgiter.vue')
  },
  {
    path:'/userLogin',
    name:'userLogin',
    component:()=>import('../views/login/login.vue')
  },
  // 食客url
  {
    path : '/homePage',
    name: 'homePage',
    component:()=>import('../views/guest-view/home-page/home.vue')
  },
  {
    path : '/userOrder',
    name: 'userOrder',
    component:()=>import('../views/guest-view/user-order/user-order.vue')
  },
  {
    path : '/userMe',
    name: 'userMe',
    component:()=>import('../views/guest-view/user-me/me.vue')
  },
  {
    path : '/detailShop',
    name: 'detailShop',
    component:()=>import('../views/guest-view/home-page/shop/shop.vue')
  }

]
