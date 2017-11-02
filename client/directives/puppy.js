app.directive('puppy', function() {
	return {
		restrict: 'E',
		scope: {
			index: '=',
			puppy: '=',
			onAdopt: '&',
		},
		templateUrl: './directives/puppy.html',
		link: function(scope, $element) {
		},
	}
});
