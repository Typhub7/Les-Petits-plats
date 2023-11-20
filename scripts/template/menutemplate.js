// Cette fonction gère l'affichage des données des champs de recherche
export function displayMenuElement(ulClass, elementArrayFunction) {
    const ulLocalisation = document.querySelector(`.${ulClass}`)
    const allElements = elementArrayFunction()
  
    ulLocalisation.innerHTML = ""
    const newElements = allElements.map((item) => {
      return `<li class="py-1.5 pl-4 relative"> 
                <button class="option text-left w-4/5" data-value="${item}" >${item}</button>
                <i class="fa-solid fa-circle-xmark invisible absolute right-5 top-[35%]"></i>
              </li>`
    })
  
    ulLocalisation.innerHTML = newElements.join("")
}

export function displayChosenElement(ulClass, elementName) {
  const divLocalisation = document.querySelector(`.${ulClass}`)
  const newElement = 
  `<div class="chosen_element data-value=${elementName} w-[210px] h-[53px] mt-5 px-[16px] py-[17px]  gap-3 bg-amber-300 rounded-[10px] flex justify-between items-center"> 
     <button class="option text-left text-sm font-normal font-['Manrope'] " data-value="${elementName}" >${elementName}</button>
     <i class="fa-solid fa-xmark visible"></i>
   </div>`

  divLocalisation.innerHTML += newElement
}

export function removeChosenElement(element) {
  if (element) {
    element.remove()
  }
}