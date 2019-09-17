const appTemplate = `
  <div>
    <div v-if="is_loading" class="loader">
        <img src="./../../dots.gif" />
    </div>
    <div v-if="!is_loading" class="container">
      <child :app_state=state></child>
    </div>
  </div>
`;

export default appTemplate;
