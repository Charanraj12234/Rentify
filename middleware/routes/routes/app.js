const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

mongoose.connect('mongodb://localhost/rentify', { useNewUrlParser: true, useUnifiedTopology: true });

app.use(bodyParser.json());

const authRoutes = require('./routes/auth');
const propertyRoutes = require('./routes/properties');

app.use('/api/auth', authRoutes);
app.use('/api/properties', propertyRoutes);

module.exports = app;
