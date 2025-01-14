<script setup lang="ts">
import { 
  NCard, 
  NTabs, 
  NTabPane, 
  NSelect, 
  NInput, 
  NInputNumber, 
  NButton, 
  NSpace, 
  NGrid, 
  NGridItem,
  NImage,
  NTag
} from 'naive-ui'

// 模型列表
const models = ref([
  { label: 'Stable Diffusion v1.5', value: 'sd-v1.5' },
  { label: 'Stable Diffusion v2.1', value: 'sd-v2.1' },
  { label: 'Stable Diffusion XL', value: 'sd-xl' },
])

// 采样器选项
const samplers = ref([
  { label: 'Euler a', value: 'euler-a' },
  { label: 'DPM++ 2M Karras', value: 'dpm-2m-karras' },
  { label: 'DPM++ SDE Karras', value: 'dpm-sde-karras' },
])

// 表单数据
const formState = ref({
  model: 'sd-v1.5',
  prompt: '',
  negativePrompt: '',
  sampler: 'euler-a',
  steps: 20,
  cfgScale: 7,
  width: 512,
  height: 512,
  seed: -1,
})

// 生成的图片列表
const generatedImages = ref([
  { 
    id: 1,
    url: 'https://placeholder.co/512x512',
    prompt: 'a beautiful landscape',
    params: { steps: 20, cfg: 7, sampler: 'Euler a' }
  },
  // ... 更多图片
])

// 生成图片方法
const generateImage = () => {
  // TODO: 实现图片生成逻辑
  console.log('Generating image with params:', formState.value)
}
</script>

<template>
  <div class="min-h-full p-4">
    <NCard title="在线生图" class="mb-4">
      <NTabs type="segment" animated>
        <!-- 文生图 -->
        <NTabPane name="text2img" tab="文生图">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <!-- 左侧参数面板 -->
            <div class="md:col-span-2 space-y-4">
              <!-- 提示词输入 -->
              <NInput
                v-model:value="formState.prompt"
                type="textarea"
                placeholder="请输入图像提示词（英文）"
                :autosize="{ minRows: 3, maxRows: 6 }"
              />
              
              <!-- 反向提示词 -->
              <NInput
                v-model:value="formState.negativePrompt"
                type="textarea"
                placeholder="请输入反向提示词（英文）"
                :autosize="{ minRows: 2, maxRows: 4 }"
              />

              <!-- 基础参数 -->
              <NGrid :cols="2" :x-gap="12" :y-gap="8">
                <NGridItem>
                  <div class="flex flex-col gap-2">
                    <span class="text-sm">基础模型</span>
                    <NSelect
                      v-model:value="formState.model"
                      :options="models"
                    />
                  </div>
                </NGridItem>
                <NGridItem>
                  <div class="flex flex-col gap-2">
                    <span class="text-sm">采样器</span>
                    <NSelect
                      v-model:value="formState.sampler"
                      :options="samplers"
                    />
                  </div>
                </NGridItem>
                <NGridItem>
                  <div class="flex flex-col gap-2">
                    <span class="text-sm">采样步数</span>
                    <NInputNumber
                      v-model:value="formState.steps"
                      :min="1"
                      :max="150"
                    />
                  </div>
                </NGridItem>
                <NGridItem>
                  <div class="flex flex-col gap-2">
                    <span class="text-sm">CFG Scale</span>
                    <NInputNumber
                      v-model:value="formState.cfgScale"
                      :min="1"
                      :max="30"
                      :step="0.5"
                    />
                  </div>
                </NGridItem>
                <NGridItem>
                  <div class="flex flex-col gap-2">
                    <span class="text-sm">宽度</span>
                    <NInputNumber
                      v-model:value="formState.width"
                      :min="64"
                      :max="2048"
                      :step="64"
                    />
                  </div>
                </NGridItem>
                <NGridItem>
                  <div class="flex flex-col gap-2">
                    <span class="text-sm">高度</span>
                    <NInputNumber
                      v-model:value="formState.height"
                      :min="64"
                      :max="2048"
                      :step="64"
                    />
                  </div>
                </NGridItem>
              </NGrid>

              <!-- 生成按钮 -->
              <div class="flex justify-end">
                <NButton type="primary" size="large" @click="generateImage">
                  开始生成
                </NButton>
              </div>
            </div>

            <!-- 右侧预览面板 -->
            <div class="space-y-4">
              <NCard title="实时预览" class="text-center">
                <div class="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
                  <span class="text-gray-400">等待生成...</span>
                </div>
              </NCard>
            </div>
          </div>
        </NTabPane>

        <!-- 图生图 -->
        <NTabPane name="img2img" tab="图生图">
          <div class="flex items-center justify-center h-64">
            <span class="text-gray-400">图生图功能开发中...</span>
          </div>
        </NTabPane>
      </NTabs>
    </NCard>

    <!-- 历史记录 -->
    <NCard title="生成历史" class="mb-4">
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div v-for="image in generatedImages" :key="image.id" class="space-y-2">
          <NImage
            :src="image.url"
            class="rounded-lg w-full aspect-square object-cover"
            :preview-src="image.url"
          />
          <div class="space-y-1">
            <p class="text-sm text-gray-600 truncate">{{ image.prompt }}</p>
            <div class="flex flex-wrap gap-1">
              <NTag size="small" v-for="(value, key) in image.params" :key="key">
                {{ key }}: {{ value }}
              </NTag>
            </div>
          </div>
        </div>
      </div>
    </NCard>
  </div>
</template>

<style scoped>
.n-input {
  min-width: 100%;
}

:deep(.n-card-header) {
  padding: 12px 16px;
}

:deep(.n-tabs-tab) {
  padding: 8px 16px;
}
</style>