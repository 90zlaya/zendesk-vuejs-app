const template = `
  <div>
    <Child :app_state=state></Child>
  </div>
`;

import zdClient from './../libs/zdClient.js';
import Child from './Child.js';

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
        zd_instance: {},
      },
    };
  },

  /* ------------------------------------------------------------------------ */

  created() {
    // Get Zendesk instance
    this.state.zd_instance = zdClient.getInstance();
  },

  /* ------------------------------------------------------------------------ */

  mounted() {
    // Resize frame
    zdClient.resizeFrame(this.$el.scrollHeight);
  },

  /* ------------------------------------------------------------------------ */

  updated() {
    // Resize frame
    zdClient.resizeFrame(this.$el.scrollHeight);
  },

  /* ------------------------------------------------------------------------ */

};

export default App;
