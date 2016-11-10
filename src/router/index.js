import Vue from 'vue'
import VueRouter from 'vue-router'
import SearchResults from '../components/SearchResults'

Vue.use(VueRouter)

export default new VueRouter({
  mode: 'hash',
  base: __dirname,
  routes: [
    {
      path: '/:type',
      component: SearchResults,
      children: [
        {
          path: ':query'
        }
      ]
    },
    {
      path: '*',
      redirect: '/Artist'
    }
  ]
})
