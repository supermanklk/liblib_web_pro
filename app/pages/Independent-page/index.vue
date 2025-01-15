<script setup lang="ts">
import { NButton, NInput, NDataTable, useMessage } from 'naive-ui'
import { ref, onMounted } from 'vue'
import request from '~/utils/request'

definePageMeta({
  layout: 'home',
})

const message = useMessage()
const online = useOnline()

// 定义数据接口
interface UserData {
  id: number
  name: string
  email: string
  status: number
}

// 定义响应接口
interface ApiResponse<T> {
  code: number
  data: T
  message: string
}

// 状态变量
const loading = ref(false)
const searchText = ref('')
const userData = ref<UserData[]>([])

// 表格列定义
const columns = [
  {
    title: 'ID',
    key: 'id'
  },
  {
    title: '姓名',
    key: 'name'
  },
  {
    title: '邮箱',
    key: 'email'
  },
  {
    title: '状态',
    key: 'status',
    render: (row: UserData) => {
      return row.status === 1 ? '激活' : '禁用'
    }
  }
]

// 获取用户列表
async function fetchUserList() {
  loading.value = true
  try {
    const response = await request.get<ApiResponse<UserData[]>>('/api/users', {
      params: {
        keyword: searchText.value
      }
    })
    
    if (response.code === 200) {
      // userData.value = response.data
      message.success('数据加载成功')
    } else {
      message.error(response.message || '获取数据失败')
    }
  } catch (error: any) {
    message.error(error.message || '请求出错')
  } finally {
    loading.value = false
  }
}

// 搜索用户
function handleSearch() {
  fetchUserList()
}

// 添加用户
async function handleAddUser() {
  try {
    const response = await request.post<ApiResponse<UserData>>('/api/users', {
      name: '测试用户',
      email: 'test@example.com',
      status: 1
    })
    
    if (response.code === 200) {
      message.success('添加成功')
      fetchUserList() // 刷新列表
    } else {
      message.error(response.message || '添加失败')
    }
  } catch (error: any) {
    message.error(error.message || '请求出错')
  }
}

// 组件挂载时获取数据
onMounted(() => {
  fetchUserList()
})
</script>

<template>
  <div class="p-4">
    <div class="mb-4 flex gap-4 items-center">
      <n-input 
        v-model:value="searchText" 
        placeholder="请输入搜索关键词" 
        class="w-64"
        @keyup.enter="handleSearch"
      />
      <n-button type="primary" :loading="loading" @click="handleSearch">
        搜索
      </n-button>
      <n-button type="info" @click="handleAddUser">
        添加用户
      </n-button>
    </div>

    <n-data-table
      :loading="loading"
      :columns="columns"
      :data="userData"
      :bordered="false"
      striped
    />
  </div>
</template>

<style scoped>
.p-4 {
  padding: 1rem;
}
.mb-4 {
  margin-bottom: 1rem;
}
.flex {
  display: flex;
}
.gap-4 {
  gap: 1rem;
}
.items-center {
  align-items: center;
}
.w-64 {
  width: 16rem;
}
</style>