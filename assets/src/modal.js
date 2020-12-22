import TheModal from './components/TheModal.js';
import ZDClient from './libraries/ZDClient.js';
import messages from './locales/messages.js';

const modal = {
  init() {
    ZDClient.init();
    ZDClient.events['ON_APP_REGISTERED'](this.initVueApp);
  },
  initVueApp() {
    const { client, currentUser: { locale } } = ZDClient.app;
    client.trigger('modalReady');
    client.on('drawData', (modalData) => {
      const i18n = new VueI18n({
        locale,
        fallbackLocale: 'en',
        messages
      });
      new Vue({
        el: '#modal',
        i18n,
        render: h => h(TheModal, {
          props: { modalData }
        })
      });
    });
  }
};

export default modal.init();
