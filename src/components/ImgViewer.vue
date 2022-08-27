<script lang="ts" setup>import { useBase64 } from '@vueuse/core';
import { TIMEOUT } from 'dns';
import { storeToRefs } from 'pinia';
import { useSvgToPng } from 'src/composables/useSvgToPng';
import { useCanvasStore } from 'src/stores/canvas';
import { Ref, ref } from 'vue';

const { img, text } = storeToRefs(useCanvasStore())

const file = ref() as Ref<File>
const files = ref() as Ref<FileList>

let { base64: fileBase64 } = useBase64(file)

function onFileInput(e: Event) {
  files.value = (e.target as HTMLInputElement).files!
  file.value = files.value[files.value.length - 1]
}

const image = ref<HTMLImageElement>({} as HTMLImageElement)
const svgEl = ref<SVGElement>({} as SVGElement)
function triggerDownload() {

  for (let i = 0; i < files.value.length; i++) {
    setTimeout(() => {
      if (i != 0) file.value = files.value[i]
      useSvgToPng(svgEl, image.value.width, image.value.height, file.value.name)
    }, 500 * i)

  }

  // file.value = files.value[1]
  // fileBase64.value = useBase64(file.value).base64.value
  // setSize()

  // let { base64 } = useBase64(file.value)
  // fileBase64.value = base64.value

  // for (let i = 0; i < files.value.length; i++) {
  //   file.value = files.value[i]
  //   let { base64 } = useBase64(file.value)
  //   fileBase64.value = base64.value
  //   useSvgToPng(svgEl, image.value.width, image.value.height, file.value.name)
  // }

  file.value = files.value[0]
}

const setSize = () => {
  console.log('asd')
  img.value.width = image.value.width
  img.value.height = image.value.height
}

</script>

<template>
  <div>
    <svg ref="svgEl" class="hidden" :width="img.width" :height="img.height" :viewBox="`0 0 ${img.width} ${img.height}`">
      <image :href="fileBase64" />
      <text :opacity="text.opacity" x="50%" y="50%" dominant-baseline="middle" text-anchor="middle"
        font-family="Verdana" :font-size="text.size">
        FURLANPROP
      </text>
      <!-- <foreignObject x="0" y="0" :width="img.width" :height="img.height">
        <div :style="`font-size: ${text.size}px; color:rgba(0,0,0,${text.opacity});
          position:absolute; bottom:${text.y}px; right: ${text.x}px; font-weight:bold
        `">
          FURLANPROP
        </div>
      </foreignObject> -->
    </svg>

    <img @load="setSize" class="hidden" ref="image" :src="fileBase64" alt="" />
    <canvas class="hidden" ref="canvasEl" :width="img.width" :height="img.height"></canvas>

    <svg style=" background-color: grey;" :width="400" :height="400 * img.height / img.width"
      :viewBox="`0 0 ${img.width} ${img.height}`" xmlns="http://www.w3.org/2000/svg">
      <image :href="fileBase64" />
      <text :opacity="text.opacity" x="50%" y="50%" dominant-baseline="middle" text-anchor="middle"
        font-family="Verdana" :font-size="text.size">
        FURLANPROP
      </text>

      <!-- <foreignObject x="0" y="0" :width="img.width" :height="img.height">
        <div :style="`font-size: ${text.size}px; color:rgba(0,0,0,${text.opacity});
          position:absolute; bottom:${text.y}px; right: ${text.x}px; font-weight:bold
        `">
          FURLANPROP
        </div>
      </foreignObject> -->
    </svg>
  </div>
  <div style="display:grid; grid-template-columns: 48% 48%; gap: 4%">
    <input multiple type="file" @input="onFileInput" />
    <!-- <q-file v-model="files" label="Subir Fotos" multiple /> -->
    <q-btn @click="triggerDownload">Descargar Fotos</q-btn>
  </div>
</template>
