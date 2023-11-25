import { createArraysIngredient, createArraysAppliances, createArraysUstensils} from "../api/recipesdata.js"
import { createRecipeCards } from "../template/recipetemplate.js"
import { closeMenuButton } from "../components/components.js"
import { globalFilterAll } from '../search/globalsearch.js'
import { displayMenuElement, displayChosenElement, removeChosenElement, moveElementToTop, moveElementToOriginalPosition } from "../template/menutemplate.js"
import { recipes } from "../../data/recipes.js"

/**
 * Adds event listeners for the global dropdown listing button of filters.
 */
function listenToDropButton() {
  const buttons = document.querySelectorAll(".common-btn")
  buttons.forEach((dropButton) => {
    dropButton.addEventListener("click", function () {
      closeMenuButton(this)
    })
  })
}

/**
 * Adds event listeners on menu's filters elements ( ingredient, appliance or ustensil) to handle click events.
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

/**
 * Adds an event listener to button from choiced filter container to remove the button when clicked.
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

function listenToGlobalInput() {
  const inputElement = document.querySelector("#globalSearchInput")
  inputElement.addEventListener("input", (event) => {
    const inputValue = event.target.value
    if (inputValue.length >= 3) {
      const allFilteredRecipes = globalFilterAll(inputValue)
      if (allFilteredRecipes.length > 0) {
        createRecipeCards(allFilteredRecipes)
      } else {
        createRecipeCards(allFilteredRecipes)
        displayErrorMessage("Aucune recette ne contient '" + inputValue + "'. Vous pouvez chercher par exemple 'tarte aux pommes', 'poisson', etc.");
      }
    }
  });
}

function displayErrorMessage(message) {
  const errorMessageElement = document.createElement("div")
  errorMessageElement.classList.add("color-black", "font-bold","font-['Anton']", "h-[300px]");
  errorMessageElement.textContent = message
  document.querySelector(".recipe_gallery").appendChild(errorMessageElement)
}

displayMenuElement("ingredient_select","i-selection", createArraysIngredient(recipes))
displayMenuElement("appliances_select","a-selection", createArraysAppliances(recipes))
displayMenuElement("ustensils_select","u-selection", createArraysUstensils(recipes))
createRecipeCards(recipes)
listenToGlobalInput()
listenToDropButton() 
listenToComponent()
removeComponent() 