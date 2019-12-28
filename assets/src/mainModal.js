import zdClient from './libs/zdClient.js';
import i18n from './i18n/i18n.js';
import Modal from './components/Modal.js';

const mainModal = {

  /* ------------------------------------------------------------------------ */

  init() {
    zdClient.init();
    zdClient.events['ON_APP_REGISTERED'](this.initVueApp);
  },

  /* ------------------------------------------------------------------------ */

  initVueApp() {
    zdClient.app.client.trigger('modalReady');
    zdClient.app.client.on('drawData', (data) => {
      Vue.use(i18n, zdClient.getInstance()['current_user']);

      new Vue({
        el: '#modal',
        render: h => h(Modal, {
          props: {
            zd_instance: data,
          },
        }),
      });
    });
  },

  /* ------------------------------------------------------------------------ */

};

export default mainModal.init();
