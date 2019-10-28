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
    return {
      form: {
        name: '',
      },
      triggers: {
        is_update_disabled: true,
      },
    };
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
    enableUpdate() {
      if (this.form.name.length > 0) {
        this.triggers.is_update_disabled = false;
      } else {
        this.triggers.is_update_disabled = true;
      }
    },
    update() {
      // Set data to be passed from modal
      let data = {
        form: this.form,
      };

      // Trigger modal edit logic
      this.triggerModalEdited(data);
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
