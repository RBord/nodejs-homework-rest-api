const { User } = require('../../models')
const { BadRequest } = require('http-errors')
const { sendEmail, successRes } = require('../../utils')

const verifyAgain = async (req, res) => {
  const { email } = req.body
  const user = await User.findOne({ email })
  const { verify, verifyToken } = user
  if (!user) {
    throw new BadRequest('missing required field email')
  }
  if (verify) {
    throw new BadRequest('Verification has already been passed')
  }
  const sender = {
    to: email,
    subject: 'Повторное подтверждение регистрации на сайте',
    html: `
      <a href='http://localhost:3000/api/auth/verify/${verifyToken}' target='_blank'>Подтвердить повторно!</a>
    `,
  }
  await sendEmail(sender)
  successRes(res, { message: 'Verification email sent' })
}

module.exports = verifyAgain
