import imageData from '../authors.json'

const isMobile = window.innerWidth <= 768
const row = document.querySelector('.M_ImageSlider')

const speed = 0.1
const cardWidth = isMobile ? 35 : window.innerWidth <= 1024 ? 40 : 12
const gap = 1
const spacing = cardWidth + gap

const imgCount = Math.ceil(100 / spacing) + 10
const baseHeight = 30
const maxHeight = isMobile ? 100 : 100

const imgs = []
for (let i = 0; i < imgCount; i++) {
  const data = imageData[i % imageData.length]
  const a = document.createElement('a')
  a.href = data.link
  a.className = 'A_ImageAuthorSlider'
  a.style.backgroundImage = `url(${data.img})`
  a.style.width = `${cardWidth}vw`
  a.style.height = isMobile ? '100%' : `${baseHeight}%`
  row.appendChild(a)

  imgs.push({ el: a, xvw: i * spacing })
}

function animate() {
  const center = 50

  for (const item of imgs) {
    item.xvw -= speed

    if (item.xvw < -spacing) {
      const maxX = Math.max(...imgs.map((i) => i.xvw))
      item.xvw = maxX + spacing
    }

    item.el.style.transform = `translateX(${item.xvw}vw)`

    if (!isMobile) {
      const speed = 0.3
      const imgCenter = item.xvw + cardWidth / 2
      const distance = Math.abs(center - imgCenter)
      const maxDistance = center
      const heightPercent =
        baseHeight + (1 - distance / maxDistance) * (maxHeight - baseHeight)
      item.el.style.height = `${heightPercent}%`
    }
  }

  requestAnimationFrame(animate)
}
animate()
