// image paths are here so we dont clog our html code like a freak
const fanartImages = [
  'anaxa.jpeg',
  'derpina.jpeg',
  'hutao.jpeg',
  'image0.jpeg',
  'image1.jpeg',
  'image2.jpeg',
  'image3.jpeg',
  'image4.jpeg',
  'image5.jpeg',
]

const apArtImages = [
  'image0.jpeg',
  'image1.jpeg',
  'image2.jpeg',
  'image3.jpeg',
  'image4.jpeg',
  'image5.jpeg',
  'image6.jpeg',
  'image7.jpeg',
  'image8.jpeg',
  'image9.jpeg',
  'image10.jpeg',
  'image11.jpeg',
  'image12.png',
]

// all images will be in here (also add a seperator between sections)
let allImages = []
let currentIndex = 0

// init for lightbox elements
const lightbox = document.getElementById('lightbox')
const lightboxImg = document.getElementById('lightbox-img')
const lightboxSeparator = document.getElementById('lightbox-separator')
const closeBtn = document.querySelector('.lightbox-close')
const prevBtn = document.querySelector('.lightbox-prev')
const nextBtn = document.querySelector('.lightbox-next')
const currentIndexSpan = document.getElementById('current-index')
const totalCountSpan = document.getElementById('total-count')

// quick lil function to create image elements
function createImageElement(src, className, index) {
  const wrapper = document.createElement('div')
  wrapper.className = 'image-wrapper'
  wrapper.setAttribute('data-index', index)

  const img = document.createElement('img')
  img.src = src
  img.className = className
  img.alt = src.split('/').pop().split('.')[0]
  img.loading = 'lazy'

  wrapper.appendChild(img)

  wrapper.addEventListener('click', () => openLightbox(index))

  return wrapper
}

// lightbox functions
function openLightbox(index) {
  currentIndex = index
  updateLightboxContent()
  lightbox.style.display = 'block'
  document.body.style.overflow = 'hidden'
}

function closeLightbox() {
  lightbox.style.display = 'none'
  document.body.style.overflow = 'auto'
}

function updateLightboxContent() {
  const item = allImages[currentIndex]
  currentIndexSpan.textContent = currentIndex + 1

  if (item.type === 'separator') {
    lightboxImg.style.display = 'none'
    lightboxSeparator.style.display = 'flex'
  } else {
    lightboxImg.style.display = 'block'
    lightboxSeparator.style.display = 'none'
    lightboxImg.src = item.src
  }
}

function navigateLightbox(direction) {
  currentIndex += direction

  if (currentIndex < 0) {
    currentIndex = allImages.length - 1
  } else if (currentIndex >= allImages.length) {
    currentIndex = 0
  }

  updateLightboxContent()
}

// create galleries when DOM is loaded
document.addEventListener('DOMContentLoaded', function () {
  const fanartGallery = document.getElementById('fanart-gallery')
  fanartImages.forEach((imageName, i) => {
    const fullPath = `../images/Fanart/${imageName}`
    allImages.push({ src: fullPath, type: 'image' })
    const imgElement = createImageElement(fullPath, 'Fanart', i)
    fanartGallery.appendChild(imgElement)
  })

  // add the separator for between your sections
  allImages.push({ type: 'separator' })

  // ap art images
  const apArtGallery = document.getElementById('ap-art-gallery')
  apArtImages.forEach((imageName, i) => {
    const fullPath = `../images/AP Art/${imageName}`
    allImages.push({ src: fullPath, type: 'image' })
    const imgElement = createImageElement(
      fullPath,
      'ap-art',
      fanartImages.length + 1 + i,
    )
    apArtGallery.appendChild(imgElement)
  })

  // update total count
  totalCountSpan.textContent = allImages.length
// move 
  closeBtn.addEventListener('click', closeLightbox)
  prevBtn.addEventListener('click', () => navigateLightbox(-1))
  nextBtn.addEventListener('click', () => navigateLightbox(1))

  // this is so when you click outside of content it closes lightbox
  lightbox.addEventListener('click', (e) => {
    if (
      e.target === lightbox ||
      e.target === lightbox.querySelector('.lightbox-content')
    ) {
      closeLightbox()
    }
  })

  // this is whatever but accessability hurr durr keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (lightbox.style.display === 'block') {
      if (e.key === 'Escape') closeLightbox()
      if (e.key === 'ArrowLeft') navigateLightbox(-1)
      if (e.key === 'ArrowRight') navigateLightbox(1)
    }
  })
})