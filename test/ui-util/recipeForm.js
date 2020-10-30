// Navigate to the new recipe form
exports.toNew = browser => {
	browser
		.assert.visible('#navbar-my-recipes')
		.click('#navbar-my-recipes')
		.assert.visible('#new-recipe')
		.click('#new-recipe')
		.assert.visible('#page-recipe-form')
}

exports.leave = browser => {
	browser
		.assert.visible('#recipe-form-back')
		.click('#recipe-form-back')
}
