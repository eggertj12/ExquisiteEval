'use strict';

angular.module('exquisiteEvalApp')
  .controller('MainCtrl', ['$scope', '$location', 'EvalState',
  function ($scope, $location, EvalState) {
    $scope.state = EvalState;

    $scope.logout = function() {
      EvalState.setToken(null);
      $location.url('/login');
    };

  }]);
