import { recipes } from '../../data/recipes.js'

export const createArraysIngredient = () => {
    const ingredientsRetrieved = retrieveIngredient(recipes)
    const spaceRemoved = removeSpaces(ingredientsRetrieved)
    const ingredients = caseGuard(spaceRemoved).sort()            
    return ingredients;
}

export const createArraysAppliances = () => {
    const appliancesRetrieved = retrieveAppliance(recipes)
    const spaceRemoved = removeSpaces(appliancesRetrieved)
    const appliances = caseGuard(spaceRemoved).sort()            
    return appliances;
}

export const createArraysUstensils = ()  =>  {
    const ustensilsRetrieved = retrieveUstensil(recipes)
    const spaceRemoved = removeSpaces(ustensilsRetrieved)
    const ustensils = caseGuard(spaceRemoved).sort()            
    return ustensils;
}
// Fonction qui extrait les ingredients de chaque objet dans le tableau recettes section ingredients.
const retrieveIngredient = (recipes) => 
    new Set(recipes.flatMap(recipe => 
    recipe.ingredients.map(ingredient => ingredient.ingredient)
))    

// Fonction qui extrait les appareils du tableau de recettes
 const retrieveAppliance = (recipes) =>
    new Set(recipes.map(recipe => recipe.appliance)
        )

// Fonction qui extrait les ustensiles du tableau de recettes
const retrieveUstensil = (recipes)  => 
    new Set(recipes.flatMap(recipe => recipe.ustensils)
        )
       
// Fonction qui supprime les espaces blancs au début et à la fin de chaque ingrédient
const removeSpaces = (MyArray) => 
    Array.from(MyArray).map(ingredient => ingredient.trim().replace(/\s+/g, " "))

// Convertit chaque ingrédient en minuscules et capitalise la première lettre
const caseGuard = (ingredientsList) => 
    ingredientsList.map(ingredient => ingredient.charAt(0).toUpperCase() + ingredient.slice(1).toLowerCase())

