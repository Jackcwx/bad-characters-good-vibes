export default function getDominantColor(imageObject: CanvasImageSource) {
  const context = document
    .createElement('canvas')
    .getContext('2d') as CanvasRenderingContext2D
  //draw the image to one pixel and let the browser find the dominant color
  context.drawImage(imageObject, 0, 0, 1, 1)

  //get pixel color
  const i = context.getImageData(0, 0, 1, 1).data

  return {
    rgba: `rgba(${i[0]},${i[1]},${i[2]},${i[3]})`,
    hex:
      '#' +
      ((1 << 24) + (i[0] << 16) + (i[1] << 8) + i[2]).toString(16).slice(1),
  }
}
