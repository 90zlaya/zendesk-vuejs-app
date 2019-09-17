import zdClient from './../src/libs/ZDClient.js';
import i18n from './../src/i18n/index.js';
import modal from './../src/components/modal/Modal.js';

const Main = {

  /* ------------------------------------------------------------------------ */

  init() {
    zdClient.init();
    zdClient.events['ON_APP_REGISTERED'](this.initVueApp);
  },

  /* ------------------------------------------------------------------------ */

  initVueApp() {
    zdClient.getClient().trigger('modalReady');
    zdClient.getClient().on('drawData', (state) => {
      Vue.use(i18n);

      new Vue({
        el: '#modalContainer',
        render: h => h(modal, {
          props: {
            modal_state: state
          }
        }),
      });
    });
  },

  /* ------------------------------------------------------------------------ */

};

export default Main.init();
