'use strict';

angular.module('exquisiteEvalApp')
  .factory('EvalState', ['$window',
  function($window) {
    return {
      Token: null,

      PageTitle: 'Course evaluations',
      TemplateID: null,

      setToken: function(t) {
        $window.sessionStorage.Token = t;
        this.Token = t;
      },
      getToken: function() {
        return this.Token;
      }
    };
  }]);
