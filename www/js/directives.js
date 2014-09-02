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
        scope.categPosition = function(categType){
                var categs = plantObjectModel.dataIcons;
                return categs.indexOf(categType);
            };
        scope.imgHt = 10;
        scope.iconTransform = function(categType,icon){
            scope.imgHt = plantObjectModel.dataIcons[categType].refDeg * 8;
            //element.attr('height',imgHt);
            var selectDeg = plantObjectModel.dataIcons[categType].selectDeg;
            var refDeg = plantObjectModel.dataIcons[categType].refDeg;
            var categNum = scope.categPosition(categType);
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
            var firstDeg = indIcon*refDeg;
            var rotateHt = 1100+(categNum*140);
            var rtn = ('rotate('+firstDeg+',250,'+rotateHt+')');
            return rtn;
        };
        
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
.directive('rowControls',function(plantObjectModel){
var loaded = {};
  return {
    link: function(scope, element, attrs) {
    }
  }
});