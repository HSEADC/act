export function chunkArray(arr, size) {
  const result = []
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size))
  }
  return result
}

export function renderGallery(container, items, options = {}) {
  const { baseUrl = '', linkPrefix = '' } = options

  container.innerHTML = ''

  const rows = chunkArray(items, 5)

  rows.forEach((rowItems) => {
    const row = document.createElement('div')
    row.className = 'M_Gallery'

    rowItems.forEach((item) => {
      const el = document.createElement('a')
      el.className = 'A_Gallery'
      el.href = linkPrefix + item.link

      if (item.type === 'vertical') {
        el.classList.add('Vertical')
      }

      // Вставка видео
      if (item.video) {
        const video = document.createElement('video')
        video.autoplay = true
        video.muted = true
        video.loop = true
        video.playsInline = true

        const source = document.createElement('source')
        source.src = baseUrl + item.video
        source.type = 'video/mp4' // Можно заменить на нужный mime-type
        video.appendChild(source)

        el.appendChild(video)
      }

      // Бейдж, если есть
      if (item.badge) {
        const badge = document.createElement('div')
        badge.className = 'A_Badge Absolute'
        badge.textContent = item.badge
        el.appendChild(badge)
      }

      row.appendChild(el)
    })

    container.appendChild(row)
  })
}
