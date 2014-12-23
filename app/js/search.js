'use strict';

var app = angular.module('jekyllSearch', []).config(['$interpolateProvider', function($interpolateProvider){
  $interpolateProvider.startSymbol('{(').endSymbol(')}');
}]);

