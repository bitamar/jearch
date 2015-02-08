'use strict';

var app = angular.module('jekyllSearch', ['ngSanitize', 'ui.select']).config(['$interpolateProvider', function($interpolateProvider) {
  $interpolateProvider.startSymbol('{(').endSymbol(')}');
}]);

app.controller('JekyllSearchController', ['$scope', 'FetchSearchData', function($scope, FetchSearchData) {
  FetchSearchData.get('localhost:9000');
}]);