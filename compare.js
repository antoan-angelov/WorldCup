$(document).ready(function() {
  'use strict';

  var countries = [];

  $.getJSON('http://worldcup.sfg.io/teams/results', function(results) {

    results.forEach(function(item) {
      countries.push('<option value=\''+item.country+'\'>', item.country, '</option>');
    });

    [0, 1].forEach(function(item) {
      generateCountryResults(results[item]);
    });
  });

  function generateCountryResults(result) {
    var source = $('#compare-template').html(),
        template = Handlebars.compile(source),
        generatedHTML = template(result);

    $('#compare-container').append(generatedHTML);
    $('.new-team').find('select').first().append(countries.join(''));
    $('.new-team').find('select').first().find('option').eq(result.id-1).prop('selected', true);
    $('.new-team').removeClass('new-team');

    recolorResults();
  }

  function recolorResults() {
    var $wins = $('div').filter('.wins'),
        $loses = $('div').filter('.losses'),
        $draws = $('div').filter('.draws'),
        $points = $('div').filter('.points');

    var maxWinsIndex = findMax($wins),
        maxLosesIndex = findMax($loses),
        maxDrawsIndex = findMax($draws),
        maxPointsIndex = findMax($points);

    addColorClasses($wins, maxWinsIndex);
    addColorClasses($loses, maxLosesIndex);
    addColorClasses($draws, maxDrawsIndex);
    addColorClasses($points, maxPointsIndex);
  }

  function findMax($divs) {
    var max = parseInt($divs.first().text(), 10),
        maxIndex = 0;

    $divs.each(function(index, item) {
      if (parseInt($(item).text(), 10) > max) {
        max = parseInt($(item).text(), 10);
        maxIndex = index;
      }
    });

    return maxIndex;
  }

  function addColorClasses($divs, maxIndex) {
    $divs.each(function(index, el) {
      if (index === maxIndex) {
        $(el).addClass('alert-success');
      } else {
        $(el).addClass('alert-danger');
      }
    });
  }

});
