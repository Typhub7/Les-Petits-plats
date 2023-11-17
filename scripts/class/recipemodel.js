
class RecipesCard {
  constructor(recipe) {
    this.id = recipe.id;
    this.url = recipe.img;
    this.name = recipe.name;
    this.servings = recipe.servings;
    this.ingredients = recipe.ingredients;
    this.time = recipe.time;
    this.description = recipe.description;
    this.appliance = recipe.appliance;
    this.ustensils = recipe.ustensils
  }
}
