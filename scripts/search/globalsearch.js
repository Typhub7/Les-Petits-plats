import { recipes } from '../../data/recipes.js'

export const globalFilterText = (globalInputText) => {
    const filteredRecipes = []
    const recipeLength = recipes.length
    for (let i = 0; i < recipeLength; i++) {
        const recipe = recipes[i]
        if (recipe.description.toLowerCase().includes(globalInputText.toLowerCase())) {
            filteredRecipes.push(recipe)
        }
    }
    return filteredRecipes
};

export const globalFilterAppliance = (globalInputText) => {
    const filteredRecipes = []
    const recipeLength = recipes.length
    for (let i = 0; i < recipeLength; i++) {
        const recipe = recipes[i]
        if (recipe.appliance.toLowerCase().includes(globalInputText.toLowerCase())) {
            filteredRecipes.push(recipe)
        }
    }
    return filteredRecipes
};

export const globalFilterUstensils = (globalInputText) => {
    const filteredRecipes = []
    const recipeLength = recipes.length
    for (let i = 0; i < recipeLength; i++) {
        const recipe = recipes[i]
        if (recipe.ustensils.some((ustensil) => ustensil.toLowerCase().includes(globalInputText.toLowerCase()))) {
            filteredRecipes.push(recipe)
        }
    }
    return filteredRecipes
};

export const globalFilterIngredients = (globalInputText) => {
    const filteredRecipes = []
    const recipeLength = recipes.length
    for (let i = 0; i < recipeLength; i++) {
        const recipe = recipes[i]
        if (recipe.ingredients.some((ingredient) => ingredient.ingredient.toLowerCase().includes(globalInputText.toLowerCase()))) {
            filteredRecipes.push(recipe)
        }
    }
    return filteredRecipes
};

export const globalFilterAll = (globalInputText) => {
    const textFilteredRecipes = globalFilterText(globalInputText)
    const applianceFilteredRecipes = globalFilterAppliance(globalInputText)
    const ustensilsFilteredRecipes = globalFilterUstensils(globalInputText)
    const ingredientsFilteredRecipes = globalFilterIngredients(globalInputText)

    const allFilteredRecipes = [];
    const combinedRecipes = [...new Set([...textFilteredRecipes, ...applianceFilteredRecipes, ...ustensilsFilteredRecipes, ...ingredientsFilteredRecipes])]
    const combinedrecipeLength = combinedRecipes.length

    for (let i = 0; i < combinedrecipeLength; i++) {
        allFilteredRecipes.push(combinedRecipes[i])
    }

    return allFilteredRecipes;
}