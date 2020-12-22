const template = `
<div class="container">
  <div class="row">
    <form @submit.prevent="updateWelcomeMessage" class="col-12">
      <div class="c-txt u-mb-md">
        <label class="c-txt__label">
          <span dir="ltr">{{ $t('enterYourName') }}</span>
        </label>
        <input v-model="usersName"
          @keyup="toEnableUpdateValueButton"
          class="c-txt__input c-txt__input--sm u-mb-sm"
          type="text"
        />
        <button @click="updateWelcomeMessage"
          :disabled="isUpdateButtonDisabled"
          class="c-btn c-btn--primary c-btn--full c-btn--sm"
        >{{ $t('buttonToUpdateText') }}</button>
      </div>
    </form>
  </div>
</div>`;

import ZDClient from './../../libraries/ZDClient.js';

const InputText = {
  template,
  props: {
    inputText: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      usersName: '',
      isUpdateButtonDisabled: true
    };
  },
  methods: {
    toEnableUpdateValueButton() {
      this.isUpdateButtonDisabled = !(this.usersName.length > 0);
    },
    updateWelcomeMessage() {
      const { client } = ZDClient.app;
      const appInstance = client.instance(this.inputText.appInstanceGuid);
      appInstance.trigger('editedModal', this.usersName);
      client.invoke('destroy');
    }
  }
};

export default InputText;
