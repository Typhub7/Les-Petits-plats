import { createArraysIngredient, createArraysAppliances, createArraysUstensils} from "../api/recipesdata.js"
import { createRecipeCards } from "../template/recipetemplate.js"
import { closeMenuButton } from "../components/components.js"
import { globalFilterAll } from '../search/globalsearch.js'
import { displayMenuElement, displayChosenElement, removeChosenElement, moveElementToTop, moveElementToOriginalPosition, updateMenuDisplay } from "../template/menutemplate.js"
import { recipes } from "../../data/recipes.js"
import { appliancesFilterByDropdown, dropdownFilterAppliances, dropdownFilterIngredients, ingredientsFilterByDropdown, ustensilsFilterByDropdown } from "../search/ingredientsearch.js"

let isGlobalFiltered = false
let allFilteredRecipes = []
let savedFilteredRecipes = []
let filteredRecipesByUstensilInput = []
let filteredRecipesByApplianceInput = []
let filteredRecipesByIngredientInput = []

/** Adds event listeners for the global dropdown listing button of filters.
 */
function listenToGlobalInput() {
  const inputElement = document.querySelector("#globalSearchInput")
  inputElement.addEventListener("input", handleGlobalInputChange)
}

function handleGlobalInputChange(event) {
  const inputValue = event.target.value
  if (inputValue.length >= 3) {
    allFilteredRecipes = globalFilterAll(inputValue)
    isGlobalFiltered = true
    createRecipeCards(allFilteredRecipes)
    updateMenuDisplay(allFilteredRecipes)
    savedFilteredRecipes = allFilteredRecipes
    listenToComponents
    if (!allFilteredRecipes.length) {
      displayErrorMessage("Aucune recette ne contient '" + inputValue + "'. Vous pouvez chercher par exemple 'tarte aux pommes', 'poisson', etc.")
    }
  }
}

function listenToDropButton() {
  const buttons = document.querySelectorAll(".common-btn")
  buttons.forEach((dropButton) => {
    dropButton.addEventListener("click", function () {
      closeMenuButton(this)
    })
  })
}
/* all Ingredient function*/
function listenToIngredientSearch() {
  const inputIngredient = document.querySelector("#ingredientsSearchInput")
  inputIngredient.addEventListener("input", (event) => {
    if (!isGlobalFiltered) {
      allFilteredRecipes = recipes
      isGlobalFiltered = false
    } 
    const inputValueIngredient = event.target.value;
    handleIngredientInputChange(inputValueIngredient, allFilteredRecipes)
  })
}

function listenToIngredientButtons() {
  const optionsButtons = document.querySelectorAll("#i-selection .option")
  optionsButtons.forEach((button) => {
    button.addEventListener("click", handleIngredientButtonClick)
  });
}

function handleIngredientButtonClick(event) {
  const componentValue = event.currentTarget.getAttribute("data-value")
  const parentElement = event.currentTarget.parentNode
  const elementValue = parentElement.getAttribute('data-index')
  const ulElement = document.querySelector("#i-selection")
  const ingredientMenuButton = document.querySelector(".ingredient_drop")
  filteredRecipesByIngredientInput = dropdownFilterIngredients(allFilteredRecipes,componentValue)
  console.log("filteredRecipesByIngredientInput in buttonclick",filteredRecipesByIngredientInput)

  if (!parentElement.classList.contains('selected')) {
    displayChosenElement("choiced_filter", componentValue, ulElement.id, elementValue)
    moveElementToTop(elementValue, ulElement)
    handleIngredientListClick()
    closeMenuButton(ingredientMenuButton)
  } else {
    moveElementToOriginalPosition(elementValue, ulElement)
    handleIngredientListUnClick()
    removeChosenElement(componentValue)
  }
}

function handleIngredientInputChange(inputValueIngredient, recipesData) {
  const uniqueIngredients = ingredientsFilterByDropdown(recipesData, inputValueIngredient)
  displayMenuElement("ingredient_select", "i-selection", null, uniqueIngredients)
  listenToIngredientButtons()
}

function handleIngredientListClick() {
  displayMenuElement("appliances_select", "a-selection", createArraysAppliances(filteredRecipesByIngredientInput))
  displayMenuElement("ustensils_select", "u-selection", createArraysUstensils(filteredRecipesByIngredientInput))
  listenToComponents()
  allFilteredRecipes = filteredRecipesByIngredientInput
  filterAndDisplayResults(allFilteredRecipes)
}

function handleIngredientListUnClick() {
  allFilteredRecipes = savedFilteredRecipes
  displayMenuElement("appliances_select", "a-selection", createArraysAppliances(allFilteredRecipes))
  displayMenuElement("ustensils_select", "u-selection", createArraysUstensils(allFilteredRecipes))
  listenToComponents()
  filterAndDisplayResults(allFilteredRecipes)
}

/* all Appliance function*/
function listenToApplianceSearch() {
  const inputAppliance = document.querySelector("#appliancesSearchInput")
  inputAppliance.addEventListener("input", (event) => {
    if (!isGlobalFiltered) {
      allFilteredRecipes = recipes
      isGlobalFiltered = false
    } 
    const inputValueAppliance = event.target.value
    handleApplianceInputChange(inputValueAppliance, allFilteredRecipes)
  })
}

function listenToApplianceButtons() {
  const optionsButtons = document.querySelectorAll("#a-selection .option")
  optionsButtons.forEach((button) => {
    button.addEventListener("click", handleApplianceButtonClick)
  });
}
 
