'use strict';

var app = angular.module('jekyllSearch', ['ngSanitize', 'ui.select']).config(['$interpolateProvider', function($interpolateProvider) {
  $interpolateProvider.startSymbol('{(').endSymbol(')}');
}]);

app.controller('SearchCtrl', ['$scope', '$http', function($scope, $http) {
  $scope.post = {};
  $scope.searchTerms = [];
  $scope.posts = [];

  $http.get('words.json').success(function(data) {
    $scope.searchTerms = data;
  });
  $http.get('posts.json').success(function(data) {
    $scope.posts = data;
  });
}]);

app.filter('postsFilter', function() {
  return function(postsTitles, search) {

    var words = search.phrase.toLowerCase().split(' ');

    var posts = _.range(postsTitles.length);

    words.forEach(function(word) {
      if (word.length > 2) {
        posts = _.intersection(posts, search.scope.searchTerms[word]);
      }
    });

    return posts;
  }
});