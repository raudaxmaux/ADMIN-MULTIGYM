(function () {
  'use strict';

  angular.module('BlurAdmin.theme')
      .directive('ngFileSelect', ngFileSelect);

  /** @ngInject */
  function ngFileSelect() {
    return {
      link: function ($scope, el) {
        el.bind('change', function (e) {
          $scope.file = e.target.files[0];
          $scope.getFile();
        })
      }
    }
  }

})();