const { User } = require('../../models')
const { v4 } = require('uuid')
const { Conflict } = require('http-errors')
const { sendEmail } = require('../../utils')

const register = async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })
  if (user) {
    throw new Conflict('Email in use')
  }
  const verifyToken = v4()
  const newUser = new User({ email, verifyToken })
  newUser.setPassword(password)
  newUser.createAvatar(email)
  await newUser.save()

  const sender = {
    to: email,
    subject: 'Подтверждение регистрации на сайте',
    html: `
      <a href='http://localhost:3000/api/auth/verify/${verifyToken}' target='_blank'>Подтвердить!</a>
    `,
  }
  await sendEmail(sender)

  res.status(201).json({
    status: 'success',
    code: 201,
    message: 'Success register',
    data: {
      verifyToken,
    },
  })
}

module.exports = register
