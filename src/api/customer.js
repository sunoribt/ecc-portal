import request from '@/utils/request'

export function add(data) {
  return request({
    url: '/customer',
    method: 'post',
    data
  })
}

export function get(id) {
  return request({
    url: '/customer/' + id,
    method: 'get'
  })
}

