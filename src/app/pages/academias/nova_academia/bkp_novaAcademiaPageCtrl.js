(function(){	
'use strict';

  angular.module('BlurAdmin.pages.academias').controller('novaAcademiaPageCtrl', novaAcademiaPageCtrl);

  	function novaAcademiaPageCtrl($scope, $rootScope, $location, $firebaseObject, $firebaseArray, accessFactory, fileReader, $filter, $uibModal, fireStuff){

	$scope.picture = $filter('appImage')('theme/no-photo.png');

	$scope.mask_acad = $filter('appImage')('theme/mask-acad.jpg');


       $scope.noPicture = true;
       $scope.noPicture1 = true;		
       $scope.noPicture2 = true;    
       $scope.noPicture3 = true;


  		$scope.logradouros = [
  			{nome: "Rua", tipo: "rua"},
   			{nome: "Avenida", tipo: "avenida"},
        {nome: "Alameda", tipo: "alameda"},
        {nome: "Estrada", tipo: "estrada"},
    		{nome: "Praça", tipo: "praça"}
  		];

  		$scope.estados = [
  			{nome: "Rio de Janeiro", tipo: "rio de Janeiro"},
  		];

   		$scope.cidades = [
  			{nome: "Angra dos Reis"},
   			{nome: "Araruama"},
    		{nome: "Niterói"},
   			{nome: "Rio de Janeiro"},
   			{nome: "São Gonçalo"}
  		];

  		$scope.modalidades = [
  			{modalidade: "Musculação"},
  			{modalidade: "Ergometria"},
  			{modalidade: "Spining"},
  			{modalidade: "Hidroginástica"},
  			{modalidade: "Natação"},
  			{modalidade: "Dança"},
  			{modalidade: "Abdominal"},
  			{modalidade: "Localizada"},
  			{modalidade: "Lutas"},
  			{modalidade: "Ioga"},
  			{modalidade: "Pilates"}
  		];

  		$scope.benesses = [
  			{tipo:"Segurança"},
  			{tipo:"Locker"},
  			{tipo:"Banheiros com chuveiro"},
  			{tipo:"Lanchonete"},
  			{tipo:"Estética"},
  			{tipo:"Acompanhamento nutricional"},
  			{tipo:"Acompanhamento equipe professores"},
  			{tipo:"Aberto finais de semana"}
  		];

      $scope.fotosAcad = {};

      $scope.logofile = {};

		$scope.removePicture = function () {
	      $scope.picture = $filter('appImage')('theme/no-photo.png');
	      $scope.noPicture = true;
	    };

	    $scope.logoUpload = function (event) {
		    var files = event.target.files; //FileList object 
		    var file = files[files.length-1];
		    $scope.logofile = file;  
		    $scope.file = file;
		    var reader = new FileReader();
		    reader.onload = $scope.imageIsLoaded; 
		    reader.readAsDataURL(file);
	    };

		$scope.imageIsLoaded = function(e){  
		    $scope.$apply(function() {
		    	$scope.step = e.target.result;
		    	//console.log($scope.step);
		    	$scope.noPicture = false;

		    });
		}


      $scope.getFile = function () {  
        fileReader.readAsDataUrl($scope.file, $scope)
            .then(function (result) {
              $scope.picture = result;
            });
      };

	    $scope.unconnect = function (item) {
	      item.href = undefined;
	    };

	    $scope.showModal = function (item) {
	      $uibModal.open({
	        animation: false,
	        controller: 'perfilModalCtrl',
	        templateUrl: 'app/admin/perfil/perfilModal.html'
	      }).result.then(function (link) {
	          item.href = link;
	        });
	    };

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////

    $scope.removePicture1 = function () {
        $scope.noPicture1 = true;
        $scope.foto1 = null;
        $scope.step1 = null
      };

      $scope.uploadFoto1 = function (event) {
        var files1 = event.target.files; //FileList object 
        var file1 = files1[files1.length-1];
        $scope.foto1 = file1;  
        $scope.file1 = file1;
        var reader1 = new FileReader();
        reader1.onload = $scope.imageIsLoaded1; 
        reader1.readAsDataURL(file1);
      };

    $scope.imageIsLoaded1 = function(e){  
        $scope.$apply(function() {
          $scope.step1 = e.target.result;
          //console.log($scope.step);
          $scope.noPicture1 = false;

        });
    }

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////    2
//////////////////////////////////////////////////////////////////////////////////////////////////////////////

    $scope.removePicture2 = function () {
        $scope.noPicture2 = true;
        $scope.foto2 = null;
        $scope.step2 = null
      };

      $scope.uploadFoto2 = function (event) {
        var files2 = event.target.files; //FileList object 
        var file2 = files2[files2.length-1];
        $scope.foto2 = file2;  
        $scope.file2 = file2;
        var reader2 = new FileReader();
        reader2.onload = $scope.imageIsLoaded2; 
        reader2.readAsDataURL(file2);
      };

    $scope.imageIsLoaded2 = function(e){  
        $scope.$apply(function() {
          $scope.step2 = e.target.result;
          //console.log($scope.step);
          $scope.noPicture2 = false;

        });
    }


 /////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////    3
//////////////////////////////////////////////////////////////////////////////////////////////////////////////

    $scope.removePicture3 = function () {
        $scope.noPicture3 = true;
        $scope.foto3 = null;
        $scope.step3 = null
      };

      $scope.uploadFoto3 = function (event) {
        console.log("Yiieaaaaiiii!!!")
                var files3 = event.target.files; //FileList object 
        var file3 = files3[files3.length-1];
        $scope.foto3 = file3;  
        $scope.file3 = file3;
        var reader3 = new FileReader();
        reader3.onload = $scope.imageIsLoaded3; 
        reader3.readAsDataURL(file3);
      };

    $scope.imageIsLoaded3 = function(e){  
        $scope.$apply(function() {
          $scope.step3 = e.target.result;
          //console.log($scope.step);
          $scope.noPicture3 = false;

        });
    }   



      ///////// SALVA OS ARQUIVOS  /////////////////////////
      $scope.insertPartner = function(inputObj){
         $scope.inputObj = inputObj;

         if($scope.foto1){
            console.log("guardando foto1");
            $scope.fotosAcad.foto1 = $scope.foto1; 
         }
         if($scope.foto2){
            console.log("guardando foto2");
            $scope.fotosAcad.foto2 = $scope.foto2; 
         }
          if($scope.foto3){
            console.log("guardando foto3");
            $scope.fotosAcad.foto3 = $scope.foto3; 
         }

         fireStuff.guardaAcademia($scope.inputObj, $scope.logofile, $scope.fotosAcad);
      };


      $rootScope.$on("cadastrado", function(event){
        delete $scope.inputObj;
        delete $scope.logofile;
        delete $scope.fotosAcad;
        console.log("BODYBUILDER POOOOOORRRRRAAAAAAAA!!!!!!!!!!!!!!!!!!!!!");
        $location.path('/academias/ver_academias');
      });




  };
})();