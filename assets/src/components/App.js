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
        appInstanceGuid: '',
      },
    };
  },

  /* ------------------------------------------------------------------------ */

  created() {
    // Get app instanceGuid from context
    this.state.appInstanceGuid = zdClient.app.context.instanceGuid;
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
