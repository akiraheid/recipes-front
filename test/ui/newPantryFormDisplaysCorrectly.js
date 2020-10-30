const account = require('../ui-util/account')
const pantryForm = require('../ui-util/pantryForm')

module.exports = {
	before: browser => {
		account.create(browser)
		pantryForm.toNew(browser)
	},
	'test': browser => {
		browser
			.assert.not.visible('#navbar')
			.assert.visible('#pantry-back-btn')
			.assert.visible('#pantry-form')
			.assert.value('#pantry-form', '')
			.assert.not.cssClassPresent('#pantry-form', '.is-invalid')
			.assert.not.visible('#pantry-form-help')

	},
	after: browser => {
		pantryForm.leave(browser)
		account.deleteLoggedIn(browser)
		browser.end()
	}
}
