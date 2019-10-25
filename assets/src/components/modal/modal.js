import zdClient from './../../libs/zdClient.js';
import modalTemplate from './modalTemplate.js';

let CLIENT = null;

const modal = {

  /* ------------------------------------------------------------------------ */

  template: modalTemplate,

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
  },

  /* ------------------------------------------------------------------------ */

  mounted() {},

  /* ------------------------------------------------------------------------ */

  updated() {},

  /* ------------------------------------------------------------------------ */

  computed: {},

  /* ------------------------------------------------------------------------ */

  methods: {
    update() {
      console.log('Would update');

      // Set data to be passed from modal
      let data = {
        test: 'This is test arg'
      };

      // Trigger modal edit logic
      this.triggerModalEdited();
    },
    triggerModalEdited(data) {
      // Get instance, trigger modal edited and close modal box
      CLIENT.get('instances').then((instancesData) => {
        let appClient = null;
        let instances = instancesData.instances;
        let appLocation = this.app_state.zd_instance.context.location;

        for (let instanceGuid in instances) {
          if (instances[instanceGuid].location === appLocation) {
            appClient = CLIENT.instance(instanceGuid);
            break;
          }
        }

        appClient.trigger('modalEdited', data);

        CLIENT.invoke('destroy');
      });
    },
  },

  /* ------------------------------------------------------------------------ */

};

export default modal;
