'use strict';

angular.module('exquisiteEvalApp', [
  'ngRoute'
])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
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
      .otherwise({
        redirectTo: '/'
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
