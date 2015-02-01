'use strict';

angular.module('jekyllSearch')
  .service('FetchSearchData', function ($http, $q) {

    /**
     * Return a promise with the meter list, from cache or the server.
     *
     * @param accountId
     *  The account ID.
     * @param categoryId
     *  The category ID.
     *
     * @returns {Promise}
     *
     * {
     *   searchTerm: [],
     *   posts: [],
     * }
     *
     */
    this.get = function(baseUrl) {
      return $q.all(
        $http.get('words.json').success(function(data) {
          searchTerms = data;
        }),
        $http.get('posts.json').success(function(data) {
          posts = data;
        })
      );
    };
  });