import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './router'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  routes
})
/* router.beforeEach((to,from,next)=>{
 console.log('1');
 next()
})
router.beforeResolve((to,from,next)=>{
  console.log('4');
  next()
 })
 router.afterEach((to,from)=>{
   console.log('6')
 }) */

export default router
