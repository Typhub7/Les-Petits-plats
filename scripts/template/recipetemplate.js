import { RecipesCard } from '../class/recipemodel.js'

/**
 * Generates HTML template for displaying a recipe card based on the provided recipe data.
 *
 * @function
 * @param {Object} recipes - The recipes's list.
 * @returns {Object} - An object containing the HTML template.
 */

function recipeTemplate(recipe) {

    const newRecipeCard = 
    `
    <article class="recipeCard relative w-[380px] h-[731px] mb-5 bg-white rounded-3xl shadow">
        <figure> 
            <img class="w-[380px] h-[253px] rounded-t-3xl object-cover" src="assets/Recettes/${recipe.image}" alt="${recipe.name}">
            <span class="timer absolute top-[20px] right-[22px] px-4 py-1.5 bg-amber-300 text-xs rounded-[14px] justify-center items-center gap-2.5 inline-flex"">${recipe.time}min</span>
            <figcaption class="recette pt-8 px-6 pb-16 flex flex-col gap-6">
                <h3 class=" text-black text-lg font-normal font-['Anton']">${recipe.name}</h3>
                <h4 class=" text-neutral-500 text-xs font-bold font-['Manrope'] tracking-wider">RECETTE</h4>
                <p class="recetteDescription w-[330px] h-[80px] overflow-hidden text-zinc-900 text-sm font-normal font-['Manrope']"">${recipe.description}</p>
                <h5 class="listIngredients text-neutral-500 text-xs font-bold font-['Manrope'] tracking-wider">INGRÉDIENTS</h5>
                <dl class="ingredient text-neutral-500 text-xs font-bold font-['Manrope'] flex flex-wrap justify-between gap-4">
                    ${recipe.ingredients.map(ingredient=> {
                        return `
                        <div class="w-[46%] h-[39px]">
                            <dd class="ingredientNom text-zinc-900 text-sm font-medium font-['Manrope']">${ingredient.ingredient}</dd>
                            <dt class="unite text-neutral-500 text-sm font-normal font-['Manrope']">${ingredient.quantity||`` } ${ingredient.unit ||``}</dt>
                        </div>`}).join("")}</dl>
            </figcaption>
        </figure>
    </article>
    `
    return {newRecipeCard}
}  

/**
 * Creates recipe cards based on the provided recipes and updates the recipe count on the webpage.
 *
 * @param {Array<Object>} recipes - An array of recipe objects.
 */
export function createRecipeCards(recipes) {
  const recipeCards = recipes.map(recipe => new RecipesCard(recipe))
  const recipesGallery = document.querySelector(".recipe_gallery")
  const cardsHtml = recipeCards.map(recipeCard => recipeTemplate(recipeCard).newRecipeCard).join('')
  recipesGallery.innerHTML = cardsHtml
  updateRecipeCount(recipeCards.length)
}

/**
 * Updates the displayed recipe count on the webpage.
 *
 * @param {number} length - The number of recipes to display.
 */
function updateRecipeCount(length) {
  const recipeCountElement = document.getElementById("recipeCount")
  recipeCountElement.textContent = `${length} recettes`
}