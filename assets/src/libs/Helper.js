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
