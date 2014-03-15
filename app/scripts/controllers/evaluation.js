'use strict';

angular.module('exquisiteEvalApp')
  .controller('EvaluationCtrl', ['$scope', '$location', 'EvalBackend',
  function ($scope, $location, EvalBackend) {

    $scope.evaluation = {
      StartDate: null,
      EndDate: null,
      TemplateID: null
    };

    // Variables related to datepicker
    $scope.startOpen = false;
    $scope.endOpen = false;
    $scope.format = 'shortDate';
    $scope.dateOptions = {
      'year-format': 'yy',
      'starting-day': 1
    };

    $scope.templates = [];

    EvalBackend.getTemplates().then(function(data) {
      $scope.templates = data;
    });

    $scope.open = function($event, variable) {
      $event.preventDefault();
      $event.stopPropagation();

      $scope[variable] = true;
    };

    $scope.addEvaluation = function() {
      EvalBackend.addEvaluation($scope.evaluation).then(function() {
        $location.url('/admin');
      });
    };

  }]);
