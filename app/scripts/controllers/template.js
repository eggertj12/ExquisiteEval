'use strict';

angular.module('exquisiteEvalApp')
  .controller('TemplateCtrl', ['$scope', 'Evalbackend', function ($scope, Evalbackend) {


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
        var x = Evalbackend.getTemplate(1);
        console.log(x);
      };

    $scope.postTemplate = function() {

    };

  }]);
