import { recipes } from '../../data/recipes.js';

export const globalFilterText = (globalInputText) => {
    const filteredRecipes = [];
    for (const recipe of recipes) {
        if (recipe.description.toLowerCase().includes(globalInputText.toLowerCase())) {
            filteredRecipes.push(recipe);
        }
    }
    return filteredRecipes;
};

export const globalFilterAppliance = (globalInputText) => {
    const filteredRecipes = [];
    for (const recipe of recipes) {
        if (recipe.appliance.toLowerCase().includes(globalInputText.toLowerCase())) {
            filteredRecipes.push(recipe);
        }
    }
    return filteredRecipes;
};

export const globalFilterUstensils = (globalInputText) => {
    const filteredRecipes = [];
    for (const recipe of recipes) {
        if (recipe.ustensils.some((ustensil) => ustensil.toLowerCase().includes(globalInputText.toLowerCase()))) {
            filteredRecipes.push(recipe);
        }
    }
    return filteredRecipes;
};

export const globalFilterIngredients = (globalInputText) => {
    const filteredRecipes = [];
    for (const recipe of recipes) {
        if (recipe.ingredients.some((ingredient) => ingredient.ingredient.toLowerCase().includes(globalInputText.toLowerCase()))) {
            filteredRecipes.push(recipe);
        }
    }
    return filteredRecipes;
};

export const globalFilterAll = (globalInputText) => {
    const textFilteredRecipes = globalFilterText(globalInputText);
    const applianceFilteredRecipes = globalFilterAppliance(globalInputText);
    const ustensilsFilteredRecipes = globalFilterUstensils(globalInputText);
    const ingredientsFilteredRecipes = globalFilterIngredients(globalInputText);
    
    const allFilteredRecipes = [];
    for (const recipe of [...new Set([...textFilteredRecipes, ...applianceFilteredRecipes, ...ustensilsFilteredRecipes, ...ingredientsFilteredRecipes])]) {
        allFilteredRecipes.push(recipe);
    }

    return allFilteredRecipes;
};