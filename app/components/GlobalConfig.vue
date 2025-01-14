<template>
  <n-config-provider :theme="theme" :theme-overrides="themeOverrides">
    <n-message-provider>
      <slot></slot>
    </n-message-provider>
  </n-config-provider>
</template>

<script setup lang="ts">
import { NConfigProvider, NMessageProvider, darkTheme } from 'naive-ui'

// 可以根据需要配置主题
const themeOverrides = {
  common: {
    primaryColor: '#18a058'
  }
}
</script>