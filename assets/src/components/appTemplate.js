/* -------------------------------------------------------------------------- */

const appTemplate = `
  <div>
    <div v-if="!state.is_loading">
      <child :app_state=state></child>
    </div>
    <div v-if="state.is_loading" class="loader">
      <img src="./dots.gif" />
    </div>
  </div>
`;

/* -------------------------------------------------------------------------- */

export default appTemplate;

/* -------------------------------------------------------------------------- */
