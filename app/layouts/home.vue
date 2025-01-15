<script setup lang="ts">
import { 
  NInput, 
  NButton, 
  NSpace, 
  NDropdown, 
  NAvatar,
  NBadge
} from 'naive-ui'
import { 
  Search, 
  Monitor, 
  GraduationCap, 
  Crown, 
  Plus, 
  Bell,
  LayoutGrid, 
  Lightbulb, 
  Image, 
  Workflow, 
  Binary, 
  Maximize, 
  Code2, 
  PenTool,
  User,
  CreditCard 
} from 'lucide-vue-next'

// 路径到图标的映射
const iconMap: any = {
  '/model-square': LayoutGrid,
  '/works-inspire': Lightbulb,
  '/workspace': Lightbulb,
  '/web-ui': Image,
  '/comfy-ui': Workflow,
  '/training-lora': Binary,
  '/high-availability': Maximize,
  '/api-platform': Code2,
  '/creator-center': Code2,
  '/personal-center': User,
  '/member-center': Crown
}


import { useMenuStore } from '~/stores/menu'

const menuStore = useMenuStore()

// 更新菜单项中的图标
menuStore.menuItems = menuStore.menuItems.map(item => ({
  ...item,
  LucideIcon: iconMap[item.path] // 添加 Lucide 图标组件
}))

// 消息通知下拉选项
const notificationOptions = [
  {
    label: '系统通知',
    key: 'system'
  },
  {
    label: '互动消息',
    key: 'interaction'
  }
]

// 用户下拉选项
const userOptions = [
  {
    label: '个人中心',
    key: 'profile'
  },
  {
    label: '创作中心',
    key: 'creator'
  },
  {
    type: 'divider',
    key: 'd1'
  },
  {
    label: '退出登录',
    key: 'logout'
  }
]
</script>

<template>
  <div class="flex h-screen flex-col bg-white dark:bg-dark-800">
   
    demo
    <main class="flex-1 overflow-auto p-6">
        <slot />
      </main>
      demo
   
  </div>
</template>

<style>
:root {
  --primary: rgb(59, 130, 246);
  --primary-hover: rgb(37, 99, 235);
}

::selection {
  background: var(--primary);
  color: white;
}

/* 自定义滚动条 */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: #e5e7eb;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: #d1d5db;
}

.dark ::-webkit-scrollbar-thumb {
  background: #374151;
}

.dark ::-webkit-scrollbar-thumb:hover {
  background: #4b5563;
}
</style>