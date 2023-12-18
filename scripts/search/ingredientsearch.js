import { cleanComponent } from "../api/recipesdata.js"

/** Filters and extracts unique ingredients from recipes based on a dropdown selection.
 *
 * @param {Array} recipesGlobalFilteredOrNot - The array of recipes to filter.
 * @param {string} ingredientsSearchInput - The input value for ingredient filtering.
 * @returns {Array} - An array of unique ingredients based on the search input.
 */
export const ingredientsFilterByDropdown = (recipesGlobalFilteredOrNot, ingredientsSearchInput) => {
    const filteredRecipesbyIngredient = dropdownFilterIngredients(recipesGlobalFilteredOrNot, ingredientsSearchInput)
    const filteredIngredients = []

    const filteredRecipesLength = filteredRecipesbyIngredient.length
    for (let i = 0; i < filteredRecipesLength; i++) {
        const recipe = filteredRecipesbyIngredient[i]
        const ingredientsLength = recipe.ingredients.length

        for (let j = 0; j < ingredientsLength; j++) {
            const ingredient = recipe.ingredients[j]
            const lowerCasedIngredient = ingredient.ingredient.toLowerCase()

            if (lowerCasedIngredient.includes(ingredientsSearchInput.toLowerCase())) {
                filteredIngredients.push(lowerCasedIngredient)
            }
        }
    }

    const uniqueIngredients = cleanComponent(filteredIngredients)
    return uniqueIngredients
}

/** Filters recipes based on ingredient search input for a dropdown selection.
 *
 * @param {Array} recipesGlobalFilteredOrNot - The array of recipes to filter.
 * @param {string} ingredientsSearchInput - The input value for ingredient filtering.
 * @returns {Array} - An array of recipes containing ingredients matching the search input.
 */
export const dropdownFilterIngredients = (recipesGlobalFilteredOrNot, ingredientsSearchInput) => {
    const filteredRecipes = []
    const recipesLength = recipesGlobalFilteredOrNot.length

    for (let i = 0; i < recipesLength; i++) {
        const recipe = recipesGlobalFilteredOrNot[i]
        const ingredientsLength = recipe.ingredients.length

        for (let j = 0; j < ingredientsLength; j++) {
            const ingredient = recipe.ingredients[j]
            const lowerCasedIngredient = ingredient.ingredient.toLowerCase()

            if (lowerCasedIngredient.includes(ingredientsSearchInput.toLowerCase())) {
                filteredRecipes.push(recipe)
                break
            }
        }
    }

    return filteredRecipes
}

/** Filters and extracts unique appliances from recipes based on a dropdown selection.
 *
 * @param {Array} recipesGlobalFilteredOrNot - The array of recipes to filter.
 * @param {string} appliancesSearchInput - The input value for appliance filtering.
 * @returns {Array} - An array of unique appliances based on the search input.
 */
export const appliancesFilterByDropdown = (recipesGlobalFilteredOrNot, appliancesSearchInput) => {
    const filteredRecipesbyAppliance = dropdownFilterAppliances(recipesGlobalFilteredOrNot, appliancesSearchInput);
    const filteredAppliances = []

    const filteredRecipesLength = filteredRecipesbyAppliance.length
    for (let i = 0; i < filteredRecipesLength; i++) {
        const recipe = filteredRecipesbyAppliance[i]
        const lowerCasedAppliance = recipe.appliance.toLowerCase()

        if (lowerCasedAppliance.includes(appliancesSearchInput.toLowerCase())) {
            filteredAppliances.push(recipe.appliance)
        }
    }

    const uniqueAppliances = cleanComponent(filteredAppliances)
    return uniqueAppliances
}

/** Filters recipes based on appliance search input for a dropdown selection.
 *
 * @param {Array} recipesGlobalFilteredOrNot - The array of recipes to filter.
 * @param {string} appliancesSearchInput - The input value for appliance filtering.
 * @returns {Array} - An array of recipes containing appliances matching the search input.
 */
export const dropdownFilterAppliances = (recipesGlobalFilteredOrNot, appliancesSearchInput) => {
    const filteredRecipes = []
    const recipesLength = recipesGlobalFilteredOrNot.length

    for (let i = 0; i < recipesLength; i++) {
        const recipe = recipesGlobalFilteredOrNot[i]
        const lowerCasedAppliance = recipe.appliance.toLowerCase()

        if (lowerCasedAppliance.includes(appliancesSearchInput.toLowerCase())) {
            filteredRecipes.push(recipe)
        }
    }

    return filteredRecipes
}

/** Filters and extracts unique utensils from recipes based on a dropdown selection.
 *
 * @param {Array} recipesGlobalFilteredOrNot - The array of recipes to filter.
 * @param {string} ustensilsSearchInput - The input value for utensil filtering.
 * @returns {Array} - An array of unique utensils based on the search input.
 */
export const ustensilsFilterByDropdown = (recipesGlobalFilteredOrNot, ustensilsSearchInput) => {
    const filteredRecipesbyUstensil = dropdownFilterUstensils(recipesGlobalFilteredOrNot, ustensilsSearchInput);
    const filteredUstensils = []

    const filteredRecipesLength = filteredRecipesbyUstensil.length
    for (let i = 0; i < filteredRecipesLength; i++) {
        const recipe = filteredRecipesbyUstensil[i]
        const ustensilsLength = recipe.ustensils.length

        for (let j = 0; j < ustensilsLength; j++) {
            const ustensil = recipe.ustensils[j]
            const lowerCasedUstensil = ustensil.toLowerCase()

            if (lowerCasedUstensil.includes(ustensilsSearchInput.toLowerCase())) {
                filteredUstensils.push(ustensil)
            }
        }
    }

    const uniqueUstensils = cleanComponent(filteredUstensils)
    return uniqueUstensils
}

/** Filters recipes based on ustensil search input for a dropdown selection.
 *
 * @param {Array} recipesGlobalFilteredOrNot - The array of recipes to filter.
 * @param {string} ustensilsSearchInput - The input value for ustensil filtering.
 * @returns {Array} - An array of recipes containing ustensils matching the search input.
 */
export const dropdownFilterUstensils = (recipesGlobalFilteredOrNot, ustensilsSearchInput) => {
    const filteredRecipes = []
    const recipesLength = recipesGlobalFilteredOrNot.length

    for (let i = 0; i < recipesLength; i++) {
        const recipe = recipesGlobalFilteredOrNot[i]
        const ustensilsLength = recipe.ustensils.length

        for (let j = 0; j < ustensilsLength; j++) {
            const ustensil = recipe.ustensils[j]
            const lowerCasedUstensil = ustensil.toLowerCase()

            if (lowerCasedUstensil.includes(ustensilsSearchInput.toLowerCase())) {
                filteredRecipes.push(recipe)
                break
            }
        }
    }

    return filteredRecipes
}