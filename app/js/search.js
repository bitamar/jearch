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

    var postIds = _.range(postsTitles.length);

    words.forEach(function(word) {
      if (word.length > 2) {
        postIds = _.intersection(postIds, search.scope.searchTerms[word]);
      }
    });

    // Fetch posts according to the ids list.
    var posts = [];
    postIds.forEach(function(id) {
      posts.push(postsTitles[id]);
    });
    return posts;
  }
});