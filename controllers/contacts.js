const { NotFound } = require('http-errors');
const { Contact } = require('../models');
const { successRes } = require('../utils');

const getAllContacts = async (req, res) => {
    const result = await Contact.find({}, '_id name email phone favorite');
    successRes(res, {result});
};

const getContactById = async (req, res) => {
    const { id } = req.params;
    const result = await Contact.findById(id, '_id name email phone favorite' );
    if (!result) {
        throw new NotFound('Not found');
    }
    successRes(res, {result});
};

const addContact = async (req, res) => {
    const { body } = req;
    const result = await Contact.create(body, '_id name email phone favorite');
    successRes(res, {result}, 201);
};

const deleteContact = async (req, res) => {
    const { id } = req.params;
    const result = await Contact.findByIdAndDelete(id);
    if (!result) {
        throw new NotFound('Not found');
    }
    successRes(res, {message: 'contact deleted'});
};

const updateContact = async (req, res) => {
    const { body } = req;
    const { id } = req.params;
    const result = await Contact.findByIdAndUpdate(id, body, { new: true });
    if (!result) {
        throw new NotFound('Not found');
    }
    successRes(res, {result});
};

const updateStatusContact = async (req, res) => {
    const { id } = req.params;
    const { favorite } = req.body;
    const result = await Contact.findByIdAndUpdate(id, { favorite }, { new: true });
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
    updateContact,
    updateStatusContact
}