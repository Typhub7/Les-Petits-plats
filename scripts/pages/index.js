import { createArraysIngredient, createArraysAppliances, createArraysUstensils} from "../api/recipesdata.js"
import { createRecipeCards } from "../template/recipetemplate.js"
import { closeMenuButton } from "../components/components.js"
import { globalFilterAll } from '../search/globalsearch.js'
import { displayMenuElement, displayChosenElement, removeChosenElement, moveElementToTop, moveElementToOriginalPosition, updateMenuDisplay } from "../template/menutemplate.js"
import { recipes } from "../../data/recipes.js"
import { appliancesFilterByDropdown, dropdownFilterAppliances, dropdownFilterIngredients, ingredientsFilterByDropdown, ustensilsFilterByDropdown } from "../search/ingredientsearch.js"

/** Adds event listeners for the global dropdown listing button of filters.
 */
function listenToDropButton() {
  const buttons = document.querySelectorAll(".common-btn")
  buttons.forEach((dropButton) => {
    dropButton.addEventListener("click", function () {
      closeMenuButton(this)
    })
  })
}

/** Adds event listeners on menu's filters elements ( ingredient, appliance or ustensil) to handle click events.
 */
function listenToComponent() {
  const optionsButtons = document.querySelectorAll(".option")
  optionsButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      const componentValue = event.currentTarget.getAttribute("data-value")
      const elementValue = button.parentNode.getAttribute('data-index')
      const parentElement = event.currentTarget.parentNode 
      const ulElement = button.parentNode.parentNode
      const findParentButton = ulElement.parentNode.parentNode
      const findedButton = findParentButton.querySelector("button")

      if (!parentElement.classList.contains('selected')) {
        displayChosenElement("choiced_filter",componentValue, ulElement.id, elementValue)
        moveElementToTop(elementValue,ulElement)
        closeMenuButton(findedButton)
      } else {
        moveElementToOriginalPosition(elementValue,ulElement)
        removeChosenElement(componentValue)
      }
    })
  })
}

/** Adds an event listener to button from choiced filter container to remove the button when clicked.
 * Also replace element in its original place in menu.
 */
function removeComponent() {
  const divLocalisation = document.querySelector(".choiced_filter")
  divLocalisation.addEventListener("click", (event) => {
    const chosenElement = event.target.closest(".chosen_element")
    if (chosenElement) {
      const originalUlId = chosenElement.getAttribute('original-ul');
      const originalUlValue = document.getElementById(originalUlId);
      const dataIndexValue = chosenElement.getAttribute('data-index')
      moveElementToOriginalPosition (dataIndexValue,originalUlValue)
      removeChosenElement(chosenElement)
    }
  })
}

let isGlobalFiltered = false;
let allFilteredRecipes = []
let filteredRecipesByUstensilInput = []
let filteredRecipesByApplianceInput = []
let filteredRecipesByIngredientInput = []

function handleGlobalInputChange(event) {
  const inputValue = event.target.value;
  if (inputValue.length >= 3) {
    allFilteredRecipes = globalFilterAll(inputValue);
    isGlobalFiltered = true;
    createRecipeCards(allFilteredRecipes);
    updateMenuDisplay(allFilteredRecipes);
    listenToComponent();
    if (!allFilteredRecipes.length) {
      displayErrorMessage("Aucune recette ne contient '" + inputValue + "'. Vous pouvez chercher par exemple 'tarte aux pommes', 'poisson', etc.");
    }
  }
}

function handleIngredientInputChange(event, recipesData) {
  const inputValueIngredient = event.target.value;
  filteredRecipesByIngredientInput = dropdownFilterIngredients(recipesData,inputValueIngredient)
  const uniqueIngredients = ingredientsFilterByDropdown(recipesData, inputValueIngredient)
  displayMenuElement("ingredient_select", "i-selection", null, uniqueIngredients)
  filterAndDisplayResults()
}

function handleApplianceInputChange(event, recipesData) {
  const inputValueAppliance = event.target.value;
  filteredRecipesByApplianceInput = dropdownFilterAppliances(recipesData, inputValueAppliance)
  const uniqueAppliances  = appliancesFilterByDropdown(recipesData, inputValueAppliance)
  displayMenuElement("appliances_select", "a-selection", null, uniqueAppliances);
  filterAndDisplayResults()
}

function handleUstensilInputChange(event, recipesData) {
  const inputValueUstensil = event.target.value;
  filteredRecipesByUstensilInput = ustensilsFilterByDropdown(recipesData, inputValueUstensil)
  const uniqueUstensils = ustensilsFilterByDropdown(recipesData, inputValueUstensil)
  displayMenuElement("ustensils_select", "u-selection", null, uniqueUstensils);
  filterAndDisplayResults()
}

function listenToGlobalInput() {
  const inputElement = document.querySelector("#globalSearchInput");
  inputElement.addEventListener("input", handleGlobalInputChange);
}

function listenToIngredientSearch() {
  const inputIngredient = document.querySelector("#ingredientsSearchInput");
  inputIngredient.addEventListener("input", (event) => {
    if (!isGlobalFiltered) {
      handleIngredientInputChange(event, recipes);
    } else {
      handleIngredientInputChange(event, allFilteredRecipes);
    }
  });
}

function listenToApplianceSearch() {
  const inputAppliance = document.querySelector("#appliancesSearchInput");
  inputAppliance.addEventListener("input", (event) => {
    if (!isGlobalFiltered) {
      handleApplianceInputChange(event, recipes);
    } else {
      handleApplianceInputChange(event, allFilteredRecipes);
    }
  });
}

function listenToUstensilSearch() {
  const inputUstensil = document.querySelector("#ustensilsSearchInput"); 
  inputUstensil.addEventListener("input", (event) => {
    if (!isGlobalFiltered) {
      handleUstensilInputChange(event, recipes);
    } else {
      handleUstensilInputChange(event, allFilteredRecipes);
    }
  });
}

function filterAndDisplayResults() {

  // Intersection des ensembles avec l'opérateur &&
  console.log("filteredRecipesByIngredientInput",filteredRecipesByIngredientInput)
  let recettesFinales = filteredRecipesByIngredientInput.filter(recette =>
    filteredRecipesByApplianceInput.includes(recette) && filteredRecipesByUstensilInput.includes(recette)
  )
  console.log("recettesFinales",recettesFinales)
  createRecipeCards(recettesFinales);
  listenToComponent()
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
listenToComponent()
removeComponent() 
listenToIngredientSearch()
listenToApplianceSearch()
listenToUstensilSearch()