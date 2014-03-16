'use strict';

angular.module('exquisiteEvalApp')
  .controller('MainCtrl', ['$scope', '$location', 'EvalState',
  function ($scope, $location, EvalState) {
    $scope.state = EvalState;

    $scope.logout = function() {
      EvalState.Token = null;
      $location.url('/login');
    };

  }]);
