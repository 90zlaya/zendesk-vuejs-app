const template = `
  <div class="container">
    <div class="form-group">
      <label>{{ $t('examples.messages.enter_your_name') }}</label>
      <input
        v-model="form.name"
        v-on:keyup="manipulateUpdate();"
        type="text"
        class="form-control"
      />
    </div>
    <div class="form-group">
      <button
        v-on:click="update();"
        :disabled="triggers.is_update_disabled"
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
    zd_instance: Object,
  },

  /* ------------------------------------------------------------------------ */

  data() {
    return {
      form: {
        name: '',
      },
      triggers: {
        is_update_disabled: true,
      },
    };
  },

  /* ------------------------------------------------------------------------ */

  methods: {
    manipulateUpdate() {
      if (this.form.name.length > 0) {
        this.triggers.is_update_disabled = false;
      } else {
        this.triggers.is_update_disabled = true;
      }
    },
    update() {
      // Set data to be passed from modal
      let data = {
        form: this.form,
      };

      // Trigger modal edit logic
      zdClient.triggerAction(
        zdClient.app.client,
        this.zd_instance.context.instanceGuid,
        'modalEdited',
        data
      );
    },
  },

  /* ------------------------------------------------------------------------ */

};

export default Modal;
