// -------------------------------
// Basic Express Server
// -------------------------------
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// -------------------------------
// MongoDB Connection
// -------------------------------
mongoose.connect(process.env.MONGO_URL || 'your-mongo-url-here', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log('MongoDB error:', err));

// -------------------------------
// Listing Model
// -------------------------------
const ListingSchema = new mongoose.Schema({
  title: String,
  price: String,
  platform: String,
  location: String,
  url: String,
  image: String
});

const Listing = mongoose.model('Listing', ListingSchema);

// -------------------------------
// GET /listings Route
// -------------------------------
app.get('/listings', async (req, res) => {
  try {
    const listings = await Listing.find();
    res.json(listings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// -------------------------------
// Root Test Route
// -------------------------------
app.get('/', (req, res) => {
  res.send('Backend is running');
});

// -------------------------------
// Start Server
// -------------------------------
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
