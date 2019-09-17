const modalTemplate = `
  <div>
    <p>{{ modal_state.dictionary.hello_modal }}</p>
    <button v-on:click="updateData();">{{ modal_state.dictionary.update }}</button>
  </div>
`;

export default modalTemplate;
