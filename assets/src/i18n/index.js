import dictionary from './dictionary.js';

export default {
  install(Vue, options) {
    const t =
      options && options.locale
        ? dictionary[options.locale] || dictionary['en']
        : dictionary['en'];
    const RTL_LOCALES = ['ar', 'he'];
    Vue.prototype.$t = key => {
      return t[key] || '';
    };
    Vue.prototype.$rtl = () => {
      return RTL_LOCALES.indexOf(options.locale.toLowerCase()) > -1
        ? 'rtl'
        : 'ltr';
    };
  },
};
