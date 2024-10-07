import Vue from 'vue'
import Router from 'vue-router'
import SignUp from '@/components/Member/SignUp'
import LogIn from '@/components/Member/LogIn'
import Users from '@/components/Member/Users'
import UserDetails from '@/components/Member/UserDetails'
import Home from '@/components/Home'
import Product from '@/components/Product'
import ProductSlug from '@/components/ProductSlug'
import Checkout from '@/components/Checkout'
import Shipping from '@/components/Shipping'
import Payment from '@/components/Payment'
import Finish from '@/components/Finish'
import Done from '@/components/Done'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: LogIn
    },
    {
      path: '/:subdomain',
      name: 'Shop',
      component: Home
    },
    {
      path: '/p/:id',
      name: 'Product',
      component: Product
    },
    {
      path: '/product/:slug',
      name: 'ProductSlug',
      component: ProductSlug
    },
    {
      path: '/:subdomain/checkout',
      name: 'Checkout',
      component: Checkout
    },
    {
      path: '/:subdomain/shipping',
      name: 'Shipping',
      component: Shipping
    },
    {
      path: '/:subdomain/payment',
      name: 'Payment',
      component: Payment
    },
    {
      path: '/:subdomain/finish',
      name: 'Finish',
      component: Finish
    },
    {
      path: '/:subdomain/done',
      name: 'Done',
      component: Done
    },
    {
      path: '/accounts/signup',
      name: 'SignUp',
      component: SignUp
    },
    {
      path: '/accounts/login',
      name: 'LogIn',
      component: LogIn
    },
    {
      path: '/member/users',
      name: 'Users',
      component: Users
    },
    {
      path: '/member/users/:id',
      name: 'UserDetails',
      component: UserDetails,
      props: true
    },
  ]
})
