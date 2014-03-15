/*exported MockBackend */
function MockBackend($q) {
  'use strict';
  return {
    getTemplates: function() {
      var deferred = $q.defer();
      deferred.resolve([{id:1}]);

      return deferred.promise;
    },

    addTemplate: function() {
      var deferred = $q.defer();
      deferred.resolve('ok');

      return deferred.promise;
    },

    getTemplate: function(id) {
      var deferred = $q.defer();
      deferred.resolve({id: id});

      return deferred.promise;
    },

    getEvaluations: function() {
      var deferred = $q.defer();
      deferred.resolve([{id:1}]);

      return deferred.promise;
    },

    addEvaluation: function() {
      var deferred = $q.defer();
      deferred.resolve('ok');

      return deferred.promise;
    },

    getEvaluation: function(id) {
      var deferred = $q.defer();
      deferred.resolve({id: id});

      return deferred.promise;
    },

    getMyEvaluations: function() {
      var deferred = $q.defer();
      deferred.resolve([{id:1}]);

      return deferred.promise;
    },

    getMyCourses: function() {
      var deferred = $q.defer();
      deferred.resolve([{id:1}]);

      return deferred.promise;
    },

    getCourseTeachers: function() {
      var deferred = $q.defer();
      deferred.resolve([{id:1}]);

      return deferred.promise;
    },

    getCourseEvaluation: function(course, semester, id) {
      var deferred = $q.defer();
      deferred.resolve({id: id, course: course, semester: semester});

      return deferred.promise;
    },

    addCourseEvaluation: function() {
      var deferred = $q.defer();
      deferred.resolve('ok');

      return deferred.promise;
    }
  };
}