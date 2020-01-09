const template = `
  <div class="container">
    <InputText :appInstanceGuid=dataForModal.appInstanceGuid></InputText>
  </div>
`;

import zdClient from './../libs/zdClient.js';
import InputText from './import/InputText.js';

const Modal = {

  /* ------------------------------------------------------------------------ */

  template,

  /* ------------------------------------------------------------------------ */

  components: {
    InputText,
  },

  /* ------------------------------------------------------------------------ */

  props: {
    dataForModal: Object,
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

export default Modal;
