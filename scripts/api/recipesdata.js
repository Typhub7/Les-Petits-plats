import { recipes } from '../../data/recipes.js'

export const createArraysIngredient = () => {
    const ingredientsRetrieved = retrieveIngredient(recipes)       
    return cleanComponent(ingredientsRetrieved)
}

export const createArraysAppliances = () => {
    const appliancesRetrieved = retrieveAppliance(recipes)         
    return cleanComponent(appliancesRetrieved)
}

export const createArraysUstensils = ()  =>  {
    const ustensilsRetrieved = retrieveUstensil(recipes)      
    return cleanComponent(ustensilsRetrieved)
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

const cleanComponent = (components) => {
    const spaceRemoved = removeSpaces(components)
    const capitalised = caseGuard(spaceRemoved).sort()
    const cleanedComponents = removeDouble(capitalised)  
    return cleanedComponents  
}