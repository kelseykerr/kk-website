'use strict';

/**
 * @ngdoc overview
 * @name personalWebsiteApp
 * @description
 * # personalWebsiteApp
 *
 * Main module of the application.
 */
angular
  .module('personalWebsiteApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/regex', {
        templateUrl: 'views/regex.html',
        controller: 'RegexCtrl'
      })
      .when('/art-portfolio', {
        templateUrl: 'views/art-portfolio.html',
        controller: 'ArtPortfolioCtrl'
      })
      .when('/', {
        templateUrl: 'views/home.html',
        controller: 'HomeCtrl'
      });
  });
