'use strict';

angular.module('exquisiteEvalApp')
  .service('EvalBackend', ['$http', '$q', 'EvalSettings',
  function EvalBackend($http, $q, EvalSettings) {
    return {
      getTemplates: function() {
        var deferred = $q.defer();

        $http.get(EvalSettings.backendURL + 'evaluationtemplates').
        success(function(data) {
          deferred.resolve(data);
        }).
        error(function(data) {
          deferred.reject(data);
        });

        return deferred.promise;
      },

      addTemplate: function(template) {
        var deferred = $q.defer();

        $http.post(EvalSettings.backendURL + 'evaluationtemplates', template).
        success(function(data) {
          deferred.resolve(data);
        }).
        error(function(data) {
          deferred.reject(data);
        });

        return deferred.promise;
      },

      getTemplate: function(id) {
        var deferred = $q.defer();

        if (!angular.isNumber(id)) {
          return false;
        }
        
        $http.get(EvalSettings.backendURL + 'evaluationtemplates/' + id).
        success(function(data) {
          deferred.resolve(data);
        }).
        error(function(data) {
          deferred.reject(data);
        });

        return deferred.promise;
      },

      getEvaluations: function() {
        var deferred = $q.defer();

        $http.get(EvalSettings.backendURL + 'evaluations').
        success(function(data) {
          deferred.resolve(data);
        }).
        error(function(data) {
          deferred.reject(data);
        });

        return deferred.promise;
      },

      addEvaluation: function(evaluation) {
        var deferred = $q.defer();

        $http.post(EvalSettings.backendURL + 'evaluations', evaluation).
        success(function(data) {
          deferred.resolve(data);
        }).
        error(function(data) {
          deferred.reject(data);
        });

        return deferred.promise;
      },

      getEvaluation: function(id) {
        var deferred = $q.defer();

        if (!angular.isNumber(id)) {
          return false;
        }
        
        $http.get(EvalSettings.backendURL + 'evaluations/' + id).
        success(function(data) {
          deferred.resolve(data);
//          deferred.resolve({'ID':6,'TemplateID':8,'TemplateTitleIS':'Prufa','TemplateTitleEN':'engllish title','Courses':[{'ID':1,'CourseID':'T-427-WEPO','Semester':'20141','CourseNameIS':'Vefforritun II','CourseNameEN':'Web Programming II','Questions':[{'QuestionID':37,'TextIS':'Course Question 1 - text','TextEN':'Course Question 1 - text','TeacherSSN':'1203735289','Type':'text','TextResults':[],'OptionsResults':null},{'QuestionID':38,'TextIS':'Course Question 2 - single','TextEN':'Course Question 1','TeacherSSN':null,'Type':'single','TextResults':null,'OptionsResults':[{'Answer':51,'AnswerTextIS':'Svarmöguleiki 1','AnswerTextEN':'Answer1','Weight':1,'Count':0}]},{'QuestionID':39,'TextIS':'Course Question 3 - multiple','TextEN':'Course Question 3','TeacherSSN':null,'Type':'multiple','TextResults':null,'OptionsResults':[{'Answer':52,'AnswerTextIS':'Svarmöguleiki 1','AnswerTextEN':'Answer1','Weight':1,'Count':1},{'Answer':53,'AnswerTextIS':'Svarmöguleiki 1','AnswerTextEN':'Answer1','Weight':2,'Count':3},{'Answer':54,'AnswerTextIS':'Svarmöguleiki 2','AnswerTextEN':'Answer2','Weight':3,'Count':7},{'Answer':55,'AnswerTextIS':'Svarmöguleiki 3','AnswerTextEN':'Answer3','Weight':5,'Count':4}]},{'QuestionID':40,'TextIS':'teacherq1 - just text','TextEN':'has answers','TeacherSSN':null,'Type':'text','TextResults':['null','bull',null,'foo','bar'],'OptionsResults':null},{'QuestionID':40,'TextIS':'teacherq1 - just text','TextEN':'engirsh','TeacherSSN':null,'Type':'text','TextResults':['bull','null',null,null,null,null,null,null,null,null,null,null,null,null,null],'OptionsResults':null},{'QuestionID':40,'TextIS':'teacherq1 - just text','TextEN':'engirsh','TeacherSSN':null,'Type':'text','TextResults':[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],'OptionsResults':null},{'QuestionID':40,'TextIS':'teacherq1 - just text','TextEN':'engirsh','TeacherSSN':null,'Type':'text','TextResults':[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],'OptionsResults':null},{'QuestionID':40,'TextIS':'teacherq1 - just text','TextEN':'engirsh','TeacherSSN':null,'Type':'text','TextResults':[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],'OptionsResults':null}]}]});
        }).
        error(function(data) {
          deferred.reject(data);
        });

        return deferred.promise;
      },

      getMyEvaluations: function() {
        var deferred = $q.defer();

        $http.get(EvalSettings.backendURL + 'my/evaluations').
        success(function(data) {
          deferred.resolve(data);
        }).
        error(function(data) {
          deferred.reject(data);
        });

        return deferred.promise;
      },

      getMyCourses: function() {
        var deferred = $q.defer();

        $http.get(EvalSettings.backendURL + 'my/courses').
        success(function(data) {
          deferred.resolve(data);
        }).
        error(function(data) {
          deferred.reject(data);
        });

        return deferred.promise;
      },

      getCourseTeachers: function(course, semester) {
        var deferred = $q.defer();

        $http.get(EvalSettings.backendURL + 'courses/' + course + '/' + semester + '/teachers').
        success(function(data) {
          deferred.resolve(data);
        }).
        error(function(data) {
          deferred.reject(data);
        });

        return deferred.promise;
      },

      getCourseEvaluation: function(course, semester, id) {
        var deferred = $q.defer();

        $http.get(EvalSettings.backendURL + 'courses/' + course + '/' + semester + '/evaluations/' + id ).
        success(function(data) {
          deferred.resolve(data);
        }).
        error(function(data) {
          deferred.reject(data);
        });

        return deferred.promise;
      },

      addCourseEvaluation: function(course, semester, id, evaluation) {
        var deferred = $q.defer();

        $http.post(EvalSettings.backendURL + 'courses/' + course + '/' + semester + '/evaluations/' + id, evaluation).
        success(function(data) {
          deferred.resolve(data);
        }).
        error(function(data) {
          deferred.reject(data);
        });

        return deferred.promise;
      }

    };
  }]);
