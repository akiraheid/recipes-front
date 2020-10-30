const express = require('express')
const router = express.Router()

const db = require('../db')

router.post('/login', (req, res) => {
	const username = req.body.username
	const password = req.body.password
	if (Object.prototype.hasOwnProperty(db.users, username) && db.users[username].password == password) {
		res.status(200).json(db.users[username])
	} else {
		res.status(400).json({})
	}
})

//// Authenticated
//router.post('/logout', localPassport.isAuthenticated, (req, res) => {
//	req.logout()
//	return res.sendStatus(200)
//})
//
//// Unauthenticated request to logout
//router.post('/logout', (req, res) => {
//	return res.sendStatus(400)
//})

module.exports = router
