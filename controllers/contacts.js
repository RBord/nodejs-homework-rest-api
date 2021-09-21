const { NotFound } = require('http-errors');
const contactsOperations = require('../model/index');
const { successRes } = require('../utils');

const getAllContacts = async (req, res) => {
    const result = await contactsOperations.listContacts();
    successRes(res, {result});
};

const getContactById = async (req, res) => {
    const { id } = req.params;
    const result = await contactsOperations.getContactById(id);
    if (!result) {
        throw new NotFound('Not found');
    }
    successRes(res, {result});
};

const addContact = async (req, res) => {
    const { body } = req;
    const result = await contactsOperations.addContact(body);
    successRes(res, {result}, 201);
};

const deleteContact = async (req, res) => {
    const { id } = req.params;
    const result = await contactsOperations.removeContact(id);
    if (!result) {
        throw new NotFound('Not found');
    }
    successRes(res, {message: 'contact deleted'});
};

const updateContact = async (req, res) => {
    const { body } = req;
    const { id } = req.params;
    const result = await contactsOperations.updateContact(id, body);
    if (!result) {
        throw new NotFound('Not found');
    }
    successRes(res, {result});
};

module.exports = {
    getAllContacts,
    getContactById,
    addContact,
    deleteContact,
    updateContact
}