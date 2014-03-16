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

    scope.addTemplate();
    expect($location.url()).toBe('/template');
  });

  it('should move you to evaluations view', function() {
    // Just to fulfill 100% code coverage, should be in an e2e test

    scope.addEvaluation();
    expect($location.url()).toBe('/evaluation');
  });

  it('should load evaluations', function() {
    expect(scope.vm.evaluations.length).toBe(1);
  });

  it('getEvaluation should load a single evaluation', function() {
    // Arrange

    // Act
    scope.getEvaluation('smuuuuu');
    scope.$apply();

    // Assert
    expect(scope.vm.evaluation.id).toBe('smuuuuu');
  });

  it('selectCourse should update viewModel with input', function() {
    // Arrange
    var dummy = {foo: 'bar'};

    // Act
    scope.selectCourse(dummy);

    // Assert
    expect(scope.vm.course.foo).toBe('bar');
  });

  it('openTeacher should set undfined to true', function() {
    // Arrange
    var dummy = {};

    // Act
    scope.openTeacher(dummy);

    // Assert
    expect(dummy.open).toBe(true);
  });

  it('openTeacher should set true to false', function() {
    // Arrange
    var dummy = {open: true};

    // Act
    scope.openTeacher(dummy);

    // Assert
    expect(dummy.open).toBe(false);
  });

});
