import request from '@/utils/request'


// 登录方法
export function loginApi(data) {
  return request({
    url: '/api/admin/login',
    method: 'post',
    data  // 此处是需要带上数据的
  })
}

// 恢复登录状态
export function getInfo() {
  return request({
    url: '/api/admin/whoami',
    method: 'get',
  })
}

export function logout() {
  return request({
    url: '/vue-admin-template/user/logout',
    method: 'post'
  })
}
