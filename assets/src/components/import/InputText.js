const template = `
<div class="row">
  <form class="col-12">
    <div class="c-txt u-mb-md">
      <label
        class="c-txt__label"
        for="txt-0"
      ><span dir="ltr">{{ $t('examples.messages.enter_your_name') }}</span></label>
      <input
        v-model="formInput"
        v-on:keyup="toEnableUpdateValueButton()"
        class="c-txt__input u-mb-sm"
        id="txt-0"
        type="text"
      />
      <button
        v-on:click="updateValueOnSidebar()"
        :disabled="triggers.isUpdateButtonDisabled"
        class="c-btn c-btn--primary c-btn--full c-btn--sm"
      >{{ $t('examples.update') }}</button>
    </div>
  </form>
</div>`;

import zdClient from './../../libs/zdClient.js';

const InputText = {

  /* ------------------------------------------------------------------------ */

  template,

  /* ------------------------------------------------------------------------ */

  props: {
    appInstanceGuid: String,
  },

  /* ------------------------------------------------------------------------ */

  data() {
    return {
      triggers: {
        isUpdateButtonDisabled: true,
      },
      formInput: '',
    };
  },

  /* ------------------------------------------------------------------------ */

  methods: {
    toEnableUpdateValueButton() {
      if (this.formInput.length > 0) {
        this.triggers.isUpdateButtonDisabled = false;
      } else {
        this.triggers.isUpdateButtonDisabled = true;
      }
    },
    updateValueOnSidebar() {
      let appInstance = zdClient.app.client.instance(this.appInstanceGuid);
      appInstance.trigger('editedInputText', this.formInput);
      zdClient.app.client.invoke('destroy');
    },
  },

  /* ------------------------------------------------------------------------ */

};

export default InputText;
