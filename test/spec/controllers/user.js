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
    expect(scope.course).toBe('T-427-WEPO');
    expect(scope.semester).toBe('20141');
    expect(scope.teachers.length).toBe(1);
  });

});
