'use strict';

/**
 * @ngdoc directive
 * @name negawattClientApp.directive:loadingBarText
 * @description
 * # loadingBarText
 */
angular.module('jekyllSearch')
  .directive('jekyllSearch', function () {
    return {
      restrict: 'EA',
      template:
        '<ui-select ng-model="post.selected" theme="select2" ng-disabled="disabled">' +
          '<ui-select-match placeholder="Search...">{{$select.selected.name}}</ui-select-match>' +
          '<ui-select-choices repeat="post in posts | postsFilter: {phrase: $select.search, scope: this}">' +
            '<div ng-bind-html="post[0] | highlight: $select.search"></div>' +
          '</ui-select-choices>' +
        '</ui-select>',
      controller: function($scope) {

      },
      // Isolate scope.
      scope: {
        data: '=data'
      }
    };
  });
