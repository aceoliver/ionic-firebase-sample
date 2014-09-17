'use strict';

angular.module('IonicFirebaseSample', [
    'ionic',
    'config',
    'firebase'
  ])

  .run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if(window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      }
      if(window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.styleDefault();
      }
    });
  })

  .filter('thumb', function(ENV) {
    return function(src, size) {
      return ENV.host + '/' + src.replace('uploads/', 'thumbs/' + size + 'x' + size + '/');
    };
  })

  .directive('photoGrid', function() {

    function link(scope) {

      function load() {
      }

      scope.$watch('photos', function() {
        if ( typeof photos !== 'undefined' ) {
          load();
        }
      });

      scope.order = 'timestamp';
      scope.reverse = true;

      scope.setUrl = function() {
        if (scope.listMode === 'grid') {
          return 'photo-grid.html';
        } else {
          return 'photo-list.html';
        }
      };

    }

    var directive = {
      link: link,
      scope: {
        photos: '=',
        listMode: '='
      },
      template: '<div ng-include="setUrl()"></div>',
      restrict: 'E'
    };

    return directive;
  })

  .directive('author', function($filter) {
    function link(scope, element) {
      FB.api('/' + scope.photo.userId, function(userdata) {
        scope.authorName = userdata.name;
        scope.$apply();
      });

      element
        .find('img')
        .attr('src', 'https://graph.facebook.com/' + scope.photo.userId + '/picture');

    }

    var directive = {
      link: link,
      scope: {
        photo: '='
      },
      restrict: 'E',
      templateUrl: 'author.html'
    };

    return directive;
  })

  .filter('fullDate', function() {
    return function(timestamp) {
      return moment
        .utc(timestamp)
        .format('MMMM Do YYYY, h:mm:ss A');
    };
  })

  .controller('HomeCtrl', function($scope, $firebase) {
    // create an AngularFire reference to the data
    var ref = new Firebase('https://funinph.firebaseio.com/photos');

    var sync = $firebase(ref);

    // download the data into a local object
    $scope.photos = sync.$asArray();

    $scope.mode = 'grid';

    $scope.actions = {

      toggleList: function() {
        if ( $scope.mode === 'grid' ) {
          $scope.mode = 'list';
        } else {
          $scope.mode = 'grid';
        }
      }

    };

  });
