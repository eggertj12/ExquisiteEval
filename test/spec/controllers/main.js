'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('exquisiteEvalApp'));

  var MainCtrl,
    EvalState,
    $location,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, $injector) {
    scope = $rootScope.$new();
    MainCtrl = $controller('MainCtrl', {
      $scope: scope
    });

    $location = $injector.get('$location');
    EvalState = $injector.get('EvalState');
  }));

  it('should logout and redirect', function () {
    // Arrange

    // Act
    scope.logout();
    scope.$apply();

    // Assert
    expect(EvalState.Token).toBe(null);
    expect($location.url()).toBe('/login');
  });
});
