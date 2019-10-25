import zdClient from './libs/zdClient.js';
import i18n from './i18n/i18n.js';
import modal from './components/modal/modal.js';

let CLIENT = null;

const mainModal = {

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

export default mainModal.init();
