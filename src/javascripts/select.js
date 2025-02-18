console.clear()
document.addEventListener('DOMContentLoaded', () => {
    initModal()
})

function initModal() {
    const modalButton = document.querySelector('.A_PopUpButton')
    const popup = document.querySelector('.O_PopUpContainer')

    modalButton.addEventListener('click', () => {
        popup.classList.add('visible')
    })

    popup.addEventListener('click', () => {
        popup.classList.remove('visible')
    })
}