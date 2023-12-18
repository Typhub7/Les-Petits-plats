import { createArraysIngredient, createArraysAppliances, createArraysUstensils} from "../api/recipesdata.js"
import { createRecipeCards } from "../template/recipetemplate.js"
import { closeMenuButton } from "../components/components.js"
import { globalFilterAll } from '../search/globalsearch.js'
import { displayMenuElement, displayChosenElement, removeChosenElement, moveElementToOriginalPosition, updateMenuDisplay, moveSelectedComponentToTop, getElementType } from "../template/menutemplate.js"
import { recipes } from "../../data/recipes.js"
import { appliancesFilterByDropdown, dropdownFilterAppliances, dropdownFilterIngredients, dropdownFilterUstensils, ingredientsFilterByDropdown, ustensilsFilterByDropdown } from "../search/ingredientsearch.js"

let allFilteredRecipes = recipes
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
  inputElement.addEventListener("keydown", enterKey)
}

/** Handles global search for recipes and updates the component choose display.
 * @param {Event} event - The input event from the global input.
 */
function recipeAndMenuDiplayGlobalSearch(event) {
  const inputValue = event.target.value
  if (inputValue.length >= 3) {
    allFilteredRecipes = globalFilterAll(inputValue)
    /*createRecipeCards(allFilteredRecipes)*/
    updateMenuDisplay()
    if (!allFilteredRecipes.length) {
      displayErrorMessage("Aucune recette ne contient '" + inputValue + "'. Vous pouvez chercher par exemple 'tarte aux pommes', 'poisson', etc.")
    }
  } 
  if (inputValue.length < 3 && allFilteredRecipes!== recipes) {
    allFilteredRecipes = recipes
    createRecipeCards(allFilteredRecipes)
    updateMenuDisplay()  
  }
}

/** Listens for click events on Menu Dropdown Button for Ingredients, appliances and ustensils
 * @param {Event} event - The click event on the ingredient/appliance/ustensil Menu.
 */
function listenToDropButton() {
  const buttons = document.querySelectorAll(".common-btn")
  buttons.forEach((dropButton) => {
    dropButton.addEventListener("click", function () {
      closeMenuButton(this)
    })
  })
}

/** Listens for input events on inputs field for Ingredients, appliances and ustensils
 * @param {string} inputSelector - The CSS selector for the search input field.
 * @param {function} displayFunction - The function to display results based on the input value.
 */
const listenToSearchInput = (inputSelector, displayFunction) => {
  const searchInput = document.querySelector(inputSelector)
  searchInput.addEventListener("input", (event) => {
    const inputValue = event.target.value
    displayFunction(inputValue, allFilteredRecipes)
  })
  searchInput.addEventListener("keydown", enterKey)
}

/** Handles the "Enter keydown" event on a search input field.
 * @param {Event} event - The keydown event object.
 */
function enterKey(event) {
  if (event.keyCode === 13) {
    this.blur()
  }
}
/** Listens for click on ingredient or appliance or ustensil button from the list
 * @param {string} selector - The input seclector of ingredient or appliance or ustensil
 * @param {string} function - The function of choise diplay
 
/** Listens for click on ingredient or appliance or ustensil button from the list
 * @param {string} selector - The input seclector of ingredient or appliance or ustensil
 * @param {string} function - The function of choise diplay
 */
function listenToChoiceButtons(selector, choiceDisplayFunction) {
  const optionsButtons = document.querySelectorAll(`#${selector} .option`)
  optionsButtons.forEach((button) => {
    button.addEventListener("click", choiceDisplayFunction)
  })

  const iconsFontAwesome = document.querySelectorAll(`#${selector} .fa-circle-xmark`)
  iconsFontAwesome.forEach((icon) => {
    icon.addEventListener("click", function(event) {
      event.stopPropagation()
      const liParent = icon.closest('li')
      const button = liParent.querySelector('.option')
      button.click()
    })
  })
}


/** Handles the display of selected components, the movement of component buttons, and the creation of new buttons
 * when a component is chosen (e.g., ingredient, appliance, or utensil).
 *
 * @param {Event} event - The click event on a component button.
 * @param {string} elementType - The type of the chosen component ('ingredients', 'appliances', 'ustensils').
 * @param {Object} activeFilters - The object containing active filters for each component type.
 * @param {string} menuButtonClass - The CSS class of the menu button associated with the component type.
 */
function chosenDisplay(event, elementType, activeFilters, menuButtonClass) {
  const componentValue = event.currentTarget.getAttribute("data-value")
  const parentElement = event.currentTarget.parentNode
  const elementValue = parentElement.getAttribute('data-index')
  const ulElement = document.querySelector(`#${elementType[0]}-selection`)
  const menuButton = document.querySelector(`.${menuButtonClass}`)
  activeFilters[elementType].push(componentValue)

  if (!parentElement.classList.contains('selected')) {
    displayChosenElement("choiced_filter", componentValue, ulElement.id, elementValue)
    updateMenuDisplay()
    moveSelectedComponentToTop(activeFilters)
    closeMenuButton(menuButton)
  } else {
    moveElementToOriginalPosition(elementValue, ulElement)
    activeFilters[elementType] = activeFilters[elementType].filter((filter) => filter !== componentValue)
    updateMenuDisplay()
    moveSelectedComponentToTop(activeFilters)
    removeChosenElement(componentValue)
  }
}
/** Handles the display of selected ingredients, the movement of ingredient buttons,
 * and the creation of new buttons when an ingredient is chosen.
 *
 * @param {Event} event - The click event on an ingredient button.
 */
