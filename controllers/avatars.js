const path = require('path')
const fs = require('fs/promises')

const { User } = require('../models')

const avatarsDir = path.join(__dirname, '../', 'public/avatars')
const add = async (req, res) => {
  const { path: tempStorage, originalname } = req.file
  try {
    const newAvatar = {
      email: req.body.email,
      avatarURL: '/public/avatars/avatar.jpg',
    }
    const result = await User.create(newAvatar)
    const [extention] = originalname.split('.').reverse()
    const newFileName = `product_main-image_${result._id}.${extention}`
    const resultStorage = path.join(avatarsDir, newFileName)
    await fs.rename(tempStorage, resultStorage)
    const avatarURL = path.join('/products', newFileName)
    const avatar = await User.findByIdAndUpdate(
      result._id,
      { avatarURL },
      { new: true },
    )
    res.status(201).json({
      result: avatar,
    })
  } catch (error) {
    await fs.unlink(tempStorage)
    throw error
  }
}

const getAll = async (req, res) => {
  const result = await User.find({})
  res.json({
    result,
  })
}

module.exports = {
  add,
  getAll,
}
