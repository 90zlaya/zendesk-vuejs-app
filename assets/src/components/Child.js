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

let CLIENT = null;

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

  created() {
    // Get Zendesk client
    CLIENT = zdClient.getClient();
  },

  /* ------------------------------------------------------------------------ */

  methods: {
    openModal() {
      CLIENT.invoke('instances.create', {
        location: 'modal',
        url: `assets/iframeModal.html#parent_guid=${ CLIENT._instanceGuid }`,
        size: {
          width: '25em',
          height: '10em'
        }
      }).then(async (modalContext) => {
        let instanceGuid = modalContext['instances.create'][0].instanceGuid;
        let modalClient = CLIENT.instance(instanceGuid);

        CLIENT.on('modalEdited', this.editModal);

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
        name: args.form.name,
      });

      const EVENT_FLAG = await CLIENT.has('modalEdited', this.editModal);

      if (EVENT_FLAG){
        CLIENT.off('modalEdited', this.editModal);
      }
    },
  },

  /* ------------------------------------------------------------------------ */

};

export default Child;
