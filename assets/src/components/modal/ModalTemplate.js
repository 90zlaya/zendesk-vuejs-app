const ModalTemplate = `
  <div>
    <p>{{ app_state.dictionary.examples.hello_modal }}</p>
    <button
      v-on:click="update();"
    >{{ app_state.dictionary.examples.update }}</button>
  </div>
`;

export default ModalTemplate;
