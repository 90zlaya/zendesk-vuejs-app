/* -------------------------------------------------------------------------- */

/**
* Split ticket requester identities to multiple wholes
*
* @param {Object} identities
*
* @return {Object}
*
*/
export function splitIdentities(identities) {
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
export function clickableTabs() {
  $(".c-tab__list__item").unbind("click");
  $(".c-tab__list__item").click(function() {
    let $parent = $(this).parent(".c-tab__list");
    let id = $(this).attr("id");
    if ($parent.length) {
      $parent.children(".c-tab__list__item").removeClass("is-selected");
      $(this).addClass("is-selected");
      $parent
        .parent()
        .children(".c-tab__panel")
        .attr("aria-hidden", true);
      $parent
        .parent()
        .children("[aria-labelledby='" + id + "']")
        .attr("aria-hidden", false);
    }
  });
  $(".close_tab")
    .off("click")
    .click(function() {
      closeTab($(this).attr("data-id"));
  });
}

/* -------------------------------------------------------------------------- */
