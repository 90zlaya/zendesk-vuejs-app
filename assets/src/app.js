import TheApp from './components/TheApp.js';
import ZDClient from './libraries/ZDClient.js';
import messages from './locales/messages.js';

const app = {
  init() {
    ZDClient.init();
    ZDClient.events['ON_APP_REGISTERED'](this.initVueApp);
  },
  initVueApp() {
    const { locale } = ZDClient.app.currentUser;
    const i18n = new VueI18n({
      locale,
      fallbackLocale: 'en',
      messages
    });
    new Vue({
      el: '#app',
      i18n,
      render: h => h(TheApp)
    });
  }
};

export default app.init();
