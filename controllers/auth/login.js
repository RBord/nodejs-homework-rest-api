const { User } = require('../../models')
const { BadRequest } = require('http-errors')

const login = async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email }, '_id email password verify')
  if (!user || !user.comparePassword(password)) {
    throw new BadRequest('Invalid email or password')
  }
  if (!user.verify) {
    throw new BadRequest('Email not verify!')
  }
  const token = user.createToken()
  await User.findByIdAndUpdate(user._id, { token })
  res.json({
    status: 'succes',
    code: 200,
    data: {
      token,
    },
  })
}

module.exports = login
