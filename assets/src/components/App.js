import zdClient from './../libs/ZDClient.js';
import dictionary from './../i18n/dictionary.js';
import appTemplate from './AppTemplate.js';
import child from './child/Child.js';

let CLIENT = null;

const App = {

  /* ------------------------------------------------------------------------ */

  template: appTemplate,

  /* ------------------------------------------------------------------------ */

  components: {
    child: child,
  },

  /* ------------------------------------------------------------------------ */

  data() {
    return {
      is_loading: true,
      state: {
        zd_instance: {},
        dictionary: {},
      },
    };
  },

  /* ------------------------------------------------------------------------ */

  computed: {},

  /* ------------------------------------------------------------------------ */

  created() {
    // Get Zendesk client
    CLIENT = zdClient.getClient();

    // Get Zendesk instance
    this.state.zd_instance = zdClient.getInstance();
    let locale = this.state.zd_instance.current_user.locale.replace(/-.+$/, '');

    // Set main dictionary language
    this.state.dictionary = dictionary[locale];

    // Stop loader when content is properly loaded
    this.is_loading = false;
  },

  /* ------------------------------------------------------------------------ */

  mounted() {},

  /* ------------------------------------------------------------------------ */

  updated() {},

  /* ------------------------------------------------------------------------ */

  methods: {},

  /* ------------------------------------------------------------------------ */

};

export default App;
