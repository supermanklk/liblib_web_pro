// types/request.ts
export interface RequestOptions extends Record<string, any> {
  loading?: boolean // 是否显示加载状态
  timeout?: number // 超时时间
  headers?: Record<string, string> // 自定义请求头
  ignoreToken?: boolean // 是否忽略 token
}

export interface PaginationParams {
  page: number
  pageSize: number
  [key: string]: any
}

export interface ApiResponse<T = any> {
  code: number
  data: T
  message: string
}