import request from '@/utils/request'

export function dayReport(data) {
  return request({
    url: '/bg/user/report/day',
    method: 'post',
    data
  })
}

export function monthReport(data) {
  return request({
    url: '/bg/user/report/month',
    method: 'post',
    data
  })
}

export function detailTrade(data) {
  return request({
    url: '/bg/user/report/detail',
    method: 'post',
    data
  })
}
