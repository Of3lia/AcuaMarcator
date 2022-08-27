<script setup lang="ts">
import { ref, type Ref } from 'vue'
import { useBase64 } from '@vueuse/core'
import { useSvgToPng } from '../composables/useSvgToPng'
import { storeToRefs } from 'pinia';
import { useCanvasStore } from 'src/stores/canvas';
import ImgViewer from './ImgViewer.vue';

const { img, text } = storeToRefs(useCanvasStore())

</script>

<template>
  <div>
    <q-card>
      <ImgViewer />
    </q-card>
    <q-card>
      <q-card-section>
        <div class="text-h6 text-center">Editar Logo</div>
      </q-card-section>

      <q-item>
        <q-item-section avatar>
          <q-icon color="teal" name="text_fields" />
        </q-item-section>
        <q-item-section>
          <q-slider v-model="text.size" :min="1" :max="500" label color="teal" />
        </q-item-section>
      </q-item>
      <!-- <q-item>
        <q-item-section avatar>
          <q-icon color="teal" name="open_in_full" />
        </q-item-section>
        <q-item-section>
          <q-slider v-model="text.x" :min="1" :max="img.width" color="teal" />
          <q-slider v-model="text.y" :min="1" :max="img.height" label color="teal" />
        </q-item-section>
      </q-item> -->
      <q-item>
        <q-item-section avatar>
          <q-icon color="teal" name="opacity" />
        </q-item-section>
        <q-item-section>
          <q-slider v-model="text.opacity" :min="0.1" :max="1" :step="0.1" color="teal" />
        </q-item-section>
      </q-item>
    </q-card>
  </div>
</template>
