(function(){
	  'use strict';	
	/**
	*	Brito 2016
	*	Modulo de acesso aos usuáriso
	*/
	angular.module("BlurAdmin").factory('userFactory', userFactory);
	function userFactory($rootScope, accessFactory, $firebaseObject, $firebaseArray, $geofire, $location, fireStuff, $firebaseAuth){

		var patota = {
			juntaUsers: _juntaUsers,
			killUser: _killUser,
			captureUser: _captureUser,
			createUser: _createUser,
			changeUser: _changeUser
		};
		return patota;

		function _juntaUsers() {
			var alumniArray = accessFactory.pegaUserList()
			var usuarios = $firebaseArray(alumniArray);
			return usuarios;							
		}

		function _killUser(chaves) {
			console.log(chaves);
			console.log("recebido no factory")
			 var byebye = firebase.database().ref("usuarios/"+ chaves.$id);
			 	byebye.remove().then(function(){
            	var $geo = $geofire(accessFactory.pegaUserHome());
            	$geo.$remove(chaves.$id)
		        .catch(function (err) {
		            $log.error(err);
		        });
		    if(chaves.academia){
		    	var solong = firebase.database().ref("acad_alunos/"+chaves.academia+"/"+ chaves.$id);
		    	solong.remove().then(function(){
		    		console.log("removido da academia")
		    	}).catch(function(error){
		    		console.log("era um sedentário...")
		    	})
		    }else{
		    	console.log("não tinha academia")
		    }	    
            if(chaves.photoURL){
             	var delPhotos = firebase.storage().ref();
            	var photsDel = delPhotos.child(chaves.photoURL);
            	photsDel.delete().then(function(){
            	console.log("deletado");
            }).catch(function(error){
            	console.log("não deletado ou non ecziste");
            	console.log(error);
            })           	
            }else{
		    	console.log("não tinha foto")
		    }

		    var auth = $firebaseAuth();
		    auth.deleteUser(chaves.$id);

		    $rootScope.$broadcast("usuario_apagado");		        
			 }).catch(function(error){
			 	console.log(error);
			 	$rootScope.$broadcast("usuario_apagado");
			 });
			
		}

		function _captureUser(chave) {
			// body...
		}

		function _createUser() {
			// body...
		}

		function _changeUser(chave) {
					// body...
		}		
	}
})();