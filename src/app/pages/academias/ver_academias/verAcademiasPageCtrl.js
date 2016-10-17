/**
 * @author Alexandre Brito
 */
 (function(){
 	'use strict';
  angular.module('BlurAdmin.pages.academias').controller('verAcademiasPageCtrl', verAcademiasPageCtrl);

    function verAcademiasPageCtrl($scope, $rootScope, $location, $firebaseObject, $firebaseArray, accessFactory, $uibModal, toastr, fireStuff, academiasInit) {
    	console.log("verAcademiasPageCtrl");
        console.log($location.path());
        console.log(academiasInit)
    	$scope.academias = academiasInit;
      console.log("ver academias")

        $scope.editarAcademia = function(acadId){
            console.log(acadId);

        };

        $scope.deletarAcademia = function(acad){
            $scope.erasedAcad = acad;
            $scope.modal = $scope.open('app/pages/academias/avisos/avisoapagaracademia.html', 'md');
            // body...
        };

        $scope.oblivium = function(){
            fireStuff.apagaAcademia($scope.erasedAcad)
        }




      $rootScope.$on("apagado", function(event){
        toastr.success('A academia foi removida com sucesso!');  
        //$location.path('/academias/ver_academias');
      });

      $rootScope.$on("cadastrado", function(event){
        setTimeout(function() {
             toastr.success('A nova academia foi inserida com sucesso!');             
        }, 2000);
      });

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