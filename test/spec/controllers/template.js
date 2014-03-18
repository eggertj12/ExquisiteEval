'use strict';

describe('Controller: TemplateCtrl', function () {

  // load the controller's module
  beforeEach(module('exquisiteEvalApp'));

  var TemplateCtrl,
    $location,
    EvalBackend,
    $provide,
    scope;

  // get a reference to provide service, can not be done from inject function
  beforeEach(module(function (_$provide_) {
    $provide = _$provide_;
  }));


  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, $injector) {
    scope = $rootScope.$new();
    $location = $injector.get('$location');

    $provide.service('EvalBackend', MockBackend);
    EvalBackend = $injector.get('EvalBackend');

    TemplateCtrl = $controller('TemplateCtrl', {
      $scope: scope
    });

  }));

  it('cleanTemplate should leave the template blank', function() {
    scope.cleanTemplate();
    scope.$apply();
    expect(scope.template.TitleIS).toBe('');
    expect(scope.template.TitleEN).toBe('');
    expect(scope.template.IntroTextIS).toBe('');
    expect(scope.template.IntroTextEN).toBe('');
    expect(scope.template.CourseQuestions).toBe([]);
    expect(scope.template.TeacherQuestions).toBe([]);
  });

  it('addAnAnswer should set this boolean to true', function() {
    scope.addAnAnswer();
    scope.$apply();
    expect(scope.vm.displayNewA).toBe('');
  });

  if('addAnswer should add the answer to the answer holder', function() {
    scope.answer.ID = 3;
    scope.answer.TextIS = 'Hvað?';
    scope.answer.TextEN = 'Watz?';
    scope.answer.ImageURL = '';
    scope.answer.Weight = 2;

    scope.addAnswer();
    scope.$apply();

    expect(scope.question.Answers[0].ID).toBe(3);
    expect(scope.question.Answers[0].TextIS).toBe('Hvað?');
    expect(scope.question.Answers[0].TextEN).toBe('Watz?');
    expect(scope.question.Answers[0].ImageURL).toBe('');
    expect(scope.question.Answers[0].Weight).toBe(2);
  });

  it('showTemplates should get an array of templates from the backend and change some booleans', function() {
    scope.showTemplates();
    scope.$apply();
    // Maybe add some meat here, more than just the basic mockbackend
    expect(scope.vm.templates[0].ID).toBe(1);

    expect(scope.vm.displayTlist).toBe(true);
    expect(scope.vm.displayT).toBe(false);

  });

  it('editTemplate should set some booleans', function() {
    scope.editTemplate();
    scope.$apply();

    expect(scope.vm.edit).toBe(true);
    expect(scope.vm.displayTlist).toBe(false);
    expect(scope.vm.displayT).toBe(false);
  });

  it('editSpecificTemplate should talk with the Backend and set some booleans', function() {
    scope.editSpecificTemplate(9);
    scope.$apply();

    expect(scope.template.ID).toBe(9);
    expect(scope.template.TextIS).toBe('Jahérnahér!');
    expect(scope.template.TextEN).toBe('What up! mah');
    expect(scope.template.IntroTextIS).toBe('Hvað er að gerast hérna?');
    expect(scope.template.IntroTextEN).toBe('yo yo yo yo yo');


    expect(scope.vm.edit).toBe(true);
    expect(scope.vm.displayTlist).toBe(false);
    expect(scope.vm.displayT).toBe(false);
  });

  it('displaSpecificTemplate should talk with the Backend and set some booleans',function() {
    scope.editSpecificTemplate(9);
    scope.$apply();

    expect(scope.template.ID).toBe(9);
    expect(scope.template.TextIS).toBe('Jahérnahér!');
    expect(scope.template.TextEN).toBe('What up! mah');
    expect(scope.template.IntroTextIS).toBe('Hvað er að gerast hérna?');
    expect(scope.template.IntroTextEN).toBe('yo yo yo yo yo');


    expect(scope.vm.edit).toBe(false);
    expect(scope.vm.displayTlist).toBe(false);
    expect(scope.vm.displayT).toBe(true);    
  });


  it('addingQuestion should set a boolean', function() {
    scope.addingQuestion();
    scope.$apply();

    expect(scope.vm.displayQ).toBe(true);
  });

  it('displayA should set a boolean', function() {
    scope.displayA();
    scope.$apply();

    expect(scope.vm.displayA).toBe(true);
  });

  it('unDisplayA should set a boolean', function() {
    scope.unDisplayA();
    scope.$apply();

    expect(scope.vm.displayA).toBe(false);
  });

  it('addQuestion should do some logic, add a question to the quesiton holder and set a boolean', function() {
    scope.qhandle.teacherOrCourseQuestion = 'course';
    scope.question.TextIS = 'Drullumall';

    scope.addQuestion();
    scope.$apply();

    expect(scope.template.CourseQuestions[0].TextIS).toBe('Drullumall');

    expect(scope.vm.displayQ).toBe(false);
  });

  it('addQuestion definitely needs logic coverage', function() {
    scope.qhandle.teacherOrCourseQuestion = 'teacher';
    scope.question.TextEN = "hangon";

    scope.addQuestion();
    scope.$apply();

    expect(scope.template.TeacherQuestions[0].TextEN).toBe('hangon');
  });

  it('tgetTemplate is an unused dummy function which should be deleted, but I will write a test for it rather than delete it', function() {
    scope.tgetTemplate();
    scope.$apply();

    expect(scope.template.ID).toBe(1);
  });

  it('postTemplate should deal with the backend and set a boolean', function() {
    scope.template.TextIS = 'gamli';
    scope.template.TextEN = 'oldy';
    scope.template.IntroTextIS = 'farðu heim';
    scope.template.IntroTextEN = 'go home';

    scope.postTemplate();
    scope.$apply();

    expect(scope.vm.edit).toBe(false);
  });

  it('abortEdit should set a boolean and run an already tested function', function() {
    scope.abortEdit();
    scope.$apply();

    expect(scope.vm.edit).toBe(false);
    
  });

  
});
