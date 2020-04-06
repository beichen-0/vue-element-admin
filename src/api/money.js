import axios from "@/utils/axios"

export const getMoneyIncomePay = (params) => {
  return axios({
    url: "/money/get",
    method: "get",
    params
  })
}

export const addMoney = params => {
  return axios({
    url: "/money/add",
    method: "get",
    params
  })
}

export const removerMoney = params => {
  return axios({
    url: "/money/remove",
    method: "get",
    params
  })
}

export const batchremoveMoney = params => {
  return axios({
    url: "/money/batchremove",
    method: "get",
    params
  })
}

export const updateMoney = params => {
  return axios({
    url: "/money/edit",
    method: "get",
    params
  })
}
