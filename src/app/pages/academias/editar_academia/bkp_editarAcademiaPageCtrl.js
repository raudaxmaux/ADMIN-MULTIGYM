(function(){	
'use strict';

  angular.module('BlurAdmin.pages.academias').controller('editarAcademiaPageCtrl', editarAcademiaPageCtrl);

  	function editarAcademiaPageCtrl($scope, $rootScope, $stateParams, $location, $firebaseObject, $firebaseArray, accessFactory, fileReader, $filter, $uibModal, fireStuff, unicaAcad){

 ////////  VARIÁVEIS

	$scope.mask_acad = $filter('appImage')('theme/mask-acad.jpg');
  $scope.picture = $filter('appImage')('theme/no-photo.png');

  $scope.fotosAcad = {};
  $scope.logofile = {};


 ////////  ÁREA DE RESGATE DA ACADEMIA PELO ID
  
  $scope.esteId = $stateParams.id;
  $scope.targetAcad = unicaAcad;
  $scope.comparison = $scope.targetAcad; 

 ////////  FIM DA ÁREA DE RESGATE DA ACDEMIA PELO ID

 ////////  BOOLEANS DE CONTROLE DEIMAGENS

       $scope.noPicture = true;
       $scope.nofoto1 = true;		
       $scope.nofoto2 = true;    
       $scope.nofoto3 = true;

 ////////  ARRAY DE CONTROLE DE IMAGENS

  ////////  ÁREA DE PREENCHIMENTO DE COMBOBOXES
  ////////   (será trocada por JSONs externos)

  		$scope.logradouros = [
  			{nome: "Rua", tipo: "rua"},
   			{nome: "Avenida", tipo: "avenida"},
        {nome: "Alameda", tipo: "alameda"},
        {nome: "Estrada", tipo: "estrada"},
    		{nome: "Praça", tipo: "praça"}
  		];

  		$scope.estados = [
  			{nome: "Rio de Janeiro", tipo: "rio de Janeiro"},
        {nome: "São Paulo", tipo: "sao paulo"}       
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

  ////////  FIM DA ÁREA DE PREENCHIMENTO DE COMBOBOXES

    $scope.imagemCtrl = {
      foto1: "inalterada",
      foto2: "inalterada",
      foto3: "inalterada",
    }

    $scope.ctrlLogo = {
      logo: "inalterada"
    }

 ////////  RESGATE DE LOGO E IMAGENS DO SNAPSHOT

      if($scope.targetAcad.logo){
          console.log("existe logo")
          $scope.step = $scope.targetAcad.logo.url;
          $scope.noPicture = false;
      };
      if($scope.targetAcad.fotos){
        console.log("existe(m) imagem(ns)")
        var contaFoto = 0;
          $scope.fotoGrab = $scope.targetAcad.fotos;
          angular.forEach($scope.fotoGrab, function(foton, chave){
            if(foton){
                  var showzer = "no"+chave;
                  $scope[showzer] = false;
                  $scope[chave] = foton.url;
            }  
          });
      }


////////  FIM DO RESGATE DE LOGO E IMAGENS DO SNAPSHOT

 ////////  ÁREA DE CONTROLE DE UPLOAD DE IMAGENS


		$scope.removePicture = function () {
	      $scope.picture = $filter('appImage')('theme/no-photo.png');
	      $scope.noPicture = true;
        $scope.step = null;
        $scope.ctrlLogo.logo = "deletada";
        console.log("imagem deletada")      
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
          $scope.ctrlLogo.logo = "mudar";         
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
/////////////////////////////////    1
//////////////////////////////////////////////////////////////////////////////////////////////////////////////

    $scope.removePicture1 = function () {
        $scope.nofoto1 = true;
        $scope.file1 = null;
        $scope.foto1 = null;
        $scope.imagemCtrl.foto1 = "deletada";
        console.log($scope.imagemCtrl);
      };

      $scope.uploadFoto1 = function (event) {
        var files1 = event.target.files; //FileList object 
        var file1 = files1[files1.length-1];
        $scope.file1 = file1;
        var reader1 = new FileReader();
        reader1.onload = $scope.imageIsLoaded1; 
        reader1.readAsDataURL(file1);
        console.log("funciona aqui");
      };

    $scope.imageIsLoaded1 = function(e){  
        $scope.$apply(function() {
          $scope.foto1 = e.target.result;
          $scope.nofoto1 = false;
          $scope.imagemCtrl.foto1 = "inalterada";
                  console.log("funciona aqui também");

        });
    }

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////    2
//////////////////////////////////////////////////////////////////////////////////////////////////////////////

    $scope.removePicture2 = function () {
        $scope.nofoto2 = true;
        $scope.file2 = null;
        $scope.foto2 = null;
        $scope.imagemCtrl.foto2 = "deletada";
        console.log($scope.imagemCtrl);
      };

      $scope.uploadFoto2 = function (event) {
        var files2 = event.target.files; //FileList object 
        var file2 = files2[files2.length-1];
        $scope.file2 = file2;
        var reader2 = new FileReader();
        reader2.onload = $scope.imageIsLoaded2; 
        reader2.readAsDataURL(file2);
      };

    $scope.imageIsLoaded2 = function(e){  
        $scope.$apply(function() {
          $scope.foto2 = e.target.result;
          $scope.nofoto2 = false;
          $scope.imagemCtrl.foto2 = "inalterada";
        });
    }


 /////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////    3
//////////////////////////////////////////////////////////////////////////////////////////////////////////////


    $scope.removePicture3 = function () {
        $scope.nofoto3 = true;
        $scope.file3 = null;
        $scope.foto3 = null;
        $scope.imagemCtrl.foto3 = "deletada";
       
      };

      $scope.uploadFoto3 = function (event) {
        console.log("Yiieaaaaiiii!!!")
                var files3 = event.target.files; //FileList object 
        var file3 = files3[files3.length-1];
        $scope.file3 = file3;
        var reader3 = new FileReader();
        reader3.onload = $scope.imageIsLoaded3; 
        reader3.readAsDataURL(file3);
      };

    $scope.imageIsLoaded3 = function(e){  
        $scope.$apply(function() {
          $scope.foto3 = e.target.result;
          $scope.nofoto3 = false;
          $scope.imagemCtrl.foto3 = "inalterada";
        });
    }   

////////  ÁREA DE CONTROLE DE UPLOAD DE IMAGENS

///////// UPDATE DOS ARQUIVOS  /////////////////////////

      $scope.updatePartner = function(){

             //console.log("iniciar mudança");      

         if($scope.file1){
            console.log("guardando foto1");
            $scope.fotosAcad.foto1 = $scope.file1; 
         }
         if($scope.file2){
            console.log("guardando foto2");
            $scope.fotosAcad.foto2 = $scope.file2; 
         }
          if($scope.file3){
            console.log("guardando foto3");
            $scope.fotosAcad.foto3 = $scope.file3; 
         }

         fireStuff.atualizaAcademia($scope.targetAcad, $scope.logofile, $scope.fotosAcad, $scope.esteId, $scope.imagemCtrl, $scope.ctrlLogo);
       };


      $rootScope.$on("updated", function(event){
          console.log("Sucesso e retorno");      
          $location.path('/academias/ver_academias'); 
      });

      $scope.cancelaUpdate = function(){
         delete $scope.inputObj;
        delete $scope.logofile;
        delete $scope.fotosAcad;
        console.log("Desisto e retorno");
        $location.path('/academias/ver_academias');       
      }
    //$scope.getTheID($scope.esteId);

  };
})();