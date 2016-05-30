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

  .directive('nsFocusId', ['$timeout', function($timeout) {
    return {
      restrict: 'A',
      link: function(scope, element, attrs) {
        element.click(function() {
          $timeout(function () { $('#' + attrs.nsFocusId).focus(); }, 0);
        });
      }
    };
  }])



  .controller('HomeCtrl', function ($scope, $location, anchorSmoothScroll, $http, $window) {

    $scope.scrollTo = function (id) {
      $location.hash(id);
      anchorSmoothScroll.scrollTo(id);
    };

    $scope.home = {

      formFocus: false,

      form: {
        inputName: '',
        inputSubject: '',
        inputMessage: ''
      },

      goToForm: function() {
        $scope.home.formFocus = true;
      },

      isFormValid: function() {
        if ($scope.home.form.inputName === null || $scope.home.form.inputName === undefined || $scope.home.form.inputName.length < 1) {
          return false;
        } else if ($scope.home.form.inputSubject === null || $scope.home.form.inputSubject === undefined || $scope.home.form.inputSubject.length < 1) {
          return false;
        } else if ($scope.home.form.inputMessage === null || $scope.home.form.inputMessage === undefined || $scope.home.form.inputMessage.length < 1) {
          return false;
        } else {
          return true;
        }
      },

      submitted: false,

      submitButtonDisabled: false,

      submitEmail: function() {
        $scope.home.submitted = true;
        $window.open('mailto:kerr.kelsey@gmail.com' + "?subject=" + $scope.home.form.inputSubject +
        '&body=' + $scope.home.form.inputMessage + '\n\n - ' + $scope.home.form.inputName, '_self');
        $scope.home.form.inputName = '';
        $scope.home.form.inputSubject = '';
        $scope.home.form.inputMessage = '';
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
