import modal from './../src/components/modal/modal.js';
import zdClient from './../src/libs/zdClient.js';
import i18n from './../src/i18n/index.js';

let CLIENT = null;

const main = {

  /* ------------------------------------------------------------------------ */

  init() {
    zdClient.init();
    CLIENT = zdClient.getClient();
    zdClient.events['ON_APP_REGISTERED'](this.initVueApp);
  },

  /* ------------------------------------------------------------------------ */

  initVueApp() {
    CLIENT.trigger('modalReady');
    CLIENT.on('drawData', (data) => {
      let currentUser = zdClient.getInstance()['current_user'];

      Vue.use(i18n, currentUser);

      new Vue({
        el: '#modal',
        render: h => h(modal, {
          props: {
            app_state: data,
          },
        }),
      });
    });
  },

  /* ------------------------------------------------------------------------ */

};

export default main.init();
