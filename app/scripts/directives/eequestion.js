'use strict';

angular.module('exquisiteEvalApp')
  .directive('eeQuestion', function () {
    var colors = {
      1: '#ff0000',
      2: '#ff9900',
      3: '#cfcf00',
      4: '#99ff00',
      5: '#009900',
    };

    // Helper functions
    function textQuestion(element) {
      // Strip unused content from template
      element.find('.Question-graph').remove();
    }

    function graphQuestion(element, question) {
      // Get canvas context for graph
      var ctx = element.find('.Question-graph-canvas').get(0).getContext('2d'),
        chart = new Chart(ctx),
        data = [];

      angular.forEach(question.OptionsResults, function(result) {
        data.push({value: result.Count, color: colors[result.Weight]});
        result.Color = colors[result.Weight];
      });

      chart.Doughnut(data, {});


      // Strip unused content from template
      element.find('.Question-textlist').remove();
    }

    return {
      templateUrl: 'templates/eequestion.html',
      restrict: 'EA',
      scope: {
        question: '=ngModel'
      },
      link: function postLink(scope, element) {

        scope.toggleClosed = function() {
          scope.question.closed = !scope.question.closed;
        };

        // Add a property for toggling size
        scope.question.closed = true;

        // Handle question depending on type
        if (scope.question.Type === 'text') {
          textQuestion(element, scope.question);
        } else {
          graphQuestion(element, scope.question);
        }
      }

    };

  });
