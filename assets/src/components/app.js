import zdClient from './../libs/zdClient.js';
import appTemplate from './appTemplate.js';
import child from './child/child.js';

let CLIENT = null;

const app = {

  /* ------------------------------------------------------------------------ */

  template: appTemplate,

  /* ------------------------------------------------------------------------ */

  components: {
    'child': child,
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
    this.initApp();
  },

  /* ------------------------------------------------------------------------ */

  updated() {
    zdClient.resizeFrame(this.$el.scrollHeight);
  },

  /* ------------------------------------------------------------------------ */

  computed: {},

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

export default app;
