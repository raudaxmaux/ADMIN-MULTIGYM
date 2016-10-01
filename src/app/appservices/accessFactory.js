(function(){
	'use strict';
	/**
	* accessFactory
	* Facilita o caminho para os conteúdo na base de dados
	* Alexandre Brito 2016
	*/
	angular.module('BlurAdmin').factory('accessFactory', accessFactory);


	function accessFactory(){
		console.log("accessFactory");
		var userPath = firebase.database().ref("usuarios");
		var academyPath = firebase.database().ref("academias");
		var treinosPath = firebase.database().ref("treinos");
		var nakedPath = firebase.database();
		
		var accessBack = {
			pegaUsuario: pegaUsuario,
			pegaUserList: pegaUserList,
			
			pegaAcademiaUnica: pegaAcademiaUnica,
			pegaAcademiaList: pegaAcademiaList,
			
			pegaAgendamento: pegaAgendamento
		};
		return accessBack;

		function pegaUsuario(key){
			return userPath.child(key);
		}

		function pegaUserList(){
			return userPath;
		}		

		function pegaAcademiaUnica(key){
			return academyPath.child(key);
		}

		function pegaAcademiaList(){
			return academyPath;
		}

		function pegaAgendamento(key){
			return treinosPath.child(key);
		};

		function pegaBaseData(){
			return nakedPath;
		};		
		
	}; // fim da função principal
})(); // fim do arquivo JS