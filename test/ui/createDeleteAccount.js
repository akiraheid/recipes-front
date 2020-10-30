const account = require('../ui-util/account')

module.exports = {
	'create account' : account.create,
	'delete account': account.deleteLoggedIn,
	after: browser => browser.end()
}
