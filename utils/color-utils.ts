export const getAverageColor = (img: HTMLImageElement): string => {
  const canvas = document.createElement("canvas")
  const context = canvas.getContext("2d")

  if (!context) {
    return "rgba(18, 18, 18, 0.8)" // Default dark color
  }

  const width = img.width
  const height = img.height

  canvas.width = width
  canvas.height = height

  context.drawImage(img, 0, 0, width, height)

  try {
    const imageData = context.getImageData(0, 0, width, height).data

    let r = 0,
      g = 0,
      b = 0
    const pixelCount = width * height
    const sampleSize = 10 // Sample every 10th pixel for performance
    let sampledPixels = 0

    // Sample pixels to get average color
    for (let i = 0; i < imageData.length; i += 4 * sampleSize) {
      r += imageData[i]
      g += imageData[i + 1]
      b += imageData[i + 2]
      sampledPixels++
    }

    // Calculate average
    r = Math.floor(r / sampledPixels)
    g = Math.floor(g / sampledPixels)
    b = Math.floor(b / sampledPixels)

    // Darken the color for better contrast with white text
    r = Math.floor(r * 0.6)
    g = Math.floor(g * 0.6)
    b = Math.floor(b * 0.6)

    return `rgba(${r}, ${g}, ${b}, 0.8)`
  } catch (e) {
    console.error("Error getting average color:", e)
    return "rgba(18, 18, 18, 0.8)" // Default dark color
  }
}

