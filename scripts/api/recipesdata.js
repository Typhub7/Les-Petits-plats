import { recipes } from '../data/recipes.js'

export function createArray() {

    const ingredientsList = [];
    const appliancesList = [];
    const utensilsList = [];
    recipes.forEach(recipe => {
        recipe.ingredients.forEach(ingredient => {
            if (!ingredientsList.includes(ingredient.ingredient)) {
            ingredientsList.push(ingredient.ingredient);
            }
        });

        recipe.appliance.forEach(appliance => {
            if (!appliancesList.includes(appliance.appliance)) {
                appliancesList.push(appliance.appliance);
            }
        }); 

        recipe.ustensils.forEach(utensil => {
            if (!utensilsList.includes(utensil)) {
            utensilsList.push(utensil);
            }
        });
            // Trier les listes par ordre alphabétique
        ingredientsList.sort();
        appliancesList.sort();
        utensilsList.sort();
        // Utilisez ingredientsList, appliancesList et utensilsList dans vos boutons dropdown
        console.log('Ingrédients :', ingredientsList);
        console.log('Appareils :', appliancesList);
        console.log('Ustensiles :', utensilsList);
    });
}

