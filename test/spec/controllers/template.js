'use strict';

describe('Controller: TemplateCtrl', function () {

  // load the controller's module
  beforeEach(module('exquisiteEvalApp'));

  var TemplateCtrl,
  $injector,
    $location,
    EvalBackend,
    $provide,
    EvalState,
    scope;

  // get a reference to provide service, can not be done from inject function
  beforeEach(module(function (_$provide_) {
    $provide = _$provide_;
  }));


  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, _$injector_) {
    scope = $rootScope.$new();

    $injector  = _$injector_;
    $location = $injector.get('$location');

    $provide.service('EvalBackend', MockBackend);
    EvalBackend = $injector.get('EvalBackend');

    TemplateCtrl = $controller('TemplateCtrl', {
      $scope: scope
    });

    EvalState = $injector.get('EvalState');

  }));

  it('createNewTemplate should call two tested functions', function () {
    scope.createNewTemplate();
    scope.$apply();
    expect(scope.template.TitleIS).toBe('');
  });

  it('cleanTemplate should leave the template blank', function() {
    scope.cleanTemplate();
    scope.$apply();
    expect(scope.template.TitleIS).toBe('');
    expect(scope.template.TitleEN).toBe('');
    expect(scope.template.IntroTextIS).toBe('');
    expect(scope.template.IntroTextEN).toBe('');
    expect(scope.template.CourseQuestions.length).toBe(0);
    expect(scope.template.TeacherQuestions.length).toBe(0);
  });

  it('cleanQuestion should leave scope.question blank', function() {
    scope.question.ID = 1;
    scope.cleanQuestion();
    scope.$apply();

    expect(scope.question.ID).toBe(0);
  });

  it('cleanAnswers should leave scope.answer blank', function() {
    scope.answer.ID = 1;
    scope.cleanAnswers();
    scope.$apply();

    expect(scope.answer.ID).toBe(0);
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
    expect(scope.vm.templates.length).toBe(1);

    expect(scope.vm.displayTlist).toBe(true);
    expect(scope.vm.displayT).toBe(false);

  });

  it('editTemplate should set some booleans', function() {
    scope.vm.edit = false;
    scope.editTemplate();

    expect(scope.vm.edit).toBe(true);
  });

  it('editSpecificTemplate should talk with the Backend and set some booleans', function() {
    scope.editSpecificTemplate(9);
    scope.$apply();

    expect(scope.template.ID).toBe(9);
    expect(scope.template.TextIS).toBe('Jahérnahér');
    expect(scope.template.TextEN).toBe('What up! mah');
    expect(scope.template.IntroTextIS).toBe('Hvað er að gerast hérna?');
    expect(scope.template.IntroTextEN).toBe('yo yo yo yo yo');


    expect(scope.vm.edit).toBe(true);
    expect(scope.vm.displayTlist).toBe(false);
    expect(scope.vm.displayT).toBe(false);
  });

  it('displaySpecificTemplate should talk with the Backend and set some booleans',function() {
    scope.displaySpecificTemplate(9);
    scope.$apply();

    expect(scope.template.ID).toBe(9);
    expect(scope.template.TextIS).toBe('Jahérnahér');
    expect(scope.template.TextEN).toBe('What up! mah');
    expect(scope.template.IntroTextIS).toBe('Hvað er að gerast hérna?');
    expect(scope.template.IntroTextEN).toBe('yo yo yo yo yo');


    expect(scope.vm.edit).toBe(false);
    expect(scope.vm.displayTlist).toBe(false);
    expect(scope.vm.displayT).toBe(true);
  });

  it('confirmMultipleChoiceA should set a boolean', function() {
    scope.confirmMultipleChoiceA();
    scope.$apply();

    expect(scope.vm.canConfirmMultipleChoiceA).toBe(false);
  });

  it('confirmMultipleChoiceA should set a boolean based on logic', function() {
    scope.multipleChoiceAnswer.answers.push(scope.answer);
    scope.multipleChoiceAnswer.answers.push(scope.answer);
    scope.confirmMultipleChoiceA();
    scope.$apply();

    expect(scope.vm.canConfirmMultipleChoiceA).toBe(true);
  });


  it('addingQuestion should set a boolean based on logic', function() {
    scope.addingQuestion();
    scope.$apply();

    expect(scope.vm.displayQ).toBe(true);
  });

  it('qTypeText should set some booleans', function() {
    scope.qTypeText();
    scope.$apply();

    expect(scope.vm.displaySingleChoiceA).toBe(false);
    expect(scope.vm.displayMultipleChoiceA).toBe(false);
  });

  it('qTypeSingle should set some booleans', function() {
    scope.qTypeSingle();
    scope.$apply();

    expect(scope.vm.displaySingleChoiceA).toBe(true);
    expect(scope.vm.displayMultipleChoiceA).toBe(false);
  });

  it('qTypeMultiple should set some booleans and add some answers', function(){
    scope.qTypeMultiple();
    scope.$apply();

    expect(scope.vm.displaySingleChoiceA).toBe(false);
    expect(scope.vm.displayMultipleChoiceA).toBe(true);
    expect(scope.multipleChoiceAnswer.answers.length).toBe(2);
  });

  it('addChoice should write some stuff into an array', function() {
    scope.answer.ID = 1;
    scope.addChoice();
    scope.$apply();

    expect(scope.multipleChoiceAnswer.answers.length).toBe(1);
  });

  it('removeChoice should remove a choice', function() {
    scope.answer.ID = 3;
    scope.addChoice();
    scope.answer.ID = 4;
    scope.addChoice();
    scope.removeChoice(1);
    scope.$apply();

    expect(scope.multipleChoiceAnswer.answers.length).toBe(1);
  });

  it('addMultipleChoiceAnswer should add items to an array', function() {
    scope.qTypeMultiple();
    scope.addMultipleChoiceAnswer();
    scope.$apply();

    expect(scope.question.Answers.length).toBe(2);
  });

  it('addSingleChoiceAnswer should add an item to an array', function() {
    scope.qTypeSingle();
    scope.addSingleChoiceAnswer();
    scope.$apply();

    expect(scope.question.Answers.length).toBe(1);
  });

  it('abortAnswer should call a tested function and set some booleans', function() {
    scope.abortAnswer();
    scope.$apply();

    expect(scope.vm.displaySingleChoiceA).toBe(false);
  });

  it('displayA should set a boolean', function() {
    scope.displayA();
    scope.$apply();

    expect(scope.vm.displayA).toBe(true);
  });

  it('undisplayA should set a boolean', function() {
    scope.vm.displayA = true;
    scope.undisplayA();
    scope.$apply();

    expect(scope.vm.displayA).toBe(false);
  });

  it('addQuestion should do some logic, add a question to the quesiton holder and set a boolean', function() {
    scope.qhandle.teacherOrCourseQ = 'course';
    scope.question.TextIS = 'Drullumall';

    scope.addQuestion();

    expect(scope.template.CourseQuestions[0].TextIS).toBe('Drullumall');

    expect(scope.vm.displayQ).toBe(false);
  });

  it('addQuestion definitely needs logic coverage', function() {
    scope.qhandle.teacherOrCourseQ = 'teacher';
    scope.question.TextIS = 'Drullumall';
    scope.question.TextEN = 'hangon';

    scope.addQuestion();

    expect(scope.template.TeacherQuestions[0].TextEN).toBe('hangon');
  });

  it('abortQuestion should call a tested function and set a boolean', function() {
    scope.abortQuestion();
    scope.$apply();

    expect(scope.vm.displayQ).toBe(false);
  });

  it('removeCourseQuestion should remove an item from an array', function() {
    scope.qhandle.teacherOrCourseQ = 'course';
    scope.question.TextIS = 'Drullumall';
    scope.question.TextEN = 'hangon';

    scope.addQuestion();
    
    scope.removeCourseQuestion(0);

    scope.$apply();
    expect(scope.template.CourseQuestions.length).toBe(0);

  });

  it('removeTeacherQuestion should remove and item from an array', function() {
    scope.qhandle.teacherOrCourseQ = 'teacher';
    scope.question.TextIS = 'Drullumall';
    scope.question.TextEN = 'hangon';

    scope.addQuestion();
    
    scope.removeTeacherQuestion(0);

    scope.$apply();
    expect(scope.template.TeacherQuestions.length).toBe(0);
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

  it('makeEvalFromThisTemplate should set EvalState and change location', function() {
    scope.makeEvalFromThisTemplate(6);
    scope.$apply();

    expect(EvalState.TemplateID).toBe(6);
    expect($location.url()).toBe('/evaluation');

  });

  
});
