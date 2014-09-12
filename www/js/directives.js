angular.module('localLeavesControllerModule').directive('imgControls',function(plantObjectModel){
var loaded = {};
  return {
    link: function(scope, element, attrs) {
        element.on('dragstart',function(){event.preventDefault()});
        
//        element.on('dragend',function(){alert('dragged')});
//        element.on('click',function(){alert('dfa')});
//        console.log(element[0].children)
        element.on('error', function() {
            scope.$apply(function() {
                element.attr('xlink:href', 'img/blank.svg');
            });
          });
        //click on each image should move it to center - not sure how to do it
        //dbl-click is for row-in-depth
//        scope.categPosition = function(categType){
//                var categs = plantObjectModel.dataIcons;
//                return categs.indexOf(categType);
//            };
//        scope.imgHt = 10;
//        scope.iconTransform = function(categType,icon){
//            scope.imgHt = plantObjectModel.dataIcons[categType].refDeg * 8;
//            //element.attr('height',imgHt);
//            var selectDeg = plantObjectModel.dataIcons[categType].selectDeg;
//            var refDeg = plantObjectModel.dataIcons[categType].refDeg;
//            var categNum = scope.categPosition(categType);
//            var icons = plantObjectModel.dataIcons[categType].icons;
//            if (selectDeg<0){
//                selectDeg = 0;
//            };
//            var select = selectDeg/12; 
//            var centerLngth = Math.floor(icons.length/2); 
//            if (select>icons.length-1){
//                select = icons.length-1;
//            };
//            var indIcon = icons.indexOf(icon)-select;
//            var firstDeg = indIcon*refDeg;
//            var rotateHt = 1100+(categNum*140);
//            var rtn = ('rotate('+firstDeg+',250,'+rotateHt+')');
//            return rtn;
//        };
        
//      element.bind('load', function() {
//        loaded[element.attr('xlink:href')] = true;
//      });
//      
//      var timeout = -1;
//      try {
//        var timeout = parseInt(element.attr('data-src-maxtime'), 10);
//      } catch (ex) {
//      }
//      if (timeout != -1) {
//        if (!loadSuccess[element.attr('src')]) {
//          $timeout(function() {
//            if (!loadSuccess[element.attr('src')]) {
//              element.attr('src', element.attr('data-src-fallback'));
//            }
//          }, timeout);
//        }
//      }
    }
  };
  })
