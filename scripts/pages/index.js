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

import { displayMenuElement } from "../template/menutemplate.js"

// Event listener pour les boutons de filtre
const buttons = document.querySelectorAll(".common-btn")

buttons.forEach((dropButton) => {
  dropButton.addEventListener("click", function () {
    const nextElement = this.nextElementSibling
    toggleComponents(nextElement)
    RotateChevron(this)
    toggleRoundedCorner(this)
  })
})

displayMenuElement("ingredient_select", createArraysIngredient)
displayMenuElement("appliances_select", createArraysAppliances)
displayMenuElement("ustensils_select", createArraysUstensils)
// Appel initial pour créer les cartes de recette au chargement de la page
createRecipeCards(recipes)
