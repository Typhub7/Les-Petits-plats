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