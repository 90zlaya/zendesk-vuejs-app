import zdClient from './libs/zdClient.js';
import i18n from './i18n/i18n.js';
import App from './components/App.js';

const main = {

  /* ------------------------------------------------------------------------ */

  init() {
    zdClient.init();
    zdClient.events['ON_APP_REGISTERED'](this.initVueApp);
  },

  /* ------------------------------------------------------------------------ */

  initVueApp() {
    Vue.use(i18n, zdClient.getInstance()['current_user']);

    new Vue({
      el: '#app',
      render: h => h(App),
    });
  },

  /* ------------------------------------------------------------------------ */

};

export default main.init();
