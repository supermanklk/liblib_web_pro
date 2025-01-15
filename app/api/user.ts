// api/user.ts
import request from '~/utils/request'

export interface LoginParams {
  username: string
  password: string
}

export interface UserInfo {
  id: number
  username: string
  email: string
  avatar?: string
}

export const userApi = {
  // 登录
  login(data: LoginParams) {
    return request.post<{ token: string }>('/auth/login', data, { loading: true })
  },

  // 获取用户信息
  getUserInfo() {
    return request.get<UserInfo>('/user/info')
  },

  // 更新用户信息
  updateUserInfo(data: Partial<UserInfo>) {
    return request.put<UserInfo>('/user/info', data, { loading: true })
  },

  // 获取用户列表
  getUserList(params: any) {
    return request.getPageList<UserInfo[]>('/user/list', params)
  }
}