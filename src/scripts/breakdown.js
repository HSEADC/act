const breakdownContainer = document.querySelector('.O_BreakdownContent')
const breakdownItems = document.querySelectorAll('.W_BreakdownMainContent')
const vh = window.innerHeight
const offset = 92

breakdownContainer.style.height = `calc((${vh - offset}px) * ${
  breakdownItems.length * 1.5
})`

window.addEventListener('scroll', () => {
  if (window.innerWidth < 500) return
  const container = document.querySelector('.O_BreakdownContent')
  const items = document.querySelectorAll('.W_BreakdownMainContent')
  const buttons = document.querySelectorAll(
    '.C_LinksColumn.Sticky .A_ButtonLink'
  )

  const offsetTop = container.getBoundingClientRect().top

  if (offsetTop <= 92) {
    const scrolled = Math.abs(offsetTop - 92)
    const fadeStep = window.innerHeight

    items.forEach((item, index) => {
      const start = index * fadeStep
      const end = (index + 1) * fadeStep

      if (scrolled >= start && scrolled < end) {
        item.style.opacity = '1'

        buttons.forEach((btn) => btn.classList.add('Default'))
        buttons.forEach((btn) => btn.classList.remove('Active'))
        buttons[index]?.classList.add('Active')
        buttons[index]?.classList.remove('Default')
      } else {
        item.style.opacity = '0'
      }
    })
  } else {
    // Reset all
    items.forEach((el) => (el.style.opacity = '0'))
    buttons.forEach((btn) => {
      btn.classList.add('Default')
      btn.classList.remove('Active')
    })
  }
})

window.addEventListener('resize', () => {
  if (window.innerWidth < 500) {
    breakdownContainer.style.height = 'auto'
    return
  }

  const vh = window.innerHeight
  breakdownContainer.style.height = `calc((${vh - offset}px) * ${
    breakdownItems.length * 1.5
  })`
})