function handleApplianceButtonClick(event) {
  const componentValue = event.currentTarget.getAttribute("data-value")
  const parentElement = event.currentTarget.parentNode
  const elementValue = parentElement.getAttribute('data-index')
  const ulElement = document.querySelector("#a-selection")
  const applianceMenuButton = document.querySelector(".appliances_drop")
  filteredRecipesByApplianceInput = dropdownFilterAppliances(allFilteredRecipes,componentValue)

  if (!parentElement.classList.contains('selected')) {
    displayChosenElement("choiced_filter", componentValue, ulElement.id, elementValue)
    moveElementToTop(elementValue, ulElement)
    handleApplianceListClick()
    closeMenuButton(applianceMenuButton)
  } else {
    moveElementToOriginalPosition(elementValue, ulElement)
    handleApplianceListUnClick()
    removeChosenElement(componentValue)
  }
}

function handleApplianceInputChange(inputValueAppliance, recipesData) {
  const uniqueAppliances  = appliancesFilterByDropdown(recipesData, inputValueAppliance)
  displayMenuElement("appliances_select", "a-selection", null, uniqueAppliances)
  listenToApplianceButtons()
}

function handleApplianceListClick() {
  displayMenuElement("ingredient_select","i-selection", createArraysIngredient(filteredRecipesByApplianceInput))
  displayMenuElement("ustensils_select","u-selection", createArraysUstensils(filteredRecipesByApplianceInput))
  listenToComponents()
  allFilteredRecipes = filteredRecipesByApplianceInput
  filterAndDisplayResults(allFilteredRecipes)
}

function handleApplianceListUnClick() {
  allFilteredRecipes = savedFilteredRecipes
  displayMenuElement("ingredient_select","i-selection", createArraysIngredient(allFilteredRecipes))
  displayMenuElement("ustensils_select", "u-selection", createArraysUstensils(allFilteredRecipes))
  listenToComponents()
  filterAndDisplayResults(allFilteredRecipes)
}

/* all Ustensil function*/
function listenToUstensilSearch() {
  const inputUstensil = document.querySelector("#ustensilsSearchInput")
  inputUstensil.addEventListener("input", (event) => {
    if (!isGlobalFiltered) {
      allFilteredRecipes = recipes
      isGlobalFiltered = false
    } 
    const inputValueUstensil = event.target.value
    handleUstensilInputChange(inputValueUstensil, allFilteredRecipes)
  })
}
function listenToUstensilButtons() {
  const optionsButtons = document.querySelectorAll("#u-selection .option")
  optionsButtons.forEach((button) => {
    button.addEventListener("click", handleUstensilButtonClick)
  });
}

function handleUstensilButtonClick(event) {
  const componentValue = event.currentTarget.getAttribute("data-value")
  const parentElement = event.currentTarget.parentNode
  const elementValue = parentElement.getAttribute('data-index')
  const ulElement = document.querySelector("#u-selection")
  const ustensilMenuButton = document.querySelector(".ustensils_drop")
  filteredRecipesByUstensilInput = dropdownFilterAppliances(allFilteredRecipes,componentValue)

  if (!parentElement.classList.contains('selected')) {
    displayChosenElement("choiced_filter", componentValue, ulElement.id, elementValue)
    moveElementToTop(elementValue, ulElement)
    handleUstensilListClick()
    closeMenuButton(ustensilMenuButton)
  } else {
    moveElementToOriginalPosition(elementValue, ulElement)
    handleUstensilListUnClick()
    removeChosenElement(componentValue)
  }
}

function handleUstensilInputChange(inputValueUstensil, recipesData) {
  const uniqueUstensils = ustensilsFilterByDropdown(recipesData, inputValueUstensil)
  displayMenuElement("ustensils_select", "u-selection", null, uniqueUstensils);
  listenToUstensilButtons()
}

function handleUstensilListClick() {
  displayMenuElement("ingredient_select","i-selection", createArraysIngredient(filteredRecipesByUstensilInput))
  displayMenuElement("appliances_select","a-selection", createArraysAppliances(filteredRecipesByUstensilInput))
  listenToComponents()
  allFilteredRecipes = filteredRecipesByUstensilInput
  filterAndDisplayResults(allFilteredRecipes)
}

function handleUstensilListUnClick() {
  allFilteredRecipes = savedFilteredRecipes
  displayMenuElement("ingredient_select","i-selection", createArraysIngredient(allFilteredRecipes))
  displayMenuElement("appliances_select", "a-selection", createArraysAppliances(allFilteredRecipes))
  listenToComponents()
  filterAndDisplayResults(allFilteredRecipes)
}

export function listenToComponents() {
  listenToIngredientButtons()
  listenToApplianceButtons()
  listenToUstensilButtons()
}

/** Adds an event listener to button from choiced filter container to remove the button when clicked.
 * Also replace element in its original place in menu.
 */
function removeComponent() {
  const divLocalisation = document.querySelector(".choiced_filter")
  divLocalisation.addEventListener("click", (event) => {
    const chosenElement = event.target.closest(".chosen_element")
    if (chosenElement) {
      const originalUlId = chosenElement.getAttribute('original-ul')
      const originalUlValue = document.getElementById(originalUlId)
      const dataIndexValue = chosenElement.getAttribute('data-index')
      moveElementToOriginalPosition (dataIndexValue,originalUlValue)
      handleIngredientListUnClick()
      removeChosenElement(chosenElement)
    }
  })
}

function filterAndDisplayResults(recipeToDisplay) {
 createRecipeCards(recipeToDisplay)
}

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
// Ecouteur
listenToGlobalInput()
listenToDropButton() 
listenToComponents()
removeComponent() 
listenToIngredientSearch()
listenToApplianceSearch()
listenToUstensilSearch()