import { createArraysIngredient, createArraysAppliances, createArraysUstensils} from "../api/recipesdata.js"
import { createRecipeCards } from "../template/recipetemplate.js"
import { closeMenuButton } from "../components/components.js"
import { globalFilterAll } from '../search/globalsearch.js'
import { displayMenuElement, displayChosenElement, removeChosenElement, moveElementToTop, moveElementToOriginalPosition, updateMenuDisplay } from "../template/menutemplate.js"
import { recipes } from "../../data/recipes.js"
import { appliancesFilterByDropdown, dropdownFilterAppliances, dropdownFilterIngredients, dropdownFilterUstensils, ingredientsFilterByDropdown, ustensilsFilterByDropdown } from "../search/ingredientsearch.js"

let allFilteredRecipes = recipes
let filteredRecipesByUstensilInput = []
let filteredRecipesByApplianceInput = []
let filteredRecipesByIngredientInput = []
let activeFilters = {
  ingredients: [],
  appliances: [],
  ustensils: []
}

/** Listens for click events on the global dropdown listing button of filters.
 */
function listenToGlobalInput() {
  const inputElement = document.querySelector("#globalSearchInput")
  inputElement.addEventListener("input", recipeAndMenuDiplayGlobalSearch)
}

/** Handles global search for recipes and updates the component choose display.
 *
 * @param {Event} event - The input event from the global input.
 */
function recipeAndMenuDiplayGlobalSearch(event) {
  const inputValue = event.target.value
  if (inputValue.length >= 3) {
    allFilteredRecipes = globalFilterAll(inputValue)
    createRecipeCards(allFilteredRecipes)
    updateMenuDisplay(allFilteredRecipes)
    listenToComponents()
    if (!allFilteredRecipes.length) {
      displayErrorMessage("Aucune recette ne contient '" + inputValue + "'. Vous pouvez chercher par exemple 'tarte aux pommes', 'poisson', etc.")
    }
  }
}

/** Listens for click events on Menu Dropdown Button for Ingredients, appliances and ustensils
 *
 * @param {Event} event - The click event on the ingredient Menu.
 */
function listenToDropButton() {
  const buttons = document.querySelectorAll(".common-btn")
  buttons.forEach((dropButton) => {
    dropButton.addEventListener("click", function () {
      closeMenuButton(this)
    })
  })
}

/****** INGREDIENTS FUNCTION ******/

/** Listens for input events on the search Input of ingredient
 *
 * @param {Event} event - The input event in the ingredient search input.
 */
function listenToIngredientSearch() {
  const inputIngredient = document.querySelector("#ingredientsSearchInput")
  inputIngredient.addEventListener("input", (event) => {
    const inputValueIngredient = event.target.value;
    displayIngredientsFilteredByInput(inputValueIngredient, allFilteredRecipes)
  })
}

/** Listens for click on any ingredient from the list
 *
 * @param {Event} event - The input event on an ingredient.
 */
function listenToIngredientChoiceButtons() {
  const optionsButtons = document.querySelectorAll("#i-selection .option")
  optionsButtons.forEach((button) => {
    button.addEventListener("click", ingredientChosenDisplay)
  })
}

/** Handles the display of recipe, the moving of ingredient button 
* and the new button when an ingredient is chosen.
*
* @param {Event} event - The click event on an ingredient.
*/
function ingredientChosenDisplay(event) {
  const componentValue = event.currentTarget.getAttribute("data-value")
  const parentElement = event.currentTarget.parentNode
  const elementValue = parentElement.getAttribute('data-index')
  const ulElement = document.querySelector("#i-selection")
  const ingredientMenuButton = document.querySelector(".ingredient_drop")
  activeFilters.ingredients.push(componentValue)
  
  if (!parentElement.classList.contains('selected')) {
    displayChosenElement("choiced_filter", componentValue, ulElement.id, elementValue)
    moveElementToTop(elementValue, ulElement)
    const recipeToDisplay = displayRecipes()
    UpdateMenuByIngredient(recipeToDisplay,componentValue)
    closeMenuButton(ingredientMenuButton)
  } else {
    moveElementToOriginalPosition(elementValue, ulElement)
    activeFilters.ingredients = activeFilters.ingredients.filter((filter) => filter !== componentValue)
    const recipeToDisplay = displayRecipes()
    UpdateMenuByIngredient(recipeToDisplay,componentValue)
    removeChosenElement(componentValue)
  }
}

