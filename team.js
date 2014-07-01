$(document).ready(function() {
  'use strict';

  $.getJSON('http://worldcup.sfg.io/teams/results', function(results) {
    var countryID = window.location.search.slice(1).split('=').pop();

    generatePage(results[countryID-1]);
  });

  function generatePage(teamResults) {
    var source = $('#team-template').html(),
        template = Handlebars.compile(source),
        generatedHTML = template(teamResults);

    $('#team-container').append(generatedHTML);
  }

});
