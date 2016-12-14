/**
 * @author Alexandre Brito
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.alunos')
  .controller('verAlunosPageCtrl', verAlunosPageCtrl);

	function verAlunosPageCtrl($scope, $rootScope, accessFactory, $firebaseObject, $firebaseArray, $geofire, $location, userFactory, usersInit, fireStuff, $uibModal, toastr) {
    	console.log($location.path());
      console.log("Controller para a página de ver alunos");
      $scope.usuarios = usersInit;
      console.log($scope.usuarios)
      

    // Função para pegar nome da academia do usuário (talvez direto no factory)

    // Função pra deletar usuário (talvez direto no factory)
    $scope.delUser = function(infos){
      $scope.partiu = infos;
      $scope.modal = $scope.open('app/pages/alunos/avisos/avisoapagarusuario.html', 'md');
    };

    $scope.goesBy = function(){
      console.log("passando para o factory");
      userFactory.killUser($scope.partiu);      
    }    
    // Função para enviar para edição. (talvez direto no factory)


    // respostas
        $rootScope.$on("usuario_apagado", function(event){
        toastr.success('O usuário foi removido com sucesso!');  
        //$location.path('/academias/ver_academias');
      });

    // open janela modal

            $scope.open = function (page, size) {
              $uibModal.open({
                scope: $scope,
                animation: true,
                templateUrl: page,
                size: size,
                resolve: {
                  items: function () {
                    return $scope.items;
                  }
                }
              });
            };    


	};// fim da função principal. ATENÇÃO!!!
 })();// fim do arquivo. ATENÇÃO!!!	
