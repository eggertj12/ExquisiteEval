'use strict';

angular.module('exquisiteEvalApp')
  .controller('TemplateCtrl', ['$scope', '$location', 'EvalBackend', 'EvalState', function ($scope, $location, EvalBackend, EvalState) {


    $scope.template = {
        ID: 0,
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

    $scope.multipleChoiceAnswer = {
      answers: []
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
        displaySingleChoiceA: false,
        displayMultipleChoiceA: false,
        canConfirmMultipleChoiceA: true,
        displayT: false,
        displayTlist: false,
        templates:[]
      };

    $scope.createNewTemplate = function() {
      $scope.cleanTemplate();
      $scope.editTemplate();
    };

    $scope.cleanTemplate = function() {
        $scope.template.TitleIS = '';
        $scope.template.TitleEN = '';
        $scope.template.IntroTextIS = '';
        $scope.template.IntroTextEN = '';
        $scope.template.CourseQuestions = [];
        $scope.template.TeacherQuestions = [];
      };

    $scope.cleanQuestion = function() {
        $scope.question.ID = 0;
        $scope.question.TextIS = '';
        $scope.question.TextEN = '';
        $scope.question.ImageURL ='';
        $scope.question.Type = '';
        $scope.question.Answers = [];
      };

    $scope.cleanAnswers = function() {
        $scope.answer.ID = 0;
        $scope.answer.TextIS = '';
        $scope.answer.TextEN ='';
        $scope.answer.ImageURL = '';
        $scope.answer.Weight = 1;
        $scope.multipleChoiceAnswer.answers = [];
      };

    $scope.showTemplates = function() {
      EvalBackend.getTemplates().then(function(data) {
        $scope.cleanTemplate();
        $scope.vm.templates = data;
        $scope.vm.displayTlist = true;
        $scope.vm.displayT = false;
        $scope.vm.edit = false;
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
        $scope.vm.displayQ = false;
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

    $scope.confirmMultipleChoiceA = function() {
      if($scope.multipleChoiceAnswer.answers.length < 2) {
        $scope.vm.canConfirmMultipleChoiceA = false;
      }
      else {
        $scope.vm.canConfirmMultipleChoiceA = true;
      }
    };

    // editing functions

    $scope.addingQuestion = function() {
        $scope.vm.displayQ = true;
      };

    $scope.qTypeText = function() {
      $scope.vm.displaySingleChoiceA = false;
      $scope.vm.displayMultipleChoiceA = false;
    };

    $scope.qTypeSingle = function () {
      $scope.cleanAnswers();
      $scope.vm.displayMultipleChoiceA = false;
      $scope.vm.displaySingleChoiceA = true;
    };

    $scope.qTypeMultiple = function () {
      $scope.cleanAnswers();
      $scope.vm.displaySingleChoiceA = false;
      $scope.vm.displayMultipleChoiceA = true;
      $scope.vm.canConfirmMultipleChoiceA = true;

      $scope.multipleChoiceAnswer.answers.push(angular.copy($scope.answer));
      $scope.multipleChoiceAnswer.answers.push(angular.copy($scope.answer));
    };

    $scope.addChoice = function () {
      $scope.multipleChoiceAnswer.answers.push(angular.copy($scope.answer));

      $scope.confirmMultipleChoiceA();
    };

    $scope.removeChoice = function (index) {
      $scope.multipleChoiceAnswer.answers.splice(index, 1);

      $scope.confirmMultipleChoiceA();
    };

    $scope.addMultipleChoiceAnswer = function() {
      $scope.question.Answers = angular.copy($scope.multipleChoiceAnswer.answers);

      $scope.vm.displayMultipleChoiceA = false;
    };

    $scope.addSingleChoiceAnswer = function() {
      $scope.question.Answers.push(angular.copy($scope.answer));

      $scope.vm.displaySingleChoiceA = false;
    };

    $scope.abortAnswer = function() {
      $scope.cleanAnswers();

      $scope.vm.displayMultipleChoiceA = false;
      $scope.vm.displaySingleChoiceA = false;

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

    $scope.abortQuestion = function() {
      $scope.cleanQuestion();
      $scope.vm.displayQ = false;
    };

    $scope.removeCourseQuestion = function(index) {
      $scope.template.CourseQuestions.splice(index, 1);
    };

    $scope.removeTeacherQuestion = function(index) {
      $scope.template.TeacherQuestions.splice(index, 1);
    };

    $scope.tgetTemplate = function() {
        EvalBackend.getTemplate(1).then(function(data) {
            $scope.template = data;
          });
      };

    $scope.abortEdit = function() {
      $scope.vm.edit = false;
      $scope.cleanTemplate();
    };

    $scope.postTemplate = function() {
        $scope.template.ID = 0;
        EvalBackend.addTemplate($scope.template).then(function(data) {
          console.log(data);
          $scope.vm.edit = false;
        });
      };

    $scope.makeEvalFromThisTemplate = function(id) {
      EvalState.TemplateID = id;
      $location.url('/evaluation');
    };

  }]);
