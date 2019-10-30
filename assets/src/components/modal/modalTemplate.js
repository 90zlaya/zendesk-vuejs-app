/* -------------------------------------------------------------------------- */

const modalTemplate = `
  <div>
    <div class="container">
      <div class="form-group">
        <label>{{ $t('examples.messages.enter_your_name') }}</label>
        <input
          class="form-control"
          v-model="form.name"
          v-on:keyup="manipulateUpdate();"
        />
      </div>
      <div class="form-group">
        <button
          v-on:click="update();"
          :disabled="triggers.is_update_disabled"
          class="c-btn c-btn--sm c-btn--primary col-12"
        >{{ $t('examples.update') }}</button>
      </div>
    </div>
  </div>
`;

/* -------------------------------------------------------------------------- */

export default modalTemplate;

/* -------------------------------------------------------------------------- */
