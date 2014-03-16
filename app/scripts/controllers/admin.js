'use strict';

angular.module('exquisiteEvalApp')
  .controller('AdminCtrl', ['$scope', '$location', 'EvalBackend', 'EvalState',
  function ($scope, $location, EvalBackend, EvalState) {
    EvalState.PageTitle = 'Admin panel';

    $scope.vm = {
      templates: [],
      evaluations: [],
      evaluation: {
        TemplateTitleEN: 'Select an evaluation to view results'
      }
    };

    EvalBackend.getEvaluations().then(function(data) {
      $scope.vm.evaluations = data;
    });

    $scope.addTemplate = function() {
      $location.url('/template');
    };

    $scope.addEvaluation = function() {
      $location.url('/evaluation');
    };

    $scope.getEvaluation = function(id) {
      EvalBackend.getEvaluation(id).then(function(data) {
        $scope.vm.evaluation = data;
      });
    };
  }]);
