import './index.css'
const burgerBtn = document.querySelector('.A_Burger')
const burgerBtnQuark = burgerBtn.querySelector('.Q_Burger')
const nav = document.querySelector('.W_NavMobile')
const mainNav = document.querySelector('.O_Nav')
const backdrop = document.querySelector('.Q_Backdrop')

burgerBtn.addEventListener('click', () => {
  const isOpen = nav.classList.contains('Active')

  if (isOpen) {
    nav.classList.remove('Active')
    burgerBtnQuark.classList.remove('Active')
    backdrop.classList.remove('Active')
    mainNav.style.zIndex = ''
  } else {
    nav.classList.add('Active')
    burgerBtnQuark.classList.add('Active')
    backdrop.classList.add('Active')
    mainNav.style.zIndex = '7'
  }
})

import './index.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import O_Search from './components/O_Search.jsx'

let root = null
let currentContainer = null

function renderComponent() {
  const width = window.innerWidth
  const newContainer =
    width > 830
      ? document.getElementById('root-desktop')
      : document.getElementById('root-mobile')

  if (newContainer === currentContainer) return

  if (root) {
    root.unmount()
    currentContainer.innerHTML = ''
  }

  currentContainer = newContainer
  root = ReactDOM.createRoot(currentContainer)
  root.render(<O_Search />)
}

renderComponent()

window.addEventListener('resize', () => {
  renderComponent()
})
