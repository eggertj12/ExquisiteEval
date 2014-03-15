'use strict';

angular.module('exquisiteEvalApp')
  .controller('TemplateCtrl', ['$scope', 'EvalBackend', 'EvalState', function ($scope, EvalBackend, EvalState) {


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
        edit: false,
        displayQ: false,
        displayA: false,
        displayNewA: false,
        displayT: false,
        displayTlist: false,
        templates:[]
      };

    $scope.cleanTemplate = function() {
        $scope.template.TitleIS = '';
        $scope.template.TitleEN = '';
        $scope.template.IntroTextIS = '';
        $scope.template.IntroTextEN = '';
        $scope.template.CourseQuestions = [];
        $scope.template.TeacherQuestions = [];
      };

    $scope.addAnAnswer = function() {
      $scope.vm.displayNewA = true;
    };

    $scope.addAnswer = function() {
      var newAnswer = angular.copy($scope.answer);
      $scope.question.Answers.push(newAnswer);
      $scope.vm.displayNewA = false;
    };

    $scope.showTemplates = function() {
      EvalBackend.getTemplates().then(function(data) {
        $scope.vm.templates = data;
        $scope.vm.displayTlist = true;
        $scope.vm.displayT = false;
      });
    };


    $scope.editTemplate = function() {
      $scope.vm.edit = true;
      $scope.vm.displayTlist = false;
      $scope.vm.displayT = false;
    };

    $scope.editSpecificTemplate = function(templateID) {
      EvalBackend.getTemplate(templateID).then(function(data) {
        $scope.vm.edit = true;
        $scope.vm.displayTlist = false;
        $scope.vm.displayT = false;
        $scope.template = data;
      });

    };

    $scope.displaySpecificTemplate = function(templateID) {
      EvalBackend.getTemplate(templateID).then(function(data) {
        $scope.vm.edit = false;
        $scope.vm.displayTlist = false;
        $scope.vm.displayT = true;
        $scope.template = data;
      });
    };

    $scope.iLoveJSHINT = function() {
      console.log(EvalState);
    };

    // editing functions

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
        var newQuestion = angular.copy($scope.question);
        if($scope.qhandle.teacherOrCourseQ === 'course') {
          $scope.template.CourseQuestions.push(newQuestion);
        }
        else if($scope.qhandle.teacherOrCourseQ === 'teacher') {
          $scope.template.TeacherQuestions.push(newQuestion);
        }
        $scope.vm.displayQ = false;
      };

    $scope.tgetTemplate = function() {
        EvalBackend.getTemplate(1).then(function(data) {
            $scope.template = data;
          });
      };

    $scope.postTemplate = function() {
        $scope.template.ID = 0;
        EvalBackend.addTemplate($scope.template).then(function(data) {
          console.log(data);
          $scope.vm.edit = false;
        });
      };

    $scope.abortEdit = function() {
      $scope.vm.edit = false;
      $scope.cleanTemplate();
    };

  }]);