function ingredientChosenDisplay(event) {
  chosenDisplay(event, 'ingredients', activeFilters, 'ingredient_drop')
}

/** Handles the display of selected appliances, the movement of appliance buttons,
 * and the creation of new buttons when an appliance is chosen.
 *
 * @param {Event} event - The click event on an appliance button.
 */
function applianceChosenDisplay(event) {
  chosenDisplay(event, 'appliances', activeFilters, 'appliances_drop')
}

/** Handles the display of selected ustensils, the movement of ustensil buttons,
 * and the creation of new buttons when an ustensil is chosen.
 *
 * @param {Event} event - The click event on an ustensil button.
 */

function ustensilChosenDisplay(event) {
  chosenDisplay(event, 'ustensils', activeFilters, 'ustensils_drop')
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
  listenToChoiceButtons("i-selection", ingredientChosenDisplay)
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
  listenToChoiceButtons("a-selection", applianceChosenDisplay)
}

/** * Displays menu elements with ustensils filtered by the input value,
 * and sets up new event listeners for the new list of ustensil.
 *
 * @param {string} inputValueIngredient - The input value for ustensil filtering.
 * @param {Array} recipesData - The array of recipes data to filter ustensils from.
 */
function displayUstensilsFilteredByInput(inputValueUstensil, recipesData) {
  const uniqueUstensils = ustensilsFilterByDropdown(recipesData, inputValueUstensil)
  displayMenuElement("ustensils_select", "u-selection", null, uniqueUstensils)
  listenToChoiceButtons("u-selection", ustensilChosenDisplay)
}

/** Displays menu elements for appliances and utensils based on recipes filtered by the chosen ingredient.
 * Listens to component events, updates the list of filtered recipes, and displays the filtered results.
 */
export function displayRecipes() {
  const recipeToDisplay = applyAllFilters()
  createRecipeCards(recipeToDisplay)
  return recipeToDisplay
}

/** Sets up event listeners for ingredients, appliances, and utensils buttons.
 */
export function listenToComponents() {
  listenToChoiceButtons("i-selection", ingredientChosenDisplay)
  listenToChoiceButtons("a-selection", applianceChosenDisplay)
  listenToChoiceButtons("u-selection", ustensilChosenDisplay)
}

/** Adds an event listener to button from choiced filter container to remove the button when clicked.
 * Moves the removed element back to its original position, reverts recipes, and updates the menu.
 */
function listenToRemoveComponent() {
  const divLocalisation = document.querySelector(".choiced_filter")
  divLocalisation.addEventListener("click", (event) => {
    const chosenElement = event.target.closest(".chosen_element")
    const componentValue = chosenElement.getAttribute("data-value")

    if (chosenElement) {
      const originalUlId = chosenElement.getAttribute('original-ul')
      const elementType = getElementType(originalUlId)

      if (elementType === "ingredients") {
        for (let i = 0; i < activeFilters.ingredients.length; i++) {
          if (activeFilters.ingredients[i] === componentValue) {
            activeFilters.ingredients.splice(i, 1)
            break
          }
        }
      } else if (elementType === "appliances") {
        for (let i = 0; i < activeFilters.appliances.length; i++) {
          if (activeFilters.appliances[i] === componentValue) {
            activeFilters.appliances.splice(i, 1)
            break
          }
        }
      } else if (elementType === "ustensils") {
        for (let i = 0; i < activeFilters.ustensils.length; i++) {
          if (activeFilters.ustensils[i] === componentValue) {
            activeFilters.ustensils.splice(i, 1)
            break
          }
        }
      }

      updateMenuDisplay()
      removeChosenElement(chosenElement)
    }
  });
}

/** Applies all active filters to the current set of filtered recipes.
 * @returns {Array} - The array of recipes after applying all active filters.
 */
function applyAllFilters() {
  let filteredRecipes = allFilteredRecipes

  if (activeFilters.ingredients.length > 0) {
    for (const ingredient of activeFilters.ingredients) {
      filteredRecipes = dropdownFilterIngredients(filteredRecipes, ingredient)
    }
  }

  if (activeFilters.appliances.length > 0) {
    for (const appliance of activeFilters.appliances) {
      filteredRecipes = dropdownFilterAppliances(filteredRecipes, appliance)
    }
  }

  if (activeFilters.ustensils.length > 0) {
    for (const ustensil of activeFilters.ustensils) {
      filteredRecipes = dropdownFilterUstensils(filteredRecipes, ustensil)
    }
  }

  return filteredRecipes
}

/** Displays an error message on the recipe gallery when no recipe found with global filter.
 * @param {string} message - The error message to be displayed.
 */
function displayErrorMessage(message) {
  const errorMessageElement = document.createElement("div")
  errorMessageElement.classList.add("color-black", "font-bold","font-['Anton']","text-5xl", "leading-[3.5rem]", "h-[250px]")
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
listenToSearchInput("#appliancesSearchInput", displayApliancesFilteredByInput)
listenToSearchInput("#ustensilsSearchInput", displayUstensilsFilteredByInput)
listenToSearchInput("#ingredientsSearchInput", displayIngredientsFilteredByInput)
listenToRemoveComponent()