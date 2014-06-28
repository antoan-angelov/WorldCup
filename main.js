$(document).ready(function() {
  'use strict';

  $.getJSON('http://worldcup.sfg.io/matches/today', function(matches) {

    generateMatchedForToday(matches);

    $('[data-toggle="popover"]').popover();

  });

  function generateMatchedForToday(matches) {
    var source = $('#match-template'),
        template = Handlebars.compile(source),
        html = template({
          matches: matches
        });

    $('#match-container').append(html);
  }

});
