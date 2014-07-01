$(document).ready(function() {
  'use strict';

  var countries = [];

  $.getJSON('http://worldcup.sfg.io/teams/results', function(results) {

    results.forEach(function(item) {
      countries.push('<option value=\''+item.country+'\'>', item.country, '</option>');
    });

    [0, 5].forEach(function(item) {
      generateCountryResults(results[item]);
    });
    recolorResults();
  });

  function generateCountryResults(result) {
    var source = $('#compare-template').html(),
        template = Handlebars.compile(source),
        generatedHTML = template(result);

    $('#compare-container').append(generatedHTML);
    $('.new-team').find('select').first().append(countries.join(''));
    $('.new-team').find('select').first().find('option').eq(result.id-1).prop('selected', true);
    $('.new-team').removeClass('new-team');
  }

  function recolorResults() {
    var $wins = $('span').filter('.wins'),
        $loses = $('span').filter('.losses'),
        $draws = $('span').filter('.draws'),
        $points = $('span').filter('.points');

    var maxWinsIndex = findMax($wins),
        maxLosesIndex = findMax($loses),
        maxDrawsIndex = findMax($draws),
        maxPointsIndex = findMax($points);

    addColorClasses($wins, maxWinsIndex);
    addColorClasses($loses, maxLosesIndex);
    addColorClasses($draws, maxDrawsIndex);
    addColorClasses($points, maxPointsIndex);
  }

  function findMax($elements) {
    var max = parseInt($elements.first().text(), 10),
        maxIndex = 0;

    $elements.each(function(index, item) {
      if (parseInt($(item).text(), 10) > max) {
        max = parseInt($(item).text(), 10);
        maxIndex = index;
      }
    });

    return maxIndex;
  }

  function addColorClasses($elements, maxIndex) {
    $elements.each(function(index, el) {
      if (index === maxIndex) {
        $(el).addClass('alert-success');
      } else {
        $(el).addClass('alert-danger');
      }
    });
  }

});
