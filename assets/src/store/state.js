import i18n from './../i18n/index.js';

Vue.use(i18n);
window.nls = new Vue();

const state = {
  message_from_vuex_state: nls.$t('print_me'),
  hardcoded_value: '123',
};

export default state;
