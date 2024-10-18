const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();

const Service = require('./models/service');

const app = express();
app.use(bodyParser.json()); // Middleware to parse JSON bodies

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Failed to connect to MongoDB', err));

// Routes

// Add a new service
app.post('/api/services', async (req, res) => {
  const { serviceName, description, price } = req.body;

  // Validate required fields
  if (!serviceName || !price) {
    return res.status(400).json({ message: 'Name and price are required.' });
  }

  try {
    const newService = new Service({ serviceName, description, price });
    await newService.save();
    res.status(201).json(newService);
  } catch (error) {
    res.status(500).json({ message: 'Failed to add service' });
  }
});

// Get all services
app.get('/api/services', async (req, res) => {
  try {
    const services = await Service.find();
    res.status(200).json(services);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve services' });
  }
});

// Update a service
app.put('/api/services/:id', async (req, res) => {
  const { id } = req.params;
  const { serviceName, description, price } = req.body;

  try {
    const updatedService = await Service.findByIdAndUpdate(
      id,
      { serviceName, description, price },
      { new: true }
    );
    res.status(200).json(updatedService);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update service' });
  }
});

// Delete a service
app.delete('/api/services/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await Service.findByIdAndDelete(id);
    res.status(200).json({ message: 'Service deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete service' });
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
