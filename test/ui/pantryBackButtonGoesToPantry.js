const account = require('../ui-util/account')
const pantryForm = require('../ui-util/pantryForm')

module.exports = {
	before: browser => {
		account.create(browser)
		pantryForm.toNew(browser)
	},
	'go back': browser => {
		pantryForm.leave(browser)

		browser
			.assert.visible('#navbar')
			.assert.not.visible('#page-pantry-add')
			.assert.visible('#page-pantry')
	},
	after: browser => {
		account.deleteLoggedIn(browser)
		browser.end()
	}
}
