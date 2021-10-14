const express = require('express')
const logger = require('morgan')
const cors = require('cors')
const multer = require('multer')
const path = require('path')
const fs = require('fs/promises')

const contactsRouter = require('./routes/api/contacts')
const authRouter = require('./routes/api/auth')

const app = express()

const tempDir = path.join(__dirname, 'temp')
const avatarsDir = path.join(__dirname, 'public')

const uploadConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, tempDir)
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  },
  limits: {
    fileSize: 2048,
  },
})

const uploadMiddleware = multer({
  storage: uploadConfig,
})

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())

const avatars = []

app.post(
  '/api/auth/avatars',
  uploadMiddleware.single('avatar'),
  async (req, res) => {
    const { originalname, path: tempName } = req.file
    const fileName = path.join(avatarsDir, 'avatars', originalname)
    try {
      await fs.rename(tempName, fileName)
      const avatar = path.join('public/avatars', originalname)
      const newAvatar = { ...req.body, avatar }
      avatars.push(newAvatar)
      res.status(201).json({
        status: 'success',
        code: 201,
        data: {
          result: newAvatar,
        },
      })
    } catch (error) {
      await fs.unlink(tempName)
    }
  },
)
app.get('/api/auth/avatars', (req, res) => {
  res.json({
    status: 'succes',
    code: 200,
    data: {
      avatars,
    },
  })
})

app.use('/api/contacts', contactsRouter)
app.use('/api/auth', authRouter)

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' })
})

app.use((err, req, res, next) => {
  const { status = 500, message = 'Server error' } = err
  res.status(status).json({ message })
})

module.exports = app
