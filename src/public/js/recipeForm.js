/* eslint-env browser, jquery */
import $ from 'jquery/dist/jquery.min.js'
import * as util from './util.js'

// Provide a function for getting the servings to "default" the returned value
// to 1 instead of 0.
function getServings() {
	const val = Number($('#recipe-form-servings').val())
	return val === 0 ? 1 : val
}

// Add an ingredient form element to the recipe form.
export const addIngredient = (ingredient) => {
	const id = ingredient ? ingredient._id : util.generateID()
	const $elem = $('#template-ingredient-form').clone()
	$elem.removeClass('d-none')

	$elem.attr('id', id)
	$elem.find('button').click(() => util.removeElement(id))

	$elem.on('input', onIngredientChange)

	if (ingredient) {
		const prep = ingredient.prep ? `, ${ingredient.prep}` : ''
		const note = ingredient.note ? ` (${ingredient.note})` : ''

		const str = `${ingredient.amount} ${ingredient.unit} ${ingredient.name}${prep}${note}`
		$elem.find('input').val(str)
	}

	// Set ID on fields
	$elem.find('.ingredient-help').attr('id', `${id}-ingredient-help`)

	$('#recipe-form-ingredients').append($elem)
}

// Get the recipe from the recipe form.
// @return{Object} Recipe.
export const getRecipe = () => {
	const recipe = {}
	recipe._id = $('#recipe-form-name').attr('recipe-id')
	recipe.name = $('#recipe-form-name').val()
	recipe.servings = getServings()
	recipe.ingredients = []

	$('#recipe-form-ingredients').find('.ingredient').each((_, elem) => {
		const $elem = $(elem)
		const val = $elem.find('input').val()

		// Skip if no ingredient entered
		if (val === '') { return }

		const ingredient = parseIngredient(val)

		recipe.ingredients.push(ingredient)
	})

	// Sanitize directions by removing extraneous lines/spaces
	let directions = $('#recipe-form-directions').val()
	directions = directions.replace(/  +/, ' ')
	directions = directions.split('\n')
	directions = directions.filter(line => line !== '')

	recipe.directions = directions

	return recipe
}

// Validate the recipe form and highlight elements that fail validation.
// @return true if valid; false otherwise.
export const isValid = () => {
	let valid = true

	const recipe = getRecipe()

	// Check recipe name
	let id = '#recipe-form-name'
	if (!recipe.name || recipe.name === '') {
		util.showFormInvalid(id, 'Cannot be empty')
		valid = false
	} else if (recipe.name.length < 3) {
		util.showFormInvalid(id, 'Must be at least 3 characters')
		valid = false
	}

	// No servings check

	// Check > 0 ingredient
	id = '#recipe-form-ingredients'
	if (!recipe.ingredients || recipe.ingredients.length === 0) {
		util.showFormInvalid(id, 'Need at least one ingredient')
		valid = false
	}

	// Check ingredients
	recipe.ingredients.forEach(ingredient => {
		id = ingredient._id
		// Check name given (basic check for successful parseIngredient())
		if (!Object.prototype.hasOwnProperty.call(ingredient, 'name')) {
			util.showFormInvalid(id)
			valid = false
		}
	})

	if (!recipe.directions || recipe.directions === '') {
		util.showFormInvalid('#recipe-form-directions')
		valid = false
	}

	return valid
}

// Return an array of HTMLDivElementPrototypes for each ingredient that is
// empty.
const emptyIngredients = () => {
	const elems = $('#recipe-form-ingredients .ingredient')
	const ret = []

	// Have to use for-loop because elems is a map
	for (let i = 0; i < elems.length; ++i) {
		const ingredientVal = $(elems[i]).find('input').val()
		if (ingredientVal === '') { ret.push(elems[i]) }
	}
	return ret
}

// Handler for when input changes in an ingredient input.
const onIngredientChange = (event) => {
	const elem = event.target
	const val = elem.value
	const emptyIngredientElems = emptyIngredients()

	// Add an ingredient if there are no empty ingredients
	// Delete the first empty ingredient if it's not the only empty one
	if (val !== '' && emptyIngredientElems.length === 0) {
		addIngredient()
	} else if (val === '' && emptyIngredientElems.length > 1) {
		util.removeElement(emptyIngredientElems[0].id)
	}
}

// Parse the text for an ingredient and return a JSON ingredient.
//
// For example, `1 cup olive oil` returns
// ```
// { "amount": 1, "name": "olive oil", "note": undefined, "prep": undefined,
// "unit": "cup" }
// ```
const parseIngredient = (text) => {
	const re = /(\d+(?:.\d+)?)\s+(cup|floz|g|gal|kg|lb|liter|oz|pint|quart|tbsp|tsp)\s+([a-zA-Z0-9\s]+)(?:,\s*([a-zA-Z0-9\s]+))?(?:\s*\(([a-zA-Z0-9\s]+)\))?/
	const ret = {}
	const match = re.exec(text)

	if (match === null) {
		return ret
	}

	ret.amount = Number(match[1])
	ret.unit = match[2]
	ret.name = match[3]
	ret.prep = match[4]
	ret.note = match[5]

	return ret
}
