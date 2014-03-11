'use strict';

describe('Service: EvalSettings', function () {

  // load the service's module
  beforeEach(module('exquisiteEvalApp'));

  // instantiate service
  var EvalSettings;
  beforeEach(inject(function (_EvalSettings_) {
    EvalSettings = _EvalSettings_;
  }));


  it('should do something', function () {
    expect(EvalSettings.backendURL).toBe('api/v1/');
  });

});
