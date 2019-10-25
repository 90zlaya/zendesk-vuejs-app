import dictionary from './dictionary.js';

const i18n = {

  /* ------------------------------------------------------------------------ */

  install(Vue, options) {
    const t =
      options && options.locale
        ? dictionary[options.locale.split('-')[0]] || dictionary['en']
        : dictionary['en'];

    const RTL_LOCALES = ['ar', 'he'];

    Vue.prototype.$t = (key) => {
      return this.getObjProperty(t, key) || '';
    };

    Vue.prototype.$rtl = () => {
      return RTL_LOCALES.indexOf(options.locale.toLowerCase()) > -1
        ? 'rtl'
        : 'ltr';
    };
  },
  getObjProperty(object, propertyName) {
    return propertyName.split('.').reduce((a, b) => {
      return a[b];
    }, object);
  },

  /* ------------------------------------------------------------------------ */
};

export default i18n;
