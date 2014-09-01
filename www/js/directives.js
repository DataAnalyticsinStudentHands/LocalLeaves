angular.module('localLeavesControllerModule').directive('imgLoad',function(){
var loaded = {};
var testagain = 'from Direct';
  return {
    link: function(scope, element, attrs) {
        element.on('dragstart',function(){event.preventDefault()});
//        element.on('dragend',function(){alert('dragged')});
//        element.on('click',function(){alert('dfa')});
//        console.log(element[0].children)
      element.on('error', function() {
        
        scope.$apply(function() {
            
            element.attr('xlink:href', 'img/blank.svg');
//          element[0].children().attr('xlink:href', 'img/blank.svg');
        });
      });
        
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
  });