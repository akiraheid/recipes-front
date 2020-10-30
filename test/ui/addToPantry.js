const account = require('../ui-util/account')
const pantryForm = require('../ui-util/pantryForm')
const util = require('../ui-util/util')

module.exports = {
	before: browser => {
		account.create(browser)
		pantryForm.toNew(browser)
	},
	'test': browser => {
		browser
			.assert.visible('#pantry-form')
			.setValue('#pantry-form', '1 cup test item')
			.assert.visible('#pantry-submit-btn')
			.click('#pantry-submit-btn')
			.waitForElementVisible('#pantry-save-status', 1000, function() {
				util.elementTextEquals(browser, '#pantry-save-status', 'Saved')
			})
			.waitForElementNotVisible('#pantry-save-status', 2000)

		pantryForm.leave(browser)

		// Verify pantry item was added
		browser.elements('css selector', '#pantry-item-list .pantry-item',
			function(res) {
				// Ensure only 1 pantry item
				browser.assert.ok(res)
				const numElems = res.value.length
				browser.assert.strictEqual(numElems, 1, '1 pantry item')

				// Check pantry item visible
				const elem = res.value[0]
				const id = elem[Object.keys(elem)[0]]
				browser.elementIdDisplayed(id, function(res2) {
					const visible = res2.value
					browser.assert.ok(visible, 'pantry item visible')
				})
			}
		)
	},
	after: browser => {
		account.deleteLoggedIn(browser)
		browser.end()
	}
}
