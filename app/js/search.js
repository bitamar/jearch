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
  return function(posts, search) {
    var postsIndices = [];

    var words = search.phrase.toLowerCase().split(' ');

    // For each word, remove all posts that don't contain it.

    words.forEach(function (word) {

      var postIndex = 0;
      posts.forEach(function (post) {
        var itemMatches = false;

        //console.log(search.scope.searchTerms);
        //if (item[prop].toString().toLowerCase().indexOf(text) !== -1) {
        //  itemMatches = true;
        //  break;
        //}


        if (itemMatches) {
          //out.push(post);
        }

        postIndex++;
      });
    });

    return posts;
  }
});