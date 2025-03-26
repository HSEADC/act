import galleryData from '../galleryData.json'
import filterData from '../filterData.json'
import { renderGallery } from './renderGalleryUtilitty.js' // 🧠 импорт готовой функции

const galleryContainer = document.querySelector('.O_Gallery')
const container = document.querySelector('.O_Multiselect')

const tabsContainer = document.createElement('div')
tabsContainer.className = 'C_TabsFilters'

const tagsContainer = document.createElement('div')
tagsContainer.className = 'C_Tags'

const headlineContainer = document.createElement('div')
headlineContainer.className = 'M_FiltersHeadline'
headlineContainer.innerHTML = `
  <h4 class="A_H3">
    <span class="TitleText"></span>
    <div class="Q_FilterAmount"></div>
  </h4>
  <p class="A_TextMain Center"></p>
`

container.appendChild(tabsContainer)
container.appendChild(tagsContainer)
container.appendChild(headlineContainer)

let currentTab = 'Все'
let currentTag = null
const isMobile = window.innerWidth <= 768

function renderGalleryWithFilters() {
  let items = []

  if (currentTab === 'Все') {
    const allItems = Object.values(galleryData).flat()
    const shuffled = allItems.sort(() => 0.5 - Math.random())
    items = shuffled.slice(0, 21)
  } else if (currentTag && galleryData[currentTag]) {
    items = galleryData[currentTag]
  }

  if (!items || items.length === 0) {
    galleryContainer.innerHTML = ' '
    return
  }

  renderGallery(galleryContainer, items)
  setupAnimation()
}

function highlightActiveTag(tagName) {
  tagsContainer.querySelectorAll('.A_Tag').forEach((el) => {
    el.classList.toggle('Selected', el.textContent === tagName)
  })
}

function highlightActiveTab(tabName) {
  tabsContainer.querySelectorAll('.A_Tab').forEach((el) => {
    el.classList.toggle('Selected', el.textContent === tabName)
  })
}

function renderTabs() {
  tabsContainer.innerHTML = ''
  Object.keys(filterData).forEach((tab) => {
    const el = document.createElement('div')
    el.className = 'A_Tab'
    el.textContent = tab
    el.onclick = () => {
      currentTab = tab
      currentTag = null
      renderTags()
      renderHeadline()
      renderGalleryWithFilters()
      highlightActiveTab(tab)
    }
    tabsContainer.appendChild(el)
  })

  highlightActiveTab(currentTab)
}

function renderTags() {
  tagsContainer.innerHTML = ''
  const tabData = filterData[currentTab]

  if (!tabData.showTags || !tabData.tags.length) {
    tagsContainer.style.display = 'none'
    currentTag = null
    renderHeadline()
    renderGalleryWithFilters()
    return
  }

  tagsContainer.style.display = 'flex'

  currentTag = tabData.tags[0]

  tabData.tags.forEach((tag) => {
    const el = document.createElement('div')
    el.className = 'A_Tag'
    el.textContent = tag

    el.onclick = () => {
      currentTag = tag
      highlightActiveTag(tag)
      renderHeadline()
      renderGalleryWithFilters()
    }

    tagsContainer.appendChild(el)
  })

  highlightActiveTag(currentTag)
  renderHeadline()
  renderGalleryWithFilters()
}

function renderHeadline() {
  if (!filterData[currentTab].showTags || !currentTag) {
    headlineContainer.style.display = 'none'
    return
  }

  const data = filterData[currentTab].content[currentTag]
  headlineContainer.style.display = 'flex'
  headlineContainer.querySelector('.TitleText').textContent = data.title
  headlineContainer.querySelector(
    '.Q_FilterAmount'
  ).textContent = `(${data.count})`
  headlineContainer.querySelector('p').textContent = data.description
}

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

// Start
renderTabs()
renderTags()
renderHeadline()
renderGalleryWithFilters()
