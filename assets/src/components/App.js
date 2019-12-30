const template = `
  <div>
    <Child></Child>
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
    return {};
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
