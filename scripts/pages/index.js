import { createArraysIngredient, createArraysAppliances, createArraysUstensils} from "../api/recipesdata.js"
import { createRecipeCards } from "../template/recipetemplate.js"
import { closeMenuButton } from "../components/components.js"
import { globalFilterAll, globalFilterAppliance, globalFilterIngredients, globalFilterUstensils } from '../search/globalsearch.js'
import { displayMenuElement, displayChosenElement, removeChosenElement, moveElementToTop, moveElementToOriginalPosition, updateMenuDisplay } from "../template/menutemplate.js"
import { recipes } from "../../data/recipes.js"
import { appliancesFilter, ingredientsFilter, ustensilsFilter } from "../search/ingredientsearch.js"

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
let applianceFilteredRecipes 
let ustensilsFilteredRecipes 
let ingredientsFilteredRecipes

function handleGlobalInputChange(event) {
  const inputValue = event.target.value;
  if (inputValue.length >= 3) {
    const allFilteredRecipes = globalFilterAll(inputValue);
    applianceFilteredRecipes = globalFilterAppliance(inputValue);
    ustensilsFilteredRecipes = globalFilterUstensils(inputValue);
    ingredientsFilteredRecipes = globalFilterIngredients(inputValue);
    isGlobalFiltered = true;
    createRecipeCards(allFilteredRecipes);
    updateMenuDisplay(ingredientsFilteredRecipes, applianceFilteredRecipes, ustensilsFilteredRecipes);
    listenToComponent();
    if (!allFilteredRecipes.length) {
      displayErrorMessage("Aucune recette ne contient '" + inputValue + "'. Vous pouvez chercher par exemple 'tarte aux pommes', 'poisson', etc.");
    }
  }
}

function listenToGlobalInput() {
  const inputElement = document.querySelector("#globalSearchInput");
  inputElement.addEventListener("input", handleGlobalInputChange);
}

function handleIngredientInputChange(event, recipesData) {
  const inputValue = event.target.value;
  const { filteredRecipesbyIngredient, uniqueIngredients } = ingredientsFilter(recipesData, inputValue);
  displayMenuElement("ingredient_select", "i-selection", null, uniqueIngredients);
  createRecipeCards(filteredRecipesbyIngredient);
  listenToComponent();
}

function listenToIngredientSearch() {
  const inputIngredient = document.querySelector("#ingredientsSearchInput");
  
  inputIngredient.addEventListener("input", (event) => {
    if (!isGlobalFiltered) {
      handleIngredientInputChange(event, recipes);
    } else {
      handleIngredientInputChange(event, ingredientsFilteredRecipes);
    }
  });
}

function handleApplianceInputChange(event, recipesData) {
  const inputValue = event.target.value;
  const { filteredRecipesbyAppliance, uniqueAppliances } = appliancesFilter(recipesData, inputValue);
  displayMenuElement("appliances_select", "a-selection", null, uniqueAppliances);
  createRecipeCards(filteredRecipesbyAppliance);
  listenToComponent();
}

function listenToApplianceSearch() {
  const inputAppliance = document.querySelector("#appliancesSearchInput");
  
  inputAppliance.addEventListener("input", (event) => {
    if (!isGlobalFiltered) {
      handleApplianceInputChange(event, recipes);
    } else {
      handleApplianceInputChange(event, applianceFilteredRecipes);
    }
  });
}

function handleUstensilInputChange(event, recipesData) {
  const inputValue = event.target.value;
  const { filteredRecipesbyUstensil, uniqueUstensils } = ustensilsFilter(recipesData, inputValue);
  displayMenuElement("ustensils_select", "u-selection", null, uniqueUstensils);
  createRecipeCards(filteredRecipesbyUstensil);
  listenToComponent();
}

function listenToUstensilSearch() {
  const inputUstensil = document.querySelector("#ustensilsSearchInput");
  
  inputUstensil.addEventListener("input", (event) => {
    if (!isGlobalFiltered) {
      handleUstensilInputChange(event, recipes);
    } else {
      handleUstensilInputChange(event, ustensilsFilteredRecipes);
    }
  });
}

function filterAndDisplayResults() {
  // Obtenez les éléments filtrés des trois catégories
  const ustensils = getSelectedValues("u-selection");
  const appliances = getSelectedValues("a-selection");
  const ingredients = getSelectedValues("i-selection");

  // Filtrez les recettes en fonction des éléments sélectionnés dans les trois catégories
  const filteredRecipes = recipesData.filter(recipe => {
    const recipeUstensils = recipe.ustensils.map(ustensil => ustensil.toLowerCase());
    const recipeAppliances = recipe.appliances.map(appliance => appliance.toLowerCase());
    const recipeIngredients = recipe.ingredients.map(ingredient => ingredient.ingredient.toLowerCase());

    return (
      hasIntersection(recipeUstensils, ustensils) &&
      hasIntersection(recipeAppliances, appliances) &&
      hasIntersection(recipeIngredients, ingredients)
    );
  });

  // Affichez les résultats filtrés
  createRecipeCards(filteredRecipes);
  listenToComponent();
}

function hasIntersection(arr1, arr2) {
  // Vérifiez s'il y a une intersection entre deux tableaux
  return arr1.some(item => arr2.includes(item));
}

function getSelectedValues(id) {
  // Récupérez les valeurs sélectionnées dans le menu déroulant
  const selectElement = document.getElementById(id);
  return Array.from(selectElement.selectedOptions, option => option.value.toLowerCase());
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