/* steps
1. select elements
2. open modal setup
3. close modal
4. prev & next
5. select images
*/

function getElement (selection) {
  const element = document.querySelector(selection)
  if (element) {
    return element
  }
  throw new Error(
    `Please check "${selection}" selector, no such element exists`
  )
}

class Catalog {
  constructor (element) {
    this.container = element
    this.list = [...element.querySelectorAll('.img')]
    // target
    this.modal = getElement('.modal')
    this.mainImg = getElement('.main-img')
    this.imgName = getElement('.image-name')
    this.modalImg = getElement('.modal-images')
    this.closeBtn = getElement('.close-btn')
    this.nextBtn = getElement('.next-btn')
    this.prevBtn = getElement('.prev-btn')
    // bind
    let self = this
    this.closeModal = this.closeModal.bind(this)
    this.nextImage = this.nextImage.bind(this)
    this.prevImage = this.prevImage.bind(this)
    // container event
    this.container.addEventListener('click', function (e) {
      if (e.target.classList.contains('img')) {
        self.openModal(e.target, self.list)
      }
    })
  }
  openModal (selectedImage, list) {
    this.setMainImage(selectedImage)
    this.modalImg.innerHTML = list
      .map(function (img) {
        return `<img src="${
          img.src
        }" class="${selectedImage.dataset.id === img.dataset.id ? 'modal-img selected' : 'modal-img'}" alt="${img.alt}" title="${img.title}" />`
      })
      .join('')
    this.modal.classList.add('open')
    this.closeBtn.addEventListener('click', this.closeModal)
    this.nextBtn.addEventListener('click', this.nextImage)
    this.prevBtn.addEventListener('click', this.prevImage)
  }
  setMainImage (selectedImage) {
    this.mainImg.src = selectedImage.src
    this.imgName.textContent = selectedImage.title
  }
  closeModal () {
    this.modal.classList.remove('open')
    this.closeBtn.removeEventListener('click', this.closeModal)
    this.nextBtn.removeEventListener('click', this.nextImage)
    this.prevBtn.removeEventListener('click', this.prevImage)
  }
  nextImage () {
    const selected = this.modalImg.querySelector('.selected')
    const next = selected.nextSibling || this.modalImg.firstChild
    selected.classList.remove('selected')
    next.classList.add('selected')
    this.setMainImage(next)
  }
  prevImage () {
    const selected = this.modalImg.querySelector('.selected')
    const prev = selected.previousSibling || this.modalImg.lastChild
    selected.classList.remove('selected')
    prev.classList.add('selected')
    this.setMainImage(prev)
  }
}

const iphone = new Catalog(getElement('.iphone'))
const macbook = new Catalog(getElement('.macbook'))
