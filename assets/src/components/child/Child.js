import zdClient from './../../libs/ZDClient.js';
import dictionary from './../../i18n/dictionary.js';
import childTemplate from './ChildTemplate.js';

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
    return {
      state: {},
    };
  },

  /* ------------------------------------------------------------------------ */

  computed: {},

  /* ------------------------------------------------------------------------ */

  created() {
    // Get Zendesk client
    CLIENT = zdClient.getClient();
  },

  /* ------------------------------------------------------------------------ */

  mounted() {},

  /* ------------------------------------------------------------------------ */

  updated() {},

  /* ------------------------------------------------------------------------ */

  methods: {
    openModal: function() {
      CLIENT.invoke('instances.create', {
        location: 'modal',
        url: `assets/html/modal.html#parent_guid=${ CLIENT._instanceGuid }`,
        size: {
          width: '350px',
          height: '300px'
        }
      }).then(async function(modalContext) {
        let instanceGuid = modalContext['instances.create'][0].instanceGuid;
        let modalClient = CLIENT.instance(instanceGuid);

        CLIENT.on('modalEdited', this.editModal);

        modalClient.on('modalReady', function() {
          // Pass data to modal here
          let data = this.$props.app_state;

          modalClient.trigger('drawData', data);
        }.bind(this));
      }.bind(this));
    },
    editModal: async function(args) {
      const EVENT_FLAG = await CLIENT.has('modalEdited', this.editModal);

      if (EVENT_FLAG){
        CLIENT.off('modalEdited', this.editModal);
      }
    },
  },

  /* ------------------------------------------------------------------------ */

};

export default Child;
