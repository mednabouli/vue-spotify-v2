import Vue from 'vue'
import VueRouter from 'vue-router'
import SearchResults from '../components/SearchResults'
import ResultDetail from '../components/ResultDetail'

Vue.use(VueRouter)

export default new VueRouter({
  mode: 'hash',
  base: __dirname,
  routes: [
    {
      path: '/:type/detail/:id',
      component: ResultDetail
    },
    {
      path: '/:type/:query?',
      component: SearchResults
    },
    {
      path: '*',
      redirect: '/Artist/'
    }
  ]
})
