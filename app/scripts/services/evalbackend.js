'use strict';

angular.module('exquisiteEvalApp')
  .service('EvalBackend', ['$http', '$q', 'EvalSettings',
  function EvalBackend($http, $q, EvalSettings) {
    return {
      getTemplates: function() {
        var deferred = $q.defer();

        $http.get(EvalSettings.backendURL + 'evaluationtemplates').
        success(function(data) {
          deferred.resolve(data);
        }).
        error(function(data) {
          deferred.reject(data);
        });

        return deferred.promise;
      },

      addTemplate: function(template) {
        var deferred = $q.defer();

        $http.post(EvalSettings.backendURL + 'evaluationtemplates', template).
        success(function(data) {
          deferred.resolve(data);
        }).
        error(function(data) {
          deferred.reject(data);
        });

        return deferred.promise;
      },

      getTemplate: function(id) {
        var deferred = $q.defer();

        if (!angular.isNumber(id)) {
          return false;
        }
        
        $http.get(EvalSettings.backendURL + 'evaluationtemplates/' + id).
        success(function(data) {
          deferred.resolve(data);
        }).
        error(function(data) {
          deferred.reject(data);
        });

        return deferred.promise;
      },

      getEvaluations: function() {
        var deferred = $q.defer();

        $http.get(EvalSettings.backendURL + 'evaluations').
        success(function(data) {
          deferred.resolve(data);
        }).
        error(function(data) {
          deferred.reject(data);
        });

        return deferred.promise;
      },

      addEvaluation: function(evaluation) {
        var deferred = $q.defer();

        $http.post(EvalSettings.backendURL + 'evaluations', evaluation).
        success(function(data) {
          deferred.resolve(data);
        }).
        error(function(data) {
          deferred.reject(data);
        });

        return deferred.promise;
      },

      getEvaluation: function(id) {
        var deferred = $q.defer();

        if (!angular.isNumber(id)) {
          return false;
        }
        
        $http.get(EvalSettings.backendURL + 'evaluations/' + id).
        success(function(data) {
          deferred.resolve(data);
        }).
        error(function(data) {
          deferred.reject(data);
        });

        return deferred.promise;
      },

      getMyEvaluations: function() {
        var deferred = $q.defer();

        $http.get(EvalSettings.backendURL + 'my/evaluations').
        success(function(data) {
          deferred.resolve(data);
        }).
        error(function(data) {
          deferred.reject(data);
        });

        return deferred.promise;
      },

      getMyCourses: function() {
        var deferred = $q.defer();

        $http.get(EvalSettings.backendURL + 'my/courses').
        success(function(data) {
          deferred.resolve(data);
        }).
        error(function(data) {
          deferred.reject(data);
        });

        return deferred.promise;
      },

      getCourseTeachers: function(course, teacher) {
        var deferred = $q.defer();

        $http.get(EvalSettings.backendURL + 'courses/' + course + '/' + teacher + '/teachers').
        success(function(data) {
          deferred.resolve(data);
        }).
        error(function(data) {
          deferred.reject(data);
        });

        return deferred.promise;
      },

      getCourseEvaluation: function(course, semester, id) {
        var deferred = $q.defer();

        $http.get(EvalSettings.backendURL + 'courses/' + course + '/' + semester + '/evaluations/' + id ).
        success(function(data) {
          deferred.resolve(data);
        }).
        error(function(data) {
          deferred.reject(data);
        });

        return deferred.promise;
      },

      addCourseEvaluation: function(course, semester, id, evaluation) {
        var deferred = $q.defer();

        $http.post(EvalSettings.backendURL + 'courses/' + course + '/' + semester + '/evaluations/' + id, evaluation).
        success(function(data) {
          deferred.resolve(data);
        }).
        error(function(data) {
          deferred.reject(data);
        });

        return deferred.promise;
      }

    };
  }]);
