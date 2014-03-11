'use strict';

angular.module('exquisiteEvalApp')
  .service('Evalbackend', ['$http', '$q', 'EvalSettings',
  function Evalbackend($http, $q, EvalSettings) {
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
        
        $http.get(EvalSettings.backendURL + 'evaluationtemplate/' + id).
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
