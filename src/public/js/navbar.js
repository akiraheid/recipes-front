// Nav bar display and behavior
import $ from 'jquery'

// Hide the navbar from view.
export const hide = () => {
	$('#navbar').addClass('d-none')
}

// Display the navbar.
export const show = () => {
	$('#navbar').removeClass('d-none')
}
