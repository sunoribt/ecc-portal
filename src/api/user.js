import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/ecc-portal/user/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/ecc-portal/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/ecc-portal/user/logout',
    method: 'post'
  })
}
