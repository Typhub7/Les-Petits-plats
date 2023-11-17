import { 
  createArraysIngredient,
  createArraysAppliances,
  createArraysUstensils  } 
  from '../api/recipesdata.js';

// Cette fonction gère l'affichage des données des champs de recherche
function displayMenuElement( ulClass, elementArrayFunction){
  const ulLocalisation = document.querySelector(`.${ulClass}`);
  const allElements = elementArrayFunction();

  ulLocalisation.innerHTML = '';
  const newElements = allElements.map(item => {
    return `<li class="pb-3"> 
              <button class="option" data-value="${item}" >${item}</button>
            </li>`;
  });

  ulLocalisation.innerHTML = newElements.join('');
}

// Cette fonction retourne le chevron du bouton
function RotateChevron(button) {
  const chevronSpan = button.querySelector('.fa-chevron-down');
  chevronSpan.classList.toggle('rotate-180');
}

// Cette fonction toggle l'arrondi des angles du boutons :
function toggleRoundedCorner(button) {
  button.classList.toggle('rounded-b-md');
}

// Cette fonction toggle la visibilité des listes de composants :
function toggleComponents(element) {
  element.classList.toggle("invisible");
}

const buttons = document.querySelectorAll('.common-btn');

buttons.forEach(button => {
  button.addEventListener('click', function() {
    const nextElement = this.nextElementSibling;
    toggleComponents(nextElement)
    RotateChevron(this);
    toggleRoundedCorner(this);
  });
});


displayMenuElement("ingredient_select",createArraysIngredient)
displayMenuElement("appliances_select",createArraysAppliances)
displayMenuElement("ustensils_select",createArraysUstensils)
