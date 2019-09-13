import zdClient from '../libs/ZDClient.js';
import dictionary from '../i18n/dictionary.js';
import appTemplate from './AppTemplate.js';

const App = {

  /* ------------------------------------------------------------------------ */

  template: appTemplate,

  /* ------------------------------------------------------------------------ */

  components: {},

  /* ------------------------------------------------------------------------ */

  data() {
    return {
      dictionary: {},
      state: {
        is_loading: true,
      },
    };
  },

  /* ------------------------------------------------------------------------ */

  computed: {},

  /* ------------------------------------------------------------------------ */

  created() {
    let instance = zdClient.getInstance();
    let locale = instance.current_user.locale.replace(/-.+$/, '');

    // Set main dictionary language
    this.dictionary = dictionary[locale];

    // Stop loader when content is properly loaded
    this.state.is_loading = this.stopLoading();
  },

  /* ------------------------------------------------------------------------ */

  mounted() {},

  /* ------------------------------------------------------------------------ */

  updated() {},

  /* ------------------------------------------------------------------------ */

  methods: {
    stopLoading: function() {
      return false;
    }
  },

  /* ------------------------------------------------------------------------ */

};

export default App;
