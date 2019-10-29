/* -------------------------------------------------------------------------- */

const childTemplate = `
  <div>
    <div class="container">
      <div class="row">
        <div class="col-12">
          <p v-if="title === ''">{{ $t('examples.hello_world') }}</p>
          <p v-if="title !== ''">{{ title }}</p>
        </div>
        <div class="col-12">
          <button
          v-on:click="openModal();"
          class="c-btn c-btn--sm c-btn--primary w-100"
          >{{ $t('examples.open_modal') }}</button>
        </div>
      </div>
    </div>
  </div>
`;

/* -------------------------------------------------------------------------- */

export default childTemplate;

/* -------------------------------------------------------------------------- */
