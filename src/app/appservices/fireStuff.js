(function(){
  'use strict';	
	/**
	*  Module
	*
	* Description
	*/
	angular.module("BlurAdmin").factory('fireStuff', fireStuff);

	function fireStuff($rootScope, accessFactory, $firebaseObject, $firebaseArray, $geofire, $location){
	
		var coisador = {
			guardaAcademia: _guardaAcademia,
			apagaAcademia: _apagaAcademia,
			atualizaAcademia: _atualizaAcademia,
			pegaAcademias: _pegaAcademias,
			academiaUnica: _academiaUnica
		};
		return coisador;

		function _guardaAcademia(_objAcad, _objLogo, _imgObj){
			var objAcad = _objAcad;
			var objLogo = _objLogo;
			var imgObj = _imgObj;
		    var counter = 0;

	        var acadRef = firebase.database().ref("academias");
	        var novaAcademia = acadRef.push(angular.fromJson(angular.toJson(objAcad))).then(function(success){
	            acadRef.limitToLast(1).on("child_added", function(snapshot) {
	            var acadId = snapshot.key
	  			// geoposicionamento por geohash aqui
	  			//var geoElement = acadAll.endereco.geopos;
	  			geoAble(objAcad, acadId);
	  			//	            
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
					counter = 0
		       		if(len !== 0){
		       		angular.forEach(obj, function(value, key) {  
		       		//////////////////////////////////////////////////////		
		       			var objFoto = value;
		       			var objKey = key;
			    		if(objFoto.type === "image/png"){
			    			var fotoNome = id+"_"+objKey+".png";
			    		}
			    		if(objFoto.type === "image/jpeg"){
			    			var fotoNome = id+"_"+objKey+".jpg";
			    		}
			    		console.log(fotoNome)	

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
							counter++;
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

						    		objAcad = null;
									objLogo = null;
									imgObj = null;
						  			$rootScope.$broadcast("cadastrado");
						  			console.log("primeiro disparo");

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

		       	var geoAble = function(tuti, key){
		       		var coords = tuti.endereco.geopos;
		       		console.log(coords);
		       		var $geo = $geofire(accessFactory.pegaMapeamento());
		       		$geo.$set(key,[coords.lat, coords.lng]).then(function(success){
		       			console.log("deu certo!");
		       		}).catch(function(error){
						console.log("não deu certo!");
						console.log("erro: "+ error);		       			
		       		})



		       	};
		}

		function _apagaAcademia(academics){
            var byebye = firebase.database().ref("academias/"+ academics.$id);
            byebye.remove().then(function(){
            	var $geo = $geofire(accessFactory.pegaMapeamento());
            	$geo.$remove(academics.$id)
		        .catch(function (err) {
		            $log.error(err);
		        });
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


		function _pegaAcademias(){
			var academiasArray = accessFactory.pegaAcademiaList()
    		var acad = $firebaseArray(academiasArray);
    		return acad;
		}

		function _academiaUnica(id){

			var theAcademy = accessFactory.pegaAcademiaUnica(id);
			theAcademy.on("value", function(snapshot){
				var editedAcad = snapshot.val();
				return editedAcad;
			});
		}
	


		function _atualizaAcademia(_objAcad, _objLogo, _imgObj, _academiaID, _imgCtrl, _logoCtrl){
			console.log("atualizando academia")
			var upobjAcad = _objAcad;
			var upobjLogo = _objLogo;
			var upimgObj = _imgObj;
			var academiaID = _academiaID;
			var imgCtrl = _imgCtrl
			var logoCtrl = _logoCtrl	
		    var counter = 0;
			firebase.database().ref("academias/"+academiaID).update(angular.fromJson(angular.toJson(upobjAcad))).then(function(success){
					//acabouUpdate()
					geoAble2(upobjAcad, academiaID);
					reestoreLogo(academiaID);
				});

			    var reestoreLogo = function(id){
			    	if(logoCtrl.logo === "inalterada"){
			    		photoReinserter(upimgObj, id);
			    	};
			    	if(logoCtrl.logo === "mudar"){

					    	if(upobjLogo !== null){
					    		if(upobjAcad.logo){
							            var delLogos = firebase.storage().ref();
							            var logsDel = delLogos.child(upobjAcad.logo.ref);
							            logsDel.delete().then(function(){
							            	console.log('deletou o logo já existente')
							            });
					            }

					    		console.log("este objeto logo: " + upobjLogo.type)
					    		if(upobjLogo.type === "image/png"){
					    			var logoNome2 = id+"_logo.png";
					    		}
					    		if(upobjLogo.type === "image/jpeg"){
					    			var logoNome2 = id+"_logo.jpg";
					    		}			    		
					    		
						          var armazem2 = firebase.storage().ref();
						          var armazemLogo2 = armazem2.child(logoNome2).put(upobjLogo);
						          armazemLogo2.on(firebase.storage.TaskEvent.STATE_CHANGED, function(snapshot) {
								    var progress2 = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
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
									  var logoURL2 = armazemLogo2.snapshot.downloadURL;
									  	firebase.database().ref("academias/"+id).update({
									  	logo:{ref:logoNome2, url:logoURL2}
									  }).then(function(success){
									  		console.log('Salvou o logo.');
											console.log(logoURL2);
									  		photoReinserter(upimgObj, id);

									  });

								});

					        }else{	
									photoReinserter(upimgObj, id);
					         };

			    	};
			    	if(logoCtrl.logo === "deletada"){

							console.log('deletando o logo')
					    	if(upobjAcad.logo){
							        var adeusLogo = firebase.storage().ref();
							        var logoBye = adeusLogo.child(upobjAcad.logo.ref);
							        logoBye.delete().then(function(){
							        	console.log('deletou o logo já existente')
										var tchauLogo = firebase.database().ref("academias/"+ academiaID + "/logo");
 										tchauLogo.remove().then(function(success){
 											photoReinserter(upimgObj, id);
 										})
							        });
					           }			    		


			    	};

		       	};


		       	var photoReinserter = function(obj, id){
		       		var len = 0;
					for (var o in obj) {
    				len++;
					}
					var fotorest = upobjAcad.fotos;
					var fotoNumb = 0;
					for (var n in fotorest) {
    				fotoNumb++;
					}
					var counterIn = 0;
					///////////////  ver se alguma foto foi deletada
					console.log(obj);
					console.log(fotoNumb);
					console.log(imgCtrl); 
					var deleteCount = 0;
					angular.forEach(imgCtrl, function(valor, chave){
						if(valor === "deletada"){
							/// delete a imagem
							var photoDeletor = upobjAcad.fotos[chave]
			            	var vaiPhoto = firebase.storage().ref();
			            	var photoVai = vaiPhoto.child(photoDeletor.ref);
					        photoVai.delete().then(function(){
					        console.log("deletado");
					        //agora deletamos a referência do nó
							var tchauPhoto = firebase.database().ref("academias/"+ id +"/fotos/"+ chave);
 							tchauPhoto.remove().then(function(success){
 								deleteCount++;
 								console.log(deleteCount +" e contando.")
 								if(deleteCount === fotoNumb){
 									console.log("// deletamos todo o nó de fotos")
 									var byeNode = firebase.database().ref("academias/"+ id +"/fotos");
 										byeNode.remove().then(function(success){
 											console.log("todo o nó removido com sucesso")
 											acabouUpdate();
 										});
 								}
 							})

					        }).catch(function(error){
					            console.log("não deletado:");
					            console.log(error);
					        });
						};

					});

					///////////////  fazer as mudanças nas imagens

					console.log(len +" é o comprimento do objeto.");
					if(len !== 0){
						
		       			if(upobjAcad.fotos){
			            	var fotoObj2 = upobjAcad.fotos;
			            	angular.forEach(obj, function(value, key){
			            		/// deletar o nó se estiver ocupado
			            		if(fotoObj2[key]){
			            			var victim = fotoObj2[key].ref;
									console.log("tenho de apagar "+victim);
									var delPhoto2 = firebase.storage().ref();
									var photoDel = delPhoto2.child(victim);
									photoDel.delete().then(function(success){
										console.log(victim +" foi apagado!")
									}).catch(function(error){
					            		console.log("não deletado:" + error);
					            	})

			            		}
			            	});// FOREACH						
			            }//IF FOTOS

			            angular.forEach(obj, function(fotoFile, keyObj) {
				    		if(fotoFile.type === "image/png"){
				    			var fotoNome = id+"_"+keyObj+".png";
				    		}
				    		if(fotoFile.type === "image/jpeg"){
				    			var fotoNome = id+"_"+keyObj+".jpg";
				    		}
				    		console.log(fotoNome)	
			    			counterIn++;
							var phots = firebase.storage().ref();
							var photsRef = phots.child(fotoNome).put(fotoFile);
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
							  		console.log(error.code)
								}, function() {
							  		var photsURL = photsRef.snapshot.downloadURL;
							  		console.log('Agora grave...');

							  		firebase.database().ref("academias/"+id+"/fotos/"+keyObj).update({
							  		ref:fotoNome, url:photsURL
							  		}).then(function(success){
							  			console.log('Salvou a imagem.');
							  			if(counterIn != len){
							  				console.log('Ainda não...');
										}else{
							  				console.log('Agora sim...');
							    			console.log(counterIn);
							    			acabouUpdate();			    			       									  			
										}
									});
							  	});
			            });// FOREACH INSERÇÃO


					}else{
						acabouUpdate();
					}
					 		       	
		    };/// REINSERTER		       	

		       		///////////////  retornar à tela inicial
				var acabouUpdate = function(){
						upobjAcad = null;
						upobjLogo = null;
						upimgObj = null;
						academiaID = null;					
					//$rootScope.$broadcast("updated");
					$location.path('/academias/ver_academias'); 
					console.log("salvou o update");
				}

		       	var geoAble2 = function(tuti, key){
		       		var coords = tuti.endereco.geopos;
		       		console.log(coords);
		       		var $geo = $geofire(accessFactory.pegaMapeamento());
		       		$geo.$set(key,[coords.lat, coords.lng],{"nome": tuti.nome}).then(function(success){
		       			console.log("deu certo o update!");
		       		}).catch(function(error){
						console.log("não deu certo o update!");
						console.log("erro: "+ error);		       			
		       		})



		       	};				

		};
					

	};
})();