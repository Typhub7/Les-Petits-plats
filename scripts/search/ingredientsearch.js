import { cleanComponent } from "../api/recipesdata.js";

export const ingredientsFilterByDropdown = (recipesGlobalFilteredOrNot, ingredientsSearchInput) => {
    const filteredRecipesbyIngredient = dropdownFilterIngredients(recipesGlobalFilteredOrNot, ingredientsSearchInput)
    console.log("filteredRecipesbyIngredient",filteredRecipesbyIngredient)
    const filteredIngredients = filteredRecipesbyIngredient
        .flatMap((recipe) => recipe.ingredients)
        .filter((ingredient) =>
        ingredient.ingredient.toLowerCase().includes(ingredientsSearchInput.toLowerCase()))
        .map((ingredient) => ingredient.ingredient)
    const uniqueIngredients = cleanComponent(filteredIngredients);
    console.log("uniqueIngredients",uniqueIngredients)
    return uniqueIngredients
}

export const dropdownFilterIngredients = (recipesGlobalFilteredOrNot,ingredientsSearchInput) =>
    recipesGlobalFilteredOrNot.filter((recipe) =>
    recipe.ingredients.some((ingredient) => ingredient.ingredient.toLowerCase().includes(ingredientsSearchInput.toLowerCase()))
    )

export const appliancesFilterByDropdown = (recipesGlobalFilteredOrNot, appliancesSearchInput) => {
    const filteredRecipesbyAppliance = dropdownFilterAppliances(recipesGlobalFilteredOrNot, appliancesSearchInput);
    const filteredAppliances = filteredRecipesbyAppliance
        .map((recipe) => recipe.appliance)
        .filter((appliance) =>
            appliance.toLowerCase().includes(appliancesSearchInput.toLowerCase())
        )
        .map((appliance) => appliance);

    const uniqueAppliances = cleanComponent(filteredAppliances);

    return uniqueAppliances
}

export const dropdownFilterAppliances = (recipesGlobalFilteredOrNot, appliancesSearchInput) =>
    recipesGlobalFilteredOrNot.filter((recipe) =>
        recipe.appliance.toLowerCase().includes(appliancesSearchInput.toLowerCase())
    )

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

export const dropdownFilterUstensils = (recipesGlobalFilteredOrNot,ustensilsSearchInput) =>
    recipesGlobalFilteredOrNot.filter((recipe) =>
    recipe.ustensils.some((ustensil) => ustensil.toLowerCase().includes(ustensilsSearchInput.toLowerCase()))
    ) 
