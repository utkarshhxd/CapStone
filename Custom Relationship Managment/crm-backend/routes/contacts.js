const express = require('express');
const auth = require('../middleware/auth');
const Contact = require('../models/Contact');
const router = express.Router();

// Get all contacts for logged-in user
router.get('/', auth, async (req, res) => {
    try {
        const contacts = await Contact.find({ userId: req.user.id });
        res.json(contacts);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// Create new contact
router.post('/', auth, async (req, res) => {
    const { name, email, phone, company } = req.body;
    try {
        const newContact = new Contact({ userId: req.user.id, name, email, phone, company });
        const contact = await newContact.save();
        res.json(contact);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

module.exports = router;
