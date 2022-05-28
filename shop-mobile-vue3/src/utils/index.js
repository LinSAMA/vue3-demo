export const phoneVertify = (phone) => {
  let reg = /^1\d{10}$/
  return reg.test(phone)
}