Handlebars.registerHelper('isInProgress', function(conditional, options) {
  'use strict';
  if(conditional === 'in progress') {
    return options.fn(this);
  } else {
    return options.inverse(this);
  }
});

Handlebars.registerHelper('formatToBgDate', function(date) {
  'use strict';
  var parsedDate = new Date(date),
      options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric'};

  return parsedDate.toLocaleString('bg-BG', options);
});
