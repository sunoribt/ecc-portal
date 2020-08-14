import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/ecc-portal/table/list',
    method: 'get',
    params
  })
}
