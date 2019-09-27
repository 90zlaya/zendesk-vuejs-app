const childTemplate = `
  <div>
    <p>{{ app_state.dictionary.examples.hello_world }}</p>
    <button
      v-on:click="openModal();"
    >{{ app_state.dictionary.examples.open_modal }}</button>
  </div>
`;

export default childTemplate;
