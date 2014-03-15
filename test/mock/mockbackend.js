/*exported MockBackend */
function MockBackend($q) {
  'use strict';
  return {
    getTemplates: function() {
      var deferred = $q.defer();

      deferred.resolve([{id:1}]);
      return deferred.promise;
    }
  };
}