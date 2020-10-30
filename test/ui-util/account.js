// Create an account with random name and password
exports.create = browser => {
	const id = ''+Math.random()
	const pass = id

	browser
		.url('http://localhost:3000')
		.waitForElementVisible('body')
		.assert.visible('#navbar-profile')
		.click('#navbar-profile')
		.assert.visible('#profile-prompt-navbar-create')
		.click('#profile-prompt-navbar-create')
		.assert.visible('#create-form-name')
		.setValue('#create-form-name', id)
		.assert.visible('#create-form-pass')
		.setValue('#create-form-pass', pass)
		.assert.visible('#create-form-btn')
		.click('#create-form-btn')
		.assert.visible('#navbar-my-recipes')
}

// Delete the logged in account
exports.deleteLoggedIn = browser => {
	browser
		.assert.visible('#navbar-profile')
		.click('#navbar-profile')
		.assert.visible('#profile-delete-btn')
		.click('#profile-delete-btn')
		.assert.visible('#profile-delete-confirm')
		.click('#profile-delete-confirm')
		.assert.not.visible('#navbar-my-recipes')
}
