import { recipes } from "../../data/recipes.js"
import {
  createArraysIngredient,
  createArraysAppliances,
  createArraysUstensils,
} from "../api/recipesdata.js"

import { createRecipeCards } from "../template/recipetemplate.js"

import { 
  closeMenuButton } from "../components/components.js"

import { 
  displayMenuElement,
  displayChosenElement,
  removeChosenElement,
  moveElementToTop,
  moveElementToOriginalPosition,
   } from "../template/menutemplate.js"

// Event listener pour les boutons dropdown des filtres
function listenToDropButton() {
  const buttons = document.querySelectorAll(".common-btn")
  buttons.forEach((dropButton) => {
    dropButton.addEventListener("click", function () {
      closeMenuButton(this)
    })
  })
}

// Fonction qui écoute les boutons des listes et l'ingredient, l'appareil ou l'ustensil cliqué
function listenToComponent() {
  const optionsButtons = document.querySelectorAll(".option")
  optionsButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      const parentElement = event.currentTarget.parentNode;
      const elementValue = button.parentNode.getAttribute('data-index');
      const ulElement = button.parentNode.parentNode
      const findParentButton = ulElement.parentNode.parentNode;
      const findedButton = findParentButton.querySelector("button");
      const componentValue = event.currentTarget.getAttribute("data-value")

      if (!parentElement.classList.contains('selected')) {
        displayChosenElement("choiced_filter",componentValue, ulElement.id, elementValue)
        moveElementToTop(elementValue,ulElement)
        closeMenuButton(findedButton)
      } else {
        moveElementToOriginalPosition(elementValue,ulElement)
        console.log("voila elementValue",elementValue)
        console.log("voila ulElement",ulElement)
        removeChosenElement(componentValue)
      }
    })
  })
}


// Fonction qui écoute les boutons des listes et renvoi l'ingredient, l'appareil ou l'ustensil cliqué
function removeComponent() {
  const divLocalisation = document.querySelector(".choiced_filter")
  divLocalisation.addEventListener("click", (event) => {
    const chosenElement = event.target.closest(".chosen_element")
    if (chosenElement) {
      const originalUlId = chosenElement.getAttribute('original-ul');
      const originalUlValue = document.getElementById(originalUlId);
      const dataIndexValue = event.target.getAttribute('data-index')
      moveElementToOriginalPosition (dataIndexValue,originalUlValue)
      console.log("voila dataIndexValue",dataIndexValue)
      console.log("voila originalUlValue",originalUlValue)
      removeChosenElement(chosenElement)
    }
  })
}

displayMenuElement("ingredient_select", createArraysIngredient)
displayMenuElement("appliances_select", createArraysAppliances)
displayMenuElement("ustensils_select", createArraysUstensils)
createRecipeCards(recipes)
listenToDropButton() 
listenToComponent()
removeComponent() 