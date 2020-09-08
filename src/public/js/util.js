import $ from 'jquery'

// Generate a string of random digits.
// @return A 16-digit string.
export const generateID = () => {
	return ('' + Math.random()).slice(2)
}

// Determine if the key is a modifier key (Alt/Control/Shift) or not.
// @param key The key to check.
// @return true if key is modifier key; false otherwise.
export const isModifierKey = (key) => {
	return ['Alt', 'Control', 'Shift'].includes(key)
}

// Remove the specified element from the DOM.
// @param id{String} The DOM id to remove.
export const removeElement = (id) => {
	$('#' + id).remove()
}

// Sanitize the given search string.
// @param str The string to sanitize.
// @return The sanitized string.
export const sanitizeSearchString = (str) => {
	str = str.trim()
	return str.replace(/\s+/gi, ' ')
}

// Send an AJAX request with the correct settings to enable the server to parse
// the body as JSON.
// @param method{String} The HTTP method to use.
// @param data{Anything} A JSON value (Object, Array, number, etc.).
// @param url{String} The URL to send to.
// @param onSuccess{function} The success callback.
// @param onErr{function} The error callback.
export const sendAjax = (method, data, url, onSuccess, onErr) => {
	$.ajax({
		contentType: 'application/json',
		data: data ? JSON.stringify(data) : undefined,
		dataType: 'json',
		error: onErr,
		method: method,
		success: onSuccess,
		url: url,
	})
}

// Set new button behavior by resetting click behavior and assigning a new one.
// @param id Element ID.
// @param func Function to call when the element is clicked.
export const setNewBtnClick = (id, func) => {
	$(id).off()
	$(id).click(func)
}

// Show invalid formatting and help text of a form input.
// @param id{String} HTML ID selector of the input field.
// @param msg{String} Message to display.
export const showFormInvalid = (id, msg) => {
	$(id).addClass('is-invalid')
	$(`${id}-help`).removeClass('d-none')

	if (msg) {
		$(`${id}-help`).text(msg)
	}
}
