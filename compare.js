$(document).ready(function() {
  'use strict';

  var countries = [];

  $.getJSON('http://worldcup.sfg.io/teams/results', function(results) {

    results.forEach(function(item) {
      countries.push('<option>', item.country, '</option>');
    });

    [0, 1].forEach(function(item, index) {
      generateCountryResults(results[item], index);
    });
  });

  function generateCountryResults(result, index) {
    var source = $('#compare-template').html(),
        template = Handlebars.compile(source),
        generatedHTML = template(result);

    $('#compare-container').append(generatedHTML);
    $('.new-team').find('select').first().append(countries.join(''));
    $('.new-team').find('select').first().find('option').eq(index).val(result.country);
    $('.new-team').removeClass('new-team');
    $('.new-team').find('select').find('options')[index].attr('selected');
  }

});
