// Cette fonction gère l'affichage des données des champs de recherche
export function displayMenuElement(ulClass, elementArrayFunction) {
    const ulLocalisation = document.querySelector(`.${ulClass}`)
    const allElements = elementArrayFunction()
  
    ulLocalisation.innerHTML = ""
    const newElements = allElements.map((item, index) => {
      return `<li class="element py-1.5 pl-4 relative" data-index="${index}" data-original-index="${index}"> 
                <button class="option text-left w-4/5" data-value="${item}" >${item}</button>
                <i class="fa-solid fa-circle-xmark invisible absolute right-5 top-[35%]"></i>
              </li>`
    })
  
    ulLocalisation.innerHTML = newElements.join("")
}

export function moveElementToTop(elementIndex, ulElement) {
  const elementToMove = ulElement.querySelector(`[data-index="${elementIndex}"]`);
  if (elementToMove && ulElement) {
    elementToMove.classList.add('bg-amber-300');
    elementToMove.classList.add('selected');
    const iconElement = elementToMove.querySelector('.fa-circle-xmark');
    iconElement.classList.toggle("invisible")
    ulElement.prepend(elementToMove);
  }
}

export function moveElementToOriginalPosition(elementIndex, ulElement) {
  const elementToMove = ulElement.querySelector(`[data-index="${elementIndex}"]`);
  const originalIndex = parseInt(elementToMove.getAttribute('data-original-index'));

  if (elementToMove && ulElement && !isNaN(originalIndex)) {
    const elements = ulElement.querySelectorAll('.element');
    const targetElement = elements[originalIndex];

    if (targetElement) {
      elementToMove.classList.remove('bg-amber-300');
      elementToMove.classList.remove('selected');
      const iconElement = elementToMove.querySelector('.fa-circle-xmark');
      iconElement.classList.toggle("invisible")
      targetElement.insertAdjacentElement('beforebegin', elementToMove);
    }
  }
}

export function removeChosenElement(elementOrValue) {
  if (elementOrValue) {
    const divLocalisations = document.querySelectorAll(".chosen_element");

    // Si elementOrValue est un élément, supprimez cet élément directement
    if (elementOrValue instanceof Element) {
      elementOrValue.remove();
    } else {
      // Sinon, recherchez l'élément avec la valeur spécifiée dans dataset.value
      divLocalisations.forEach((element) => {
        if (element.dataset.value === elementOrValue) {
          element.remove();
        }
      });
    }
  }
}

export function displayChosenElement(domDisplay, elementName, originalUl, originalIndex) {
  const divLocalisation = document.querySelector(`.${domDisplay}`)
  const newElement = 
  `<div class="chosen_element w-[210px] h-[53px] mt-5 px-[16px] py-[17px] gap-3 bg-amber-300 rounded-[10px] flex justify-between items-center cursor-pointer" data-value="${elementName}" data-index="${originalIndex}" original-ul="${originalUl}"> 
     <button class="option text-left text-sm font-normal font-['Manrope'] " data-value="${elementName}" >${elementName}</button>
     <i class="fa-solid fa-xmark visible"></i>
   </div>`

  divLocalisation.innerHTML += newElement
}