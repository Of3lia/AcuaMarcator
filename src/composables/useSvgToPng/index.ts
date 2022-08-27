import { Ref } from 'vue'

export function useSvgToPng (svg: Ref<SVGElement>, imgWidth:number, imgHeight:number, fileName:string) {
  // const svg = ref(_svg)

  // if(!svg){ return {error: "Svg is undefined"}}

  const canvasEl = document.createElement('canvas')
  canvasEl.setAttribute('width', '' + imgWidth)
  canvasEl.setAttribute('height', '' + imgHeight)

  const context = canvasEl.getContext('2d')
  const data = (new XMLSerializer()).serializeToString(svg.value)
  const DOMURL = window.URL || window.webkitURL || window

  const img = new Image()
  const svgBlob = new Blob([data], { type: 'image/svg+xml;charset=utf-8' })
  const url = DOMURL.createObjectURL(svgBlob)

  let imgURI: string

  img.onload = function () {
    context?.drawImage(img, 0, 0)
    DOMURL.revokeObjectURL(url)

    imgURI = canvasEl
      .toDataURL('image/png')
      .replace('image/png', 'image/octet-stream')

    const clickEvent = new MouseEvent('click', {
      view: window,
      bubbles: false,
      cancelable: true
    })
    const a = document.createElement('a')
    a.setAttribute('download', fileName)
    a.setAttribute('href', imgURI)
    a.setAttribute('target', '_blank')
    a.dispatchEvent(clickEvent)
  }

  img.src = url
}
