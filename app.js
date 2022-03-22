const url =
  'https://newsapi.org/v2/everything?q=Ghana&apiKey=a279f44e37f0418d942d310af34c9f93&pageSize=100'
const newsContainer = document.querySelector('main')
const logo = document.querySelector('.logo')
const logoText = document.querySelector('.title')
const spinner = document.querySelector('.spinner')
logo.addEventListener('click', () => {
  window.scrollTo(0, 0)
})
logoText.addEventListener('click', () => {
  window.scrollTo(0, 0)
})
const getNews = async () => {
  spinner.style.display = 'block'
  const response = await fetch(url)
  const { articles } = await response.json()
  articles.forEach((article) => {
    console.log(article)
    const newsCard = document.createElement('div')
    newsCard.classList.add('card')
    newsCard.innerHTML = `
    <div class="image-container">
    <img src="${article.urlToImage}" alt="news image" />
  </div>
  <div class="content">
    <p>
     ${article.title}
    </p>
    <p class="desc">
    ${article.description?.slice(0, 100)}...
    </p>
    <a href="${article.url}" target="_blank">Read More</a>
  </div>
    `
    newsContainer.append(newsCard)
  })
  spinner.style.display = 'none'
}
getNews()
