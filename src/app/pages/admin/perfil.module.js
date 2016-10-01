/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.admin', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('administrador', {
          url: '/admin',
          template : '<ui-view></ui-view>',
          abstract: true,
          title: 'Administrador',
          sidebarMeta: {
            icon: 'ion-android-settings',
            order: 140,
          },
        })
        
        .state('administrador.perfil', {
          url: '/perfil',
          controller: 'perfilPageCtrl',          
          templateUrl: 'app/pages/admin/perfil/perfil.html',
          title: 'Meu Perfil',
          sidebarMeta: {
            order: 0,
          },
        })       
        .state('administrador.ver_perfis', {
          url: '/ver_perfis',
          templateUrl: 'app/pages/admin/ver_perfis/ver_perfis.html',
          title: 'Administradores',
          sidebarMeta: {
            order: 10,
          },
        })
        .state('administrador.novo_perfil', {
          url: '/novo_perfil',
          controller: 'novoPerfilPageCtrl',
          templateUrl: 'app/pages/admin/novo_perfil/novoperfil.html',
          title: 'Cadastrar Administrador',
          sidebarMeta: {
            order: 20,
          },
        });
  }
})();