.directive('rowControls',function(plantObjectModel){ //on main row in main.html
var loaded = {};
  return {
    link: function(scope, element, attrs) {
        //scope.rowHt = 100;
//        var categInput = document.getElementById('logoButton');
//        categInput.onclick = function(){
//            console.log('change');
//            scope.$digest();
//        };
        function touchHandlerDummy($event){ 
            $event.preventDefault();
            return false;
        };
        document.addEventListener("touchstart", touchHandlerDummy, false);
        document.addEventListener("touchmove", touchHandlerDummy, false);
        document.addEventListener("touchend", touchHandlerDummy, false);
        document.addEventListener("mousedown", touchHandlerDummy, false);
        var rowHt = scope.rowHt = 185;
        scope.resltIndex = scope.$index;
//        if (scope.categType == 'FirstPCA'){
//            scope.rowHt = 2*rowHt;
//            scope.resltIndex = 0;
//        };
//        console.log(scope.showResults + 'showRes')
//        if (scope.showResults){
//                scope.resltIndex = scope.$index+1;
//            }else{
//                scope.resltIndex = scope.$index;
//        };

//        if (attrs.categCnt == 'FirstPCA'){
//            console.log('fPCA')
//            rowHt = 2*rowHt;
//        }else{
//            rowHt = 185
//        };

        scope.showNotchedLine = function(categType){
            var iconsLngth = plantObjectModel.dataIcons[categType].icons.length
//            console.log('direct'+plantObjectModel.dataIcons[categType].icons.length)
//            console.log(categType)
                if(iconsLngth > 5){
                    return 'notched-normal'
                }else{
                    return 'notched-hide'
                };
        };
//        scope.categPosition = function(categType,typeTitle){
//                var categs = [];
//                for (var i=0;i<plantObjectModel.dataIcons[categType].search_use.length;i++){
//                    if (typeTitle==plantObjectModel.dataIcons[categType].search_use[i]){
//                        categs.push(categType)
//                    };
//                }; 
//                return categs.indexOf(categType);
//        };
        scope.imgHt = 10;
//        scope.imgTransform = function(imageType,parent,ind){
//            var selectDeg = plantObjectModel.srchResults[imageType].selectDeg;
//            var refDeg = plantObjectModel.srchResults[imageType].refDeg;
//            var icons = plantObjectModel.srchResults[imageType].icons;
//            if (selectDeg<0){
//                selectDeg = 0;
//            };
//            var select = selectDeg/12; 
//            var centerLngth = Math.floor(icons.length/2); 
//            if (select>icons.length-1){
//                select = icons.length-1;
//            };
//            var indIcon = parseInt(ind-select); //icons.indexOf(icon)-select;
//            if (isNaN(indIcon)){indIcon = 0};
//            var firstDeg = indIcon*refDeg;
//            var rotateHt = 1100+(parent*140);
//            if (isNaN(rotateHt)){rotateHt=1100};
//            var rtn = ('rotate('+firstDeg+',250,'+rotateHt+')');
////            console.log('indirect: '+rtn)
//            return rtn;
//        };
        var iconTransformRow = function(categType,icon){
            var selectDeg = plantObjectModel.dataIcons[categType].selectDeg;
            var refDeg = plantObjectModel.dataIcons[categType].refDeg;
            var icons = plantObjectModel.dataIcons[categType].icons;
            if (selectDeg<0){
                selectDeg = 0;
            };
            var select = selectDeg/12; 
            var centerLngth = Math.floor(icons.length/2); 
            if (select>icons.length-1){
                select = icons.length-1;
            };
            var indIcon = icons.indexOf(icon)-select;
            if (isNaN(indIcon)){indIcon = 0};
            var firstDeg = indIcon*refDeg;
            var rotateHt = 1100+(parent*140);
            if (isNaN(rotateHt)){rotateHt=1100};
            var rtn = ('rotate('+firstDeg+',250,'+rotateHt+')');
//            console.log('indirectRow: '+rtn)
            return rtn;
        };
        scope.iconTransform = function(categType,parent,ind){
            //console.log(this)
//            console.log('parent'+parent)
//            console.log('ind'+ind)
            scope.imgHt = plantObjectModel.dataIcons[categType].refDeg * 9;
            //element.attr('height',imgHt);
            var selectDeg = plantObjectModel.dataIcons[categType].selectDeg;
            var refDeg = plantObjectModel.dataIcons[categType].refDeg;
            //var categNum = parent; //scope.categPosition(categType,typeTitle);
            var icons = plantObjectModel.dataIcons[categType].icons;
            if (selectDeg<0){
                selectDeg = 0;
            };
            var select = selectDeg/12; 
            var centerLngth = Math.floor(icons.length/2); 
            if (select>icons.length-1){
                select = icons.length-1;
            };
            
            var indIcon = parseInt(ind-select); //icons.indexOf(icon)-select;
            if (isNaN(indIcon)){indIcon = 0};
            var firstDeg = indIcon*refDeg;
            var rotateHt = 1100+(parent*140);
            if (isNaN(rotateHt)){rotateHt=1100};
            var rtn = ('rotate('+firstDeg+',250,'+rotateHt+')');
//            console.log('indirect: '+rtn)
            return rtn;
        };
//        scope.rot8 = function($event,windowWd,categType){
//            if((rightSide/2)>$event.gesture.center.pageX){
//                scope.swipeRow(categType,'left')
//            }else{
//                scope.swipeRow(categType,'right')
//            };
//        };
        var tempDeg = .01;
        scope.moveRow = function(categType,$event){
            var refDeg = plantObjectModel.dataIcons[categType].refDeg
            if ($event.gesture.direction == 'left' || $event.gesture.direction == 'right' ){
                var maxDegrees = (plantObjectModel.dataIcons[categType].icons.length - 1) * 12;
                var selectionDeg = plantObjectModel.dataIcons[categType].selectDeg;
//                var tempDeg = .01;
                var icons = plantObjectModel.dataIcons[categType].icons;
                var deltaOff = refDeg*4;
                if (tempDeg < maxDegrees){
                    tempDeg -= $event.gesture.deltaX/deltaOff;
                    plantObjectModel.dataIcons[categType].selectDeg = tempDeg;
                }
            }else{
                
                var newRef = $event.gesture.deltaY/250;
                if ($event.gesture.direction == 'up'){
                    if ((refDeg + newRef) > 1){
                        plantObjectModel.dataIcons[categType].refDeg = (refDeg + newRef);
                    }else{
                        plantObjectModel.dataIcons[categType].refDeg = 1;
                    }
                }else{
                    if ((refDeg - newRef) > 12){
                        plantObjectModel.dataIcons[categType].refDeg = (refDeg - newRef);
                    }else{
                        plantObjectModel.dataIcons[categType].refDeg = 12;
                    };
                };
            };
        };
        scope.swipeRow = function(categType,direction,parent){
//            console.log('heard')
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
                iconTransformRow(categType,icons[i],parent);
            }
//            console.log('did')
        }

        //element.on('click',function(){alert('rowControls click')})
    }
  }
});