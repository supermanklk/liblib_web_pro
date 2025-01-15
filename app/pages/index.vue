<script setup lang="ts">
import { NButton, NInput } from 'naive-ui'
// definePageMeta({
//   layout: 'home',
// })

definePageMeta({
  layout: 'default',
})

const online = useOnline()
</script>

<template>
  <div>
    <!-- <ClientOnly>
      <Suspense>
        <PageView v-if="online" />
        <div v-else text-gray:80>
          You're offline
        </div>
        <template #fallback>
          <div italic op50>
            <span animate-pulse>Loading...</span>
          </div>
        </template>
      </Suspense>
      <template #fallback>
        <div op50>
          <span animate-pulse>...</span>
        </div>
      </template>
    </ClientOnly> -->


    <div>
      <n-button type="info">测试按钮-3-3</n-button>
      <n-input placeholder="请输入" />
    </div>

  </div>
</template>
