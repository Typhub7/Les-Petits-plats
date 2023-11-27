import { cleanComponent } from "../api/recipesdata.js";

export const ingredientsFilter = (recipesGlobalFilteredOrNot, ingredientsSearchInput) => {
    const filteredIngredients = recipesGlobalFilteredOrNot
    .flatMap((recipe) => recipe.ingredients)
    .filter((ingredient) =>
      ingredient.ingredient.toLowerCase().includes(ingredientsSearchInput.toLowerCase())
    )
    .map((ingredient) => ingredient.ingredient)
    const uniqueIngredient = cleanComponent(filteredIngredients)

    console.log("filteredIngredients",filteredIngredients)
    return uniqueIngredient
      
}

export const appliancesFilter = (appliances,appliancesSearchInput) => 
    appliances.filter(appliance => 
    (appliance.toLowerCase().includes(appliancesSearchInput.toLowerCase()))
)

export const ustensilsFilter = (ustensils,ustensilsSearchInput) => 
    ustensils.filter(ustensil => 
    (ustensil.toLowerCase().includes(ustensilsSearchInput.toLowerCase()))
)