'use strict';

describe('Service: EvalState', function () {

  // load the service's module
  beforeEach(module('exquisiteEvalApp'));

  // instantiate service
  var EvalState;
  beforeEach(inject(function (_EvalState_) {
    EvalState = _EvalState_;
  }));

  it('should initially be null', function () {
    expect(EvalState.token).toBe(null);
  });

});
