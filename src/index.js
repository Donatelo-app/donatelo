require('./fabricExtensions');

const Vue = require('vue');
const Vuex = require('vuex');
const VeeValidate = require('vee-validate');
const ElementUI = require('element-ui');

const App = require('./vue/App.vue');
const store = require('./store');

Vue.use(ElementUI);
Vue.use(VeeValidate);
Vue.use(Vuex);

VK.init(() => {
  new Vue({
    el: '#app',
    render: (h) => h(App),
    store: new Vuex.Store(store)
  });
});
