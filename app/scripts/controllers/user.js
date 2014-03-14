'use strict';

angular.module('exquisiteEvalApp')
  .controller('UserCtrl', ['$scope', '$location', 'EvalBackend',
    function ($scope, $location, EvalBackend) {

      $scope.evaluations = [];
	    $scope.questions = [];
	    //$scope.teacherQuestionsHtml = "";

      EvalBackend.getMyEvaluations().then(function(data) {
        $scope.evaluations = data;
        console.log(data);
      });

      $scope.getEval = function(course, semester, id) {
        EvalBackend.getCourseEvaluation(course, semester, id).then(function(data) {
          $scope.questions = data;
          console.log(data);
        });
      };

    }]);
