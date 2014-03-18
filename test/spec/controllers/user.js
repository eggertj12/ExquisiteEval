'use strict';

describe('Controller: UserCtrl', function () {

  // load the controller's module
  beforeEach(module('exquisiteEvalApp'));

  var UserCtrl,
    $location,
    EvalBackend,
    $provide,
    scope;

  // get a reference to provide service, can not be done from inject function
  beforeEach(module(function (_$provide_) {
    $provide = _$provide_;
  }));

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, $injector) {
    scope = $rootScope.$new();
    $location = $injector.get('$location');

    $provide.service('EvalBackend', MockBackend);
    EvalBackend = $injector.get('EvalBackend');

    UserCtrl = $controller('UserCtrl', {
      $scope: scope
    });
  }));

  it('getEval should generate various objects based on the eval requested', function() {
    // Just to fulfill 100% code coverage, should be in an e2e test

    scope.getEval('T-427-WEPO', '20141', 1);
    scope.$apply();
    expect(scope.evalInfo.course).toBe('T-427-WEPO');
    expect(scope.evalInfo.semester).toBe('20141');
    expect(scope.evalInfo.teachers.length).toBe(1);
    expect(scope.evalInfo.teachers[0].FullName).toBe('Daníel Brandur Sigurgeirsson');
    expect(scope.evalInfo.courseQuestions.length).toBe(3);
    expect(scope.evalInfo.courseQuestions[0].question.textIS).toBe('Hvernig er áfangin?');
    expect(scope.evalInfo.teacherQuestions.length).toBe(1);
    expect(scope.evalInfo.teacherQuestions[0].questions.length).toBe(3);
    expect(scope.evalInfo.teacherQuestions[0].questions[0].question.textIS).toBe('Hvernig var þessi kennari?');
  });

  it('submitEval should generate a legit answer object for the api', function() {
    // Just to fulfill 100% code coverage, should be in an e2e test

    scope.getEval('T-427-WEPO', '20141', 1);
    scope.$apply();

    // Simulate user input
    scope.evalInfo.courseQuestions[0].answer.Value = 'Fínn bara';
    scope.evalInfo.courseQuestions[2].answer.Value[52] = true;
    scope.evalInfo.courseQuestions[2].answer.Value[53] = true;
    scope.evalInfo.teacherQuestions[0].questions[2].answer.Value[57] = true;
    scope.evalInfo.teacherQuestions[0].questions[2].answer.Value[58] = true;

    scope.submitEval();
    scope.$apply();

    expect(scope.evalInfo.answers[0].TeacherSSN).toBe('');
    expect(scope.evalInfo.answers[0].Value).toBe('Fínn bara');
    expect(scope.evalInfo.answers[0].QuestionID).toBe(37);

    expect(scope.evalInfo.answers[7].TeacherSSN).toBe('1203735289');
    expect(scope.evalInfo.answers[7].Value).toBe('58');
    expect(scope.evalInfo.answers[7].QuestionID).toBe(42);
    expect(scope.submitResult).toBe('Evaluation successfully submitted! Thanks!');
    expect(scope.showEval).toBe(false);
    expect(scope.ID).toBe('');
  });

});
