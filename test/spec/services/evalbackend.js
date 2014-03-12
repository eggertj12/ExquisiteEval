'use strict';

describe('Service: Evalbackend,', function () {
  var Evalbackend,
    $httpBackend;

  // ------------------------------------------------------------------------
  // Common setup for all tests
  // ------------------------------------------------------------------------

  // load the service's module
  beforeEach(function() {
    var EvalSettings = {backendURL: 'api/v1/'};

    module('exquisiteEvalApp');
    module(function ($provide) {
      $provide.constant('EvalSettings', EvalSettings);
    });
  });

  // instantiate service
  beforeEach(inject(function (_Evalbackend_, $injector) {
    Evalbackend = _Evalbackend_;
    $httpBackend = $injector.get('$httpBackend');
  }));

  // Verify all requests have been executed
  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  // ------------------------------------------------------------------------
  // Tests for getTemplates
  // ------------------------------------------------------------------------

  describe('getTemplates', function() {

    beforeEach(function() {
      $httpBackend.expectGET('api/v1/evaluationtemplates');
    });

    it('should return array containing templates', function () {
      var result,
        promise;

      // Arrange
      $httpBackend.when('GET', 'api/v1/evaluationtemplates').respond(
          [{id: 1, TitleIS: 'Prufa', TitleEN: 'Testing'}]
        );

      // Act
      promise = Evalbackend.getTemplates();
      promise.then(function(data) {
        result = data;
      });

      $httpBackend.flush();

      // Assert
      expect(result.length).toBe(1);
    });

    it('should handle backend errors', function () {
      var result,
        promise;

      // Arrange
      $httpBackend.when('GET', 'api/v1/evaluationtemplates').respond(
          404, {error: 'Not found'}
        );

      // Act
      promise = Evalbackend.getTemplates();
      promise.then(function(data) {
        result = data;
      }, function(reason) {
        result = reason;
      });

      $httpBackend.flush();

      // Assert
      expect(result.error).toBe('Not found');
    });

  });

  // ------------------------------------------------------------------------
  // Tests for addTemplate
  // ------------------------------------------------------------------------

  describe('addTemplate', function() {

    beforeEach(function() {
      $httpBackend.expectPOST('api/v1/evaluationtemplates');
    });

    it('should make post request', function () {
      var result,
        promise;

      // Arrange
      $httpBackend.when('POST', 'api/v1/evaluationtemplates').respond(
          {result: 'Ok'}
        );

      // Act
      promise = Evalbackend.addTemplate();
      promise.then(function(data) {
        result = data;
      });

      $httpBackend.flush();

      // Assert
      expect(result.result).toBe('Ok');
    });

    it('should handle backend errors', function () {
      var result,
        promise;

      // Arrange
      $httpBackend.when('POST', 'api/v1/evaluationtemplates').respond(
          401, {error: 'Authorization needed'}
        );

      // Act
      promise = Evalbackend.addTemplate();
      promise.then(function(data) {
        result = data;
      }, function(reason) {
        result = reason;
      });

      $httpBackend.flush();

      // Assert
      expect(result.error).toBe('Authorization needed');
    });

  });

  // ------------------------------------------------------------------------
  // Tests for getTemplate
  // ------------------------------------------------------------------------

  describe('getTemplate', function() {

    it('should reject calls without id', function () {
      var result;

      // Arrange

      // Act
      result = Evalbackend.getTemplate();

      // Assert
      expect(result).toBe(false);
    });

    it('should return template object', function () {
      var result,
        promise;

      // Arrange
      $httpBackend.expectGET('api/v1/evaluationtemplate/1');
      $httpBackend.when('GET', 'api/v1/evaluationtemplate/1').respond(
          {id: 1, TitleIS: 'Prufa', TitleEN: 'Testing', IntroTextIS: 'Prufu template', IntroTextEN: 'Test template',
          CourseQuestions: [], TeacherQuestions: []}
        );

      // Act
      promise = Evalbackend.getTemplate(1);
      promise.then(function(data) {
        result = data;
      });

      $httpBackend.flush();

      // Assert
      expect(result.TitleIS).toBe('Prufa');
    });

    it('should handle backend errors', function () {
      var result,
        promise;

      // Arrange
      $httpBackend.expectGET('api/v1/evaluationtemplate/1');
      $httpBackend.when('GET', 'api/v1/evaluationtemplate/1').respond(
          404, {error: 'Not found'}
        );

      // Act
      promise = Evalbackend.getTemplate(1);
      promise.then(function(data) {
        result = data;
      }, function(reason) {
        result = reason;
      });

      $httpBackend.flush();

      // Assert
      expect(result.error).toBe('Not found');
    });

  });

});
