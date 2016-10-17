'use strict';

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDFRQfEnHNHFESKkQ1zQpqCqsoPYvsc8Is",
    authDomain: "multigym-4626a.firebaseapp.com",
    databaseURL: "https://multigym-4626a.firebaseio.com",
    storageBucket: "gs://multigym-4626a.appspot.com",
  };
  firebase.initializeApp(config);

  console.log("aqui foi a inicialização do firebase")

angular.module('BlurAdmin', [
  'ngAnimate',
  'ui.bootstrap',
  'ui.sortable',
  'ui.router',
  'ngTouch',
  'toastr',
  'smart-table',
  "xeditable",
  'ui.slimscroll',
  'ngJsTree',
  'angular-progress-button-styles',
  'BlurAdmin.theme',
  'BlurAdmin.pages',
  'firebase',
  'angular.viacep',
  'angularGeoFire'
]).directive('fileInput', function($parse){
  return{
    restrict : 'A',
    link: function(scope, elem, attrs){
      elem.bind('change', function(){ 
        $parse(attrs.fileInput).assign(scope, elem[0].files);
        scope.$apply();
      });
    }
  }
});