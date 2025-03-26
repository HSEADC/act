import '../index.css'
const tabs = document.querySelectorAll('.A_Tab')
const cards = document.querySelectorAll('.O_ArticleCard')

const videoImg = document.querySelector('.A_Video')
const previewBg = document.querySelector('.A_ImagePreview')
const titleEl = document.querySelector('.A_H3')
const textEl = document.querySelector('.A_TextMain')

const container = document.querySelector('.S_MainVideoTitles ')

import videoData from '../articlesPreviewData.json'

let index = 0
function updateContent() {
  container.classList.add('fade-out')

  setTimeout(() => {
    const item = videoData[index]

    videoImg.querySelector('source').src = item.videoSrc
    videoImg.load()
    videoImg.play().catch((err) => {
      console.warn('Autoplay prevented:', err)
    })
    previewBg.style.backgroundImage = `url(${item.previewBg})`
    titleEl.textContent = item.title
    textEl.textContent = item.text

    container.classList.remove('fade-out')
    index = (index + 1) % videoData.length
  }, 400)
}

updateContent()

setInterval(updateContent, 5000)

tabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    tabs.forEach((t) => t.classList.remove('Selected'))

    tab.classList.add('Selected')

    const filter = tab.dataset.filter

    cards.forEach((card) => {
      if (filter === 'all') {
        card.classList.remove('Hidden')
      } else {
        if (card.classList.contains(filter)) {
          card.classList.remove('Hidden')
        } else {
          card.classList.add('Hidden')
        }
      }
    })
  })
})
