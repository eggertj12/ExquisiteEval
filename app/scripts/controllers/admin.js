'use strict';

angular.module('exquisiteEvalApp')
  .controller('AdminCtrl', ['$scope', '$location', 'EvalBackend',
    function ($scope, $location, EvalBackend) {

    $scope.vm = {
      templates: [],
      evaluations: []
    };

    EvalBackend.getEvaluations().then(function(data) {
      $scope.vm.evaluations = data;
    });


    $scope.gotoTemplate = function() {
        $location.url('/template');
      };
  }]);
