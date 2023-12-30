const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
app.use(cors());
app.use(bodyParser.json());

mongoose.connect('MONGOOSEURL', {

});

const clientSchema = new mongoose.Schema({
  username: String,
  contact: Number,
  service: String,
  address: String
});

const Client = mongoose.model('Client', clientSchema);

app.get('/', (req, res) => {
  res.send({ "message": "hello its connected." });
});

// POST endpoint
app.post('/api/data', (req, res) => {
  // Update data with the posted content
  const data = req.body;
  res.json({ message: 'Data updated successfully!', data });
});

// POST endpoint for adding a new client
app.post('/api/card2', async (req, res) => {
  try {
    const formData = req.body;

    const newClient = new Client(formData);
    await newClient.save();

    res.json({ success: true, message: 'Client added successfully!', newClient });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error adding client.' });
  }
});

// GET endpoint for fetching all clients
app.get('/api/card3', async (req, res) => {
  try {
    const clients = await Client.find();
    res.json({ data: clients });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching clients.' });
  }
});

// GET endpoint for deleting a client by ID
app.get('/api/card3/delete/:id', async (req, res) => {
  const clientId = req.params.id;

  try {
    const deletedClient = await Client.findByIdAndDelete(clientId);

    if (!deletedClient) {
      return res.status(404).json({ success: false, message: 'Client not found.' });
    }

    res.json({ success: true, message: 'Client deleted successfully.', deletedClient });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error deleting client.' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
