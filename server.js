require('dotenv').config();  // Move this to line 1!
const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');

const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));
app.use(cors());
app.use(morgan('dev'));

// Define Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/websites', require('./routes/websiteRoutes'));

// Serve static files from the React build folder
app.use(express.static(path.join(__dirname, 'build')));

// Handle React routing - return index.html for all non-API routes
app.get('/{*splat}', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const PORT = process.env.SERVER_PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));