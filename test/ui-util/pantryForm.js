/* eslint-env jquery */
const pantry = require('./pantry')

// Leave new pantry item form
exports.leave = browser => {
	browser
		.assert.visible('#pantry-back-btn')
		.click('#pantry-back-btn')
}

// Submit pantry item
exports.submit = (browser, itemStr, expire = '') => {
	browser
		.assert.visible('#pantry-form')
		.setValue('#pantry-form', itemStr)
		.assert.visible('#pantry-expire')
		.setValue('#pantry-expire', expire)
		.assert.visible('#pantry-submit-btn')
		.click('#pantry-submit-btn')
}

// Navigate to the new pantry item form
exports.toNew = browser => {
	pantry.go(browser)
	browser
		.assert.visible('#pantry-add-btn')
		.click('#pantry-add-btn')
		.assert.visible('#page-pantry-add')
}
