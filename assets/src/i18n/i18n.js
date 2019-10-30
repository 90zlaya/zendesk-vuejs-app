import dictionary from './dictionary.js';

const i18n = {

  /* ------------------------------------------------------------------------ */

  install(Vue, options) {
    const t = this.getTranslation(options);
    const RTL_LOCALES = ['ar', 'he'];

    Vue.prototype.$t = (key, parameters) => {
      return this.getTranslationLine(t, key, parameters) || '';
    };

    Vue.prototype.$rtl = () => {
      return RTL_LOCALES.indexOf(options.locale.toLowerCase()) > -1
        ? 'rtl'
        : 'ltr';
    };
  },

  /* ------------------------------------------------------------------------ */

  getTranslationLine(translation, propertyName, propertyParameters) {
    let line = propertyName.split('.').reduce((a, b) => {
      return a[b];
    }, translation);

    if (propertyParameters === undefined) {
      return line;
    } else {
      let key = Object.keys(propertyParameters);
      let value = Object.values(propertyParameters);
      let replaced = line.replace(`{${ key }}`, value);

      return replaced;
    }
  },

  /* ------------------------------------------------------------------------ */

  getTranslation(options) {
    const translation =
      options && options.locale
        ? dictionary[options.locale.split('-')[0]] || dictionary['en']
        : dictionary['en'];

    return translation;
  },

  /* ------------------------------------------------------------------------ */

};

export default i18n;
