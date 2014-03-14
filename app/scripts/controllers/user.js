'use strict';

angular.module('exquisiteEvalApp')
  .controller('UserCtrl', ['$scope', '$location', 'EvalBackend',
    function ($scope, $location, EvalBackend) {
      // Holds the list of evaluations available
      $scope.evaluations = [];
      // Contains information about the single evaluation requested
      $scope.questions = [];
      // Contains all the answers the user has answered
      $scope.answers = []; // TODO: Create proper model for answers
      // Contains a list of teachers for the course who's evaluation was requested
      $scope.teachers = [];
      // ID of the course who's evaluation was requested
      $scope.course = '';
      // Semester of the course who's evaluation was requested
      $scope.semester = '';
      // ID of the evaluation requested
      $scope.evalID = '';

      // Get list of open evaluations for this user
      EvalBackend.getMyEvaluations().then(function(data) {
        $scope.evaluations = data;
        console.log(data);
      });

      // User clicked on an evaluation
      $scope.getEval = function(course, semester, id) {
        // Get the data for this evaluation
        EvalBackend.getCourseEvaluation(course, semester, id).then(function(data) {
          // Reset the answers array
          $scope.answers = [];
          $scope.questions = data;
          $scope.course = course;
          $scope.semester = semester;
          $scope.evalID = id;

          console.log(data);
          console.log($scope.answers);

          // We search for any questions containing multiple choices and initialize an array for the question
          angular.forEach($scope.questions.CourseQuestions, function(quest) {
            if(quest.Type === 'multiple') {
              $scope.answers[quest.ID] = [];
            }
          });
          angular.forEach($scope.questions.TeacherQuestions, function(quest) {
            if(quest.Type === 'multiple') {
              $scope.answers[quest.ID] = [];
            }
          });
        });

        // Get the list of teachers for this course
        EvalBackend.getCourseTeachers(course, semester).then(function(data) {
          $scope.teachers = data;
          console.log(data);
        });
      };

      // User clicked submit eval button
      $scope.submitEval = function() {
        // Used for debbuging atm - logs all the answers the user has selected to console
        console.log($scope.answers);
	    };

    }]);
