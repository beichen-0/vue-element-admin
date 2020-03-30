import Cookies from 'js-cookie'

// const TokenKey = "Admin-token"

// 获取token
export function getToken(TokenKey) {
  return Cookies.get(TokenKey)
}

// 存储token
export function setToken(TokenKey, token) {
  return Cookies.set(TokenKey, token)
}

// 移除token
export function removeToken(TokenKey) {
  return Cookies.remove(TokenKey)
}
