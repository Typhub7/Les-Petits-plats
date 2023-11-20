// Cette fonction retourne le chevron du bouton
export function RotateChevron(button) {
    const chevronSpan = button.querySelector(".fa-chevron-down")
    chevronSpan.classList.toggle("rotate-180")
  }
  
// Cette fonction toggle l'arrondi bas des angles du boutons :
export function toggleRoundedCorner(button) {
button.classList.toggle("rounded-b-md")
}

// Cette fonction toggle la visibilité d'un element ciblé dans le DOM :
export function toggleComponents(element) {
element.classList.toggle("invisible")
}

//Fonction qui ferme le bouton menu si un choix est fait dans la liste
export function closeMenuButton(findedButton) {
  const nextElement = findedButton.nextElementSibling
  toggleComponents(nextElement)
  RotateChevron(findedButton)
  toggleRoundedCorner(findedButton)
} 
