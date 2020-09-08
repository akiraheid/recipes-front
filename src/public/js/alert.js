// Alert element display control and behavior
import $ from 'jquery'

// Hide the alert element.
const hide = () => {
	$('#alert').slideUp('slow')
}

// Initialize the alert element by allowing it to be displayed and then
// immediately slide up so that it doesn't render and allows `slideDown()`
// to work.
export const init = () => {
	$('#alert').removeClass('d-none')
	$('#alert').slideUp(0)
}

// Show the alert element.
export const show = (text) => {
	$('#alert').text(text)
	$('#alert').slideDown('slow', () => {
		setTimeout(() => {
			hide()
		}, 2000)
	})
}
