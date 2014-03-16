/*exported MockBackend */
function MockBackend($q) {
  'use strict';

  return {
    getTemplates: function() {
      var deferred = $q.defer();
      deferred.resolve([{id:1}]);

      return deferred.promise;
    },

    addTemplate: function() {
      var deferred = $q.defer();
      deferred.resolve('ok');

      return deferred.promise;
    },

    getTemplate: function(id) {
      var deferred = $q.defer();
      deferred.resolve({id: id});

      return deferred.promise;
    },

    getEvaluations: function() {
      var deferred = $q.defer();
      deferred.resolve([{id:1}]);

      return deferred.promise;
    },

    addEvaluation: function() {
      var deferred = $q.defer();
      deferred.resolve('ok');

      return deferred.promise;
    },

    getEvaluation: function(id) {
      var deferred = $q.defer(),
        result = {
          id: id,
          Courses: ['foo']
        };
      deferred.resolve(result);

      return deferred.promise;
    },

    getMyEvaluations: function() {
      var deferred = $q.defer();
      deferred.resolve([{id:1}]);

      return deferred.promise;
    },

    getMyCourses: function() {
      var deferred = $q.defer();
      deferred.resolve([{id:1}]);

      return deferred.promise;
    },

    getCourseTeachers: function(course, semester) {
      var deferred = $q.defer();
      deferred.resolve([{Username:'dabs',FullName:'Daníel Brandur Sigurgeirsson',SSN:'1203735289',Email:'dabs@ru.is',Role:'teacher',ImageURL:'http://www.ru.is/kennarar/dabs/img/12/1203735289.jpg'}]);

      return deferred.promise;
    },

    getCourseEvaluation: function(course, semester, id) {
      var deferred = $q.defer();
      deferred.resolve({
        ID: 8,
        TitleIS: 'Kennslumat',
        IntroTextIS: 'endilega takið þetta kennslumat',
        CourseQuestions: [
        {
          ID: 37,
          TextIS: 'Hvernig er áfangin?',
          Type: 'text'
        },
        {
          ID: 38,
          TextIS: 'Radiobutton question',
          Type: 'single',
          Answers: [
          {
            ID: 51,
            TextIS: 'Svarmöguleiki 1',
            Weight: 1
          }]
        },
        {
          ID: 39,
          TextIS: 'Myndirðu vilja taka þennan áfanga aftur?',
          ImageURL: '',
          Type: 'multiple',
          Answers: [
          {
            ID: 52,
            TextIS: 'Svarmöguleiki 1',
            ImageURL: '',
            Weight: 1
          },
          {
            ID: 53,
            TextIS: 'Svarmöguleiki 2',
            ImageURL: '',
            Weight: 1
          },
          {
            ID: 54,
            TextIS: 'Svarmöguleiki 3',
            ImageURL: '',
            Weight: 3
          }]
        }],
        TeacherQuestions: [
        {
          ID: 40,
          TextIS: 'Hvernig var þessi kennari?',
          Type: 'text',
          Answers: []
        },
        {
          ID: 41,
          TextIS: 'Radiobutton question',
          Type: 'single',
          Answers: [
          {
            ID: 55,
            TextIS: 'Svarmöguleiki 1',
            Weight: 1
          }]
        },
        {
          ID: 42,
          TextIS: 'Myndirðu vilja hafa þennan kennara aftur?',
          ImageURL: '',
          Type: 'multiple',
          Answers: [
          {
            ID: 56,
            TextIS: 'Svarmöguleiki 1',
            ImageURL: '',
            Weight: 1
          },
          {
            ID: 57,
            TextIS: 'Svarmöguleiki 2',
            ImageURL: '',
            Weight: 2
          },
          {
            ID: 58,
            TextIS: 'Svarmöguleiki 3',
            ImageURL: '',
            Weight: 3
          }]
        }]
      });

      return deferred.promise;
    },

    addCourseEvaluation: function() {
      var deferred = $q.defer();
      deferred.resolve('ok');

      return deferred.promise;
    }
  };
}