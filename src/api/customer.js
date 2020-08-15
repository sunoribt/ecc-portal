import request from '@/utils/request'

export function add(data) {
  return request({
    url: '/ecc-portal/customer',
    method: 'post',
    data
  })
}

export function get(id) {
  return request({
    url: '/ecc-portal/customer/'+ id,
    method: 'get'
  })
}

export function getList(params) {
  return request({
    url: '/ecc-portal/customer',
    method: 'get',
    params
  })
}
