<template>
  <div id="background" />
</template>

<script setup>
import {onMounted, onBeforeUnmount} from 'vue'
import p5 from 'p5'

const props = defineProps({
  active: {
    type: Boolean
  }
})

const background = {
  p5: null,
  mouse: {
    position: { x: 0, y: 0 },
    offset: { x: 0, y: 0 }
  },
  options: {
    baseColor: 50,
    squareSize: 16,
    noiseSmoothness: 0.001,
    speedMultiplier: 0.0025,
    cursorAsTarget: true,
    lerpMode: true
  },
  isResizing: false
}

function backgroundSetup(p5) {
  p5.setup = () => {
    p5.frameRate(30)
    p5.noStroke()

    p5.createCanvas(
      p5.windowWidth,
      p5.windowHeight
    ).parent("background")

    background.mouse.position = {
      x: p5.mouseX,
      y: p5.mouseY
    }
  }

  p5.draw = () => {
    if (!props.active || background.isResizing) {
      return false
    }

    if (!background.options.lerpMode) {
      background.mouse.position.x = p5.mouseX
      background.mouse.position.y = p5.mouseY
    } else {
      background.mouse.position.x = p5.lerp(background.mouse.position.x, p5.mouseX, 0.005)
      background.mouse.position.y = p5.lerp(background.mouse.position.y, p5.mouseY, 0.005)
    }

    let mouseOffsetX = background.mouse.position.x - p5.windowWidth / 2
    let mouseOffsetY = background.mouse.position.y - p5.windowHeight / 2

    if (background.options.speedMultiplier > 0) {
      mouseOffsetX = mouseOffsetX * background.options.speedMultiplier
      mouseOffsetY = mouseOffsetY * background.options.speedMultiplier
    }

    if (background.options.cursorAsTarget) {
      mouseOffsetX = mouseOffsetX * -1
      mouseOffsetY = mouseOffsetY * -1
    }

    background.mouse.offset.x += mouseOffsetX
    background.mouse.offset.y += mouseOffsetY

    for (let squareX = 0; squareX < p5.width; squareX += background.options.squareSize) {
      for (let squareY = 0; squareY < p5.height; squareY += background.options.squareSize) {
        const color = background.options.baseColor * p5.noise(
          background.options.noiseSmoothness * (background.mouse.offset.x + squareX),
          background.options.noiseSmoothness * (background.mouse.offset.y + squareY)
        )

        p5.fill(color)
        p5.rect(squareX, squareY, background.options.squareSize, background.options.squareSize)
      }
    }
  }

  p5.windowResized = () => {
    clearTimeout(window.resizeTimeout)

    background.isResizing = true

    window.resizeTimeout = setTimeout(() => {
      background.isResizing = false
      p5.resizeCanvas(p5.windowWidth, p5.windowHeight)
    }, 100)
  }
}

onMounted(() => background.p5 = new p5(backgroundSetup))
onBeforeUnmount(() => background.p5.remove())
</script>

<style lang="scss">
#background {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #222;
  overflow: hidden;
  cursor: move;

  canvas {
    opacity: 0.5;
    pointer-events: none;
  }
}

h1 {
  color: white;
}

p {
  color: #aaa;
}
</style>
