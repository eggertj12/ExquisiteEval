'use strict';

describe('Controller: UserCtrl', function () {

  // load the controller's module
  beforeEach(module('exquisiteEvalApp'));

  var UserCtrl,
    $location,
    EvalBackend,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, $injector) {
    scope = $rootScope.$new();
    $location = $injector.get('$location');
    EvalBackend = $injector.get('EvalBackend');
    UserCtrl = $controller('UserCtrl', {
      $scope: scope
    });
  }));

});
