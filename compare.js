$(document).ready(function() {
  'use strict';

  var countries = [];

  $.getJSON('http://worldcup.sfg.io/teams/results', function(results) {

    countries.push('<option>');
    results.forEach(function(item) {
      countries.push(item.country);
    });
    countries.push('</option>');

    for(var i = 0; i < 2; i += 1) {
      generateCountryResults(results[i]);
    }

  });

  function generateCountryResults(result) {
    var source = $('#compare-template').html(),
        template = Handlebars.compile(source),
        generatedHTML = template(result);

    $('#compare-container').append(generatedHTML);
    $('.new-team').find('select').first().append(countries.join(''));
    $('.new-team').removeClass('new-team');
  }

});
