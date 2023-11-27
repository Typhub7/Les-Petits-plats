import { recipes } from '../../data/recipes.js'

export const globalFilterText = (globalInputText) => 
    recipes.filter(recipe => 
    (recipe.description.toLowerCase().includes(globalInputText.toLowerCase()))
    )

export const globalFilterAppliance = (globalInputText) => 
    recipes.filter(recipe => 
    (recipe.appliance.toLowerCase().includes(globalInputText.toLowerCase()))
    )

export const globalFilterUstensils = (globalInputText) =>
    recipes.filter((recipe) => 
    recipe.ustensils.some((ustensil) => ustensil.toLowerCase().includes(globalInputText.toLowerCase()))
    )

export const globalFilterIngredients = (globalInputText) =>
    recipes.filter((recipe) =>
    recipe.ingredients.some((ingredient) => ingredient.ingredient.toLowerCase().includes(globalInputText.toLowerCase()))
    );

export const globalFilterAll = (globalInputText) => {
    const textFilteredRecipes = globalFilterText(globalInputText)
    const applianceFilteredRecipes = globalFilterAppliance(globalInputText)
    const ustensilsFilteredRecipes = globalFilterUstensils(globalInputText)
    const ingredientsFilteredRecipes = globalFilterIngredients(globalInputText)
    
    const allFilteredRecipes = [...new Set(textFilteredRecipes.concat(applianceFilteredRecipes, ustensilsFilteredRecipes, ingredientsFilteredRecipes))]
    return allFilteredRecipes
    }