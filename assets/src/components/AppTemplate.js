const appTemplate = `
  <div>
    <div v-if="state.is_loading" class="loader">
        <img src="./../../dots.gif" />
    </div>
    <div v-if="!state.is_loading" class="container">
      <p>{{ dictionary.hello_world }}</p>
    </div>
  </div>
`;

export default appTemplate;
