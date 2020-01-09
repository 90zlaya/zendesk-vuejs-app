const template = `
  <div class="container">
    <DisplayText></DisplayText>
  </div>
`;

import zdClient from './../libs/zdClient.js';
import DisplayText from './import/DisplayText.js';

const App = {

  /* ------------------------------------------------------------------------ */

  template,

  /* ------------------------------------------------------------------------ */

  components: {
    DisplayText,
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
