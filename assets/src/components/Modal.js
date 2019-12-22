const template = `
  <div class="container">
    <div class="form-group">
      <label>{{ $t('examples.messages.enter_your_name') }}</label>
      <input
        class="form-control"
        v-model="form.name"
        v-on:keyup="manipulateUpdate();"
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

let CLIENT = null;

const Modal = {

  /* ------------------------------------------------------------------------ */

  template,

  /* ------------------------------------------------------------------------ */

  props: {
    app_state: Object,
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

  created() {
    // Get Zendesk client
    CLIENT = zdClient.getClient();
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
        CLIENT,
        this.app_state.zd_instance.context.location,
        'modalEdited',
        data
      );
    },
  },

  /* ------------------------------------------------------------------------ */

};

export default Modal;
