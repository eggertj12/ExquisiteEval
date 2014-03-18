'use strict';

angular.module('exquisiteEvalApp')
  .controller('AdminCtrl', ['$scope', '$location', 'EvalBackend', 'EvalState',
  function ($scope, $location, EvalBackend, EvalState) {
    EvalState.PageTitle = 'Admin panel';

    $scope.filterBy = [
      { key: '', value: 'All' },
      { key: 'new', value: 'New' },
      { key: 'open', value: 'Open' },
      { key: 'closed', value: 'Closed' }
    ];

    $scope.vm = {
      templates: [],
      evaluations: [],
      evaluation: {
        TemplateTitleEN: 'Select an evaluation to view results'
      },
      teachers: {},
      course: null,
      evalFilter: $scope.filterBy[0].key
    };

    EvalBackend.getEvaluations().then(function(data) {
      $scope.vm.evaluations = data;
    });

    $scope.addTemplate = function() {
      $location.url('/template');
    };

    $scope.addEvaluation = function() {
      $location.url('/evaluation');
    };

    $scope.getEvaluation = function(id) {
      EvalBackend.getEvaluation(id).then(function(data) {
        $scope.vm.evaluation = data;
        $scope.selectCourse(data.Courses[0]);
      });
    };

    $scope.selectCourse = function(course) {
      // If no answers for evaluation then no course is defined, check for that condition to avoid invalid post request
      if (!angular.isDefined(course)) {
        $scope.vm.course = {};
        return;
      }

      // Load teachers if not alraedy available
      var skip;

      // Set selected course
      $scope.vm.course = course;

      skip = (angular.isDefined($scope.vm.teachers[course.CourseID]) && angular.isDefined($scope.vm.teachers[course.CourseID][course.Semester]));
      if (!skip) {
        EvalBackend.getCourseTeachers(course.CourseID, course.Semester).then(function(data) {
          $scope.vm.teachers[course.CourseID] = $scope.vm.teachers[course.CourseID] || {};
          // if (!angular.isDefined($scope.vm.teachers[course.CourseID])) {
          // }
          $scope.vm.teachers[course.CourseID][course.Semester] = data;
        });
      }
    };

    $scope.openTeacher = function(teacher) {
      if (!teacher.open) {
        teacher.open = true;
      } else {
        teacher.open = false;
      }
    };

  }]);
