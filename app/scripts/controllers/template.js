'use strict';

angular.module('exquisiteEvalApp')
  .controller('TemplateCtrl', ['Evalbackend', function ($scope, Evalbackend) {


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
        $scope.template.questions.push($scope.question);
        $scope.vm.displayQ = false;
      };

    $scope.tgetTemplate = function() {
        console.log('Hi!');
        Evalbackend.getTemplate(1).success(function(data) {
            console.log('Success!');
            $scope.template = data;
          });
      };

    $scope.postTemplate = function() {

    };

  }]);
