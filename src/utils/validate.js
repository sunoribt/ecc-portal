export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUsername(str) {
  const valid_map = ['admin', 'sunoribt', 'test']
  return valid_map.indexOf(str.trim()) >= 0
}

/**
 * 手机号校验
 * @param phone
 * @returns {boolean}
 */
export function isvalidPhone(phone) {
  const reg = /^1[3|4|5|7|8][0-9]\d{9}$/
  return reg.test(phone)
}
