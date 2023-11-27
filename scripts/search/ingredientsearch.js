import { cleanComponent } from "../api/recipesdata.js";

export const ingredientsFilter = (recipesGlobalFilteredOrNot, ingredientsSearchInput) => {
    const filteredRecipesbyIngredient = smallFilterIngredients(recipesGlobalFilteredOrNot, ingredientsSearchInput)
    const filteredIngredients = filteredRecipesbyIngredient
        .flatMap((recipe) => recipe.ingredients)
        .filter((ingredient) =>
        ingredient.ingredient.toLowerCase().includes(ingredientsSearchInput.toLowerCase()))
        .map((ingredient) => ingredient.ingredient)
    const uniqueIngredients = cleanComponent(filteredIngredients);

    return {
        filteredRecipesbyIngredient,
        uniqueIngredients,
    }
}

export const smallFilterIngredients = (recipesGlobalFilteredOrNot,ingredientsSearchInput) =>
    recipesGlobalFilteredOrNot.filter((recipe) =>
    recipe.ingredients.some((ingredient) => ingredient.ingredient.toLowerCase().includes(ingredientsSearchInput.toLowerCase()))
    )

export const appliancesFilter = (recipesGlobalFilteredOrNot, appliancesSearchInput) => {
    const filteredRecipesbyAppliance = smallFilterAppliances(recipesGlobalFilteredOrNot, appliancesSearchInput);
    const filteredAppliances = filteredRecipesbyAppliance
        .map((recipe) => recipe.appliance) // Utiliser map pour obtenir un tableau d'appareils
        .filter((appliance) =>
            appliance.toLowerCase().includes(appliancesSearchInput.toLowerCase())
        )
        .map((appliance) => appliance);

    const uniqueAppliances = cleanComponent(filteredAppliances);

    return {
        filteredRecipesbyAppliance,
        uniqueAppliances,
    };
}

export const smallFilterAppliances = (recipesGlobalFilteredOrNot, appliancesSearchInput) =>
    recipesGlobalFilteredOrNot.filter((recipe) =>
        recipe.appliance.toLowerCase().includes(appliancesSearchInput.toLowerCase())
    )

export const ustensilsFilter = (recipesGlobalFilteredOrNot, ustensilsSearchInput) => {
    const filteredRecipesbyUstensil = smallFilterUstensils(recipesGlobalFilteredOrNot, ustensilsSearchInput)
    const filteredUstensils = filteredRecipesbyUstensil
        .flatMap((recipe) => recipe.ustensils)
        .filter((ustensil) =>
        ustensil.toLowerCase().includes(ustensilsSearchInput.toLowerCase()))
        .map((ustensil) => ustensil)
    const uniqueUstensils = cleanComponent(filteredUstensils);

    return {
        filteredRecipesbyUstensil,
        uniqueUstensils,
    }
}

export const smallFilterUstensils = (recipesGlobalFilteredOrNot,ustensilsSearchInput) =>
    recipesGlobalFilteredOrNot.filter((recipe) =>
    recipe.ustensils.some((ustensil) => ustensil.toLowerCase().includes(ustensilsSearchInput.toLowerCase()))
    ) 
