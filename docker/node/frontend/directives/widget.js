/**
 * Widget Directive
 */

angular
    .module('dashboardApp')
    .directive("front", function() {
    	return {
    		restrict: "E",
    		template: "<div class='front tile' ng-transclude></div>",
    		transclude: true
    	};
    });
