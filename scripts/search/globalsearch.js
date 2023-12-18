import { recipes } from '../../data/recipes.js'
import { createRecipeCards } from '../template/recipetemplate.js'

export const globalFilterText = (globalInputText) => {
    const filteredRecipes = []
    const recipesLength = recipes.length
    for (let i = 0; i < recipesLength; i++) {
        const recipe = recipes[i]

        if (recipe.description.toLowerCase().includes(globalInputText.toLowerCase()) && !filteredRecipes.includes(recipe)) {
            filteredRecipes.push(recipe)
            createRecipeCards(filteredRecipes)         
        }
    }
    return filteredRecipes
}

export const globalFilterAppliance = (globalInputText,alreadyFilteredRecipes) => {
    const filteredRecipes = alreadyFilteredRecipes
    const recipesLength = recipes.length
    for (let i = 0; i < recipesLength; i++) {
        const recipe = recipes[i]

        if (recipe.appliance.toLowerCase().includes(globalInputText.toLowerCase()) && !filteredRecipes.includes(recipe)) {
            filteredRecipes.push(recipe)
            createRecipeCards(filteredRecipes)     
        }
    }
    return filteredRecipes
}

export const globalFilterUstensils = (globalInputText,alreadyFilteredRecipes) => {
    const filteredRecipes = alreadyFilteredRecipes
    const recipesLength = recipes.length
    for (let i = 0; i < recipesLength; i++) {
        const recipe = recipes[i]

        if (recipe.ustensils.some((ustensil) => ustensil.toLowerCase().includes(globalInputText.toLowerCase())) && !filteredRecipes.includes(recipe)) {
            filteredRecipes.push(recipe)
            createRecipeCards(filteredRecipes)
        }
    }
    return filteredRecipes
}

export const globalFilterIngredients = (globalInputText, alreadyFilteredRecipes) => {
    const filteredRecipes = alreadyFilteredRecipes
    const recipesLength = recipes.length
    for (let i = 0; i < recipesLength; i++) {
        const recipe = recipes[i]

        if ( recipe.ingredients.some((ingredient) => ingredient.ingredient.toLowerCase().includes(globalInputText.toLowerCase())) && !filteredRecipes.includes(recipe)) {
            filteredRecipes.push(recipe)
            createRecipeCards(filteredRecipes)
        }
    }
    return filteredRecipes
}

export const globalFilterAll = (globalInputText) => {
    const textFilteredRecipes = globalFilterText(globalInputText)
    const applianceFilteredRecipes = globalFilterAppliance(globalInputText,textFilteredRecipes)
    const ustensilsFilteredRecipes = globalFilterUstensils(globalInputText,applianceFilteredRecipes)
    const ingredientsFilteredRecipes = globalFilterIngredients(globalInputText,ustensilsFilteredRecipes)

    const allFilteredRecipes = [...new Set(ingredientsFilteredRecipes)]
    return allFilteredRecipes
} 