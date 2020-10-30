module.exports = {
	users: {
		'testtest': {
			_id: '000000000000000000000000',
			name: 'testtest',
			password: 'testtest',
			dateAdded: Date.now(),
			recipes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Recipe' }],
			pantry: [ { } ]
		}
	}
}
