const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

router.post('/register', async (req, res) => {
    const { name, email, password, role } = req.body;
    let user = new User({ name, email, password, role });
    await user.save();
    const token = jwt.sign({ _id: user._id, role: user.role }, 'your_jwt_secret');
    res.header('Authorization', token).json({ token });
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid email or password.' });

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(400).json({ message: 'Invalid email or password.' });

    const token = jwt.sign({ _id: user._id, role: user.role }, 'your_jwt_secret');
    res.header('Authorization', token).json({ token });
});

module.exports = router;
