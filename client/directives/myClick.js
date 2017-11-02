app.directive('myClick', function() {
	return {
		restrict: 'A',
		scope: true,
		link: function($scope, $element, $attributes, t) {
			$element.on('click', function() {
				eval('$scope.' + $attributes.myClick);
			});
			
		},
	};
});
