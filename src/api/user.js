import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/bg/loginByPassword',
    method: 'post',
    data
  })
}

export function getInfo() {
  return request({
    url: '/bg/info',
    method: 'get'
  })
}

export function logout() {
  return request({
    url: '/bg/logout',
    method: 'post'
  })
}

export function getList(params) {
  return request({
    url: '/bg/user',
    method: 'get',
    params
  })
}

export function addUser(data) {
  return request({
    url: '/bg/user',
    method: 'post',
    data
  })
}

export function updateUser(data) {
  return request({
    url: '/bg/user',
    method: 'put',
    data
  })
}

export function deleteUser(userId) {
  return request({
    url: '/bg/' + userId,
    method: 'delete'
  })
}
