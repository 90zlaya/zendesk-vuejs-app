const template = `
<div id="app">
  <DisplayText />
</div>`;

import ZDClient from './../libraries/ZDClient.js';
import DisplayText from './DisplayText/DisplayText.js';

const TheApp = {
  template,
  components: { DisplayText },
  mounted() {
    ZDClient.resizeFrame(this.$el.scrollHeight);
  }
};

export default TheApp;
