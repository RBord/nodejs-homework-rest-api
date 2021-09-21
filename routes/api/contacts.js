const express = require('express');
const { contacts: ctrl } = require('../../controllers');
const { contactSchema } = require('../../schemas');
const { controllerWrapper, validation } = require('../../middlewares');
const router = express.Router();

router.get('/', controllerWrapper(ctrl.getAllContacts));

router.get('/:id', controllerWrapper(ctrl.getContactById));

router.post('/', validation(contactSchema), controllerWrapper(ctrl.addContact));

router.delete('/:id', controllerWrapper(ctrl.deleteContact));

router.put('/:id', validation(contactSchema), controllerWrapper(ctrl.updateContact));

module.exports = router
