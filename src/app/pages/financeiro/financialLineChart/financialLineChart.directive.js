
/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.financeiro')
      .directive('financialLineChart', financialLineChart);

  /** @ngInject */
  function financialLineChart() {
    return {
      restrict: 'E',
      controller: 'financialLineChartCtrl',
      templateUrl: 'app/pages/financeiro/dashboardLineChart/financialLineChart.html'
    };
  }
})();