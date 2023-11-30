/** Creates an array of unique ingredients from the provided recipes.
 *
 * @param {Array} recipes - The array of recipes to extract ingredients from.
 * @returns {Array} - An array of unique ingredients.
 */
export const createArraysIngredient = (recipes) => {
    const ingredientsRetrieved = retrieveIngredient(recipes)       
    return cleanComponent(ingredientsRetrieved)
}

/** Creates an array of unique appliances from the provided recipes.
 *
 * @param {Array} recipes - The array of recipes to extract appliances from.
 * @returns {Array} - An array of unique appliances.
 */
export const createArraysAppliances = (recipes) => {
    const appliancesRetrieved = retrieveAppliance(recipes)         
    return cleanComponent(appliancesRetrieved)
}

/** Creates an array of unique ustensils from the provided recipes.
 *
 * @param {Array} recipes - The array of recipes to extract ustensils from.
 * @returns {Array} - An array of unique ustensils.
 */
export const createArraysUstensils = (recipes)  =>  {
    const ustensilsRetrieved = retrieveUstensil(recipes)      
    return cleanComponent(ustensilsRetrieved)
}

/** Build an array of ingredients list from the provided recipes.
 *
 * @param {Array} recipes - The array of recipes to extract ingredients from.
 * @returns {Array} - An array of ingredients extracted from the recipes.
 */
const retrieveIngredient = (recipes) => 
    recipes.flatMap(recipe => 
    recipe.ingredients.map(ingredient => ingredient.ingredient)
)    

/** Build an array of appliances list from the provided recipes.
 *
 * @param {Array} recipes - The array of recipes to extract appliances from.
 * @returns {Array} - An array of appliances extracted from the recipes.
 */
 const retrieveAppliance = (recipes) =>
    recipes.map(recipe => recipe.appliance)

/** Build an array of ustensils list from the provided recipes.
 *
 * @param {Array} recipes - The array of recipes to extract ustensils from.
 * @returns {Array} - An array of ustensils extracted from the recipes.
 */
const retrieveUstensil = (recipes)  => 
    recipes.flatMap(recipe => recipe.ustensils)
      
/** Removes leading and trailing spaces from each component in the provided array.
 *
 * @param {Array} components - The array of components to process.
 * @returns {Array} - An array of components with leading and trailing spaces removed.
 */
const removeSpaces = (components) => 
    components.map(component => component.trim().replace(/\s+/g, " "))

/** Applies a case guard to each component in the provided array, capitalizing the first letter
 * and converting the rest to lowercase.
 *
 * @param {Array} components - The array of components to process.
 * @returns {Array} - An array of components with a case guard applied.
 */
const caseGuard = (components) => 
    components.map(component => component.charAt(0).toUpperCase() + component.slice(1).toLowerCase())

/** Removes duplicate components from the provided array.
 *
 * @param {Array} components - The array of components to process.
 * @returns {Array} - An array with duplicate components removed.
 */
const removeDouble = (components) =>
    Array.from(new Set(components))

/** Cleans and standardizes components by removing spaces, applying case guard,
 * sorting, and removing duplicates from the provided array.
 *
 * @param {Array} components - The array of components to clean.
 * @returns {Array} - An array of cleaned and standardized components.
 */
export const cleanComponent = (components) => {
    const spaceRemoved = removeSpaces(components)
    const capitalised = caseGuard(spaceRemoved).sort()
    const cleanedComponents = removeDouble(capitalised)  
    return cleanedComponents  
}