'use strict';

angular.module('exquisiteEvalApp')
  .controller('TemplateCtrl', ['$scope', 'EvalBackend', function ($scope, EvalBackend) {


    $scope.template = {
        TitleIS: '',
        TitleEN: '',
        IntroTextIS: '',
        IntroTextEN: '',
        CourseQuestions: [],
        TeacherQuestions: []
      };

    $scope.question = {
        text: ''
      };

    $scope.vm = {
        displayQ: false
      };

    $scope.addingQuestion = function() {
        $scope.vm.displayQ = true;
      };

    $scope.addQuestion = function() {
        $scope.template.CourseQuestions.push($scope.question);
        $scope.vm.displayQ = false;
      };

    $scope.tgetTemplate = function() {
        console.log('Hi!');
        EvalBackend.getTemplate(1).then(function(data) {
            $scope.template = data;
          });
      };

    $scope.postTemplate = function() {

    };

  }]);
