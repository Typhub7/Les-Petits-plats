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