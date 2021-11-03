const container = document.querySelector(".container")
const pages = Array.from(container.querySelectorAll(".page"))

let isDragging = false,
    prevTranslate = 0,
    currTranslate = 0,
    startX = 0,
    startY = 0,
    currentIndex = 0,
    verticalScroll = false,
    isTranslating = false

pages.forEach((page, index) => {
  page.addEventListener("touchstart", (event) => {
    console.log('touchstart')
    isDragging = true
    startX = event.touches[0].pageX
    startY = event.touches[0].pageY
  })

  page.addEventListener("touchmove", (event) => {
    if (!isDragging) {
      return
    }
    console.log('touchmove')

    const currX = event.touches[0].pageX
    const currY = event.touches[0].pageY
    const xDiff = Math.abs(startX - currX)
    const yDiff = Math.abs(startY - currY)

    if (yDiff >= xDiff && !isTranslating) {
      // user is scrolling tab
      verticalScroll = true
    }

    if (!verticalScroll) {
      event.preventDefault()
      isTranslating = true

      const distTraveled = currX - startX
      currTranslate = prevTranslate + distTraveled

      container.style.transform = `translate(${currTranslate}px)`
    }
  })

  page.addEventListener("touchend", (event) => {
    console.log('touchend')
    isDragging = false
    verticalScroll = false
    isTranslating = false
    const distTraveled = currTranslate - prevTranslate

    if (distTraveled < -50 && index + 1 < pages.length) {
      currTranslate = 0 + (index + 1) * -page.offsetWidth
    } else if (distTraveled > 50 && index > 0) {
      currTranslate = 0 + (index - 1) * -page.offsetWidth
    } else {
      currTranslate -= distTraveled
    }

    container.style.transform = `translate(${currTranslate}px)`
    prevTranslate = currTranslate
  })
})