import zdClient from './../../libs/zdClient.js';
import childTemplate from './childTemplate.js';
import {
  splitIdentities,
} from './../../libs/helper.js';

let CLIENT = null;

const child = {

  /* ------------------------------------------------------------------------ */

  template: childTemplate,

  /* ------------------------------------------------------------------------ */

  props: {
    app_state: Object,
  },

  /* ------------------------------------------------------------------------ */

  components: {},

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

  mounted() {
    // Get ticket from prop
    let ticket = this.app_state.ticket;

    // For search by identities
    if (ticket.has_requester) {
      let identities = ticket.data.requester.identities;
      let splittedIdentities = splitIdentities(identities);

      // TODO: Auto search by identities
    } else {
      zdClient.notify(this.$t('examples.messages.no_ticket_requester'), true);
    }
  },

  /* ------------------------------------------------------------------------ */

  updated() {},

  /* ------------------------------------------------------------------------ */

  computed: {},

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

export default child;
