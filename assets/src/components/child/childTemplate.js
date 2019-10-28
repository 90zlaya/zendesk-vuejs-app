/* -------------------------------------------------------------------------- */

const childTemplate = `
  <div>
    <div class="container">
      <div class="row">
        <p
          v-if="Object.keys(data_from_modal).length === 0"
        >{{ $t('examples.hello_world') }}</p>
        <p
          v-if="Object.keys(data_from_modal).length !== 0"
        >{{ title }}</p>
      </div>
      <div class="row">
        <button
        v-on:click="openModal();"
        class="c-btn c-btn--sm c-btn--primary w-100"
        >{{ $t('examples.open_modal') }}</button>
      </div>
    </div>
  </div>
`;

/* -------------------------------------------------------------------------- */

export default childTemplate;

/* -------------------------------------------------------------------------- */
