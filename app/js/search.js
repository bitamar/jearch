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
    if (!search.phrase) {
      return;
    }
    var words = search.phrase.toLowerCase().split(' ');

    var postIds = _.range(postsTitles.length);

    // Search for word matches.
    words.forEach(function(word) {
      if (word.length > 2) {
        postIds = _.intersection(postIds, search.scope.searchTerms[word]);
      }
    });

    // Search for partial word matches when there are few results.
    if (postIds < 10) {
      words.forEach(function(word) {
        // TODO: Break this foreach when there are enough results.

        for (var searchTerm in search.scope.searchTerms) {
          if (postIds.length >= 10) {
            break;
          }
          if (searchTerm.indexOf(word) != -1) {
            // When the searched word is included in one of the existing words, add
            // its post IDs.
            postIds = _.union(postIds, search.scope.searchTerms[searchTerm]);
          }
        }
      });
    }

    // Fetch posts according to the ids list.
    var posts = [];
    postIds.forEach(function(id) {
      posts.push(postsTitles[id]);
    });
    return posts;
  }
});