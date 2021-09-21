const express = require('express');
const { contactSchema } = require('../../schemas');
const contactsOperations = require('../../model/index');
const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const contacts = await contactsOperations.listContacts();
    res.json({
      status: 'success',
      code: 200,
      data: {
        result: contacts
      }
    })
  } catch (error) {
    next(error)
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await contactsOperations.getContactById(id);
    if (!result) {
      const error = new Error('Not found');
      error.status = 404;
      throw error;
    }
    res.json({
      status: 'success',
      code: 200,
      data: {
        result
      }
    })
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  const { body } = req;
  try {
    const { error } = contactSchema.validate(body);
    if (error) {
      const err = new Error(`missing required name field`);
      err.status = 400;
      throw err;
    }
    const result = await contactsOperations.addContact(body);
    res.status(201).json({
      status: 'success',
      code: 201,
      data: {
        result
      }
    })
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await contactsOperations.removeContact(id);
    if (!result) {
      const error = new Error('Not found');
      error.status = 404;
      throw error;
    }
    res.json({
      status: 'success',
      code: 200,
      message: 'contact deleted'
    })
  } catch (error) {
    next(error);
  }
});

router.put('/:id', async (req, res, next) => {
  const { body } = req;
  try {
    const { error } = contactSchema.validate(body);
    if (error) {
      const err = new Error(`missing fields`);
      err.status = 400;
      throw err;
    }
    const { id } = req.params;
    const result = await contactsOperations.updateContact(id, body);
    if (!result) {
      const error = new Error('Not found');
      error.status = 404;
      throw error;
    }
    res.json({
      status: 'success',
      code: 200,
      data: {
        result
      }
    })
  } catch (error) {
    next(error);
  }
});

module.exports = router
