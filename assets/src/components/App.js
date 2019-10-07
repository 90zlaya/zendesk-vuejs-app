import zdClient from './../libs/ZDClient.js';
import dictionary from './../i18n/dictionary.js';
import AppTemplate from './AppTemplate.js';
import Child from './child/Child.js';

let CLIENT = null;

const App = {

  /* ------------------------------------------------------------------------ */

  template: AppTemplate,

  /* ------------------------------------------------------------------------ */

  components: {
    'child': Child,
  },

  /* ------------------------------------------------------------------------ */

  data() {
    return {
      state: {
        is_loading: true,
        zd_instance: {},
        ticket: {},
        dictionary: {},
      },
    };
  },

  /* ------------------------------------------------------------------------ */

  created() {
    // Get Zendesk client
    CLIENT = zdClient.getClient();

    // Get Zendesk instance
    this.state.zd_instance = zdClient.getInstance();

    // Set main dictionary language
    let locale = this.state.zd_instance.current_user.locale.replace(/-.+$/, '');
    this.state.dictionary = dictionary[locale];
  },

  /* ------------------------------------------------------------------------ */

  mounted() {
    // Initialise app
    this.initApp();
  },

  /* ------------------------------------------------------------------------ */

  updated() {},

  /* ------------------------------------------------------------------------ */

  computed: {
    ...Vuex.mapState(['message_from_vuex_state']),
    ...Vuex.mapState(['hardcoded_value']),
  },

  /* ------------------------------------------------------------------------ */

  methods: {
    initApp() {
      // Get Ticket data
      zdClient.getTicket().then((response) => {
        // Add ticket to the state
        this.state.ticket = response;

        // Stop loader when content is properly loaded
        this.state.is_loading = false;
      });
    },
  },

  /* ------------------------------------------------------------------------ */

};

export default App;
