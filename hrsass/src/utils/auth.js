import Cookies from 'js-cookie'

const TokenKey = 'hrsass'

export function getToken() {
  // localStoage.getItem(key)
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  // localStoage.setItem(key)
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  // localStoage.removeItem(key)
  return Cookies.remove(TokenKey)
}
