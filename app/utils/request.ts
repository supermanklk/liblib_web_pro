// utils/request.ts
import axios from 'axios'
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { createDiscreteApi } from 'naive-ui'

const { message, loadingBar } = createDiscreteApi(['message', 'loadingBar'])

// 定义响应数据接口
interface ApiResponse<T = any> {
  code: number
  data: T
  message: string
}

// 定义请求配置接口
interface RequestOptions extends AxiosRequestConfig {
  loading?: boolean
}

class RequestHttp {
  private instance: AxiosInstance

  constructor(config: AxiosRequestConfig) {
    this.instance = axios.create(config)
    
    // 请求拦截器
    this.instance.interceptors.request.use(
      (config) => {
        // 开启 loading
        if (config.loading) {
          loadingBar.start()
        }
        return config
      },
      (error) => {
        return Promise.reject(error)
      }
    )

    // 响应拦截器
    this.instance.interceptors.response.use(
      (response: AxiosResponse) => {
        const { data, config } = response
        
        // 关闭 loading
        if (config.loading) {
          loadingBar.finish()
        }

        // 处理业务状态码
        if (data.code !== 200) {
          message.error(data.message || '请求失败')
          return Promise.reject(data)
        }

        return data
      },
      (error) => {
        // 关闭 loading
        loadingBar.error()
        
        // 处理错误
        if (error.response) {
          this.handleError(error.response.status)
        } else {
          message.error('网络连接异常')
        }
        
        return Promise.reject(error)
      }
    )
  }

  // 处理错误状态码
  private handleError(status: number): void {
    switch (status) {
      case 400:
        message.error('请求参数错误')
        break
      case 401:
        message.error('未登录或登录已过期')
        break
      case 403:
        message.error('没有权限')
        break
      case 404:
        message.error('请求的资源不存在')
        break
      case 500:
        message.error('服务器错误')
        break
      default:
        message.error('未知错误')
    }
  }

  // GET 请求
  // GET 请求
  public get<T = any>(
    url: string,
    data?: Record<string, any>,
    options: RequestOptions = {}
  ): Promise<ApiResponse<T>> {
    // 如果 data 中包含 params，则使用 params 中的值
    const params = data?.params || data
    
    return this.instance.get(url, {
      ...options,
      params  // 使用解构后的参数
    })
  }

  // POST 请求
  public post<T = any>(
    url: string,
    data?: Record<string, any>,
    options: RequestOptions = {}
  ): Promise<ApiResponse<T>> {
    return this.instance.post(url, data, options)
  }

  // PUT 请求
  public put<T = any>(
    url: string,
    data?: Record<string, any>,
    options: RequestOptions = {}
  ): Promise<ApiResponse<T>> {
    return this.instance.put(url, data, options)
  }

  // DELETE 请求
  public delete<T = any>(
    url: string,
    params?: Record<string, any>,
    options: RequestOptions = {}
  ): Promise<ApiResponse<T>> {
    return this.instance.delete(url, { params, ...options })
  }
}

const request = new RequestHttp({
  baseURL: process.env.NUXT_API_BASE_URL || '/api',
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
})

export default request