/** * Displays menu elements with ingredients filtered by the input value,
 * and sets up new event listeners for the new list of ingredient.
 *
 * @param {string} inputValueIngredient - The input value for ingredient filtering.
 * @param {Array} recipesData - The array of recipes data to filter ingredients from.
 */
function displayIngredientsFilteredByInput(inputValueIngredient, recipesData) {
  const uniqueIngredients = ingredientsFilterByDropdown(recipesData, inputValueIngredient)
  displayMenuElement("ingredient_select", "i-selection", null, uniqueIngredients)
  listenToIngredientChoiceButtons()
}

/** Displays menu elements for appliances and utensils based on recipes filtered by the chosen ingredient.
 * Listens to component events, updates the list of filtered recipes, and displays the filtered results.
 */
function displayRecipes() {
  const recipeToDisplay = applyAllFilters()
  filterAndDisplayResults(recipeToDisplay)
  return recipeToDisplay
}

function UpdateMenuByIngredient(recipeToDisplay,componentValue) {
  filteredRecipesByIngredientInput = dropdownFilterIngredients(recipeToDisplay,componentValue)
  displayMenuElement("appliances_select", "a-selection", createArraysAppliances(filteredRecipesByIngredientInput))
  displayMenuElement("ustensils_select", "u-selection", createArraysUstensils(filteredRecipesByIngredientInput))
  listenToComponents()
}

/****** APPLIANCE FUNCTION ******/

/** Listens for input events on the search Input of appliance
 *
 * @param {Event} event - The input event in the appliance search input.
 */
function listenToApplianceSearch() {
  const inputAppliance = document.querySelector("#appliancesSearchInput")
  inputAppliance.addEventListener("input", (event) => {
    const inputValueAppliance = event.target.value
    displayApliancesFilteredByInput(inputValueAppliance, allFilteredRecipes)
  })
}

/** Listens for click on any appliance from the list
 *
 * @param {Event} event - The input event on an appliance.
 */
function listenToApplianceChoiceButtons() {
  const optionsButtons = document.querySelectorAll("#a-selection .option")
  optionsButtons.forEach((button) => {
    button.addEventListener("click", applianceChosenDisplay)
  });
}

/** Handles the display of recipe, the moving of appliance button 
 * and the new button when an appliance is chosen.
 *
 * @param {Event} event - The click event on an appliance.
**/
function applianceChosenDisplay(event) {
  const componentValue = event.currentTarget.getAttribute("data-value")
  const parentElement = event.currentTarget.parentNode
  const elementValue = parentElement.getAttribute('data-index')
  const ulElement = document.querySelector("#a-selection")
  const applianceMenuButton = document.querySelector(".appliances_drop")
  activeFilters.appliances.push(componentValue)

  if (!parentElement.classList.contains('selected')) {
    displayChosenElement("choiced_filter", componentValue, ulElement.id, elementValue)
    moveElementToTop(elementValue, ulElement)
    const recipeToDisplay = displayRecipes()
    UpdateMenuByAppliance(recipeToDisplay,componentValue)
    closeMenuButton(applianceMenuButton)
  } else {
    moveElementToOriginalPosition(elementValue, ulElement)
    activeFilters.appliances = activeFilters.appliances.filter((filter) => filter !== componentValue)
    const recipeToDisplay = displayRecipes()
    UpdateMenuByAppliance(recipeToDisplay,componentValue)
    removeChosenElement(componentValue)
  }
}

