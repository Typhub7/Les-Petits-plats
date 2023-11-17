import { 
  createArraysIngredient,
  createArraysAppliances,
  createArraysUstensils  } 
  from '../api/recipesdata.js';


function displayMenuElement( ulClass, elementArrayFunction){
  const ulLocalisation = document.querySelector(`.${ulClass}`);
  const allElements = elementArrayFunction();

  ulLocalisation.innerHTML = '';
  const newElements = allElements.map(item => {
    return `<li role="option"> 
              <button class="option pb-3.5" data-value="${item}" >${item}</button>
            </li>`;
  });

  ulLocalisation.innerHTML = newElements.join('');
}

displayMenuElement("ingredient_select",createArraysIngredient)
displayMenuElement("appliances_select",createArraysAppliances)
displayMenuElement("ustensils_select",createArraysUstensils)


createArraysUstensils()