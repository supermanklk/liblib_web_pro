import { defineStore } from 'pinia'

export const useMenuStore = defineStore('menu', () => {
  const activeMenu = ref('/model-square') // 默认模型广场
  
  const menuItems = [
    { path: '/model-square', icon: 'i-carbon-gallery', label: '模型广场' },
    { path: '/works-inspire', icon: 'i-carbon-light-filled', label: '作品灵感' },
    { path: '/workspace', icon: 'i-carbon-workspace', label: '工作台' },
    {
      path: '/web-ui',
      icon: 'i-carbon-image-search',
      label: '在线生图'
    },
    { path: '/comfy-ui', icon: 'i-carbon-image-search', label: '在线工作流' },
    { path: '/training-lora', icon: 'i-carbon-machine-learning', label: '训练LoRA' },
    { path: '/high-availability', icon: 'i-carbon-image', label: '高级预生图' },
    { path: '/api-platform', icon: 'i-carbon-api', label: 'API开放平台' },
    { path: '/creator-center', icon: 'i-carbon-user-admin', label: '创作中心' },
    { path: '/personal-center', icon: 'i-carbon-user', label: '个人中心' },
    { path: '/member-center', icon: 'i-carbon-user-profile', label: '会员中心' },
  ]

  function setActiveMenu(path: string) {
    activeMenu.value = path
  }

  return {
    activeMenu,
    menuItems,
    setActiveMenu,
  }
})