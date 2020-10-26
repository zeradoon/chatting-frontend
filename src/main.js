import Vue from 'vue'
import App from './App.vue'
import router from './router'

import '@/assets/fonts/googlefont.css';
import '@/assets/bootstrap/css/bootstrap.css';
import '@/assets/fonts/font-awesome.css';
import '@/assets/css/selectize.css';
import '@/assets/css/style.css';
import '@/assets/css/user.css';

import VueChatScroll from "vue-chat-scroll-image";
Vue.use(VueChatScroll);

import vueMoment from 'vue-moment'
import moment from "moment";
moment.locale("ko");
Vue.use(vueMoment, { moment });

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