/** * Displays menu elements with appliances filtered by the input value,
 * and sets up new event listeners for the new list of appliance.
 *
 * @param {string} inputValueIngredient - The input value for appliance filtering.
 * @param {Array} recipesData - The array of recipes data to filter appliances from.
 */
function displayApliancesFilteredByInput(inputValueAppliance, recipesData) {
  const uniqueAppliances  = appliancesFilterByDropdown(recipesData, inputValueAppliance)
  displayMenuElement("appliances_select", "a-selection", null, uniqueAppliances)
  listenToApplianceChoiceButtons()
}

/** Displays menu elements for ingredients and utensils based on recipes filtered by the chosen appliance.
 * Listens to component events, updates the list of filtered recipes, and displays the filtered results.
 */
function UpdateMenuByAppliance(recipeToDisplay,componentValue) {
  filteredRecipesByApplianceInput = dropdownFilterAppliances(recipeToDisplay,componentValue)
  displayMenuElement("ingredient_select","i-selection", createArraysIngredient(filteredRecipesByApplianceInput))
  displayMenuElement("ustensils_select","u-selection", createArraysUstensils(filteredRecipesByApplianceInput))
  listenToComponents()
}

/****** USTENSILS FUNCTION ******/

/** Listens for input events on the search Input of ustensil
 *
 * @param {Event} event - The input event in the ustensil search input.
 */
function listenToUstensilSearch() {
  const inputUstensil = document.querySelector("#ustensilsSearchInput")
  inputUstensil.addEventListener("input", (event) => {
    const inputValueUstensil = event.target.value
    displayUstensilsFilteredByInput(inputValueUstensil, allFilteredRecipes)
  })
}

/** Listens for click on any ustensil from the list
 *
 * @param {Event} event - The input event on an ustensil.
 */
function listenToUstensilChoiceButtons() {
  const optionsButtons = document.querySelectorAll("#u-selection .option")
  optionsButtons.forEach((button) => {
    button.addEventListener("click", ustensilChosenDisplay)
  })
}

/** Handles the display of recipe, the moving of ustensil button 
* and the new button when an ustensil is chosen.
*
* @param {Event} event - The click event on an ustensil.
*/
function ustensilChosenDisplay(event) {
  const componentValue = event.currentTarget.getAttribute("data-value")
  const parentElement = event.currentTarget.parentNode
  const elementValue = parentElement.getAttribute('data-index')
  const ulElement = document.querySelector("#u-selection")
  const ustensilMenuButton = document.querySelector(".ustensils_drop")
  activeFilters.ustensils.push(componentValue)
  
  if (!parentElement.classList.contains('selected')) {
    displayChosenElement("choiced_filter", componentValue, ulElement.id, elementValue)
    moveElementToTop(elementValue, ulElement)
    const recipeToDisplay = displayRecipes()
    UpdateMenuByUstensil(recipeToDisplay,componentValue)
    closeMenuButton(ustensilMenuButton)
  } else {
    moveElementToOriginalPosition(elementValue, ulElement)
    activeFilters.ustensils = activeFilters.ustensils.filter((filter) => filter !== componentValue)
    const recipeToDisplay = displayRecipes()
    UpdateMenuByUstensil(recipeToDisplay,componentValue)
    removeChosenElement(componentValue)
  }
}
/** * Displays menu elements with ustensils filtered by the input value,
 * and sets up new event listeners for the new list of ustensil.
 *
 * @param {string} inputValueIngredient - The input value for ustensil filtering.
 * @param {Array} recipesData - The array of recipes data to filter ustensils from.
 */
function displayUstensilsFilteredByInput(inputValueUstensil, recipesData) {
  const uniqueUstensils = ustensilsFilterByDropdown(recipesData, inputValueUstensil)
  displayMenuElement("ustensils_select", "u-selection", null, uniqueUstensils);
  listenToUstensilChoiceButtons()
}

