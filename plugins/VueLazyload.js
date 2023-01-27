import Vue from 'vue'
import VueLazyload from 'vue-lazyload'

Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: '/images/lazyload/placeholder-now.png',
  loading: '/images/lazyload/placeholder-now.png',
  //   loading: 'img/app/loading.gif',
  attempt: 3,
})
