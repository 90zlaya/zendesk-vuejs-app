const template = `
<div class="container">
  <div class="row">
    <div class="col-12">
      <p v-if="greetingMessage === ''">{{ $t('helloWorld') }}</p>
      <p v-else>{{ greetingMessage }}</p>
    </div>
    <div class="col-12">
      <button @click="openModal"
        class="c-btn c-btn--primary c-btn--full c-btn--sm"
        type="button"
      >{{ $t('buttonToOpenModal') }}</button>
    </div>
  </div>
</div>`;

import ZDClient from './../../libraries/ZDClient.js';

const DisplayText = {
  template,
  data() {
    return { greetingMessage: '' };
  },
  methods: {
    openModal() {
      const { client, context: { instanceGuid: appInstanceGuid } } = ZDClient.app;
      ZDClient.openModal({ appInstanceGuid });
      client.on('editedModal', this.editedModal);
    },
    async editedModal(name) {
      this.greetingMessage = this.$t('helloWorldFromName', { name });
      ZDClient.removeTrigger('editedModal', this.editedModal);
    },
  }
};

export default DisplayText;
