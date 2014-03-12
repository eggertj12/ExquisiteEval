'use strict';

describe('Controller: LoginCtrl', function () {

  // load the controller's module
  beforeEach(module('exquisiteEvalApp'));

  var $httpBackend,
    $rootScope,
    $location,
    LoginCtrl,
    EvalState,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, _$rootScope_, $injector) {
    var EvalSettings = {backendURL: 'api/v1/'};

    $rootScope = _$rootScope_;
    scope = $rootScope.$new();
    LoginCtrl = $controller('LoginCtrl', {
      $scope: scope,
      EvalSettings: EvalSettings
    });
    $httpBackend = $injector.get('$httpBackend');
    $location = $injector.get('$location');
    EvalState = $injector.get('EvalState');
    EvalState.Token = null;
  }));

  // Verify all requests have been executed
  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should redirect to login for logged out user', function() {
    // Just to fulfill 100% code coverage, should be in an e2e test

    $rootScope.$broadcast('$routeChangeStart');
    expect($location.url()).toBe('/login');
  });

  it('should not redirect to login for logged in user', function() {
    // Just to fulfill 100% code coverage, should be in an e2e test

    EvalState.Token = 'foobar';
    $rootScope.$broadcast('$routeChangeStart');
    expect($location.url()).toBe('');
  });

  it('should handle admin login', function () {
    // Arrange
    $httpBackend.expectPOST('api/v1/login');
    $httpBackend.when('POST', 'api/v1/login').respond(
      {
        'Token': 'YWRtaW46c211dXV1',
        'User': {
          'Username': 'admin',
          'FullName': 'Administrator',
          'SSN': '1234567890',
          'Email': null,
          'Role': 'admin',
          'ImageURL': 'http://www.ru.is/kennarar/dabs/img/12/1234567890.jpg'
        }
      });
    
    scope.user = {user: 'admin', pass: 'smuuuu'};

    // Act
    scope.login();
    $httpBackend.flush();

    // Assert
    expect(EvalState.Token).toEqual('YWRtaW46c211dXV1');
  });

  it('should handle user login', function () {
    // Arrange
    $httpBackend.expectPOST('api/v1/login');
    $httpBackend.when('POST', 'api/v1/login').respond(
      {
        'Token': 'ZWdnZXJ0ajEyOnNtdXV1dQ==',
        'User': {
          'Username': 'eggertj12',
          'FullName': 'Eggert Jóhannesson',
          'SSN': '0609743659',
          'Email': null,
          'Role': 'student',
          'ImageURL': 'http://www.ru.is/kennarar/dabs/img/06/0609743659.jpg'
        }
      });
    
    scope.user = {user: 'eggertj12', pass: 'smuuuu'};

    // Act
    scope.login();
    $httpBackend.flush();

    // Assert
    expect(EvalState.Token).toEqual('ZWdnZXJ0ajEyOnNtdXV1dQ==');
  });

  it('should handle failed login', function () {
    // Arrange
    $httpBackend.expectPOST('api/v1/login');
    $httpBackend.when('POST', 'api/v1/login').respond(401, '');
    
    scope.user = {user: 'fake', pass: 'real'};

    // Act
    scope.login();
    $httpBackend.flush();

    // Assert
    expect(scope.message).toEqual('Invalid login');
  });
});
