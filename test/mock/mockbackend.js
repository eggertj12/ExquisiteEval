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
          "ID": 39,
          "TextIS": "Course Question 3 - multiple",
          "TextEN": "Course Question 3",
          "ImageURL": "",
          "Type": "multiple",
          "Answers": [
          {
            "ID": 52,
            "TextIS": "Svarmöguleiki 1",
            "TextEN": "Answer1",
            "ImageURL": "",
            "Weight": 1
          }]
        }],
        TeacherQuestions: [
        {
          ID: 40,
          TextIS: 'Hvernig var þessi kennari?',
          Type: 'text',
          Answers: []
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