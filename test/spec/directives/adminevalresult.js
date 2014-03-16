'use strict';

describe('Directive: eeAdminEvalResult', function () {

  var $rootScope, $compile, element, defaultData,
      validTemplate = '<ee-admin-eval-result ng-model="evaluation"></ee-admin-eval-result>';

  function createDirective(data, template) {
    var elm;

    // Setup scope state
    $rootScope.evaluation = data || defaultData;

    // Create directive
    elm = $compile(template || validTemplate)($rootScope);

    // Trigger watchers
    $rootScope.$apply();

    // Return
    return elm;
  }

  // beforeEach(
  // );

  beforeEach(function () {
    // Load the directive's module
    module('exquisiteEvalApp');

    // puts template into templateCache
    module('exquisiteEvalApp', 'templates/adminevalresult.html');

    // Reset data each time
    defaultData = {
      TemplateTitleEN: 'testing'
    };

    // Inject in angular constructs otherwise,
    //  you would need to inject these into each test
    inject(function (_$rootScope_, _$compile_) {
      $rootScope = _$rootScope_;
      $compile = _$compile_;
    });
  });

  describe('when created', function () {
    // it('should throw error when ngModel attribute not defined', function () {
    //   function invalidTemplate() {
    //     createDirective({foo: 'bar'}, '<ee-admin-eval-result></ee-admin-eval-result>');
    //   }

    //   // Couldn't get error mathcing to work, just general exception
    //   // expect(invalidTemplate).toThrow(new Error("[$compile:ctreq] Controller 'ngModel', required by directive 'kkEditor', can't be found!"));
    //   expect(invalidTemplate).toThrow();
    // });

    it('should render the expected output', function () {

      element = createDirective();

      // fire all the watches, so the scope expression {{pageName}} will be evaluated
      $rootScope.$digest();

      // element is a jqLite object, find searches only by tagname
      // if full jQuery is needed it probably can be loaded by Karma.
      return expect(element.find('h1').text()).toBe('testing');
    });


  });

});
