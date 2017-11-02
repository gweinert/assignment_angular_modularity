app.controller('PuppyCtrl',
	['$scope', 'PuppyService', 'BreedService',
	function($scope, PuppyService, BreedService) {

		
		$scope.puppies = PuppyService.getAll();
		$scope.breeds = BreedService.getAll();
		$scope.formData = {
			name: '',
			breed: '',
		};
		$scope.sortOption = 'createdAt';
		console.log('scope', $scope);

		$scope.registerPuppy = function() {
			if ($scope.breeds.includes($scope.formData.breed)) {
				PuppyService.createPuppy($scope.formData);
				$scope.formData.name = '';
				$scope.formData.breed = '';
			} else {
				BreedService.createBreed($scope.formData.breed)
				.then(function(breed) {
					console.log('after create breed now here.');
					PuppyService.createPuppy($scope.formData);
					$scope.formData.name = '';
					$scope.formData.breed = undefined;
				});
			}
		
		}

		$scope.adoptPuppy = function(id) {
			PuppyService.removePuppy(id);
		}

		$scope.updateSortBy = function(option) {
			$scope.sortOption = option;
			console.log('sort', $scope);
		}

		$scope.onBreedSelect = function(breed) {
			console.log('breed select', breed);
			$scope.formData.breed = breed;
		}

		$scope.doThis = function() {
			console.log('DOOO THISS!');
		}

	}]
);
