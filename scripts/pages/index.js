import { recipes } from "../../data/recipes.js"
import {
  createArraysIngredient,
  createArraysAppliances,
  createArraysUstensils,
} from "../api/recipesdata.js"

import { createRecipeCards } from "../template/recipetemplate.js"

import { 
  RotateChevron,
  toggleRoundedCorner,
  toggleComponents 
} from "../components/components.js"

import { 
  displayMenuElement,
  displayChosenElement,
  removeChosenElement  } from "../template/menutemplate.js"

// Event listener pour les boutons dropdown des filtres

function listenToDropButton() {
  const buttons = document.querySelectorAll(".common-btn")
  buttons.forEach((dropButton) => {
    dropButton.addEventListener("click", function () {
      const nextElement = this.nextElementSibling
      toggleComponents(nextElement)
      RotateChevron(this)
      toggleRoundedCorner(this)
    })
  })
}

// Fonction qui écoute les boutons des listes et renvoi l'ingredient, l'appareil ou l'ustensil cliqué
function listenToComponent() {
  const optionsButtons = document.querySelectorAll(".option")
  optionsButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      const componentValue = event.currentTarget.getAttribute("data-value")
      displayChosenElement("choiced_filter",componentValue)
    })
  })
}

// Fonction qui écoute les boutons des listes et renvoi l'ingredient, l'appareil ou l'ustensil cliqué
function initremoveComponent() {
  const divLocalisation = document.querySelector(".choiced_filter")
  divLocalisation.addEventListener("click", (event) => {
    const target = event.target
    if (target.classList.contains("chosen_element")) {
      removeChosenElement(target)
    }
  })
}

displayMenuElement("ingredient_select", createArraysIngredient)
displayMenuElement("appliances_select", createArraysAppliances)
displayMenuElement("ustensils_select", createArraysUstensils)
// Appel initial pour créer les cartes de recette au chargement de la page
createRecipeCards(recipes)
listenToDropButton() 
listenToComponent()
initremoveComponent() 


