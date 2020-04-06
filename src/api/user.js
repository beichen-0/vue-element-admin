import axios from '@/utils/axios'


export function login(params) {
  return axios({
    url: '/user/login',
    method: 'get',
    data: params
  })
}
export function logout(params) {
  return axios({
    url: '/user/logout',
    method: 'get',
    data: params
  })
}


export function getUserInfo(params) {
  return axios({
    url: '/user/info/get',
    method: 'get',
    data: params
  })
}

export function getUserList(reqData) {
  return axios({
    url: '/user/list/get',
    method: 'get',
    data: reqData
  })
}