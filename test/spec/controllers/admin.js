'use strict';

describe('Controller: AdminCtrl', function () {

  // load the controller's module
  beforeEach(module('exquisiteEvalApp'));

  var AdminCtrl,
    $location,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, $injector) {
    scope = $rootScope.$new();
    $location = $injector.get('$location');
    AdminCtrl = $controller('AdminCtrl', {
      $scope: scope
    });
  }));

  it('should move you to templates view', function() {
    // Just to fulfill 100% code coverage, should be in an e2e test

    scope.gotoTemplates();
    expect($location.url()).toBe('/template');
  });

});
