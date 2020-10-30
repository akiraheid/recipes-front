const account = require('../ui-util/account')
const pantryForm = require('../ui-util/pantryForm')

module.exports = {
	before: browser => {
		account.create(browser)
		pantryForm.toNew(browser)
	},
	'test': browser => {
		pantryForm.submit(browser, 'this is invalid pantry input')

		browser
			.assert.cssClassPresent('#pantry-form', 'is-invalid')
			.assert.visible('#pantry-form-help')
	},
	after: browser => {
		pantryForm.leave(browser)
		account.deleteLoggedIn(browser)
		browser.end()
	}
}
