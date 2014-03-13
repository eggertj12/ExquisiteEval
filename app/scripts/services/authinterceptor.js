'use strict';

angular.module('exquisiteEvalApp')
  .factory('AuthInterceptor', ['EvalState',
  function (EvalState) {

    return {
      request: function (config) {
        config.headers = config.headers || {};
        if (EvalState.Token !== null) {
          config.headers.Authorization = 'Basic ' + EvalState.Token;
        }
        return config;
      }
    };
  }]);
