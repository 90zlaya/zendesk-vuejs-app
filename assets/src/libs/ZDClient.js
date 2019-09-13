let CLIENT;
let CONTEXT = null;
let METADATA = null;
let SETTINGS = null;
let CURRENT_USER = null;

const ZDClient = {

  /* ------------------------------------------------------------------------ */

  events: {
    ON_APP_REGISTERED(cb) {
      return CLIENT.on('app.registered', async (data) => {
        CONTEXT = data.context;
        METADATA = data.metadata;
        SETTINGS = data.metadata.settings;
        CURRENT_USER = (await CLIENT.get('currentUser'))['currentUser'];

        return cb(data);
      })
    }
  },

  /* ------------------------------------------------------------------------ */

  init() {
    CLIENT = ZAFClient.init();
  },

  /* ------------------------------------------------------------------------ */

  /**
   * Set getters for privite objects
   */
  app: {
    get client() {
      return CLIENT;
    },
    get context() {
      return CONTEXT;
    },
    get metadata() {
      return METADATA;
    },
    get settings() {
      return SETTINGS;
    },
    get currentUser() {
      return CURRENT_USER;
    },
  },

  /* ------------------------------------------------------------------------ */

  /**
   * It returns true if the app is installed in the instance, false if
   * it's running locally
   */
  isProduction() {
    return !!this.app.settings['IS_PRODUCTION'];
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

  // Get zdClient Instance
  getInstance() {
    return {
      client: this.app.client,
      context: this.app.context,
      metadata: this.app.metadata,
      current_user: this.app.currentUser,
    };
  },

  /* ------------------------------------------------------------------------ */

  // Get app settings for given item
  getSettings(item) {
    return this.app.settings[item];
  },

  /* ------------------------------------------------------------------------ */

};

export default ZDClient;
