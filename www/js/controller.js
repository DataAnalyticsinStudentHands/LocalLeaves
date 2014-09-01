/* Controllers */
    var localLeavesControllerModule = angular.module('localLeavesControllerModule', ['angular-gestures']);

    localLeavesControllerModule.controller('mainCtrl', ['$scope', '$state', '$window', 'plantObjectModel',
        function ($scope, $state, $window, plantObjectModel) {
            
            $scope.plantObjectModel = plantObjectModel;
            var windowHt = $scope.windowHt = $window.outerHeight;
//            function touchHandlerDummy($event){  //seems to kill other stuff on page
////                        $event.preventDefault();
////                        return false;
//                    };
//            document.addEventListener("touchstart", touchHandlerDummy, false);
//            document.addEventListener("touchmove", touchHandlerDummy, false);
//            document.addEventListener("touchend", touchHandlerDummy, false);
//            document.addEventListener("mousedown", touchHandlerDummy, false);
            $scope.alert = function(text) {
                alert(text);
            };
            $scope.Sci = false;
            //pseudo-code:
            //numRows is determined from availHeight then assigned as an even number height and set at 100%;
            var numRows = $scope.numRows = 3;
            $scope.iconTransform = function(categType,icon,selectDeg){
                if (selectDeg=='new'){
                    selectDeg = plantObjectModel.dataIcons[categType].selectDeg;
                }else{
                    plantObjectModel.dataIcons[categType].selectDeg = selectDeg;
                };
                var categNum = $scope.categPosition(categType);
                var icons = plantObjectModel.dataIcons[categType].icons;
                
                var select = selectDeg/12; 
                var centerLngth = Math.floor(icons.length/2); 
                if (select>icons.length-1){
                    select = icons.length-1;
                };
                if (select<0){
                    select = 0;
                };
                var indIcon = icons.indexOf(icon)-select;
                var firstDeg = indIcon*12;
                var rotateHt = 1100+(categNum*140);
                var rtn = ('rotate('+firstDeg+',250,'+rotateHt+')');
                return rtn;
            };
//            $scope.iconPosition = function(categType,icon){
//                var icons = plantObjectModel.dataIcons[categType].icons;
////                var degrees = plantObjectModel.dataIcons[categType].degrees;
//                var centerLngth = Math.floor(icons.length/2);
//                var indIcon = icons.indexOf(icon)-centerLngth;
//                var positionIcon = (indIcon)*13; //degrees;
//                return positionIcon
//                //return an index number for finding in the icons list
//                //calculate position, etc., from the swipePosition[categ]
//                //have to do this as a ng-model for the inputs
//                //need to track what would have been on isolated scopes
//            }
            $scope.categPosition = function(categType){
                var categs = plantObjectModel.dataIcons;
                return categs.indexOf(categType);
            };
            
            $scope.moveRow = function(categType,$event){
                var maxDegrees = (plantObjectModel.dataIcons[categType].icons.length - 1) * 12;
                var selectionDeg = plantObjectModel.dataIcons[categType].selectDeg;
                var tempDeg = 0.1;
                var icons = plantObjectModel.dataIcons[categType].icons;
                if (tempDeg < maxDegrees){
                    tempDeg -= $event.gesture.deltaX/36;
                    console.log(tempDeg)
                    plantObjectModel.dataIcons[categType].selectDeg = tempDeg;
                    console.log(plantObjectModel.dataIcons[categType].selectDeg)
                    for (var i = 0;i<icons.length;i++){
                        $scope.iconTransform(categType,icons[i],'new');
                    }
                }
                //this would be for moving part of a degree - 12 is a full snap to position
//                var dir = -4;
//                if ( direction == 'left' ){
//                    dir = 4
//                };
//                var startDegrees = plantObjectModel.dataIcons[categType].degrees;
//                var iconLngth = plantObjectModel.dataIcons[categType].icons.length;
//                var degrees = parseInt(startDegrees);
//                if (Math.abs(startDegrees)/4 < iconLngth){
//                    degrees += parseInt(dir);
//                };
//                console.log('deg'+degrees)
//                plantObjectModel.dataIcons[categType].degrees = degrees;
                
            }
            $scope.swipeRow = function(categType,direction){
                var maxDegrees = (plantObjectModel.dataIcons[categType].icons.length - 1) * 12;
                var selectionDeg = plantObjectModel.dataIcons[categType].selectDeg;
                
                if(direction == 'left' && (selectionDeg < maxDegrees)){
                    selectionDeg += 12;
                }
                else if (direction == 'right' && (selectionDeg > 0)){
                    selectionDeg += -12;
                }
                
                plantObjectModel.dataIcons[categType].selectDeg = selectionDeg;
                var icons = plantObjectModel.dataIcons[categType].icons;
                for (var i = 0;i<icons.length;i++){
                    $scope.iconTransform(categType,icons[i],'new');
                }
            }
            
			$scope.state = $state;
            
            $scope.submit = function() {
                $scope.theData = {};
                
                for (var i=0; i < plantObjectModel.dataIcons.length; i++)
                {
                    var key = plantObjectModel.dataIcons[i];
                    var object = plantObjectModel.dataIcons[key];
                    delete object.search_use;
                    delete object.details;
                    
                    $scope.theData[key] = object;
                }
                
                $scope.native = ($scope.theData["Native"].selectDeg / 12) +1;
                $scope.color = ($scope.theData["Color_Timing"].selectDeg / 12) +1;
                $scope.soil = ($scope.theData["Soil_Conditions"].selectDeg / 12) +1;
                $scope.sun = ($scope.theData["Sun"].selectDeg / 12) +1;
                $scope.growth = ($scope.theData["Growth_Size"].selectDeg / 12) +1;
                
                $scope.testPromise = $scope.Restangular().all("plants")
                            .getList({native: $scope.native,
                                      bloom: $scope.color,
                                      soil: $scope.soil,
                                      sun: $scope.sun,
                                      growthSize: $scope.growth}
                            );
                
                $scope.testPromise.then(
                    function(result){
                        alert("I loaded");
                    }, 
                    function(error){
                        alert("Error. Could not GET...");
                    }
                );
                
            };
            
        }])
        .controller('homeCtrl', ['$scope', '$http', function ($scope, $http) {
            $scope.favImage = "";
            $scope.userTraits = [];		 
            $scope.myGarden = [];
            $scope.morePlants=[];
        }]);