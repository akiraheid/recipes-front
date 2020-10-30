const account = require('../ui-util/account')
const pantryForm = require('../ui-util/pantryForm')

module.exports = {
	before: browser => {
		account.create(browser)
		pantryForm.toNew(browser)
	},
	'test': browser => {
		browser
			.assert.visible('#pantry-form')
			.setValue('#pantry-form', '1 cup test item')
			.assert.visible('#pantry-reset-btn')
			.click('#pantry-reset-btn')
			.assert.value('#pantry-form', '')
	},
	after: browser => {
		pantryForm.leave(browser)
		account.deleteLoggedIn(browser)
		browser.end()
	}
}
