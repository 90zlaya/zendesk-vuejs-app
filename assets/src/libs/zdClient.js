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

  // Sets the frame height using on the passed value
  resizeFrame(appHeight) {
    CLIENT.invoke('resize', {width: '100%', height: `${appHeight}px`});
  },

  /* ------------------------------------------------------------------------ */

  // Open modal box
  async openModal(dataForModal) {
    let modalContext = await CLIENT.invoke('instances.create', {
      location: 'modal',
      url: `assets/iframeModal.html#parent_guid=${ CLIENT._instanceGuid }`,
      size: {
        width: '25em',
        height: '10em'
      }
    });

    let instanceGuid = modalContext['instances.create'][0].instanceGuid;
    let modalClient = CLIENT.instance(instanceGuid);

    modalClient.on('modalReady', () => {
      modalClient.trigger('drawData', dataForModal);
    });
  },

  /* ------------------------------------------------------------------------ */

  // Remove trigger
  async removeTrigger(triggerName, cbFunction) {
    const EVENT_FLAG = await CLIENT.has(triggerName, cbFunction);

    if (EVENT_FLAG){
      CLIENT.off(triggerName, cbFunction);
    }
  },

  /* ------------------------------------------------------------------------ */

};

export default zdClient;
