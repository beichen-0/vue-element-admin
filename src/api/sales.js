import axios from '@/utils/axios'

export const getSalesTableList = params => {
  return axios({
    url: '/sales/get',
    method: 'get',
    params: params
  })
}
