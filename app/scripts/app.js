'use strict';

angular.module('exquisiteEvalApp', [
  'ngRoute', 'ngMoment', 'ui.bootstrap'
])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      })
      .when('/admin', {
        templateUrl: 'views/admin.html',
        controller: 'AdminCtrl'
      })
      .when('/user', {
        templateUrl: 'views/user.html',
        controller: 'UserCtrl'
      })
      .when('/template', {
        templateUrl: 'views/template.html',
        controller: 'TemplateCtrl'
      })
      .when('/evaluation', {
        templateUrl: 'views/evaluation.html',
        controller: 'EvaluationCtrl'
      })
      .otherwise({
        redirectTo: '/login'
      });
  }).
  config(function ($httpProvider) {
    $httpProvider.interceptors.push('AuthInterceptor');
  })
  .run(['$rootScope', '$location', '$window', 'EvalState',
    function ($rootScope, $location, $window, EvalState) {
    $rootScope.$on('$routeChangeStart', function () {

      if (EvalState.getToken() === null) {
        // Check sessionStorage for token in case of page reload
        // Seems that null will be saved as the string 'null'
        if ($window.sessionStorage.Token && $window.sessionStorage.Token !== 'null') {
          EvalState.setToken($window.sessionStorage.Token);
        } else {
          $location.path('/login');
        }
      }

    });
  }]);
