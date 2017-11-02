const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(bodyParser.json()); // for parsing application/json

let puppies = [
	{
		id: 1,
		name: 'Puppy1',
		breed: 'Boxer',
		createdAt: new Date(),
	}
];

const breeds = [
	'Boxer',
	'Husky',
	'Labrador',
	'Wiener',
];

app.get('/', (req, res) => {
	console.log('req get /');
	res.json(puppies);
});

app.post('/', (req, res) => {
	console.log('req post', req.body);
	const newPuppy = {
		id: puppies[puppies.length - 1].id + 1,
		name: req.body.name,
		breed: req.body.breed,
		createdAt: new Date(),
	};
	
	puppies.push(newPuppy);
	console.log(puppies);

	res.json({ success: 1, newPuppy: newPuppy });

});

app.post('/delete', (req, res) => {
	const { id } = req.body;
	puppies = puppies.filter(puppy => puppy.id !== id);
	
	res.json({success: 1});
});

app.get('/breeds', (req, res) => {
	res.json(breeds);
});

app.post('/breeds', (req, res) => {
	const { breed } = req.body;

	if (breeds.indexOf(breed) === -1) {
		breeds.push(breed);
	}

	res.json({ success: 1});
})

app.listen(8000, () => {
	console.log('listening on 8000');
});

