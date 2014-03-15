'use strict';

describe('Controller: EvaluationCtrl', function () {

  var $provide,
    $injector,
    $location,
    EvaluationCtrl,
    scope;

  // load the controller's module
  beforeEach(module('exquisiteEvalApp'));

  // get a reference to provide service, can not be done from inject function
  beforeEach(module(function (_$provide_) {
    $provide = _$provide_;
  }));

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, _$injector_) {
    scope = $rootScope.$new();
    $injector = _$injector_;

    $provide.service('EvalBackend', MockBackend);

    EvaluationCtrl = $controller('EvaluationCtrl', {
      $scope: scope
    });
  }));

  it('open function should set passed in variable on scope to true', function () {
    // Arrange
    var event = {
      preventDefault: function() {},
      stopPropagation: function() {},
    };

    // Act
    scope.open(event, 'foo');

    // Assert
    expect(scope.foo).toBe(true);
  });

  it('should redirect to admin on successful post of evaluation', function () {
    // Arrange
    scope.evaluation = {ID: 1};
    $location = $injector.get('$location');

    // Act
    scope.addEvaluation();
    scope.$apply();

    // Assert
    expect($location.url()).toBe('/admin');
  });

});
