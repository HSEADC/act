import galleryData from '../galleryData.json'
import { renderGallery } from './renderGalleryUtilitty.js'

function setupAnimation() {
  const rows = document.querySelectorAll('.M_Gallery')
  const expandingElements = document.querySelectorAll('.expanding-content')
  const viewportHeight = window.innerHeight

  if (window.innerWidth <= 768) {
    rows.forEach((row, index) => {
      row.style.height = index % 2 === 1 ? '10vh' : '20vh'
      row.style.minHeight = 'unset'
    })
    return
  }

  function getMaxHeight() {
    let totalMaxHeight = 0
    rows.forEach((_, index) => {
      totalMaxHeight +=
        index === rows.length - 1 ? viewportHeight * 0.5 : viewportHeight
    })

    let expandingContentHeight = 0
    expandingElements.forEach((el) => {
      expandingContentHeight += el.scrollHeight || 0
    })

    const maxScrollHeight = totalMaxHeight + expandingContentHeight
    document.body.style.minHeight = `${maxScrollHeight}px`
  }

  function handleScroll() {
    rows.forEach((row) => {
      const rect = row.getBoundingClientRect()
      const startGrowingPoint = viewportHeight
      const fullExpandPoint = -viewportHeight

      if (rect.bottom > 0 && rect.top < viewportHeight) {
        let progress =
          (startGrowingPoint - rect.top) / (startGrowingPoint - fullExpandPoint)
        progress = Math.max(0, Math.min(1, progress))
        const newHeight = 20 + progress * 80 // 20vh to 100vh
        row.style.height = `${newHeight}vh`
      }
    })

    getMaxHeight()
  }

  getMaxHeight()
  handleScroll()
  window.removeEventListener('scroll', handleScroll)
  window.addEventListener('scroll', handleScroll)
}

const container = document.querySelector('.O_Gallery')
const allItems = Object.values(galleryData).flat()
const randomItems = allItems.sort(() => 0.5 - Math.random()).slice(0, 15)

renderGallery(container, randomItems, {
  baseUrl: '../',
  linkPrefix: '../'
})
setupAnimation()
