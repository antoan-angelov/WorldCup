Handlebars.registerHelper('isInProgress', function(conditional, options) {
  'use strict';
  if(conditional === 'in progress') {
    return options.fn(this);
  } else {
    return options.inverse(this);
  }
});
