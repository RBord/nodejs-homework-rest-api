const express = require('express')

const { controllerWrapper, authenticate, upload } = require('../../middlewares')
const { avatars: ctrl } = require('../../controllers')

const router = express.Router()

router.patch(
  '/',
  authenticate,
  upload.single('avatar'),
  controllerWrapper(ctrl.add),
)

router.get('/', controllerWrapper(ctrl.getAll))

module.exports = router
