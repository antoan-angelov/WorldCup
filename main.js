$(document).ready(function() {
  'use strict';

  $.getJSON('http://worldcup.sfg.io/matches/today', function(matches) {

    generateMatchesForToday(matches);

    $('[data-toggle="popover"]').popover();

  });

  function generateMatchesForToday(matches) {
    var source = $('#match-template').text(),
        template = Handlebars.compile(source),
        html = template({
          matches: matches
        });

    $('#match-container').append(html);
  }

});
