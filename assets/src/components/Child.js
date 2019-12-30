const template = `
  <div class="container">
    <div class="row">
      <div class="col-12">
        <p v-if="title === ''">{{ $t('examples.hello_world') }}</p>
        <p v-if="title !== ''">{{ title }}</p>
      </div>
      <div class="col-12">
        <button
        v-on:click="openModal();"
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

  props: {
    app_state: Object,
  },

  /* ------------------------------------------------------------------------ */

  data() {
    return {
      title: '',
    };
  },

  /* ------------------------------------------------------------------------ */

  methods: {
    openModal() {
      zdClient.app.client.invoke('instances.create', {
        location: 'modal',
        url: `assets/iframeModal.html#parent_guid=${ zdClient.app.client._instanceGuid }`,
        size: {
          width: '25em',
          height: '10em'
        }
      }).then(async (modalContext) => {
        let instanceGuid = modalContext['instances.create'][0].instanceGuid;
        let modalClient = zdClient.app.client.instance(instanceGuid);

        zdClient.app.client.on('modalEdited', this.editModal);

        modalClient.on('modalReady', () => {
          // Pass data to modal here
          let data = this.app_state;

          modalClient.trigger('drawData', data);
        });
      });
    },
    async editModal(args) {
      // Set title
      this.title = this.$t('examples.hello_world_from_name', {
        name: args.inputText,
      });

      const EVENT_FLAG = await zdClient.app.client.has('modalEdited', this.editModal);

      if (EVENT_FLAG){
        zdClient.app.client.off('modalEdited', this.editModal);
      }
    },
  },

  /* ------------------------------------------------------------------------ */

};

export default Child;
