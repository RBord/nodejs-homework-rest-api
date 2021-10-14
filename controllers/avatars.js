const path = require('path')
const fs = require('fs/promises')
const Jimp = require('jimp')

const { User } = require('../models')

const add = async (req, res) => {
  const { description } = req.body
  const { _id, token } = req.user
  const { path: tempDir, originalname } = req.file
  const avatarsDir = path.join('public/avatars', originalname)
  // Jimp.read(tempDir, (err, lenna) => {
  //   if (err) throw err
  //   lenna
  //     .resize(250, 250)
  //     .quality(60)
  //     .write(avatarsDir + `avatar-${_id}.jpg`)
  // })

  if (token === null) {
    res.json({
      status: 'error',
      code: 401,
      message: 'Not Authorized',
    })
  }
  try {
    await fs.rename(tempDir, avatarsDir)
    await User.findByIdAndUpdate(_id, { avatarURL: avatarsDir })
  } catch (error) {
    await fs.unlink(tempDir)
    throw error
  }
  res.json({
    description,
    status: 200,
    avatarURL: avatarsDir,
  })
}

module.exports = {
  add,
}
