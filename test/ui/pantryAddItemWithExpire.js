const account = require('../ui-util/account')
const pantryForm = require('../ui-util/pantryForm')

module.exports = {
	before: browser => {
		account.create(browser)
		pantryForm.toNew(browser)
	},
	'test': browser => {
		pantryForm.submit(browser, '1 cup test item', '3030-03-03')
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
	'async test': async browser => {
		const res = await browser.isVisible({
			selector: '#pantry-item-list .pantry-expire',
			index: 0,
			timeout: 1000,
		})
		console.log('res is', res)
		browser.assert.strictEqual(true, res.value)
	},
	after: browser => {
		account.deleteLoggedIn(browser)
		browser.end()
	}
}

