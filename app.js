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
    this.closeModal = this.closeModal.bind(this);
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
        return `<img src="${img.src}" class="modal-img" alt="${img.alt}" title="${img.title}" />`
      })
      .join('')
    this.modal.classList.add('open')
    this.closeBtn.addEventListener('click', this.closeModal)
  }
  setMainImage (selectedImage) {
    this.mainImg.src = selectedImage.src
    this.imgName.textContent = selectedImage.title
  }
  closeModal () {
    this.modal.classList.remove('open')
    this.closeBtn.removeEventListener('click', this.closeModal);
  }
}

const iphone = new Catalog(getElement('.iphone'))
const macbook = new Catalog(getElement('.macbook'))
