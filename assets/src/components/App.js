const template = `
  <div v-if="state.is_loading" class="loader">
    <img src="./dots.gif" />
  </div>
  <div v-else>
    <Child :app_state=state></Child>
  </div>
`;

import zdClient from './../libs/zdClient.js';
import Child from './Child.js';

let CLIENT = null;

const App = {

  /* ------------------------------------------------------------------------ */

  template,

  /* ------------------------------------------------------------------------ */

  components: {
    Child,
  },

  /* ------------------------------------------------------------------------ */

  data() {
    return {
      state: {
        is_loading: true,
        zd_instance: {},
        ticket: {},
      },
    };
  },

  /* ------------------------------------------------------------------------ */

  created() {
    // Get Zendesk client
    CLIENT = zdClient.getClient();

    // Get Zendesk instance
    this.state.zd_instance = zdClient.getInstance();
  },

  /* ------------------------------------------------------------------------ */

  mounted() {
    zdClient.resizeFrame(this.$el.scrollHeight);

    // Initialise app
    this.initApp().then(() => {
      // Do something when app is initialised
    });
  },

  /* ------------------------------------------------------------------------ */

  updated() {
    zdClient.resizeFrame(this.$el.scrollHeight);
  },

  /* ------------------------------------------------------------------------ */

  methods: {
    async initApp() {
      // Get Ticket data
      let ticket = await zdClient.getTicket();

      // Add ticket to the state
      this.state.ticket = ticket;

      // Stop loader when content is properly loaded
      this.state.is_loading = false;
    },
  },

  /* ------------------------------------------------------------------------ */

};

export default App;
