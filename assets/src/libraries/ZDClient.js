let CLIENT = null;
let CONTEXT = null;
let CURRENT_USER = null;

const ZDClient = {
  init() {
    CLIENT = ZAFClient.init();
  },
  events: {
    ON_APP_REGISTERED(cb) {
      return CLIENT.on('app.registered', async (data) => {
        CONTEXT = data.context;
        CURRENT_USER = (await CLIENT.get('currentUser'))['currentUser'];
        return cb(data);
      });
    }
  },
  app: {
    get client() {
      return CLIENT;
    },
    get context() {
      return CONTEXT;
    },
    get currentUser() {
      return CURRENT_USER;
    }
  },
  resizeFrame(appHeight) {
    CLIENT.invoke('resize', { width: '100%', height: `${ appHeight }px` });
  },
  async openModal(modalData) {
    const modalContext = await CLIENT.invoke('instances.create', {
      location: 'modal',
      url: `assets/modal.html#parent_guid=${ CLIENT._instanceGuid }`,
      size: {
        width: '25em',
        height: '10em'
      }
    });
    const instanceGuid = modalContext['instances.create'][0].instanceGuid;
    const modalClient = CLIENT.instance(instanceGuid);
    modalClient.on('modalReady', () => {
      modalClient.trigger('drawData', modalData);
    });
  },
  async removeTrigger(triggerName, callbackFunction) {
    const eventFlag = await CLIENT.has(triggerName, callbackFunction);
    if (eventFlag) {
      CLIENT.off(triggerName, callbackFunction);
    }
  }
};

export default ZDClient;
