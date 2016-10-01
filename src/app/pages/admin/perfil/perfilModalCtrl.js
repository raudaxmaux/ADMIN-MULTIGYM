/**
 * @author a.demeshko
 * created on 21.01.2016
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.admin')
    .controller('perfilModalCtrl', perfilModalCtrl);

  /** @ngInject */
  function perfilModalCtrl($scope, $uibModalInstance) {
    $scope.link = '';
    $scope.ok = function () {
      $uibModalInstance.close($scope.link);
    };
  }

})();