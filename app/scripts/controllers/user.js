'use strict';

angular.module('exquisiteEvalApp')
  .controller('UserCtrl', ['$scope', '$location', 'EvalBackend', 'EvalState',
    function ($scope, $location, EvalBackend, EvalState) {
      // Holds the list of evaluations available
      $scope.evaluations = [];
      $scope.showEval = false;
      $scope.submitResult = '';
      EvalState.PageTitle = 'Your open evaluations';
      
      // Contains various info about the eval selected
      $scope.evalInfo = {
        course: '',
        semester: '',
        ID: '',
        titleIS: '',
        titleEN: '',
        introTextIS: '',
        introTextEN: '',
        courseQuestions: [],
        teacherQuestions: [],
        answers:[],
        teachers: []
      };

      // Get list of open evaluations for this user
      EvalBackend.getMyEvaluations().then(function(data) {
        $scope.evaluations = data;
      });

      // User clicked on an evaluation
      $scope.getEval = function(course, semester, id) {
        $scope.submitResult = '';
        // Get the list of teachers for this course
        EvalBackend.getCourseTeachers(course, semester).then(function(data) {
          $scope.evalInfo.teachers = data;
        });

        // Get the data for this evaluation
        EvalBackend.getCourseEvaluation(course, semester, id).then(function(data) {
          $scope.showEval = true;
          // Reset the question arrays
          $scope.evalInfo.courseQuestions = [];
          $scope.evalInfo.teacherQuestions = [];
          $scope.evalInfo.course = course;
          $scope.evalInfo.semester = semester;
          $scope.evalInfo.introTextEN = data.IntroTextEN;
          $scope.evalInfo.titleEN = data.TitleEN;
          $scope.evalInfo.ID = id;

          angular.forEach(data.CourseQuestions, function(quest) {
            /* For each question we have 2 objects. One object containing various info about the question itself
               and another object containing the answers for the question - on the format the API expects */
            var thisQuestion = {
              question: {
                ID: quest.ID,
                textIS: quest.TextIS,
                textEN: quest.TextEN,
                type: quest.Type,
                img: quest.ImageURL
              },
              answer: {
                QuestionID: quest.ID,
                TeacherSSN: '',
                Value: ''
              }
            };
            // If the questions is a multiple choice question, we need an object that holds ID of each available choice as well as whether it's checked(true/false)
            if(quest.Type === 'multiple') {
              thisQuestion.answer.Value = {};
            }
            // If the question is a multiple choice question or a single choice question we create another attribute for the question containing all the available choices
            if(quest.Type === 'multiple' || quest.Type === 'single') {
              thisQuestion.question.choices = [];
              // So for each available answer choice we add it to our object
              angular.forEach(quest.Answers, function(answ) {
                  var choice = { ID: answ.ID, textIS: answ.TextIS, textEN: answ.TextEN, img: answ.ImageURL, weight: answ.Weight };
                  thisQuestion.question.choices.push(choice);

                  /* If the question is a multiple choice question we add the choice to the object that holds ID of each available choice as well as whether it's checked(true/false)
                     using the following format:
                     choices = {
                       51: true,   // ID of the answer and whether it's checked or not
                       52: false,
                       53: true
                     };*/
                  if(quest.Type === 'multiple') {
                    thisQuestion.answer.Value[answ.ID] = false;
                  }
                });
            }
            $scope.evalInfo.courseQuestions.push(thisQuestion);
          });

          // Go through every teacher in this course
          angular.forEach($scope.evalInfo.teachers, function(teacher) {
            // Create the object for this teacher
            var thisTeacher = {
              name: teacher.FullName,
              ssn: teacher.SSN,
              img: teacher.ImageURL,
              role: teacher.Role,
              email: teacher.Email,
              username: teacher.Username,
              questions: [] // Contains the teacher questions for just this teacher
            };
            // For every teacher, we add every question to his object
            angular.forEach(data.TeacherQuestions, function(quest) {
              var thisQuestion = {
                question: {
                  ID: quest.ID,
                  textIS: quest.TextIS,
                  textEN: quest.TextEN,
                  type: quest.Type,
                  img: quest.ImageURL
                },
                answer:  {
                  QuestionID: quest.ID,
                  TeacherSSN: teacher.SSN,
                  Value: ''
                }
              };
              // If the questions is a multiple choice question, we need an object that holds ID of each available choice as well as whether it's checked(true/false)
              if(quest.Type === 'multiple') {
                thisQuestion.answer.Value = {};
              }
              // If the question is a multiple choice question or a single choice question we create another attribute for the question containing all the available choices
              if(quest.Type === 'multiple' || quest.Type === 'single') {
                thisQuestion.question.choices = [];
                // So for each available answer choice we add it to our object
                angular.forEach(quest.Answers, function(answ) {
                    var choice = { ID: answ.ID, textIS: answ.TextIS, textEN: answ.TextEN, img: answ.ImageURL, weight: answ.Weight };
                    thisQuestion.question.choices.push(choice);

                     /* If the question is a multiple choice question we add the choice to the object that holds ID of each available choice as well as whether it's checked(true/false)
                     using the following format:
                     choices = {
                       51: true,   // ID of the answer and whether it's checked or not
                       52: false,
                       53: true
                     };*/
                    if(quest.Type === 'multiple') {
                      thisQuestion.answer.Value[answ.ID] = false;
                    }
                  });
              }
              // Add this question to the questions array in this teacher's object
              thisTeacher.questions.push(thisQuestion);
            });
            // Add this teacher, containing all his info and questions, to the teacheQuestions array
            $scope.evalInfo.teacherQuestions.push(thisTeacher);
          });

        });
      };

      // User clicked submit eval button
      $scope.submitEval = function() {
          // Reset the answers array since we want to generate a new fresh one
          $scope.evalInfo.answers = [];
          // Go through all the course questions
          angular.forEach($scope.evalInfo.courseQuestions, function(quest) {
            // Get the answer object for this question
            var answ = quest.answer;
            // Since our multiple choice questions aren't on the right format as the API expects we convert it
            if(quest.question.type === 'multiple') {
              // For every choice for the question
              angular.forEach(answ.Value, function(check, id) {
                // We create a new object answer for that choice
                if(check) {
                  var thisAnsw = angular.copy(answ);
                  thisAnsw.Value = id;
                  $scope.evalInfo.answers.push(thisAnsw);
                }
              });
            }
            else {
              $scope.evalInfo.answers.push(answ);
            }
          });
          // For every teacher
          angular.forEach($scope.evalInfo.teacherQuestions, function(teacher) {
            // Go through all the teacher questions for this teacher
            angular.forEach(teacher.questions, function(quest) {
              // Get the answer object for this question
              var answ = quest.answer;
              // Since our multiple choice questions aren't on the right format as the API expects we convert it
              if(quest.question.type === 'multiple') {
                // For every choice for the question
                angular.forEach(answ.Value, function(check, id) {
                  // We create a new object answer for that choice
                  if(check) {
                    var thisAnsw = angular.copy(answ);
                    thisAnsw.Value = id;
                    $scope.evalInfo.answers.push(thisAnsw);
                  }
                });
              }
              else {
                $scope.evalInfo.answers.push(answ);
              }
            });
          });
          EvalBackend.addCourseEvaluation($scope.evalInfo.course, $scope.evalInfo.semester, $scope.evalInfo.ID, $scope.evalInfo.answers).then(function(status) {
            // Display a message saying the eval was submitted
            $scope.submitResult = 'Evaluation successfully submitted! Thanks!';
            $scope.showEval = false;
            $scope.evalInfo.ID = '';

            // Refresh the list of evals
            $scope.evaluations = [];
            EvalBackend.getMyEvaluations().then(function(evals) {
              $scope.evaluations = evals;
            });
          });
        };
    }]);
