/*global MockBackend */
'use strict';

describe('Controller: AdminCtrl', function () {

  var AdminCtrl,
    $location,
    $provide,
    EvalBackend,
    scope;

  // load the controller's module
  beforeEach(module('exquisiteEvalApp'));

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

    AdminCtrl = $controller('AdminCtrl', {
      $scope: scope
    });
    scope.$apply();
  }));

  it('should move you to templates view', function() {
    // Just to fulfill 100% code coverage, should be in an e2e test

    scope.gotoTemplate(1);
    expect($location.url()).toBe('/template');
  });

  it('should load evaluations', function() {
    expect(scope.vm.evaluations.length).toBe(1);
  });

});
