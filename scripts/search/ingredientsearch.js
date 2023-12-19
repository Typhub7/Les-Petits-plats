import { cleanComponent } from "../api/recipesdata.js";

/** Filters and extracts unique ingredients from recipes based on a dropdown selection.
 *
 * @param {Array} recipesGlobalFilteredOrNot - The array of recipes to filter.
 * @param {string} ingredientsSearchInput - The input value for ingredient filtering.
 * @returns {Array} - An array of unique ingredients based on the search input.
 */
export const ingredientsFilterByDropdown = (recipesGlobalFilteredOrNot, ingredientsSearchInput) => {
    const filteredRecipesbyIngredient = dropdownFilterIngredients(recipesGlobalFilteredOrNot, ingredientsSearchInput)
    const filteredIngredients = filteredRecipesbyIngredient
        .flatMap((recipe) => recipe.ingredients)
        .filter((ingredient) =>
        ingredient.ingredient.toLowerCase().includes(ingredientsSearchInput.toLowerCase()))
        .map((ingredient) => ingredient.ingredient)
    const uniqueIngredients = cleanComponent(filteredIngredients);
    return uniqueIngredients
}

/** Filters recipes based on ingredient search input for a dropdown selection.
 *
 * @param {Array} recipesGlobalFilteredOrNot - The array of recipes to filter.
 * @param {string} ingredientsSearchInput - The input value for ingredient filtering.
 * @returns {Array} - An array of recipes containing ingredients matching the search input.
 */
export const dropdownFilterIngredients = (recipesGlobalFilteredOrNot,ingredientsSearchInput) =>
    recipesGlobalFilteredOrNot.filter((recipe) =>
    recipe.ingredients.some((ingredient) => ingredient.ingredient.toLowerCase().includes(ingredientsSearchInput.toLowerCase()))
    )

/** Filters and extracts unique appliances from recipes based on a dropdown selection.
 *
 * @param {Array} recipesGlobalFilteredOrNot - The array of recipes to filter.
 * @param {string} appliancesSearchInput - The input value for appliance filtering.
 * @returns {Array} - An array of unique appliances based on the search input.
 */
export const appliancesFilterByDropdown = (recipesGlobalFilteredOrNot, appliancesSearchInput) => {
    const filteredRecipesbyAppliance = dropdownFilterAppliances(recipesGlobalFilteredOrNot, appliancesSearchInput);
    const filteredAppliances = filteredRecipesbyAppliance
        .map((recipe) => recipe.appliance)
        .filter((appliance) =>
            appliance.toLowerCase().includes(appliancesSearchInput.toLowerCase())
        )
        .map((appliance) => appliance)

    const uniqueAppliances = cleanComponent(filteredAppliances);
    return uniqueAppliances
}

/** Filters recipes based on appliance search input for a dropdown selection.
 *
 * @param {Array} recipesGlobalFilteredOrNot - The array of recipes to filter.
 * @param {string} appliancesSearchInput - The input value for appliance filtering.
 * @returns {Array} - An array of recipes containing appliances matching the search input.
 */
export const dropdownFilterAppliances = (recipesGlobalFilteredOrNot, appliancesSearchInput) =>
    recipesGlobalFilteredOrNot.filter((recipe) =>
        recipe.appliance.toLowerCase().includes(appliancesSearchInput.toLowerCase())
    )

/** Filters and extracts unique utensils from recipes based on a dropdown selection.
 *
 * @param {Array} recipesGlobalFilteredOrNot - The array of recipes to filter.
 * @param {string} ustensilsSearchInput - The input value for utensil filtering.
 * @returns {Array} - An array of unique utensils based on the search input.
 */
export const ustensilsFilterByDropdown = (recipesGlobalFilteredOrNot, ustensilsSearchInput) => {
    const filteredRecipesbyUstensil = dropdownFilterUstensils(recipesGlobalFilteredOrNot, ustensilsSearchInput)
    const filteredUstensils = filteredRecipesbyUstensil
        .flatMap((recipe) => recipe.ustensils)
        .filter((ustensil) =>
        ustensil.toLowerCase().includes(ustensilsSearchInput.toLowerCase()))
        .map((ustensil) => ustensil)
    const uniqueUstensils = cleanComponent(filteredUstensils);
    return uniqueUstensils
}

/** Filters recipes based on ustensil search input for a dropdown selection.
 *
 * @param {Array} recipesGlobalFilteredOrNot - The array of recipes to filter.
 * @param {string} ustensilsSearchInput - The input value for ustensil filtering.
 * @returns {Array} - An array of recipes containing ustensils matching the search input.
 */
export const dropdownFilterUstensils = (recipesGlobalFilteredOrNot,ustensilsSearchInput) =>
    recipesGlobalFilteredOrNot.filter((recipe) =>
    recipe.ustensils.some((ustensil) => ustensil.toLowerCase().includes(ustensilsSearchInput.toLowerCase()))
    ) 
