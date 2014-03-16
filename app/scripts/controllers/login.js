'use strict';

angular.module('exquisiteEvalApp')
  .controller('LoginCtrl', ['$scope', '$location', '$http', 'EvalSettings', 'EvalState',
  function ($scope, $location, $http, EvalSettings, EvalState) {
    EvalState.PageTitle = 'Course evaluations';

    $scope.user = {
      user: '',
      pass: ''
    };

    $scope.Token = EvalState.Token;

    $scope.login = function() {
      $http.post(EvalSettings.backendURL + 'login', $scope.user).
      success(function(data) {
        EvalState.Token = data.Token;
        if (data.User.Role === 'admin') {
          $location.url('/admin');
        } else {
          $location.url('/user');
        }
      }).
      error(function() {
        $scope.message = 'Invalid login';
      });
    };

    $scope.logout = function() {
      EvalState.Token = null;
      $scope.Token = null;
    };

  }]);
