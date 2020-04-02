import request from '@/utils/axios'

export const getSalesTableList = params => {
  return request({
    url: '/sales/get',
    method: 'get',
    params: params
  })
}
