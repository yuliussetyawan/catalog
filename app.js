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
    this.imageName = getElement('.image-name')
    this.modalImg = getElement('.modal-images')
    this.closeBtn = getElement('.close-btn')
    this.nextBtn = getElement('.next-btn');
    this.prevBtn = getElement('.prev-btn')
  }
}

const iphone = new Catalog(getElement('.iphone'))
const macbook = new Catalog(getElement('.macbook'))
