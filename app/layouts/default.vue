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
    <!-- Header -->
    <header class="sticky top-0 z-50 flex h-14 items-center justify-between border-b border-gray-100 bg-white/80 px-6 backdrop-blur dark:border-dark-700 dark:bg-dark-800/80">
      <div class="flex items-center gap-6">
       <!-- Logo 区域调整 -->
        <div class="flex min-w-[220px] items-center gap-3 pr-4">
          <div class="flex items-center gap-2">
            <img src="/vite.png" alt="Logo" class="h-9 w-9" />
            <span class="text-xl font-semibold tracking-tight">LibLib AI</span>
          </div>
        </div>

        <!-- Search -->
        <NInput
          round
          clearable
          placeholder="搜索模型/图片/创作者寻找灵感"
          class="w-[480px]"
        >
          <template #prefix>
            <Search class="h-4 w-4 text-gray-400" />
          </template>
        </NInput>
      </div>

      <!-- Right Actions -->
      <NSpace align="center" :size="24">
        <!-- PC Client -->
        <NButton text class="flex items-center gap-1.5">
          <Monitor class="h-4 w-4" />
          <span>PC客户端</span>
        </NButton>

        <!-- Tutorials -->
        <NButton text class="flex items-center gap-1.5">
          <GraduationCap class="h-4 w-4" />
          <span>教程专区</span>
        </NButton>

        <!-- VIP -->
        <NButton text type="warning" class="flex items-center gap-1.5">
          <Crown class="h-4 w-4" />
          <span>会员中心</span>
        </NButton>

        <!-- Create -->
        <NButton type="primary" round class="flex items-center gap-1.5">
          <Plus class="h-4 w-4" />
          <span>发布</span>
        </NButton>

        <!-- Notifications -->
        <NDropdown :options="notificationOptions" trigger="click">
          <NBadge :value="5" :max="99" processing>
            <NButton text circle>
              <Bell class="h-5 w-5" />
            </NButton>
          </NBadge>
        </NDropdown>

        <!-- User -->
        <NDropdown :options="userOptions" trigger="click">
          <NAvatar
            round
            size="small"
            src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg"
          />
        </NDropdown>
      </NSpace>
    </header>

    <!-- Main Content -->
    <div class="flex flex-1 overflow-hidden">
    <!-- Sidebar -->
    <nav class="w-[240px] border-r border-gray-100 bg-gray-50/50 py-2 dark:border-dark-700 dark:bg-dark-800/50">
      <div class="space-y-1 px-2">
        <NuxtLink
          v-for="item in menuStore.menuItems"
          :key="item.path"
          :to="item.path"
          class="flex items-center gap-3 rounded-lg px-4 py-2.5 text-[15px] font-medium no-underline transition-colors"
          :class="[
            menuStore.activeMenu === item.path
              ? 'bg-blue-500/8 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400'
              : 'text-gray-600 hover:bg-gray-500/5 dark:text-gray-300 dark:hover:bg-dark-700/50'
          ]"
          @click="menuStore.setActiveMenu(item.path)"
        >
          <!-- 只显示 Lucide 图标 -->
          <component
            :is="item.LucideIcon"
            class="h-[18px] w-[18px]"
            :class="menuStore.activeMenu === item.path 
              ? 'text-blue-600 dark:text-blue-400' 
              : 'text-gray-500 dark:text-gray-400'"
          />
          
          <span>{{ item.label }}</span>
        </NuxtLink>
      </div>
    </nav>

    <!-- Page Content -->
      <main class="flex-1 overflow-auto p-6">
        <slot />
      </main>
    </div>
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