import zdClient from './../../libs/ZDClient.js';
import dictionary from './../../i18n/dictionary.js';
import modalTemplate from './ModalTemplate.js';

let CLIENT = null;

const Modal = {

  /* ------------------------------------------------------------------------ */

  template: modalTemplate,

  /* ------------------------------------------------------------------------ */

  props: {
    modal_state: Object,
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
    updateData: function() {
      console.log('Would update data');

      let appLocation = this.$props.modal_state.zd_instance.context.location;
      let appClientPromise = CLIENT.get("instances").then((instancesData) => {
        let instances = instancesData.instances;

        for (let instanceGuid in instances) {
          if (instances[instanceGuid].location === appLocation) {
            return CLIENT.instance(instanceGuid);
          }
        }
      });

      appClientPromise.then((appClient) => {
        // Pass data from modal here
        let data = {
          test: 'This is test arg'
        };

        appClient.trigger('modalEdited', data);

        CLIENT.invoke('destroy');
      });
    }
  },

  /* ------------------------------------------------------------------------ */

};

export default Modal;
