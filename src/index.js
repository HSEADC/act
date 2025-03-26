import './index.css'
const burgerBtn = document.querySelector('.A_Burger')
const burgerBtnQuark = burgerBtn.querySelector('.Q_Burger')
const nav = document.querySelector('.W_NavMobile')
const backdrop = document.querySelector('.Q_Backdrop')

burgerBtn.addEventListener('click', () => {
  const isOpen = nav.classList.contains('Active')

  if (isOpen) {
    nav.classList.remove('Active')
    burgerBtnQuark.classList.remove('Active')
    backdrop.classList.remove('Active')
  } else {
    nav.classList.add('Active')
    burgerBtnQuark.classList.add('Active')
    backdrop.classList.add('Active')
  }
})
