var localLeaves = angular.module('localLeaves', [
        'angular-gestures',
        'localLeavesControllerModule',
        'plantServicesModule',
        'ui.router',
        //'ui.bootstrap',
        'restangular'//,
        //'headroom' //,
        //'ngCookies'
    ]);

    localLeaves.config(function ($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise("");
        
        $stateProvider.
            state("Main", {
                url: "",
                views: {
                    "main": {templateUrl: "partials/main.html", controller: "mainCtrl"}
                }
            }).
                    
                             
//            state('login', {
//                url: "",
//                views: {
//                    "login": { templateUrl: "partials/login.html"}
//                }
//            }).
//            state('Home', {
//                url: "/Home",
//                views: {
//                    "home": {templateUrl: "partials/home.html", controller: 'mainCtrl'}   
//                }
//
//            }).
//            state('Search', {
//                url: "/Search",
//                views: {
//                    "search": {templateUrl: "partials/search.html", controller: 'mainCtrl'}
//                }
//            }).
//            state('SearchTraditional', {
//                url: "/SearchTraditional",
//                views: {
//					"topBar": {templateUrl: "partials/topBar.html", controller: 'menuCtrl'},
//                    "app": {templateUrl: "partials/traditionalSearch.html", controller: 'mainCtrl'},
//					"menuBar": {templateUrl: "partials/menuBar.html", controller: 'mainCtrl'}
//                }
//            }).
        //add a nested view for traditional search, with template pointing to traditionalSearch.html and main.Ctrl
            state('SearchResults', {
                url: "/SearchResults",
                views: {
                    "results": {templateUrl: "partials/searchResults.html", controller: 'SearchResultsCtrl'}
                }
            }).
            state('PlantInfo', {
                url: "/PlantInfo",
                views: {
                    "info": {templateUrl: "partials/plantInfo.html", controller: 'PlantInfoCtrl'}
                }
            }).
		 state('More', {
			url: "/More",
			views: {
				"more": {templateUrl: "partials/more.html"}
			  }
		  });
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