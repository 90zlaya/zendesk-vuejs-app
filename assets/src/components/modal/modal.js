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
    manipulateUpdate() {
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
      zdClient.triggerAction(
        CLIENT,
        this.app_state.zd_instance.context.location,
        'modalEdited',
        data
      );
    },
  },

  /* ------------------------------------------------------------------------ */

};

export default modal;
