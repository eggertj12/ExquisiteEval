'use strict';

angular.module('exquisiteEvalApp')
  .controller('AdminCtrl', ['$scope', '$location', '$http', 'EvalSettings', 'EvalState',
    function ($scope, $location) {
    


    $scope.gotoTemplates = function() {
        $location.url('/template');
      };
  }]);
