const childTemplate = `
  <div>
    <p>{{ app_state.dictionary.hello_world }}</p>
    <button v-on:click="openModal();">{{ app_state.dictionary.open_modal }}</button>
  </div>
`;

export default childTemplate;
