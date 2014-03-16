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
  .run(['$rootScope', '$location', 'EvalState',
    function ($rootScope, $location, EvalState) {
    $rootScope.$on('$routeChangeStart', function () {

      if (EvalState.Token === null) {
        $location.path('/login');
      }

    });
  }]);
