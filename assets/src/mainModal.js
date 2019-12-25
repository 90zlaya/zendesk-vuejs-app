import zdClient from './libs/zdClient.js';
import i18n from './i18n/i18n.js';
import Modal from './components/Modal.js';

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
      Vue.use(i18n, zdClient.getInstance()['current_user']);

      new Vue({
        el: '#modal',
        render: h => h(Modal, {
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
