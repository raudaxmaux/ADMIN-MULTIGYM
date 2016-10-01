/**
 * @author Alexandre Brito
 */
 (function(){
 	'use strict';
  angular.module('BlurAdmin.pages.academias').controller('verAcademiasPageCtrl', verAcademiasPageCtrl);

    function verAcademiasPageCtrl($scope, $rootScope, $location, $firebaseObject, $firebaseArray, accessFactory, $uibModal, toastr, fireStuff) {
    	console.log("verAcademiasPageCtrl");
        console.log($location.path());
    	$scope.academias = [];

    	$scope.pegaAcademias = function(){
    		var acadPlace = accessFactory.pegaAcademiaList()
    		var acad = $firebaseArray(acadPlace);
    		console.log(acad);
   			$scope.academias = acad;
    	};

        $scope.editarAcademia = function(acadId){
            console.log(acadId);

            // body...
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
        console.log("BIIIIIIIIIIIIIIIIIIRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR!!!!!!!!!!!!!!!!!!!!!");
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




    	$scope.pegaAcademias();

    };// fim da função principal. ATENÇÃO!!!
 })();// fim do arquivo. ATENÇÃO!!!	