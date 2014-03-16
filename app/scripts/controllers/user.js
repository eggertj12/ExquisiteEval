'use strict';

angular.module('exquisiteEvalApp')
  .controller('UserCtrl', ['$scope', '$location', 'EvalBackend',
    function ($scope, $location, EvalBackend) {
      // Holds the list of evaluations available
      $scope.evaluations = [];
      // Contains all the course question for the evaluation requested
      $scope.courseQuestions = [];
      // Contains all the teacher question for the evaluation requested
      $scope.teacherQuestions = [];
      // Contains all the answers the user has answered
      $scope.answers = [];
      // Contains a list of teachers for the course who's evaluation was requested
      $scope.teachers = [];
      // ID of the course who's evaluation was requested
      $scope.course = '';
      // Semester of the course who's evaluation was requested
      $scope.semester = '';
      // ID of the evaluation requested
      $scope.evalID = '';

      // Get list of open evaluations for this user
      EvalBackend.getMyEvaluations().then(function(data) {
        $scope.evaluations = data;
        //console.log(data);
      });

      // User clicked on an evaluation
      $scope.getEval = function(course, semester, id) {

        // Get the list of teachers for this course
        EvalBackend.getCourseTeachers(course, semester).then(function(data) {
          $scope.teachers = data;
          //console.log(data);
        });

        // Get the data for this evaluation
        EvalBackend.getCourseEvaluation(course, semester, id).then(function(data) {
          console.log(data);
          // Reset the courseQuestions array
          $scope.courseQuestions = [];
          $scope.teacherQuestions = [];
          //$scope.questions = data;
          $scope.course = course;
          $scope.semester = semester;
          $scope.evalID = id;

          angular.forEach(data.CourseQuestions, function(quest) {
            var thisQuestion = {
              question: {text: quest.TextIS, type: quest.Type, img: quest.ImageURL},
              answer:  {
                QuestionID: quest.ID,
                TeacherSSN: '',
                Value: ''
              }
            };
            if(quest.Type === 'multiple') {
              thisQuestion.answer.Value = {};
            }
            if(quest.Type === 'multiple' || quest.Type === 'single') {
              thisQuestion.question.choices = [];
              angular.forEach(quest.Answers, function(answ) {
                  var choice = { ID: answ.ID, text: answ.TextIS, img: answ.ImageURL, weight: answ.Weight };
                  thisQuestion.question.choices.push(choice);
                  if(quest.Type === 'multiple') {
                    thisQuestion.answer.Value[answ.ID] = false;
                  }
                  console.log(choice);
                });
            }
            console.log(thisQuestion);
            $scope.courseQuestions.push(thisQuestion);
          });
          console.log('teacher');
          angular.forEach($scope.teachers, function(teacher) {
            var thisTeacher = {
              name: teacher.FullName,
              ssn: teacher.SSN,
              img: teacher.ImageUrl,
              role: teacher.Role,
              email: teacher.Email,
              username: teacher.Username,
              questions: []
            };
            angular.forEach(data.TeacherQuestions, function(quest) {
              var thisQuestion = {
                question: {text: quest.TextIS, type: quest.Type, img: quest.ImageURL},
                answer:  {
                  QuestionID: quest.ID,
                  TeacherSSN: teacher.SSN,
                  Value: ''
                }
              };
              if(quest.Type === 'multiple') {
                thisQuestion.answer.Value = {};
              }
              if(quest.Type === 'multiple' || quest.Type === 'single') {
                thisQuestion.question.choices = [];
                angular.forEach(quest.Answers, function(answ) {
                    var choice = { ID: answ.ID, text: answ.TextIS, img: answ.ImageURL, weight: answ.Weight };
                    thisQuestion.question.choices.push(choice);
                    if(quest.Type === 'multiple') {
                      thisQuestion.answer.Value[answ.ID] = false;
                    }
                  });
              }
              console.log(thisQuestion);
              thisTeacher.questions.push(thisQuestion);
            });
            console.log(thisTeacher);
            $scope.teacherQuestions.push(thisTeacher);
          });
          console.log('---');
          console.log($scope.teacherQuestions);
          console.log($scope.courseQuestions);

        });
      };

      // User clicked submit eval button
      $scope.submitEval = function() {
          console.log('Submit clicked');
          $scope.answers = [];
          angular.forEach($scope.courseQuestions, function(quest) {
            var answ = quest.answer;
            if(quest.question.type === 'multiple') {
              var checkboxes = '';
              angular.forEach(answ.Value, function(check, id) {
                if(check) {
                  if(checkboxes.length > 0) {
                    checkboxes += ', ';
                  }
                  checkboxes += id;
                }
              });
              answ.Value = checkboxes;
            }
            $scope.answers.push(answ);
          });

          angular.forEach($scope.teacherQuestions, function(teacher) {
            angular.forEach(teacher.questions, function(quest) {
              var answ = quest.answer;
              if(quest.question.type === 'multiple') {
                var checkboxes = '';
                angular.forEach(answ.Value, function(check, id) {
                  if(check) {
                    if(checkboxes.length > 0) {
                      checkboxes += ', ';
                    }
                    checkboxes += id;
                  }
                });
                answ.Value = checkboxes;
              }
              $scope.answers.push(answ);
            });
          });
          console.log($scope.answers);
          EvalBackend.addCourseEvaluation($scope.course, $scope.semester, $scope.evalID, $scope.answers).then(function(data) {
            console.log(data);
            console.log('success');
          });
        };
    }]);
