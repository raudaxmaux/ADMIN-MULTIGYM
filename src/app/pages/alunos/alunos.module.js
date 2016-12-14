/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.alunos', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('alunos', {
          url: '/alunos',
          template : '<ui-view></ui-view>',
          abstract: true,
          title: 'Alunos',
          sidebarMeta: {
            icon: 'ion-compose',
            order: 110,
          },
        })
        .state('alunos.ver_alunos', {
          url: '/ver_alunos',
          controller: 'verAlunosPageCtrl',
          templateUrl: 'app/pages/alunos/ver_alunos/ver_alunos.html',
          title: 'Alunos',
          sidebarMeta: {
            order: 0,
          },
          resolve:{
            usersInit: function(userFactory){
              return userFactory.juntaUsers();
            }
          }        
        })
        .state('alunos.novo_aluno', {
          url: '/novo_aluno',
          controller: 'novoAlunoPageCtrl',
          templateUrl: 'app/pages/alunos/novo_aluno/novoaluno.html',
          title: 'Novo Aluno',
          sidebarMeta: {
            order: 10,
          },
        });
  }
})();
