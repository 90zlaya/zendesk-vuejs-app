/* -------------------------------------------------------------------------- */

const appTemplate = `
  <div>
    <div v-if="!state.is_loading" class="container">
      <child :app_state=state></child>
    </div>
    <div v-if="state.is_loading" class="loader">
      <img src="./../img/dots.gif" />
    </div>
  </div>
`;

/* -------------------------------------------------------------------------- */

export default appTemplate;

/* -------------------------------------------------------------------------- */
