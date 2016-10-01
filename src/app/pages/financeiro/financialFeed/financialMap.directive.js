
/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.financeiro')
      .directive('financialMap', financialMap);

  /** @ngInject */
  function financialMap() {
    return {
      restrict: 'E',
      controller: 'financialMapCtrl',
      templateUrl: 'app/pages/financeiro/financialMap/financialMap.html'
    };
  }
})();