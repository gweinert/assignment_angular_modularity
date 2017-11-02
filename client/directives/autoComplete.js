app.directive('autoComplete', function() {
	return {
		restrict: 'E',
		scope: {
			terms: '=',
			searchTerm: '=',
			onTermSelect: '&',
		},
		templateUrl: './directives/autoComplete.html',
		link: function($scope, $element) {
			$scope.hideList = true;
			
			$scope.onChange = function() {
				console.log('scope. on change', $scope.searchTerm);
				if ($scope.searchTerm === undefined || $scope.searchTerm === '') {
					$scope.hideList = true;
				} else {
					$scope.hideList = false;
				}
			}

			$scope.onListItemClick = function(term) {
				$scope.onTermSelect({ breed: term });
				console.log('onListItemClick...');
				$scope.hideList = true;
			}
		},
	}
})