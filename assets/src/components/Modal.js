const template = `
  <div class="container">
    <div class="form-group">
      <label>{{ $t('examples.messages.enter_your_name') }}</label>
      <input
        v-model="inputText"
        v-on:keyup="toEnableInput()"
        type="text"
        class="form-control"
      />
    </div>
    <div class="form-group">
      <button
        v-on:click="update();"
        :disabled="is_update_disabled"
        class="c-btn c-btn--sm c-btn--primary col-12"
      >{{ $t('examples.update') }}</button>
    </div>
  </div>
`;

import zdClient from './../libs/zdClient.js';

const Modal = {

  /* ------------------------------------------------------------------------ */

  template,

  /* ------------------------------------------------------------------------ */

  props: {
    dataForModal: Object,
  },

  /* ------------------------------------------------------------------------ */

  data() {
    return {
      inputText: '',
      is_update_disabled: true,
    };
  },

  /* ------------------------------------------------------------------------ */

  methods: {
    toEnableInput() {
      if (this.inputText.length > 0) {
        this.is_update_disabled = false;
      } else {
        this.is_update_disabled = true;
      }
    },
    update() {
      let appClient = zdClient.app.client.instance(this.dataForModal.appInstanceGuid);

      appClient.trigger('modalEdited', {
        inputText: this.inputText,
      });

      zdClient.app.client.invoke('destroy');
    },
  },

  /* ------------------------------------------------------------------------ */

};

export default Modal;
