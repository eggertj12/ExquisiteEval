'use strict';

describe('Service: AuthInterceptor', function () {
  var AuthInterceptor,
    EvalState;

  // load the service's module
  beforeEach(module('exquisiteEvalApp'));

  // instantiate service
  beforeEach(inject(function (_AuthInterceptor_, _$injector_) {
    AuthInterceptor = _AuthInterceptor_;
    EvalState = _$injector_.get('EvalState');
  }));

  it('should append token if available', function () {
    var config = {};

    // Arrange
    EvalState.Token = 'smuuuuu';

    // Act
    config = AuthInterceptor.request(config);

    // Assert
    expect(config.headers.Authorization).toBe('Basic smuuuuu');
  });

  it('should not add header if token not available', function () {
    var config = {};

    // Arrange
    EvalState.Token = null;

    // Act
    config = AuthInterceptor.request(config);

    // Assert
    expect(config.headers.Authorization).not.toBeDefined();
  });

});
