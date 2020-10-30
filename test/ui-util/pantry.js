// Check contents of pantry list
exports.checkPantryCount = (browser, count) => {
	// Verify pantry item was not added
	browser.elements('css selector', '#pantry-item-list .pantry-item',
		function(res) {
			// Ensure 0 pantry item
			browser.assert.ok(res)
			const numElems = res.value.length
			browser.assert.strictEqual(numElems, count, `${count} pantry item`)
		}
	)
}

// Navigate to the pantry page
exports.go = browser => {
	browser
		.assert.visible('#navbar-pantry')
		.click('#navbar-pantry')
		.assert.visible('#page-pantry')
}
