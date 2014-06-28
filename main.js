"use strict";

$(document).ready(function() {
  var MINUTES_IN_MATCH = 105;
  var MILLIS_IN_MINUTE = 60 * 1000;
  var MILLIS_IN_MATCH = MINUTES_IN_MATCH * MILLIS_IN_MINUTE;

  $.getJSON("http://worldcup.sfg.io/matches/today", function(matches) {
    $.getJSON("http://worldcup.sfg.io/teams/results", function(results) {
        matches.forEach(function(el) {
            results.forEach(function(countryInfo) {
                if(countryInfo.country === el.home_team.country) {
                    el.home_team.info = countryInfo;
                }
                else if(countryInfo.country === el.away_team.country) {
                    el.away_team.info = countryInfo;
                }
            });
        });

        generateMatchesForToday(matches);

        $("[data-toggle=\"popover\"]").popover();

        initCountdown();
    });
  });

  function initCountdown() {
    updateProgressBars();
    setInterval(updateProgressBars, MILLIS_IN_MINUTE);
  }

  function updateProgressBars() {
    $(".progress").each(function() {
      var $this = $(this),
          start = new Date($this.attr("data-time")).getTime(),
          end = Date.now(),
          millis_passed = end - start,
          percent = Math.min(100 * millis_passed / MILLIS_IN_MATCH, 100),
          minsLeft = Math.max(MINUTES_IN_MATCH - Math.floor(millis_passed / MILLIS_IN_MINUTE), 0);

      $this.parent().find("#statusLabel").text(minsLeft + " mins left");
      $this.find(".progress-bar:first-child").width(percent + "%");
    });
  }

  function generateMatchesForToday(matches) {
    var source = $("#match-template").text(),
        template = Handlebars.compile(source),
        html = template({
          matches: matches
        });

    $("#match-container").append(html);
  }

});
