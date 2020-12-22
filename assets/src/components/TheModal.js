const template = `
<div id="modal">
  <InputText :input-text="modalData" />
</div>`;

import InputText from './InputText/InputText.js';

const TheModal = {
  template,
  components: { InputText },
  props: {
    modalData: {
      type: Object,
      required: true
    }
  }
};

export default TheModal;
