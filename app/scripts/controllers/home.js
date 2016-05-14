'use strict';

/**
 * @ngdoc function
 * @name personalWebsiteApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the personalWebsiteApp
 */
angular.module('personalWebsiteApp')
  .run(['$anchorScroll', function ($anchorScroll) {
    $anchorScroll.yOffset = 50;   // always scroll by 50 extra pixels
  }])

  .service('anchorSmoothScroll', function () {

    this.scrollTo = function (eID) {

      // This scrolling function
      // is from http://www.itnewb.com/tutorial/Creating-the-Smooth-Scroll-Effect-with-JavaScript
      var startY = currentYPosition();
      var stopY = elmYPosition(eID);
      var distance = stopY > startY ? stopY - startY : startY - stopY;
      if (distance < 100) {
        scrollTo(0, stopY);
        return;
      }
      var speed = 20;
      if (speed >= 20) {
        speed = 20;
      }
      var step = Math.round(distance / 25);
      var leapY = stopY > startY ? startY + step : startY - step;
      var timer = 0;
      if (stopY > startY) {
        for (var i = startY; i < stopY; i += step) {
          setTimeout('window.scrollTo(0, ' + leapY + ')', timer * speed);
          leapY += step;
          if (leapY > stopY) {
            leapY = stopY;
          }
          timer++;
        }
        return;
      }
      for (var j = startY; j > stopY; j -= step) {
        setTimeout('window.scrollTo(0, ' + leapY + ')', timer * speed);
        leapY -= step;
        if (leapY < stopY) {
          leapY = stopY;
        }
        timer++;
      }

    };

    var currentYPosition = function() {
      // Firefox, Chrome, Opera, Safari
      if (self.pageYOffset) {
        return self.pageYOffset;
      }
      // Internet Explorer 6 - standards mode
      if (document.documentElement && document.documentElement.scrollTop) {
        return document.documentElement.scrollTop;
      }
      // Internet Explorer 6, 7 and 8
      if (document.body.scrollTop) {
        return document.body.scrollTop;
      }
      return 0;
    };


    var elmYPosition = function(eID) {
      var elm = document.getElementById(eID);
      var y = elm.offsetTop - 65;
      var node = elm;
      while (node.offsetParent && node.offsetParent !== document.body) {
        node = node.offsetParent;
        y += node.offsetTop;
      }
      return y;
    };

  })



  .controller('HomeCtrl', function ($scope, $location, anchorSmoothScroll, $http) {

    $scope.scrollTo = function (id) {
      $location.hash(id);
      anchorSmoothScroll.scrollTo(id);
    };

    $scope.home = {

      goToForm: function() {

      },

      submitted: false,

      submitButtonDisabled: false,

      submitEmail: function(contactForm) {
        $scope.home.submitted = true;
        $scope.home.submitButtonDisabled = true;
        if (contactForm.$valid) {
          $http({
            method  : 'POST',
            url     : 'http://localhost:5000/php/contact-form.php',
            data    : contactForm,  //param method from jQuery
            headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  //set the headers so angular passing info as form data (not request payload)
          }).success(function(data){
            console.log(data);
            if (data.success) { //success comes from the return json object
              $scope.home.submitButtonDisabled = true;
              $scope.home.resultMessage = data.message;
              $scope.home.result='bg-success';
            } else {
              $scope.home.submitButtonDisabled = false;
              $scope.home.resultMessage = data.message;
              $scope.home.result='bg-danger';
            }
          });
        } else {
          $scope.submitButtonDisabled = false;
          $scope.resultMessage = 'Failed :(  Please fill out all the fields.';
          $scope.result='bg-danger';
        }
      }
    };

  })

  .directive('setClassWhenAtTop', function ($window) {
    var $win = angular.element($window); // wrap window object as jQuery object

    return {
      restrict: 'A',
      link: function (scope, element, attrs) {
        var topClass = attrs.setClassWhenAtTop, // get CSS class from directive's attribute value
          offsetTop = element.offset().top; // get element's offset top relative to document

        $win.on('scroll', function () {
          if ($win.scrollTop() >= offsetTop || offsetTop > 516 && $win.scrollTop() > 516) {
            element.addClass(topClass);
          } else {
            element.removeClass(topClass);
          }
        });
      }
    };

  });
