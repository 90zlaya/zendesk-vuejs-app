let CLIENT;
let CONTEXT = null;
let METADATA = null;
let SETTINGS = null;
let CURRENT_USER = null;
let TICKET = null;

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

  // Get Zendesk Client
  getClient() {
    return this.app.client;
  },

  /* ------------------------------------------------------------------------ */

  // Get zdClient Instance
  getInstance() {
    return {
      context: this.app.context,
      metadata: this.app.metadata,
      settings: this.app.settings,
      current_user: this.app.currentUser,
    };
  },

  /* ------------------------------------------------------------------------ */

  // Get app settings for given item
  getSettings(item) {
    return this.app.settings[item];
  },

  /* ------------------------------------------------------------------------ */

  // Get ticket
  async getTicket() {
    let is_available = false;
    let has_requester = false;

    // Allowed locations for ticket
    let allowedAppLocations = ['ticket_sidebar', 'new_ticket_sidebar'];

    // Get current app location
    let appLocation = this.app.context.location;

    if (allowedAppLocations.includes(appLocation)) {
      if (TICKET === null) {
        TICKET = (await CLIENT.get('ticket'))['ticket'];
      }

      if (TICKET.requester !== undefined) {
        has_requester = true;
      }

      is_available = true;
    }

    return {
      is_available: is_available,
      has_requester: has_requester,
      data: TICKET
    };
  },

  /* ------------------------------------------------------------------------ */

  // Get user
  async getUser() {
    return (await CLIENT.get('user'))['user'];
  },

  /* ------------------------------------------------------------------------ */

  async getCustomField(fieldId, type) {
    switch (type) {
      case 'VALUE': {
        let location = `ticket.customField:custom_field_${ fieldId }`;
        let value = (await CLIENT.get(location))[location];

        return value;
      }
      case 'FIELD': {
        let location = `/api/v2/ticket_fields/${ fieldId }.json`;
        let ticketField = (await CLIENT.request(location))['ticket_field'];

        return ticketField;
      }
    }
  },

  /* ------------------------------------------------------------------------ */

};

export default ZDClient;
