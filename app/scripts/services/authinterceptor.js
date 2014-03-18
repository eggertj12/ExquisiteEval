'use strict';

angular.module('exquisiteEvalApp')
  .factory('AuthInterceptor', ['EvalState',
  function (EvalState) {

    return {
      request: function (config) {
        config.headers = config.headers || {};
        if (EvalState.getToken() !== null) {
          config.headers.Authorization = 'Basic ' + EvalState.getToken();
        }
        return config;
      }
    };
  }]);
