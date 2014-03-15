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
        ID: 0,
        TextIS: '',
        TextEN: '',
        ImageURL:'',
        Type: '',
        Answers: []
      };

    $scope.answer = {
        ID: 0,
        TextIS: '',
        TextEN: '',
        ImageURL: '',
        Weight: 1
      };

    $scope.qhandle = {
      order: 0,
      teacherOrCourseQ: 'course'
    };

    $scope.vm = {
        displayQ: false,
        displayA: false
      };

    $scope.addingQuestion = function() {
        $scope.vm.displayQ = true;
      };

    $scope.displayA = function() {
      $scope.vm.displayA = true;
    };

    $scope.undisplayA = function() {
      $scope.vm.displayA = false;
    };

    $scope.addQuestion = function() {
        $scope.template.CourseQuestions.push($scope.question);
        $scope.vm.displayQ = false;
      };

    $scope.tgetTemplate = function() {
        EvalBackend.getTemplate(1).then(function(data) {
            $scope.template = data;
          });
      };

    $scope.postTemplate = function() {
        EvalBackend.addTemplate($scope.template).then(function(data) {
          console.log('Some kind of success! Maybe. Kinda. OK.');
          console.log(data);
        });
      };

  }]);
