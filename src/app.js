const path = require('path')

const errorHandler = require('errorhandler')
const express = require('express')
const pug = require('pug')

const app = express()

const { DATA_URL, PORT, NODE_ENV } = process.env

// Configure app
app.disable('x-powered-by')
app.set('host', '0.0.0.0')
app.set('port', PORT || 8080)
app.use(express.json())
app.use(express.urlencoded())

// Render front-end
const page = pug.renderFile('./src/views/app.pug',
	{
		'cssURL': '/dist',
		'dataURL': '/api',
		'jsURL': '/dist',
	})

// Define static resources
console.log(__dirname)
app.use('/dist',
	express.static(path.resolve(__dirname, '..', 'dist'), { maxAge: 31557600000 }))

// Regular pathing
app.use('/*', (req, res) => { res.send(page) })

// Deployment settings
if (NODE_ENV === 'development') {
	// Only use in development
	app.use(errorHandler())
} else {
	app.use((req, res) => {
		console.error('Server error', req)
		res.sendStatus(500)
	})
}

// Start app
app.listen(app.get('port'), () => {
	console.log(`App is running at http://localhost:${app.get('port')} in ${app.get('env')} mode`)
	console.log('Press CTRL-C to stop\n')
})
