/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.academias', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('academias', {
          url: '/academias',
          template : '<ui-view></ui-view>',
          abstract: true,
          title: 'Academias',
          sidebarMeta: {
            icon: 'ion-location',
            order: 100,
          },
        })
        .state('academias.ver_academias', {
          url: '/ver_academias',
          controller: 'verAcademiasPageCtrl',         
          templateUrl: 'app/pages/academias/ver_academias/ver_academias.html',
          title: 'Academias',
          sidebarMeta: {
          order: 0,
          },
        })
        .state('academias.nova_academia', {
          url: '/nova_academia',
          controller: 'novaAcademiaPageCtrl',         
          templateUrl: 'app/pages/academias/nova_academia/nova_academia.html',
          title: 'Nova Academia',
          sidebarMeta: {
            order: 100,
          },
        });
  }
})();
