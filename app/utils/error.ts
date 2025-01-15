// utils/error.ts
import { createDiscreteApi } from 'naive-ui'

const { message } = createDiscreteApi(['message'])

export function handleError(error: any) {
  if (error.response) {
    // 服务器返回错误状态码
    const status = error.response.status
    switch (status) {
      case 400:
        message.error('请求参数错误')
        break
      case 401:
        message.error('未授权，请登录')
        break
      case 403:
        message.error('拒绝访问')
        break
      case 404:
        message.error('请求地址不存在')
        break
      case 500:
        message.error('服务器内部错误')
        break
      default:
        message.error(`请求失败: ${error.message}`)
    }
  } else if (error.request) {
    // 请求发出但没有收到响应
    message.error('网络错误，请检查您的网络连接')
  } else {
    // 请求配置出错
    message.error(`请求错误: ${error.message}`)
  }
}