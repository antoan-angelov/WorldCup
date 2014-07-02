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

    recolorResults();

    $('#compare-container').on('change', '.country-select', function() {
      var country = $(this).val(),
          countryResults;

      results.forEach(function(item) {
        if (item.country === country) {
          countryResults = item;
        }
      });

      changeCuntryResults(countryResults, $(this).parent());

    });

    var initialCompareContHeight = $('#compare-container').height();

    $('#add-team').click(function() {
      generateCountryResults(results[0]);
      recolorResults();
      var numTeams = $('.team-cont').length;
      var numRows = Math.floor((numTeams-1) / 3) + 1;
      console.log("numTeams=", numTeams, "numRows=", numRows);
      $('#compare-container').height(initialCompareContHeight + (numRows-1) * 338);
      if(numRows == 1 && numTeams == 3) {
        $('#cont').width('800px');
      }
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
  }

  function recolorResults() {
    var $wins = $('span').filter('.wins'),
        $losses = $('span').filter('.losses'),
        $draws = $('span').filter('.draws'),
        $points = $('span').filter('.points');

    var maxWinsIndex = findMax($wins),
        minLossesIndex = findMin($losses),
        minDrawsIndex = findMin($draws),
        maxPointsIndex = findMax($points);

    $('.alert-success').removeClass('alert-success');
    $('.alert-danger').removeClass('alert-danger');
    addColorClasses($wins, maxWinsIndex);
    addColorClasses($losses, minLossesIndex);
    addColorClasses($draws, minDrawsIndex);
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

  function findMin($elements) {
    var min = parseInt($elements.first().text(), 10),
        minIndex = 0;

    $elements.each(function(index, item) {
      if (parseInt($(item).text(), 10) < min) {
        min = parseInt($(item).text(), 10);
        minIndex = index;
      }
    });

    return minIndex;
  }

  function addColorClasses($elements, successIndex) {
    $elements.each(function(index, el) {
      if (index === successIndex) {
        $(el).parent().addClass('alert-success');
      } else {
        $(el).parent().addClass('alert-danger');
      }
    });
  }

  function changeCuntryResults(results, $container) {
    $container.find('span').filter('.wins').text(results.wins);
    $container.find('span').filter('.losses').text(results.losses);
    $container.find('span').filter('.draws').text(results.draws);
    $container.find('span').filter('.points').text(results.points);

    recolorResults();
  }

});
