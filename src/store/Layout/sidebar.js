import { defineStore } from 'pinia'

export const useSidebarStore = defineStore('sidebarStore', {
  state: () => ({
    sidebarVisible: '',
    sidebarUnfoldable: false,
  }),
  actions: {
    toggleSidebar() {
      this.sidebarVisible = !this.sidebarVisible
    },
    toggleUnfoldable() {
      this.sidebarUnfoldable = !this.sidebarUnfoldable
    },
    updateSidebarVisible(payload) {
      this.sidebarVisible = payload
    },
  },
})
