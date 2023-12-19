import { recipes } from '../../data/recipes.js'
import { createRecipeCards } from '../template/recipetemplate.js'

/** Filters recipes based on the input text in the recipe descriptions.
 *
 * @param {string} globalInputText - The input text for filtering recipes.
 * @returns {Array} - An array of recipes that match the filter criteria.
 */
export const globalFilterText = (globalInputText) => {
    const filteredRecipes = recipes.filter((recipe) => 
    recipe.description.toLowerCase().includes(globalInputText.toLowerCase()))
    createRecipeCards(filteredRecipes)  
    return filteredRecipes
}

/** Filters recipes based on the input text in the recipe appliance.
 *
 * @param {string} globalInputText - The input text for filtering recipes.
 * @param {Array} alreadyFilteredRecipes - The array of recipes already filtered by previous criteria.
 * @returns {Array} - An array of recipes that match the filter criteria.
 */
export const globalFilterAppliance = (globalInputText, alreadyFilteredRecipes) =>  {
    let filteredRecipes = [...alreadyFilteredRecipes] 
    filteredRecipes = [
    ...filteredRecipes,
    ...recipes.filter(recipe => recipe.appliance.toLowerCase().includes(globalInputText.toLowerCase()) &&
    !alreadyFilteredRecipes.includes(recipe))
    ]
    createRecipeCards(filteredRecipes)  
    return filteredRecipes
}

/** Filters recipes based on the input text in the recipe ustensils.
 *
 * @param {string} globalInputText - The input text for filtering recipes.
 * @param {Array} alreadyFilteredRecipes - The array of recipes already filtered by previous criteria.
 * @returns {Array} - An array of recipes that match the filter criteria.
 */
export const globalFilterUstensils = (globalInputText, alreadyFilteredRecipes) => {
    let filteredRecipes = [...alreadyFilteredRecipes] 
    filteredRecipes = [
    ...filteredRecipes,
    ...recipes.filter((recipe) => recipe.ustensils.some((ustensil) => ustensil.toLowerCase().includes(globalInputText.toLowerCase()))&&
    !alreadyFilteredRecipes.includes(recipe))
    ]
    createRecipeCards(filteredRecipes)  
    return filteredRecipes
}

/** Filters recipes based on the input text in the recipe ingredients.
 *
 * @param {string} globalInputText - The input text for filtering recipes.
 * @param {Array} alreadyFilteredRecipes - The array of recipes already filtered by previous criteria.
 * @returns {Array} - An array of recipes that match the filter criteria.
 */
export const globalFilterIngredients = (globalInputText, alreadyFilteredRecipes) => {
    let filteredRecipes = [...alreadyFilteredRecipes] 
    filteredRecipes = [
    ...filteredRecipes,
    ...filteredRecipes = recipes.filter((recipe) =>
    recipe.ingredients.some((ingredient) => ingredient.ingredient.toLowerCase().includes(globalInputText.toLowerCase())) &&
    !alreadyFilteredRecipes.includes(recipe))
    ]
    createRecipeCards(filteredRecipes)  
    return filteredRecipes
}

/** Applies all filters (text, appliance, ustensils, ingredients) to the recipes.
 *
 * @param {string} globalInputText - The input text for filtering recipes.
 * @returns {Array} - An array of recipes that match the combined filter criteria.
 */
export const globalFilterAll = (globalInputText) => {
    const textFilteredRecipes = globalFilterText(globalInputText)
    const applianceFilteredRecipes = globalFilterAppliance(globalInputText,textFilteredRecipes)
    const ustensilsFilteredRecipes = globalFilterUstensils(globalInputText,applianceFilteredRecipes)
    const ingredientsFilteredRecipes = globalFilterIngredients(globalInputText,ustensilsFilteredRecipes)
    
    const allFilteredRecipes = [...new Set(ingredientsFilteredRecipes)]
    return allFilteredRecipes
    }