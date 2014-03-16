'use strict';

angular.module('exquisiteEvalApp')
  .controller('AdminCtrl', ['$scope', '$location', 'EvalBackend',
    function ($scope, $location, EvalBackend) {

    $scope.vm = {
      templates: [],
      evaluations: [],
      evaluation: {
        TemplateTitleEN: 'Select a template to view results'
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
    }      
  }]);
