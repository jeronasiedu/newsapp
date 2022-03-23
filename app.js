const generateRandomCharacter = () => {
  const characters = 'abcdefghijklmnprstvw'
  return characters.charAt(Math.floor(Math.random() * characters.length))
}
const char = generateRandomCharacter()
const url = `https://www.themealdb.com/api/json/v1/1/search.php?f=${generateRandomCharacter()}`

const logo = document.querySelector('.logo')
const logoText = document.querySelector('.title')
const loader = document.querySelector('.loader')

const main = document.querySelector('main')
const modalOverlay = document.querySelector('.modal-overlay')

logo.addEventListener('click', () => {
  window.scrollTo(0, 0)
})
logoText.addEventListener('click', () => {
  window.scrollTo(0, 0)
})

async function getRecipe(searchTerm = url) {
  try {
    loader.style.display = 'grid'
    const response = await fetch(searchTerm)
    const { meals } = await response.json()
    main.innerHTML = ''
    meals.forEach((item) => {
      const iterator = Object.entries(item)
      const listItems = iterator
        .map((item) => {
          const [key, value] = item
          if (key.includes('Ingredient') && value !== null && value !== '') {
            return `<li>${value}</li>`
          }
        })
        .join('')

      const card = document.createElement('div')
      card.classList.add('card')
      card.innerHTML = `
      <div class="image-container">
        <img src="${item.strMealThumb}" alt="fruit" />
      </div>
      <p class="meal-teaser">${item.strTags ? item.strTags : ''}</p>
      <div class="meal-content">
        <h2 class="meal-title">${item.strMeal}</h2>
        <a href='${
          item.strYoutube
        }' class="recipe" target='_blank'>Watch a video</a>
      </div>
   `
      main.appendChild(card)
      card.addEventListener('click', () => {
        modalOverlay.innerHTML = `
       <div class="modal">
        <div class="header">
          <button class="close">
          <span class="shadow"></span>
          <span class="edge"></span>
          <span class="front text"> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x-circle"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>
          </span>
          </button>
          <h3>${item.strMeal}</h3>
        </div>
        <div class="ingredient">
          <h4>Ingredients</h4>
          <ul>
          ${listItems}
          </ul>
        </div>
        <div class="instructions">
          <h4>Instructions</h4>
          <p>
            ${item.strInstructions}
          </p>
        </div>
      </div>
       `
        modalOverlay.classList.add('open')

        const closeBtn = document.querySelectorAll('.close')
        closeBtn.forEach((btn) => {
          btn.addEventListener('click', () => {
            modalOverlay.classList.remove('open')
          })
        })
        modalOverlay.addEventListener('click', (event) => {
          const withinBoundaries = event
            .composedPath()
            .includes(document.querySelector('.modal'))
          if (!withinBoundaries) {
            modalOverlay.classList.remove('open')
          }
        })
      })
    })
    loader.style.display = 'none'
  } catch (error) {
    loader.style.display = 'none'
    console.log(error.response)
    Toastify({
      text: 'Oops, something went wrong, please try again',
      duration: 3000,
      destination: 'https://github.com/apvarun/toastify-js',
      newWindow: true,
      close: true,
      gravity: 'bottom', // `top` or `bottom`
      position: 'center', // `left`, `center` or `right`
      stopOnFocus: true, // Prevents dismissing of toast on hover
      style: {
        background: 'linear-gradient(to right, #3454e2, #da18d0)',
      },
    }).showToast()
  }
}
getRecipe()
// FORM

const form = document.querySelector('form')
form.addEventListener('submit', (e) => {
  e.preventDefault()
  const text = form.children[0]
  const value = `https://www.themealdb.com/api/json/v1/1/search.php?s=${text.value.trim()}`
  getRecipe(value)
  text.value = ''
})
