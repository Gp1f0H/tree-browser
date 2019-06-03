import Vue from 'vue'
import Router from 'vue-router'
import TreeBrowser from './views/TreeBrowser.vue'
import store from './store'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'tree-browser',
      component: TreeBrowser,
      beforeEnter(to, from, next) {
        console.log('before')
        store.dispatch('GET_TREE');
        next()
      }
    }
  ]
})
