let CLIENT;
let CONTEXT = null;
let CURRENT_USER = null;

const zdClient = {

  /* ------------------------------------------------------------------------ */

  // Initialise ZAF client
  init() {
    CLIENT = ZAFClient.init();
  },

  /* ------------------------------------------------------------------------ */

  // Set events
  events: {
    ON_APP_REGISTERED(cb) {
      return CLIENT.on('app.registered', async (data) => {
        CONTEXT = data.context;
        CURRENT_USER = (await CLIENT.get('currentUser'))['currentUser'];

        return cb(data);
      });
    },
  },

  /* ------------------------------------------------------------------------ */

  // Set getters for private objects
  app: {
    get client() {
      return CLIENT;
    },
    get context() {
      return CONTEXT;
    },
    get currentUser() {
      return CURRENT_USER;
    },
  },

  /* ------------------------------------------------------------------------ */

  /**
  * It sets the frame height using on the passed value.
  * If no value has been passed, 80 will be set as default heigth.
  * @param {Int} newHeight
  */
  resizeFrame(appHeight) {
    CLIENT.invoke('resize', {width: '100%', height: `${appHeight}px`});
  },

  /* ------------------------------------------------------------------------ */

  // Get Zendesk Client
  getClient() {
    return this.app.client;
  },

  /* ------------------------------------------------------------------------ */

  // Get zdClient Instance
  getInstance() {
    return {
      context: this.app.context,
      current_user: this.app.currentUser,
    };
  },

  /* ------------------------------------------------------------------------ */

  // Trigger action
  async triggerAction(client, instanceGuid, actionName, actionData, toClose=true) {
    let appClient = client.instance(instanceGuid);

    appClient.trigger(actionName, actionData);

    if (toClose) {
      client.invoke('destroy');
    }
  },

  /* ------------------------------------------------------------------------ */

};

export default zdClient;
