import zdClient from './../../libs/ZDClient.js';
import childTemplate from './ChildTemplate.js';
import {
  splitIdentities
} from './../../libs/Helper.js';

let CLIENT = null;

const Child = {

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
    return {};
  },

  /* ------------------------------------------------------------------------ */

  created() {
    // Get Zendesk client
    CLIENT = zdClient.getClient();

    // Get ticket from prop
    let ticket = this.app_state.ticket;

    // For search by identities
    if (ticket.has_requester) {
      let identities = ticket.data.requester.identities;
      let splittedIdentities = splitIdentities(identities);

      // TODO: Auto search by identities
    } else {
      CLIENT.invoke(
        'notify',
        this.app_state.dictionary.examples.messages.no_ticket_requester,
        'error'
      );
    }
  },

  /* ------------------------------------------------------------------------ */

  mounted() {},

  /* ------------------------------------------------------------------------ */

  updated() {},

  /* ------------------------------------------------------------------------ */

  computed: {},

  /* ------------------------------------------------------------------------ */

  methods: {
    openModal() {
      CLIENT.invoke('instances.create', {
        location: 'modal',
        url: `assets/modal.html#parent_guid=${ CLIENT._instanceGuid }`,
        size: {
          width: '350px',
          height: '300px'
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
      const EVENT_FLAG = await CLIENT.has('modalEdited', this.editModal);

      if (EVENT_FLAG){
        CLIENT.off('modalEdited', this.editModal);
      }
    },
  },

  /* ------------------------------------------------------------------------ */

};

export default Child;
