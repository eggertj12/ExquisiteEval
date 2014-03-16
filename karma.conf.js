// Karma configuration
// http://karma-runner.github.io/0.10/config/configuration-file.html

module.exports = function(config) {
  'use strict';
  config.set({
    // base path, that will be used to resolve files and exclude
    basePath: '',

    // testing framework to use (jasmine/mocha/qunit/...)
    frameworks: ['jasmine'],

    // list of files / patterns to load in the browser
    files: [
      'app/bower_components/angular/angular.js',
      'app/bower_components/angular-mocks/angular-mocks.js',
      'app/bower_components/angular-route/angular-route.js',
      'app/bower_components/chartjs/Chart.min.js',
      'app/bower_components/angular-momentjs/angular-momentjs.js',
      'app/bower_components/momentjs/moment.js',
      'app/bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js',
      'app/scripts/*.js',
      'app/scripts/**/*.js',
      'test/mock/**/*.js',
      'test/spec/**/*.js',

      //include the directory where directive templates are stored.
      'app/templates/*.html'
    ],

    // list of files / patterns to exclude
    exclude: [],

    // web server port
    port: 8080,

    // level of logging
    // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // For code coverage reporting and directive template processing used in testing
    preprocessors: {
      'app/scripts/**/*.js': 'coverage',
      'app/templates/*.html': 'ng-html2js'
    },
    reporters: [
      'progress',
      'coverage'
    ],
    // coverageReporter: {
    //   type: 'text-summary'
    // },

    // This works around different root paths for testing and actual environment
    ngHtml2JsPreprocessor: {
      // strip this from the file path
      stripPrefix: 'app/',
      // prepend this to the
      prependPrefix: ''
    },

    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
//    browsers: ['Chrome'],
    browsers: ['PhantomJS'],


    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: false

  });
};
