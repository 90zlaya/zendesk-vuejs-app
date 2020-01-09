const template = `
<div class="row">
  <div class="col-12">
    <p v-if="greetingMessage === ''">{{ $t('examples.hello_world') }}</p>
    <p v-else>{{ greetingMessage }}</p>
  </div>
  <div class="col-12">
    <button
      v-on:click="openInputText()"
      class="c-btn c-btn--primary c-btn--full c-btn--sm"
    >{{ $t('examples.open_modal') }}</button>
  </div>
</div>`;

import zdClient from './../../libs/zdClient.js';

const DisplayText = {

  /* ------------------------------------------------------------------------ */

  template,

  /* ------------------------------------------------------------------------ */

  data() {
    return {
      greetingMessage: '',
    };
  },

  /* ------------------------------------------------------------------------ */

  methods: {
    openInputText() {
      zdClient.openModal({
        // Pass additional data to the modal here
        appInstanceGuid: zdClient.app.context.instanceGuid,
      });

      // Set trigger to get data from modal
      zdClient.app.client.on(
        'editedInputText',
        this.editedInputText
      );
    },
    async editedInputText(name) {
      // Set greeting message
      this.greetingMessage = this.$t('examples.hello_world_from_name', {
        name: name
      });

      // Remove trigger
      zdClient.removeTrigger('editedInputText', this.editedInputText);
    },
  },

  /* ------------------------------------------------------------------------ */

};

export default DisplayText;
