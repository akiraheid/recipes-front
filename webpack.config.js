const path = require('path')

module.exports = {
	//mode: 'production',
	mode: 'development',
	entry: './src/public/js/app.js',
	output: {
		filename: 'app.js',
		path: path.resolve(__dirname, 'dist')
	}
}
