'use strict';

describe('Directive: eeQuestion', function () {

  var $rootScope, $compile, element, defaultData,
      validTemplate = '<ee-question ng-model="question"></ee-question>';

  function createDirective(data, template) {
    var elm;

    // Setup scope state
    $rootScope.question = data || defaultData;

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
    module('exquisiteEvalApp', 'templates/eequestion.html');

    // Reset data each time
    defaultData = {
      TextEN: 'testing'
    };

    // Inject in angular constructs otherwise,
    //  you would need to inject these into each test
    inject(function (_$rootScope_, _$compile_) {
      $rootScope = _$rootScope_;
      $compile = _$compile_;
    });
  });

  describe('when created', function () {
    it('should render the question text to header', function () {
      // Arrange
      element = createDirective();

      // Act

      // fire all the watches, so the scope binding will be evaluated
      $rootScope.$digest();

      // Assert

      expect(element.find('h1').text()).toBe('testing');
    });

    it('should remove text answer list for options question', function () {
      // Arrange
      var question = {
        Type: 'single',
        OptionsResults: [
          {AnswerTextEN: 'Halló'},
          {AnswerTextEN: 'heimur'}
        ]
      };

      element = createDirective(question);

      // Act

      // fire all the watches, so the scope binding will be evaluated
      $rootScope.$digest();

      // Assert

      // Properly removed items
      expect(element.find('.Question-graph').length).toBe(1);
      expect(element.find('.Question-textlist').length).toBe(0);

      // And added answers
      expect(element.find('.Question-graph-option-text').length).toBe(2);
      expect(element.find('.Question-graph-option-text')[0].innerHTML).toBe('Halló');
    });

    it('should remove graph element for text question', function () {
      // Arrange
      var question = {
        Type: 'text'
      };

      element = createDirective(question);

      // Act

      // fire all the watches, so the scope binding will be evaluated
      $rootScope.$digest();

      // Assert

      expect(element.find('.Question-graph').length).toBe(0);
      expect(element.find('.Question-textlist').length).toBe(1);
    });

    it('toggleClose() should toggle closed attribute :)', function () {
      // Arrange
      var scope,
        question = {
          Type: 'text',
          closed: true
        };

      element = createDirective(question);
      scope = element.isolateScope();

      // Act
      scope.toggleClosed();

      // Assert
      expect(question.closed).toBe(false);
    });

  });

});
