const express = require('express')
const { contacts: ctrl } = require('../../controllers')
const { joiSchema, updateFavoriteJoiSchema } = require('../../models/contact')
const {
  controllerWrapper,
  validation,
  authenticate,
} = require('../../middlewares')
const router = express.Router()

router.get('/', authenticate, controllerWrapper(ctrl.getAllContacts))

router.get('/:id', controllerWrapper(ctrl.getContactById))

router.post(
  '/',
  authenticate,
  validation(joiSchema),
  controllerWrapper(ctrl.addContact),
)

router.delete('/:id', controllerWrapper(ctrl.deleteContact))

router.put('/:id', validation(joiSchema), controllerWrapper(ctrl.updateContact))

router.patch(
  '/:id/favorite',
  validation(updateFavoriteJoiSchema),
  controllerWrapper(ctrl.updateStatusContact),
)

module.exports = router
