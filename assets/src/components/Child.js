const template = `
  <div class="container">
    <div class="row">
      <div class="col-12">
        <p v-if="title === ''">{{ $t('examples.hello_world') }}</p>
        <p v-else>{{ title }}</p>
      </div>
      <div class="col-12">
        <button
        v-on:click="openModalBox()"
        class="c-btn c-btn--sm c-btn--primary w-100"
        >{{ $t('examples.open_modal') }}</button>
      </div>
    </div>
  </div>
`;

import zdClient from './../libs/zdClient.js';

const Child = {

  /* ------------------------------------------------------------------------ */

  template,

  /* ------------------------------------------------------------------------ */

  data() {
    return {
      title: '',
    };
  },

  /* ------------------------------------------------------------------------ */

  methods: {
    openModalBox() {
      // Open modal
      zdClient.openModal({
        appInstanceGuid: zdClient.app.context.instanceGuid,
      });

      // Set trigger when modal is edited
      zdClient.app.client.on('modalEdited', this.modalEdited);
    },
    async modalEdited(data) {
      // Set title
      this.title = this.$t('examples.hello_world_from_name', {
        name: data.inputText,
      });

      // Remove trigger set when modal is opened
      zdClient.removeTrigger('modalEdited', this.modalEdited);
    },
  },

  /* ------------------------------------------------------------------------ */

};

export default Child;
