'use strict';

describe('Service: EvalBackend,', function () {
  var EvalBackend,
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
  beforeEach(inject(function (_EvalBackend_, $injector) {
    EvalBackend = _EvalBackend_;
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
      promise = EvalBackend.getTemplates();
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
      promise = EvalBackend.getTemplates();
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
      promise = EvalBackend.addTemplate();
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
      promise = EvalBackend.addTemplate();
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
      result = EvalBackend.getTemplate();

      // Assert
      expect(result).toBe(false);
    });

    it('should return template object', function () {
      var result,
        promise;

      // Arrange
      $httpBackend.expectGET('api/v1/evaluationtemplates/1');
      $httpBackend.when('GET', 'api/v1/evaluationtemplates/1').respond(
          {id: 1, TitleIS: 'Prufa', TitleEN: 'Testing', IntroTextIS: 'Prufu template', IntroTextEN: 'Test template',
          CourseQuestions: [], TeacherQuestions: []}
        );

      // Act
      promise = EvalBackend.getTemplate(1);
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
      $httpBackend.expectGET('api/v1/evaluationtemplates/1');
      $httpBackend.when('GET', 'api/v1/evaluationtemplates/1').respond(
          404, {error: 'Not found'}
        );

      // Act
      promise = EvalBackend.getTemplate(1);
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
  // Tests for getEvaluations
  // ------------------------------------------------------------------------

  describe('getEvaluations', function() {

    beforeEach(function() {
      $httpBackend.expectGET('api/v1/evaluations');
    });

    it('should return array containing evaluations', function () {
      var result,
        promise;

      // Arrange
      $httpBackend.when('GET', 'api/v1/evaluations').respond([
          {
            'ID': 1,
            'TemplateTitleIS': 'sample string 2',
            'TemplateTitleEN': 'sample string 3'
          }
        ]);

      // Act
      promise = EvalBackend.getEvaluations();
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
      $httpBackend.when('GET', 'api/v1/evaluations').respond(
          404, {error: 'Not found'}
        );

      // Act
      promise = EvalBackend.getEvaluations();
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
  // Tests for addEvaluation
  // ------------------------------------------------------------------------

  describe('addEvaluation', function() {

    beforeEach(function() {
      $httpBackend.expectPOST('api/v1/evaluations');
    });

    it('should make post request', function () {
      var result,
        promise;

      // Arrange
      $httpBackend.when('POST', 'api/v1/evaluations').respond(
          {result: 'Ok'}
        );

      // Act
      promise = EvalBackend.addEvaluation();
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
      $httpBackend.when('POST', 'api/v1/evaluations').respond(
          401, {error: 'Authorization needed'}
        );

      // Act
      promise = EvalBackend.addEvaluation();
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
  // Tests for getEvaluation
  // ------------------------------------------------------------------------

  describe('getEvaluation', function() {

    it('should reject calls without id', function () {
      var result;

      // Arrange

      // Act
      result = EvalBackend.getEvaluation();

      // Assert
      expect(result).toBe(false);
    });

    it('should return evaluation object', function () {
      var result,
        promise;

      // Arrange
      $httpBackend.expectGET('api/v1/evaluations/1');
      $httpBackend.when('GET', 'api/v1/evaluations/1').respond(
          {id: 1, TemplateTitleIS: 'Prufa', TitleEN: 'Testing', IntroTextIS: 'Prufu template', IntroTextEN: 'Test template',
          CourseQuestions: [], TeacherQuestions: []}
        );

      // Act
      promise = EvalBackend.getEvaluation(1);
      promise.then(function(data) {
        result = data;
      });

      $httpBackend.flush();

      // Assert
      expect(result.TemplateTitleIS).toBe('Prufa');
    });

    it('should handle backend errors', function () {
      var result,
        promise;

      // Arrange
      $httpBackend.expectGET('api/v1/evaluations/1');
      $httpBackend.when('GET', 'api/v1/evaluations/1').respond(
          404, {error: 'Not found'}
        );

      // Act
      promise = EvalBackend.getEvaluation(1);
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
  // Tests for getMyCourses
  // ------------------------------------------------------------------------

  describe('getMyCourses', function() {

    beforeEach(function() {
      $httpBackend.expectGET('api/v1/my/courses');
    });

    it('should return array containing courses', function () {
      var result,
        promise;

      // Arrange
      $httpBackend.when('GET', 'api/v1/my/courses').respond([
          {
            'ID': 1,
            'CourseID': 'T-427-VEFF',
            'NameIS': 'Vefforritun II',
            'NameEN': 'Web programming II'
          }
        ]);

      // Act
      promise = EvalBackend.getMyCourses();
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
      $httpBackend.when('GET', 'api/v1/my/courses').respond(
          404, {error: 'Not found'}
        );

      // Act
      promise = EvalBackend.getMyCourses();
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
  // Tests for getMyEvaluations
  // ------------------------------------------------------------------------

  describe('getMyEvaluations', function() {

    beforeEach(function() {
      $httpBackend.expectGET('api/v1/my/evaluations');
    });

    it('should return array containing evaluations', function () {
      var result,
        promise;

      // Arrange
      $httpBackend.when('GET', 'api/v1/my/evaluations').respond([
          {
            'ID': 1,
            'CourseID': 'T-427-VEFF',
            'CourseNameIS': 'Vefforritun II',
            'CourseNameEN': 'Web programming II',
            'Semester': '20141'
          }
        ]);

      // Act
      promise = EvalBackend.getMyEvaluations();
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
      $httpBackend.when('GET', 'api/v1/my/evaluations').respond(
          404, {error: 'Not found'}
        );

      // Act
      promise = EvalBackend.getMyEvaluations();
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
  // Tests for getCourseTeachers
  // ------------------------------------------------------------------------

  describe('getCourseTeachers', function() {

    beforeEach(function() {
      $httpBackend.expectGET('api/v1/courses/T-427-VEFF/20141/teachers');
    });

    it('should return array containing teachers', function () {
      var result,
        promise;

      // Arrange
      $httpBackend.when('GET', 'api/v1/courses/T-427-VEFF/20141/teachers').respond([
          {
            'Username': 'dabs',
            'FullName': 'Daníel',
            'SSN': 'NSA-ID-Forbidden'
          }
        ]);

      // Act
      promise = EvalBackend.getCourseTeachers('T-427-VEFF', '20141');
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
      $httpBackend.when('GET', 'api/v1/courses/T-427-VEFF/20141/teachers').respond(
          404, {error: 'Not found'}
        );

      // Act
      promise = EvalBackend.getCourseTeachers('T-427-VEFF', '20141');
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
  // Tests for getCourseEvaluation
  // ------------------------------------------------------------------------

  describe('getCourseEvaluation', function() {

    beforeEach(function() {
      $httpBackend.expectGET('api/v1/courses/T-427-VEFF/20141/evaluations/1');
    });

    it('should return evaluation object', function () {
      var result,
        promise;

      // Arrange
      $httpBackend.when('GET', 'api/v1/courses/T-427-VEFF/20141/evaluations/1').respond([
          {id: 1, TitleIS: 'Prufa', TitleEN: 'Testing', IntroTextIS: 'Prufu template', IntroTextEN: 'Test template',
          CourseQuestions: [], TeacherQuestions: []}
        ]);

      // Act
      promise = EvalBackend.getCourseEvaluation('T-427-VEFF', '20141', 1);
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
      $httpBackend.when('GET', 'api/v1/courses/T-427-VEFF/20141/evaluations/1').respond(
          404, {error: 'Not found'}
        );

      // Act
      promise = EvalBackend.getCourseEvaluation('T-427-VEFF', '20141', 1);
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
  // Tests for addCourseEvaluation
  // ------------------------------------------------------------------------

  describe('addCourseEvaluation', function() {

    beforeEach(function() {
      $httpBackend.expectPOST('api/v1/courses/T-427-VEFF/20141/evaluations/1');
    });

    it('should make post request', function () {
      var result,
        promise;

      // Arrange
      $httpBackend.when('POST', 'api/v1/courses/T-427-VEFF/20141/evaluations/1').respond(
          {result: 'Ok'}
        );

      // Act
      promise = EvalBackend.addCourseEvaluation('T-427-VEFF', '20141', 1);
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
      $httpBackend.when('POST', 'api/v1/courses/T-427-VEFF/20141/evaluations/1').respond(
          401, {error: 'Authorization needed'}
        );

      // Act
      promise = EvalBackend.addCourseEvaluation('T-427-VEFF', '20141', 1);
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

});
