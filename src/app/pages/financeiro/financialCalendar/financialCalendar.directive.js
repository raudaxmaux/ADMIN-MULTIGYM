
/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.financeiro')
      .directive('financialCalendar', financialCalendar);

  /** @ngInject */
  function financialCalendar() {
    return {
      restrict: 'E',
      controller: 'financialCalendarCtrl',
      templateUrl: 'app/pages/financeiro/financialCalendar/financialCalendar.html'
    };
  }
})();