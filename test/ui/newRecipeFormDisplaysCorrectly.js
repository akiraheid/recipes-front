const account = require('../ui-util/account')
const recipeForm = require('../ui-util/recipeForm')

module.exports = {
	before: browser => {
		account.create(browser)
		recipeForm.toNew(browser)
	},
	'initial form correctly displayed': async function(browser) {
		browser
			// Check page layout
			.assert.not.visible('#navbar')
			.assert.visible('#recipe-form-back')
			.assert.visible('#recipe-form-name')
			.assert.value('#recipe-form-name', '')
			.assert.visible('#recipe-form-servings')
			.assert.value('#recipe-form-servings', '')
			.assert.visible('#recipe-form-directions')
			.assert.value('#recipe-form-directions', '')

		// Check ingredient elements
		browser.elements('css selector', '#recipe-form-ingredients .ingredient',
			function(res) {
				// Ensure only 1 ingredient input
				browser.assert.ok(res)
				const numElems = res.value.length
				browser.assert.strictEqual(numElems, 1, '1 ingredient input')

				// Check ingredient input visible
				const elem = res.value[0]
				const id = elem[Object.keys(elem)[0]]
				browser.elementIdDisplayed(id, function(res2) {
					const visible = res2.value
					browser.assert.ok(visible, 'Ingredient input visible')
				})

				// Check ingredient input empty
				browser.elementIdValue(id, function(res2) {
					const inputVal = res2.value
					browser.assert.strictEqual(inputVal, null, 'Ingredient input empty')
				})
			}
		)
	},
	after: browser => {
		recipeForm.leave(browser)
		account.deleteLoggedIn(browser)
		browser.end()
	}
}
