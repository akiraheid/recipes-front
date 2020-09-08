// Parse the text for an ingredient and return a JSON ingredient.
//
// For example, `1 cup olive oil` returns
// ```
// { "amount": 1, "name": "olive oil", "note": undefined, "prep": undefined,
// "unit": "cup" }
// ```
export const parseIngredient = (text) => {
	const re = /(\d+(?:.\d+)?)\s+(cup|floz|g|gal|kg|lb|liter|oz|pint|quart|tbsp|tsp)\s+([a-zA-Z0-9\s]+)(?:,\s*([a-zA-Z0-9\s]+))?(?:\s*(\([a-zA-Z0-9\s]+\)))?/
	const ret = {}
	const match = re.exec(text)

	if (match === null) {
		return ret
	}

	ret.amount = match[1]
	ret.unit = match[2]
	ret.name = match[3]
	ret.prep = match[4]
	ret.note = match[5]

	return ret
}
