(function(){
  'use strict';	
	/**
	*  Module
	*
	* Description
	*/
	angular.module("BlurAdmin").factory('fireStuff', fireStuff);

	function fireStuff($rootScope, accessFactory, $firebaseObject, $firebaseArray){
	
		var coisador = {
			guardaAcademia: guardaAcademia,
			apagaAcademia: apagaAcademia,
			atualizaAcademia: atualizaAcademia,
			guardaImagem: guardaImagem,
		};
		return coisador;

		function guardaAcademia(_objAcad, _objLogo, _imgObj){
			var objAcad = _objAcad;
			var objLogo = _objLogo;
			var imgObj = _imgObj;
		    var counter = 0;

	        var acadRef = firebase.database().ref("academias");
	        var novaAcademia = acadRef.push(angular.fromJson(angular.toJson(objAcad))).then(function(success){
	            acadRef.limitToLast(1).on("child_added", function(snapshot) {
	            var acadId = snapshot.key
	            storePhoto(acadId);
	            });
	        });

			    var storePhoto = function(id){
			    	if(objLogo !== null){
			    		console.log("este objeto logo: " + objLogo.type)
			    		if(objLogo.type === "image/png"){
			    			var logoNome = id+"_logo.png";
			    		}
			    		if(objLogo.type === "image/jpeg"){
			    			var logoNome = id+"_logo.jpg";
			    		}			    		
			    		
				          var armazem = firebase.storage().ref();
				          var armazemLogo = armazem.child(logoNome).put(objLogo);
				          armazemLogo.on(firebase.storage.TaskEvent.STATE_CHANGED, function(snapshot) {
						    var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
						    switch (snapshot.state) {
						      case firebase.storage.TaskState.PAUSED: // or 'paused'
						        console.log('Upload pausado');
						        break;
						      case firebase.storage.TaskState.RUNNING: // or 'running'
						        console.log('Upload rolando');
						        break;
						    }
						  }, function(error) {
						  switch (error.code) {
						    case 'storage/unauthorized':
						      console.log('Sem autorização');
						      break;
						    case 'storage/canceled':
						      console.log('Cancelado');
						      break;
						    case 'storage/unknown':
						      console.log('E eu sei lá, porra?');
						      break;
						  }
							}, function() {
							  var logoURL = armazemLogo.snapshot.downloadURL;
							  	firebase.database().ref("academias/"+id).update({
							  	logo:{ref:logoNome, url:logoURL}
							  }).then(function(success){
							  		console.log('Salvou o logo.');
									console.log(logoURL);
							  		photoInserter(imgObj, id);
							  });

						});

			          }else{
							photoInserter(imgObj, id);
			         };
		       	};

		       	var photoInserter = function(obj, id){
		       		var len = 0;
					for (var o in obj) {
    				len++;
					}
					console.log(len +" é o comprimento do objeto.");

		       		if(len !== 0){
		       		angular.forEach(obj, function(value, key) {  
		       		//////////////////////////////////////////////////////		
		       			var objFoto = value;
		       			var objKey = key;
			    		if(objFoto.type === "image/png"){
			    			var fotoNome = id+"_foto"+counter+".png";
			    		}
			    		if(objFoto.type === "image/jpeg"){
			    			var fotoNome = id+"_foto"+counter+".jpg";
			    		}
			    		console.log(fotoNome)	
			    		counter++;
				          var phots = firebase.storage().ref();
				          //var photsRef = phots.child(id+"/imagens/"+key + objFoto.name).put(objFoto);
				          var photsRef = phots.child(fotoNome).put(objFoto);
				          photsRef.on(firebase.storage.TaskEvent.STATE_CHANGED, function(snapshot) {
						    var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
						    switch (snapshot.state) {
						      case firebase.storage.TaskState.PAUSED: // or 'paused'
						        console.log('Upload pausado');
						        break;
						      case firebase.storage.TaskState.RUNNING: // or 'running'
						        console.log('Upload rolando');
						        break;
						    }
						  }, function(error) {
						  switch (error.code) {
						    case 'storage/unauthorized':
						      console.log('Sem autorização');
						      break;
						    case 'storage/canceled':
						      console.log('Cancelado');
						      break;
						    case 'storage/unknown':
						      console.log('E eu sei lá, porra?');
						      break;
						  }
						}, function() {
						  var photsURL = photsRef.snapshot.downloadURL;
						  	console.log('Agora grave...');

						  	firebase.database().ref("academias/"+id+"/fotos/"+objKey).update({
						  	ref:fotoNome, url:photsURL
						  }).then(function(success){
						  		console.log('Salvou a imagem.');
						  		if(counter != len){
						  			console.log('Ainda não...');
								}else{
						  			console.log('Agora sim...');
						    		console.log(counter);			    			       									  			
								}
						  });

						});
 					//////////////////////////////////////////////////////
					});
					}else{

					}
				        if(counter === len){
				        	counter = 0;
				        	objAcad = null;
							objLogo = null;
							imgObj = null;
						  	$rootScope.$broadcast("cadastrado");
						  	console.log("segundo disparo");												          		
				        }					 		       	
		       	};
		}

		function apagaAcademia(academics){
            var byebye = firebase.database().ref("academias/"+ academics.$id);
            byebye.remove().then(function(){
              if(academics.logo){
             var delLogos = firebase.storage().ref();
            var logsDel = delLogos.child(academics.logo.ref);
            logsDel.delete().then(function(){
            	console.log("deletado");
            }).catch(function(error){
            	console.log("não deletado:");
            	console.log(error);
            })           	
            }
            if(academics.fotos){
            	var fotoObj = academics.fotos;
            	angular.forEach(fotoObj, function(value, key){
            	var	refer = value;
            		var delPhotos = firebase.storage().ref();
            		var photsDel = delLogos.child(refer.ref);
		            photsDel.delete().then(function(){
		            	console.log("deletado");
		            }).catch(function(error){
		            	console.log("não deletado:");
		            	console.log(error);
		            }) 
            		
            	});
            	$rootScope.$broadcast("apagado");
            }else{
            	$rootScope.$broadcast("apagado");
            }          	
            	
            })


		};

		function atualizaAcademia(acadId, objAcad){
			// body...
		}

		function guardaImagem(img){
			// body...
		}




	};
})();