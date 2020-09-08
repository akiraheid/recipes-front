const path = require('path')

module.exports = {
	mode: 'production',
	entry: './src/public/js/app.js',
	output: {
		filename: 'app.js',
		path: path.resolve(__dirname, 'dist')
	}
}
