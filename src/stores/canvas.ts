import { defineStore } from 'pinia'

export const useCanvasStore = defineStore('canvas', {
  state: () => ({
    fileBase64:'',
    img:{
      width: 100,
      height: 100
    },
    text:{
      x: 10, y:10, size:20, opacity:0.5
    }
  }),
  getters: {
  },
  actions: {
  }
})
