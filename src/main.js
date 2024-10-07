// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import App from './App'
import router from './router'
import VueApollo from 'vue-apollo'
import store from './store'

Vue.config.productionTip = false

// // HTTP connection to the API
// const httpLink = createHttpLink({
//   // You should use an absolute URL here
//   uri: 'https://archee-pgsql.herokuapp.com/v1/graphql',
// })

// // Cache implementation
// const cache = new InMemoryCache()

// // // Create the apollo client
// const apolloClient = new ApolloClient({
//   link: httpLink,
//   cache,
// })

// Vue.use(VueApollo)

// const apolloProvider = new VueApollo({
//   defaultClient: apolloClient,
// })

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  // apolloProvider,
  components: { App },
  template: '<App/>'
})
