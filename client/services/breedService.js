app.factory('BreedService', function($http) {
	var obj = {};

	var _breeds = [];

	var fetchBreeds = function() {
		$http.get('http://localhost:8000/breeds')
			.then(function(res) {
				if (res.statusText !== 'OK') {
					throw Error('API error');
				}

				var data = res.data;
				angular.copy(data, _breeds);
			})
			.catch(function(err) {
				console.error('Error', err);
			});
	}

	var postBreed = function(breed) {
		var data = { breed: breed }
		return new Promise(function(resolve, reject) {

			$http.post('http://localhost:8000/breeds', data)
				.then(function(res) {
					if (res.statusText !== 'OK') {
						throw Error('API error');
					}
					_breeds.push(breed);
					console.log('creating breed after post bread');					
					resolve(breed);
				})
				.catch(function(err) {
					console.error('Error', err);
				});
		});
	}

	obj.getAll = function() {
		if (!_breeds.length) {
			fetchBreeds();
		}

		return _breeds;
	}

	obj.createBreed = function(breed) {
		return postBreed(breed);
	}

	return obj;

});
