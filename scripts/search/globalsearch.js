import { recipes } from '../../data/recipes.js'
import { createRecipeCards } from '../template/recipetemplate.js'


/** Applies all filters (text, appliance, ustensils, ingredients) to the recipes and update display for each new recipe
 *
 * @param {string} globalInputText - The input text for filtering recipes.
 * @returns {Array} - An array of recipes that match the combined filter criteria.
 */
export const globalFilterAll = (globalInputText) => {
    const filteredRecipes = []
    const recipesLength = recipes.length

    for (let i = 0; i < recipesLength; i++) {
        const recipe = recipes[i]

        const textFilter = recipe.description.toLowerCase().includes(globalInputText.toLowerCase())
        const applianceFilter = recipe.appliance.toLowerCase().includes(globalInputText.toLowerCase())
        const ustensilsFilter = recipe.ustensils.some((ustensil) => ustensil.toLowerCase().includes(globalInputText.toLowerCase()))
        const ingredientsFilter = recipe.ingredients.some((ingredient) => ingredient.ingredient.toLowerCase().includes(globalInputText.toLowerCase()))

        if ((textFilter || applianceFilter || ustensilsFilter || ingredientsFilter) && !filteredRecipes.includes(recipe)) {
            filteredRecipes.push(recipe)
            createRecipeCards([...filteredRecipes])
        }
    }

    return filteredRecipes
}