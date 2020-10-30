// Functions that wrap the web driver API that Nightwatch doesn't provide

// Element text equals
exports.elementTextEquals = (browser, element, expected) => {
	browser.element('css selector', element,
		function(res) {
			browser.assert.ok(res)
			const elem = res.value
			const id = elem[Object.keys(elem)[0]]
			browser.elementIdText(id, function(res) {
				browser.assert.strictEqual(res.value, expected)
			})
		})
}
