var localLeaves = angular.module('localLeaves', [
        'angular-gestures',
        'localLeavesControllerModule',
        'localServicesModule',
        'ui.router',
        //'ui.bootstrap',
        'restangular'//,
        //'headroom' //,
        //'ngCookies'
    ]);

    localLeaves.config(function ($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise("");
        
        $stateProvider.
            state("main", {
//                abstract:true,
                url: "",
                views: {
                    "main": {templateUrl: "partials/main.html", controller: "mainCtrl"}
                },
            onEnter: function(){
              console.log("enter main");
            }
            }); /*.
            state('main.results', {
                url: "/match",
                templateUrl: "partials/images.html", 
                controller: "mainCtrl",
            onEnter: function(){
              console.log("enter results");
            }
            }).
            state('main.PlantInfo', {
                url: "/plantInfo",
                templateUrl: "partials/plantInfo.html", 
                controller: 'PlantInfoCtrl'
            }).
		 state('More', {
			url: "/More",
			views: {
				"more": {templateUrl: "partials/more.html"}
			  }
		  });*/
});
/**
		state('PlantSuccess', {
                url: "/PlantSuccess",
                views: {
					"topBar": {templateUrl: "partials/topBar.html", controller: 'mainCtrl'},
                    "app": {templateUrl: "partials/plantSuccess.html"},
					"menuBar": {templateUrl: "partials/menuBar.html", controller: 'mainCtrl'}
                }
            }).
		state('UserTraits', {
                url: "/UserTraits",
                views: {
					"topBar": {templateUrl: "partials/topBar.html", controller: 'menuCtrl'},
                    "app": {templateUrl: "partials/userTraits.html"},
					"menuBar": {templateUrl: "partials/menuBar.html", controller: 'mainCtrl'}
                }
            });

    });
*/
/*
   
     state('MyGarden', {
        url: "/MyGarden",
        views: {
            "menuBar":{ 
                templateUrl:"partials/menuBar.html",
                controller: 'mainCtrl'},
            "app": {templateUrl: "partials/myGarden.html"}
          }
         
      });
*/

localLeaves.run(['Restangular', '$rootScope', '$http', function(Restangular, $rootScope, $http) {
    
    // Connect to server program (Eclipse is needed) with RESTangular
    //Restangular.setBaseUrl("http://localhost:8080/RESTFUL-WS");               // localhost IP Address
    Restangular.setBaseUrl("http://www.housuggest.org:8888/LocalLeaves/");             
    Restangular.setDefaultHeaders({Authorization: "Basic QWRtaW46dGVzdA==",     // Default Authorization
                                   'Content-Type': "application/json"});          // Default type JSON
    
    $rootScope.Restangular = function() {
        return Restangular;
    }
  
    $rootScope.returnedPlantsArray = [];    // will contain plants returned from server-side
    /*
    //CHECKING IF AUTHENTICATED ON STATE CHANGE - Called in $stateChangeStart
    $rootScope.isAuthenticated = function(authenticate) {
        //BELOW - Trying to get promises to work to verify auth
        vmaUserService.getMyUser().then(function(result) {
            console.log("authed");
            result = Restangular.stripRestangular(result)[0];
            //USERNAME & ID TO BE USED IN CONTROLLERS
            $rootScope.uid = result.id.toString();
            $rootScope.uin = result.username.toString();
        }, function(error) {
            if(error.status === 0) { // NO NETWORK CONNECTION
                console.log("error-0");
            } else {
                Auth.clearCredentials();
                console.log("not-authed");
                if(authenticate) $state.go("login");
            }
        });
        return Auth.hasCredentials();
    }
    
    //AUTHENTICATE ON CHANGE STATE
    $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams){
        console.log("$stateChangeStart");
//        if (toState.authenticate && !$rootScope.isAuthenticated(toState.authenticate)){
//            console.log("non-authed");
//            // User isn’t authenticated
//            $state.go("login");
//            //Prevents the switching of the state
//            event.preventDefault(); 
//        }
    });  */
}]);