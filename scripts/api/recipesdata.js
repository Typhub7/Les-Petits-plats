import { recipes } from '../../data/recipes.js'

export const createArraysIngredient = () => {
    const ingredientsRetrieved = retrieveIngredient(recipes)
    const spaceRemoved = removeSpaces(ingredientsRetrieved)
    const Capitalised = caseGuard(spaceRemoved).sort()
    const ingredients = removeDouble(Capitalised)           
    return ingredients;
}

export const createArraysAppliances = () => {
    const appliancesRetrieved = retrieveAppliance(recipes)
    const spaceRemoved = removeSpaces(appliancesRetrieved)
    const Capitalised = caseGuard(spaceRemoved).sort()
    const appliances = removeDouble(Capitalised)            
    return appliances;
}

export const createArraysUstensils = ()  =>  {
    const ustensilsRetrieved = retrieveUstensil(recipes)
    const spaceRemoved = removeSpaces(ustensilsRetrieved)
    const Capitalised = caseGuard(spaceRemoved).sort()
    const ustensils = removeDouble(Capitalised)            
    return ustensils;
}
// Fonction qui extrait les ingredients de chaque objet dans le tableau recettes section ingredients.
const retrieveIngredient = (recipes) => 
    recipes.flatMap(recipe => 
    recipe.ingredients.map(ingredient => ingredient.ingredient)
)    

// Fonction qui extrait les appareils du tableau de recettes
 const retrieveAppliance = (recipes) =>
    recipes.map(recipe => recipe.appliance)

// Fonction qui extrait les ustensiles du tableau de recettes
const retrieveUstensil = (recipes)  => 
    recipes.flatMap(recipe => recipe.ustensils)
       
// Fonction qui supprime les espaces blancs au début et à la fin de chaque ingrédient
const removeSpaces = (components) => 
    components.map(component => component.trim().replace(/\s+/g, " "))

// Convertit chaque ingrédient en minuscules et capitalise la première lettre
const caseGuard = (components) => 
    components.map(component => component.charAt(0).toUpperCase() + component.slice(1).toLowerCase())

const removeDouble = (components) =>
    Array.from(new Set(components))
