import { createArraysAppliances, createArraysIngredient, createArraysUstensils } from "../api/recipesdata.js"
import { listenToComponents } from "../pages/index.js"

/** Displays menu elements for element, appliance and ustensils selection for filtering recipes.
 *
 * @param {string} ulClass - The class name of the UL element.
 * @param {string} idMenu - The ID of the menu container.
 * @param {Function} elementArrayFunction - The function to generate an array of elements (optional).
 * @param {Array} filteredElements - The array of elements to display in the menu (optional).
 */
export function displayMenuElement(ulClass,idMenu, elementArrayFunction,filteredElements) {
  const ulLocalisation = document.querySelector(`.${ulClass}`)
  const allElements = filteredElements ?? elementArrayFunction
  ulLocalisation.innerHTML = ""
  const newElements = allElements.map((item, index) => {
    return `<li class="element py-1.5 pl-4 relative" data-index="${index}" data-original-index="${index}" id-original="${idMenu}"> 
              <button class="option text-left w-4/5 " data-value="${item}" >${item}</button>
              <i class="fa-solid fa-circle-xmark invisible absolute right-5 top-[35%]"></i>
            </li>`
  })
  ulLocalisation.innerHTML = newElements.join("")
}

/** Updates the display of menu elements for ingredients, appliances, and utensils
 * based on the provided array of filtered recipes.
 *
 * @param {Array} allFilteredRecipes - The array of recipes used to update the menu display.
 */
export function updateMenuDisplay(allFilteredRecipes) {
  displayMenuElement("ingredient_select","i-selection", createArraysIngredient(allFilteredRecipes))
  displayMenuElement("appliances_select","a-selection", createArraysAppliances(allFilteredRecipes))
  displayMenuElement("ustensils_select","u-selection", createArraysUstensils(allFilteredRecipes))
  listenToComponents()
}

/** Moves the specified element to the top of the element list .
 * @param {number} elementIndex - The index of the element to be moved.
 * @param {HTMLElement} ulElement - The UL element from the element.
 */
export function moveElementToTop(elementIndex, ulElement) {
  const elementToMove = ulElement.querySelector(`[data-index="${elementIndex}"]`)

  if (elementToMove && ulElement) {
    elementToMove.classList.add('bg-amber-300')
    elementToMove.classList.add('hover:bg-amber-500')
    elementToMove.classList.add('selected')
    const iconElement = elementToMove.querySelector('.fa-circle-xmark')
    iconElement.classList.toggle("invisible")
    ulElement.prepend(elementToMove)
  }
}

/** Moves the specified element to its original position in its list.
 * @param {number} elementIndex - The index of the element to be moved.
 * @param {HTMLElement} ulElement - The unordered list (UL) element.
 */
export function moveElementToOriginalPosition(elementIndex, ulElement) {
  const elementToMove = ulElement.querySelector(`[data-index="${elementIndex}"]`)
  const originalIndex = parseInt(elementToMove.getAttribute('data-original-index'))

  if (elementToMove && ulElement && !isNaN(originalIndex)) {
    const elements = ulElement.querySelectorAll('.element')
    const targetElement = elements[originalIndex]

    if (targetElement) {
      elementToMove.classList.remove('bg-amber-300')
      elementToMove.classList.remove('hover:bg-amber-500')
      elementToMove.classList.remove('selected')
      const iconElement = elementToMove.querySelector('.fa-circle-xmark')
      iconElement.classList.toggle("invisible")
      targetElement.insertAdjacentElement('beforebegin', elementToMove)
    }
  }
}

/** Removes the list chosen element based on :
 *  the provided element if removing from the menu
 * or a value if removing from the button choosed list .
 * @param {Element|string} elementOrValue - The element or value to be removed.
 */
export function removeChosenElement(elementOrValue) {
  if (elementOrValue) {
    const divLocalisations = document.querySelectorAll(".chosen_element")

    // Si elementOrValue est un élément, supprimez cet élément directement
    if (elementOrValue instanceof Element) {
      elementOrValue.remove()
    } else {
      // Sinon, recherchez l'élément avec la valeur spécifiée dans dataset.value
      divLocalisations.forEach((element) => {
        if (element.dataset.value === elementOrValue) {
          element.remove()
        }
      })
    }
  }
}

/** Displays the chosen element as a button in a container on the webpage.
 * @param {string} domDisplay - The class name of the container where the chosen element will be displayed.
 * @param {string} elementName - The name of the chosen element.
 * @param {string} originalUl - The ID of the ul source.
 * @param {number} originalIndex - The original index of the chosen element.
 */
export function displayChosenElement(domDisplay, elementName, originalUl, originalIndex) {
  const divLocalisation = document.querySelector(`.${domDisplay}`)
  const newElement = 
  `<div class="chosen_element w-[210px] h-[53px] mt-5 px-[16px] py-[17px] gap-3 bg-amber-300 rounded-[10px] flex justify-between items-center cursor-pointer hover:shadow-xl" data-value="${elementName}" data-index="${originalIndex}" original-ul="${originalUl}"> 
     <button class="option text-left text-sm font-normal font-['Manrope'] " data-value="${elementName}" >${elementName}</button>
     <i class="fa-solid fa-xmark visible "></i>
   </div>`

  divLocalisation.innerHTML += newElement
}

export function getUlElement(componentType) {
  if (componentType === 'ingredients') {
    return document.querySelector("#i-selection")
  } else if (componentType === 'appliances') {
    return document.querySelector("#a-selection")
  } else if (componentType === 'ustensils') {
    return document.querySelector("#u-selection")
  }
}

/*export function getElementType(elementUlID) {
  if (elementUlID === 'i-selection') {
    return ("ingredients")
  } else if (elementUlID === 'a-selection') {
    return ("appliances")
  } else if (elementUlID === 'u-selection') {
    return ("ustensils")
  }
}*/

export function getElementType(elementUlID) {
  const typeMapping = {
    'i-selection': 'ingredients',
    'a-selection': 'appliances',
    'u-selection': 'ustensils'
  };

  // Utilisez elementUlID directement comme clé dans le mapping
  return typeMapping[elementUlID] || null;
}

export function moveSelectedComponentToTop(activeFilters) {
  ['ustensils', 'appliances', 'ingredients'].forEach((filterType) => {
    const selectedFilters = activeFilters[filterType]
    if (selectedFilters.length > 0) {
      selectedFilters.forEach((selectedFilter) => {
        const ulElement = getUlElement(filterType)
        const element = ulElement.querySelector(`[data-value="${selectedFilter}"]`)
        const dataIndex = element.parentNode.getAttribute('data-index')
        moveElementToTop(dataIndex, ulElement)
      })
    }
  })
}