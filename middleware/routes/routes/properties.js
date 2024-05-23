const express = require('express');
const router = express.Router();
const Property = require('../models/property');
const auth = require('../middleware/auth');

router.post('/', auth, async (req, res) => {
    const { title, description, location, rent, rooms, amenities } = req.body;
    const property = new Property({ 
        title, 
        description, 
        location, 
        rent, 
        rooms, 
        amenities, 
        owner: req.user._id 
    });
    await property.save();
    res.status(201).json(property);
});

router.get('/', async (req, res) => {
    const properties = await Property.find();
    res.status(200).json(properties);
});

router.get('/search', async (req, res) => {
    const { location, rent } = req.query;
    const filters = {};
    if (location) filters.location = location;
    if (rent) filters.rent = { $lte: rent };
    
    const properties = await Property.find(filters);
    res.status(200).json(properties);
});

module.exports = router;
