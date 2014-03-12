'use strict';

describe('Service: EvalSettings', function () {

  var EvalSettings;

  // load the service's module
  beforeEach(function() {
    module(function ($provide) {
      $provide.constant('EvalSettings', { backendURL: 'api/v1/' });
    });
//    module('exquisiteEvalApp');
  });

  // instantiate service
  beforeEach(inject(function ($injector) {
    EvalSettings = $injector.get('EvalSettings');
  }));


  it('should do something', function () {
    expect(EvalSettings.backendURL).toBe('api/v1/');
  });

});
