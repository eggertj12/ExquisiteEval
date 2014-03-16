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

  it('should initialize answers', function() {
    // Just to fulfill 100% code coverage, should be in an e2e test

    scope.getEval('T-427-WEPO', '20141', 1);
    scope.$apply();
    expect(scope.evalInfo.course).toBe('T-427-WEPO');
    expect(scope.evalInfo.semester).toBe('20141');
    expect(scope.evalInfo.teachers.length).toBe(1);
    expect(scope.evalInfo.teachers[0].FullName).toBe('Daníel Brandur Sigurgeirsson');
    expect(scope.evalInfo.courseQuestions.length).toBe(2);
    expect(scope.evalInfo.courseQuestions[0].question.text).toBe('Hvernig er áfangin?');
    expect(scope.evalInfo.teacherQuestions.length).toBe(1);
    expect(scope.evalInfo.teacherQuestions[0].questions.length).toBe(1);
    expect(scope.evalInfo.teacherQuestions[0].questions[0].question.text).toBe('Hvernig var þessi kennari?');
  });

});
