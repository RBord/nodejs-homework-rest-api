const path = require('path')
const fs = require('fs/promises')
const Jimp = require('jimp')

const { User } = require('../models')

const add = async (req, res) => {
  const { description } = req.body
  const { _id, token } = req.user
  const { path: tempDir, originalname } = req.file
  const avatarsDir = path.join(process.cwd(), 'public/avatars')
  Jimp.read(tempDir, (err, lenna) => {
    if (err) throw err
    lenna.resize(250, 250).quality(60)
  })

  if (token === null) {
    res.json({
      status: 'error',
      code: 401,
      message: 'Not Authorized',
    })
  }
  try {
    const [extention] = originalname.split('.').reverse()
    const newAvatarName = `avatar-${_id}.${extention}`
    const resultDir = path.join(avatarsDir, newAvatarName)
    await fs.rename(tempDir, resultDir)
    const avatar = path.join('/avatars', newAvatarName)
    await User.findByIdAndUpdate(_id, { avatarURL: avatar })
    res.json({
      description,
      status: 200,
      avatarURL: avatar,
    })
  } catch (error) {
    await fs.unlink(tempDir)
    throw error
  }
}

module.exports = {
  add,
}
