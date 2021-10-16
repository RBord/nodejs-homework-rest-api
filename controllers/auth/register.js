const { User } = require('../../models')
const { v4 } = require('uuid')
const { Conflict } = require('http-errors')

const register = async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })
  if (user) {
    throw new Conflict('Email in use')
  }
  const newUser = new User({ email, verifyToken: v4() })
  newUser.setPassword(password)
  newUser.createAvatar(email)
  await newUser.save()
  res.status(201).json({
    status: 'success',
    code: 201,
    message: 'Success register',
  })
}

module.exports = register
