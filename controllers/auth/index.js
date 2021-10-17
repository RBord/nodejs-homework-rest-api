const register = require('./register')
const login = require('./login')
const logout = require('./logout')
const currentUser = require('./currentUser')
const verify = require('./verify')

module.exports = {
  register,
  login,
  logout,
  currentUser,
  verify,
}
