(function(){
	'use strict';
	/**
	* accessFactory
	* Facilita o caminho para os conteúdo na base de dados
	* Alexandre Brito 2016
	*/
	angular.module('BlurAdmin').factory('accessFactory', accessFactory);

	function accessFactory(){
		var userPath = firebase.database().ref("usuarios");
		var academyPath = firebase.database().ref("academias");
		var geoPath = firebase.database().ref("acad_position");
		var homePath = firebase.database().ref("usuario_home_position");				
		var treinosPath = firebase.database().ref("treinos");
		var acadCounterPath = firebase.database().ref("acad_alunos");
		var nakedPath = firebase.database();		
		
		var accessBack = {
			pegaUsuario: pegaUsuario,
			pegaUserList: pegaUserList,			
			pegaAcademiaUnica: pegaAcademiaUnica,
			pegaAcademiaList: pegaAcademiaList,
			pegaMapeamento: pegaMapeamento,
			pegaUserHome: pegaUserHome,
			pegaOneUserHome: pegaOneUserHome,
			pegaAlunosEmAcademia: pegaAlunosEmAcademia,
			pegaAqueleAlunoEmAcademia: pegaAqueleAlunoEmAcademia,		
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

		function pegaMapeamento(){
			return geoPath;
		};

		function pegaUserHome() {
			return homePath;
		}

		function pegaOneUserHome(one) {
			return homePath.child(one);
		}

		function pegaAlunosEmAcademia() {
			return acadCounterPath;
		};

		function pegaAqueleAlunoEmAcademia(chave){
			return acadCounterPath.child(chave);
		}

		function pegaBaseData(){
			return nakedPath;
		};		
		
	}; // fim da função principal
})(); // fim do arquivo JS
