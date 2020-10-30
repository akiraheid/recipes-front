const express = require('express')

const app = express()

const { PORT } = process.env

// Configure app
app.disable('x-powered-by')
app.set('host', '0.0.0.0')
app.set('port', PORT || 8080)
app.use(express.json())
app.use(express.urlencoded())

// Routes
app.use('/auth', require('./routes/auth'))
app.use('/pantry', require('./routes/pantry'))
app.use('/recipe', require('./routes/recipe'))
app.use('/user', require('./routes/user'))

// Start app
app.listen(app.get('port'), () => {
	const url = `http://localhost:${app.get('port')}`
	console.log(`App is running at ${url} in ${app.get('env')} mode`)
	console.log('Press CTRL-C to stop\n')
})
