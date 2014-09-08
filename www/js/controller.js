/* Controllers */
    var localLeavesControllerModule = angular.module('localLeavesControllerModule', ['angular-gestures']);

    localLeavesControllerModule.controller('mainCtrl', ['$scope', '$state', '$window', 'plantObjectModel',
        function ($scope, $state, $window, plantObjectModel) {
            
            $scope.plantObjectModel = plantObjectModel;
            var windowHt = $scope.windowHt = $window.outerHeight;
            var windowWd = $scope.windowWd = $window.outerWidth;
            
            var num2show = $scope.num2show = Math.floor(windowHt/185);
            var rowHt = $scope.rowHt = windowHt/num2show;
            //console.log(rowHt)
            
            $scope.yOff = num2show*rowHt; //needs to match for $index on images
//            alert(windowWd)
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
            var typeTitle = $scope.typeTitle = 'rating';
//            var categInput = document.getElementById('logoButton');
//        categInput.onclick = function(){
//            $scope.$digest();
////            console.log('change');
////            location.reload();
//        };
            $scope.matchCat = function(category){
                //var category = this;
                var included = false;
                for (var i=0;i<plantObjectModel.dataIcons[category].search_use.length;i++){
                    if (typeTitle==plantObjectModel.dataIcons[category].search_use[i]){
                        included=true;
                    };
                };
                return included;
            };
//            $scope.categPositionContrl = function(categType){
//                var categs = [];
//                //create a file with the right index, and then search against it!!
//                for (var i=0; i < plantObjectModel.dataIcons.length; i++){
//                    var categKey = plantObjectModel.dataIcons[i];
//                    var object = plantObjectModel.dataIcons[categKey];
//                    for (var k=0;k<plantObjectModel.dataIcons[categType].search_use.length;k++){
//                        if (typeTitle==plantObjectModel.dataIcons[categType].search_use[k]){
//                            categs.push(categType)
//                        };
//                    };
//                }; 
//                console.log(categs.indexOf(categType))
//                return categs.indexOf(categType);
//            }
            $scope.topFill = "#363465";
//            $scope.frameFill = "#8d309f";
            $scope.Sci = false;
            var rightSideShow = false;
            
            var rightSide = $scope.rightSide = 540;
            //call this "leftSd" and use throughout Main.html divided in half, etc.
//            console.log($window.onresize);
            $scope.$watch('typeTitle',function(newValue,oldValue){
                $scope.num2show = num2show;
                $scope.matchCat = matchCat;
            });
            var windowSize = function(){
                windowHt = $scope.windowHt = document.documentElement.clientHeight; //$window.outerHeight;
//                console.log(document.documentElement.clientWidth);
                windowWd = $scope.windowWd = document.documentElement.clientWidth; //$window.outerWidth;
//                console.log(windowWd+ "ww")
                num2show = $scope.num2show = Math.floor(windowHt/185)+1;
                rowHt = $scope.rowHt = windowHt/num2show;
                $scope.yOff = num2show*200; 
                if(windowHt/windowWd < 1.7){
                    rightSideShow = true;
                }else{
                    rightSideShow = false;
                };
                    $scope.rightSideShow = rightSideShow;
            };
            windowSize();
            angular.element($window).bind("resize", function() {
                windowSize();
                $scope.$apply();
            });
            //pseudo-code:
            //numRows is determined from availHeight then assigned as an even number height and set at 100%;
//            var num2show = $scope.num2show = (windowHt+180)/180;
//            $scope.categPosition = function(categType){
//                var categs = plantObjectModel.dataIcons;
//                return categs.indexOf(categType);
//            };
//            $scope.iconControlTransform = function(categType,icon){ //should make it in a service??
//                var selectDeg = plantObjectModel.dataIcons[categType].selectDeg;
//                var refDeg = plantObjectModel.dataIcons[categType].refDeg;
//                var categNum = $scope.categPosition(categType);
//                var icons = plantObjectModel.dataIcons[categType].icons;
//                if (selectDeg<0){
//                    selectDeg = 0;
//                };
//                var select = selectDeg/12; 
//                var centerLngth = Math.floor(icons.length/2); 
//                if (select>icons.length-1){
//                    select = icons.length-1;
//                };
//                var indIcon = icons.indexOf(icon)-select;
//                var firstDeg = indIcon*refDeg;
//                var rotateHt = 1100+(categNum*140);
//                var rtn = ('rotate('+firstDeg+',250,'+rotateHt+')');
//                return rtn;
//            };
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
//            $scope.categPosition = function(categType){
//                var categs = plantObjectModel.dataIcons;
//                return categs.indexOf(categType);
//            };
//            $scope.setNewTrans = function(){
//                $scope.plantObjectModel = plantObjectModel;
//            }
            
//            $scope.moveRow = function(categType,$event){
//                if ($event.gesture.direction == 'left' || $event.gesture.direction == 'right' ){
//                    var maxDegrees = (plantObjectModel.dataIcons[categType].icons.length - 1) * 12;
//                    var selectionDeg = plantObjectModel.dataIcons[categType].selectDeg;
//                    var tempDeg = 0.1;
//                    var icons = plantObjectModel.dataIcons[categType].icons;
//                    if (tempDeg < maxDegrees){
//                        tempDeg -= $event.gesture.deltaX/36;
//                        console.log(tempDeg)
//                        plantObjectModel.dataIcons[categType].selectDeg = tempDeg;
//                    }
//                }else{
//                    var refDeg = plantObjectModel.dataIcons[categType].refDeg
//                    var newRef = $event.gesture.deltaY/300;
//                    if ($event.gesture.direction == 'up'){
//                        if ((refDeg + newRef) > 1){
//                            plantObjectModel.dataIcons[categType].refDeg = (refDeg + newRef);
//                        }else{
//                            plantObjectModel.dataIcons[categType].refDeg = 1;
//                        }
//                    }else{
//                        if ((refDeg - newRef) > 12){
//                            plantObjectModel.dataIcons[categType].refDeg = (refDeg - newRef);
//                        }else{
//                            plantObjectModel.dataIcons[categType].refDeg = 12;
//                        };
//                    };
//                };
//            }
//            $scope.swipeRow = function(categType,direction){
//                var maxDegrees = (plantObjectModel.dataIcons[categType].icons.length - 1) * 12;
//                var selectionDeg = plantObjectModel.dataIcons[categType].selectDeg;
//                
//                if(direction == 'left' && (selectionDeg < maxDegrees)){
//                    selectionDeg += 12;
//                }
//                else if (direction == 'right' && (selectionDeg > 0)){
//                    selectionDeg += -12;
//                }
//                
//                plantObjectModel.dataIcons[categType].selectDeg = selectionDeg;
//                var icons = plantObjectModel.dataIcons[categType].icons;
//                for (var i = 0;i<icons.length;i++){
//                    $scope.iconControlTransform(categType,icons[i]);
//                }
//            }
            
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