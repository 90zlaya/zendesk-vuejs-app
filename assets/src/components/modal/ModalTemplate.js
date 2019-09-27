const modalTemplate = `
  <div>
    <p>{{ app_state.dictionary.examples.hello_modal }}</p>
    <button
      v-on:click="updateData();"
    >{{ app_state.dictionary.examples.update }}</button>
  </div>
`;

export default modalTemplate;
