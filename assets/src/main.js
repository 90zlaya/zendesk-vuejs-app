import App from './components/App.js';
import zdClient from './libs/ZDClient.js';
import i18n from './i18n/index.js';
import store from './store/store.js';

const Main = {

  /* ------------------------------------------------------------------------ */

  init() {
    console.clear();
    zdClient.init();
    zdClient.events['ON_APP_REGISTERED'](this.initVueApp);
  },

  /* ------------------------------------------------------------------------ */

  initVueApp() {
    Vue.use(i18n);
    new Vue({
      el: '#app',
      store,
      render: h => h(App),
    });
  },

  /* ------------------------------------------------------------------------ */

};

export default Main.init();
