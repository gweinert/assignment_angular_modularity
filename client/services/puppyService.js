app.factory('PuppyService', function($http) {
	var obj = {};
	
	var _puppies = [];

	var postPuppy = function(data) {
		$http.post('http://localhost:8000/', data)
		.then(function(res) {
			if (res.statusText === 'OK' && res.data.success) {
				return _puppies.push(res.data.newPuppy);
			}

			throw Error('API error');
		})
		.catch(function(e) {
			console.error('error', e);
		});
	}

	var deletePuppy = function(id) {
		var data = { id: id };
		
		$http.post('http://localhost:8000/delete', data)
		.then(function(res) {
			if (res.statusText === 'OK' && res.data.success) {
				var indexToDel = _puppies.findIndex(function(puppy) {
					return puppy.id === id;
				});
				_puppies.splice(indexToDel, 1);
			}
		})
		.catch(function(e) {
			console.error('error', e);
		});
	}

	obj.fetchAll = function() {
		$http.get('http://localhost:8000/')
			.then(function(res) {
				if (res.statusText !== 'OK') {
					throw Error('something happened');
				}
				
				var data = res.data;
				angular.copy(data, _puppies);

			})
			.catch(function(e) {
				console.log('error', e);
			});
	}

	obj.getAll = function() {
		if (!_puppies.length) {
			obj.fetchAll();
		}
		return _puppies;
	}

	obj.createPuppy = function(formData) {
		var newPuppy = {
			name: formData.name,
			breed: formData.breed,
		};

		postPuppy(newPuppy)
	}

	obj.removePuppy = function(id) {
		
		deletePuppy(id);
	}

	return obj;
});
