/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.financeiro')
      .directive('financialPieChart', financialPieChart);

  /** @ngInject */
  function financialPieChart() {
    return {
      restrict: 'E',
      controller: 'financialPieChartCtrl',
      templateUrl: 'app/pages/financeiro/financialPieChart/financialPieChart.html'
    };
  }
})();