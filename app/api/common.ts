// api/common.ts
import request from '~/utils/request'
import type { ApiResponse, PaginationParams, PaginationResponse } from '~/types/api'

export const commonApi = {
  // 上传文件
  uploadFile(file: File) {
    const formData = new FormData()
    formData.append('file', file)
    return request.post<ApiResponse<{ url: string }>>('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  },

  // 获取配置信息
  getConfig() {
    return request.get<ApiResponse<Record<string, any>>>('/config')
  }
}