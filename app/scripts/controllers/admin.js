'use strict';

angular.module('exquisiteEvalApp')
  .controller('AdminCtrl', ['$scope', '$location', 'EvalBackend',
    function ($scope, $location, EvalBackend) {

    $scope.templates = [];

    EvalBackend.getTemplates().then(function(data) {
      $scope.templates = data;
    });


    $scope.gotoTemplates = function() {
        $location.url('/template');
      };
  }]);
