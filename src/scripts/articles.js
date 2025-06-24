import '../index.css'
const tabs = document.querySelectorAll('.A_Tab')
import articles from '../articles.json'

const containerEl = document.querySelector('#articleContainer')

articles.forEach((item) => {
  const a = document.createElement('a')
  a.className = `O_ArticleCard${item.vertical ? ' Vertical' : ''} ${item.type}`
  a.href = item.link

  const imageWrap = document.createElement('div')
  imageWrap.className = 'M_ArticleCardImage'

  if (item.image) {
    const img = document.createElement('img')
    img.src = item.image
    img.alt = ''
    img.className = 'A_ArticleCardImageTitle'
    if (item.vertical) img.classList.add('Vertical')
    if (item.extraImageClass) img.classList.add(item.extraImageClass)
    imageWrap.appendChild(img)
  } else {
    const div = document.createElement('div')
    div.className = 'A_ArticleCardImageTitle'
    if (item.vertical) div.classList.add('Vertical')
    if (item.extraImageClass) div.classList.add(item.extraImageClass)
    imageWrap.appendChild(div)
  }

  const textWrap = document.createElement('div')
  textWrap.className = 'W_ArticleTextName' + (item.vertical ? ' Vertical' : '')

  const badge = document.createElement('div')
  badge.className = item.vertical ? 'A_Badge' : 'A_Badge Absolute'
  badge.textContent = item.badge

  const textBlock = document.createElement('div')
  textBlock.className = 'M_ArticleTextName'

  const h4 = document.createElement('h4')
  h4.className = 'A_H3 Overflow'
  h4.textContent = item.title

  const p = document.createElement('p')
  p.className = 'A_TextMain'
  p.textContent = item.text

  textBlock.appendChild(h4)
  textBlock.appendChild(p)
  textWrap.appendChild(badge)
  textWrap.appendChild(textBlock)

  a.appendChild(imageWrap)
  a.appendChild(textWrap)
  containerEl.appendChild(a)
})

const cards = document.querySelectorAll('.O_ArticleCard')

const videoImg = document.querySelector('.A_Video')
const previewBg = document.querySelector('.A_ImagePreview')
const titleEl = document.querySelector('.VideoTitle')
const textEl = document.querySelector('.VideoText')

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
