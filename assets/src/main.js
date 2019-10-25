import zdClient from './libs/zdClient.js';
import i18n from './i18n/i18n.js';
import app from './components/app.js';

const main = {

  /* ------------------------------------------------------------------------ */

  init() {
    zdClient.init();
    zdClient.events['ON_APP_REGISTERED'](this.initVueApp);
  },

  /* ------------------------------------------------------------------------ */

  initVueApp() {
    let currentUser = zdClient.getInstance()['current_user'];

    Vue.use(i18n, currentUser);

    new Vue({
      el: '#app',
      render: h => h(app),
    });
  },

  /* ------------------------------------------------------------------------ */

};

export default main.init();
