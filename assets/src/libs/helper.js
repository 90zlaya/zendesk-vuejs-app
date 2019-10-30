/* -------------------------------------------------------------------------- */

/**
* Split ticket requester identities to multiple wholes
*
* @param {Object} identities
*
* @return {Object}
*/
export let splitIdentities = (identities) => {
  let emails = [];
  let phones = [];
  let primaries = {
    email: '',
    phone: '',
  };

  identities.forEach((identity) => {
    switch (identity.type) {
      case 'email': {
        if (identity.primary) {
          primaries.email = identity.value;
        }

        emails.push(identity.value);
      } break;
      case 'phone_number': {
        if (identity.primary) {
          primaries.phone = identity.value;
        }

        phones.push(identity.value);
      } break;
    }
  });

  return {
    all: {
      emails: emails,
      phones: phones,
    },
    primaries: primaries,
  };
}

/* -------------------------------------------------------------------------- */

/**
* Setup clickable tabs for Zendesk Garden with jQuery
*
* @return void
*/
export let clickableTabs = () => {
  $('.c-tab__list__item').unbind('click');
  $('.c-tab__list__item').click((event) => {
    let $parent = $(event.currentTarget).parent('.c-tab__list');
    let id = $(event.currentTarget).attr('id');
    if ($parent.length) {
      $parent.children('.c-tab__list__item').removeClass('is-selected');
      $(event.currentTarget).addClass('is-selected');
      $parent
        .parent()
        .children('.c-tab__panel')
        .attr('aria-hidden', true);
      $parent
        .parent()
        .children(`[aria-labelledby='${ id }']`)
        .attr('aria-hidden', false);
    }
  });
  $('close_tab')
    .off('click')
    .click((event) => {
      closeTab($(event.currentTarget).attr('data-id'));
  });
}

/* -------------------------------------------------------------------------- */

/**
* Format variables
*/
export let format = {
  number(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  },
  currency(num) {
    if (num === null) {
      return ``;
    } else {
      let formattedNumber = this.number(num);

      return `$ ${ formattedNumber }`;
    }
  },
  date(date, locale) {
    locale = locale ? locale : 'en-US';

    let cDate = new Date(date);
    let options = {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
    };

    return cDate.toLocaleDateString(locale, options);
  },
  objectKeysToArray(objectWithKeys, filterBy) {
    let formattedArray = [];

    for (let type in objectWithKeys) {
      if (objectWithKeys[type] === filterBy) {
        formattedArray.push(type);
      }
    }

    return formattedArray;
  },
}

/* -------------------------------------------------------------------------- */
