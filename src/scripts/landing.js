const allVideos = [
  'AnnaSOD/1.mp4',
  'AnnaSOD/2.mp4',
  'AnnaSOD/3.mp4',
  'AshThorp/orion1.mp4',
  'AshThorp/orion2.mp4',
  'Beeple/hotboxx.mp4',
  'Beeple/settingSun.mp4',
  'Beeple/wrmmm.mp4',
  'Gmunk/1.mp4',
  'Gmunk/2.mp4',
  'author/1.mp4',
  'author/2.mp4',
  'author/3.mp4',
  'author/4.mp4',
  'QuentinDeronz/weekend.mp4',
  'SaadMoosajee/1.mp4',
  'SaadMoosajee/2.mp4',
  'TobiasGremmler/1.mp4',
  'TobiasGremmler/2.mp4',
  'TobiasGremmler/3.mp4',
  'TobiasGremmler/4.mp4',
  'TobiasGremmler/5.mp4',
  'WarrenFu/doja.mp4'
]

const orientations = ['LandingVertical', 'LandingHorizontal']
const container = document.querySelector('.O_MainLanding')

function getRandomFromArray(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}

function respawnAuthors() {
  const authors = document.querySelectorAll('.M_VideoAuthor')

  const screenW = window.innerWidth
  const screenH = window.innerHeight

  authors.forEach((author) => {
    const elW = author.offsetWidth
    const elH = author.offsetHeight

    let x,
      y,
      attempts = 0

    do {
      if (screenW < 700) {
        const horizontalPadding = screenW * 0.05
        x = Math.random() * (screenW * 0.9 - elW) + horizontalPadding

        const spawnTop = Math.random() < 0.5
        if (spawnTop) {
          y = Math.random() * (screenH * 0.25 - elH)
        } else {
          y = Math.random() * (screenH * 0.25 - elH) + screenH * 0.75
        }
      } else {
        const excludeW = 352
        const excludeH = 225

        const excludeXMin = (screenW - excludeW) / 2
        const excludeXMax = (screenW + excludeW) / 2
        const excludeYMin = (screenH - excludeH) / 2
        const excludeYMax = (screenH + excludeH) / 2

        x = Math.random() * (screenW - elW)
        y = Math.random() * (screenH - elH)

        if (
          x + elW > excludeXMin &&
          x < excludeXMax &&
          y + elH > excludeYMin &&
          y < excludeYMax
        ) {
          attempts++
          continue
        }
      }

      break
    } while (attempts++ < 1000)

    author.style.position = 'absolute'
    author.style.left = `${x}px`
    author.style.top = `${y}px`
  })
}

function generateRandomAuthors(count) {
  for (let i = 0; i < count; i++) {
    const path = getRandomFromArray(allVideos)
    const author = path.split('/')[0]
    const orientation = getRandomFromArray(orientations)

    const wrapper = document.createElement('div')
    wrapper.className = `M_VideoAuthor ${orientation}`

    const video = document.createElement('video')
    video.className = 'A_VideoAuthor'
    video.autoplay = true
    video.muted = true
    video.loop = true

    const source = document.createElement('source')
    source.src = `images/authors/${path}`
    video.appendChild(source)

    const caption = document.createElement('p')
    caption.className = 'A_TextVideo Short Overflow'
    caption.textContent = author

    wrapper.appendChild(video)
    wrapper.appendChild(caption)
    container.appendChild(wrapper)
  }
}

function spawnRandomAuthors() {
  document.querySelectorAll('.M_VideoAuthor').forEach((el) => el.remove())

  const isMobile = window.innerWidth < 700
  const count = isMobile
    ? Math.floor(Math.random() * 3) + 3
    : Math.floor(Math.random() * 6) + 6

  generateRandomAuthors(count)
  respawnAuthors()
}

spawnRandomAuthors()

setInterval(spawnRandomAuthors, 5000)

window.addEventListener('resize', () => {
  respawnAuthors()
})
