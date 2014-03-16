'use strict';

angular.module('exquisiteEvalApp')
  .directive('eeAdminEvalResult', function () {
    return {
      templateUrl: 'templates/adminevalresult.html',
      restrict: 'E',
      scope: {
        evaluation: '=ngModel'
      },
      link: function postLink(scope, element) {
      }
    };
  });