/** Displays menu elements for appliances and utensils based on recipes filtered by the chosen ingredient.
 * Listens to component events, updates the list of filtered recipes, and displays the filtered results.
 */
function UpdateMenuByUstensil(recipeToDisplay,componentValue) {
  filteredRecipesByUstensilInput = dropdownFilterAppliances(recipeToDisplay,componentValue)
  displayMenuElement("ingredient_select","i-selection", createArraysIngredient(filteredRecipesByUstensilInput))
  displayMenuElement("appliances_select","a-selection", createArraysAppliances(filteredRecipesByUstensilInput))
  listenToComponents()
}

/** Sets up event listeners for ingredients, appliances, and utensils buttons.
 * 
 */
export function listenToComponents() {
  listenToIngredientChoiceButtons()
  listenToApplianceChoiceButtons()
  listenToUstensilChoiceButtons()
}

/** Adds an event listener to button from choiced filter container to remove the button when clicked.
 * Moves the removed element back to its original position, reverts recipes, and updates the menu.
 */
function removeComponent() {
  const divLocalisation = document.querySelector(".choiced_filter")
  divLocalisation.addEventListener("click", (event) => {
    const chosenElement = event.target.closest(".chosen_element")
    const componentValue = chosenElement.getAttribute("data-value")
    console.log("componentValue",componentValue)
    if (chosenElement) {
      const originalUlId = chosenElement.getAttribute('original-ul')
      const originalUlValue = document.getElementById(originalUlId)
      const dataIndexValue = chosenElement.getAttribute('data-index')
      moveElementToOriginalPosition (dataIndexValue,originalUlValue)
      activeFilters.ingredients = activeFilters.ingredients.filter((filter) => filter !== componentValue)
      const recipeToDisplay = displayRecipes()
      UpdateMenuByIngredient(recipeToDisplay,componentValue)
      removeChosenElement(chosenElement)
    }
  })
}

function applyAllFilters() {
  let filteredRecipes = allFilteredRecipes

  if (activeFilters.ingredients.length > 0) {
    activeFilters.ingredients.forEach((ingredient) => {
      filteredRecipes = dropdownFilterIngredients(filteredRecipes, ingredient);
    })
  }

  if (activeFilters.appliances.length > 0) {
    activeFilters.appliances.forEach((appliance) => {
      filteredRecipes = dropdownFilterAppliances(filteredRecipes, appliance);
    })
  }

  if (activeFilters.ustensils.length > 0) {
    activeFilters.ustensils.forEach((ustensil) => {
      filteredRecipes = dropdownFilterUstensils(filteredRecipes, ustensil);
    })
  }

  return filteredRecipes;
}

/** Filters recipes and updates the display by creating recipe cards for the provided recipe array.
 *
 * @param {Array} recipeToDisplay - The array of recipes to filter and display.
 */
function filterAndDisplayResults(recipeToDisplay) {
 createRecipeCards(recipeToDisplay)
 console.log("recipeToDisplay dans filteranddisplayresults",recipeToDisplay)
}

/** Displays an error message on the recipe gallery when no recipe found with global filter.
 *
 * @param {string} message - The error message to be displayed.
 */
function displayErrorMessage(message) {
  const errorMessageElement = document.createElement("div")
  errorMessageElement.classList.add("color-black", "font-bold","font-['Anton']","text-5xl", "leading-[3.5rem]", "h-[250px]");
  errorMessageElement.textContent = message
  document.querySelector(".recipe_gallery").appendChild(errorMessageElement)
}

// Init
displayMenuElement("ingredient_select","i-selection", createArraysIngredient(recipes))
displayMenuElement("appliances_select","a-selection", createArraysAppliances(recipes))
displayMenuElement("ustensils_select","u-selection", createArraysUstensils(recipes))
createRecipeCards(recipes)
// listeneer Launch
listenToGlobalInput()
listenToDropButton() 
listenToComponents()
removeComponent() 
listenToIngredientSearch()
listenToApplianceSearch()
listenToUstensilSearch()