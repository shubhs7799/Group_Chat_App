require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const connectDB = require("./src/config/db");
const authRoutes = require('./src/routes/authRoutes');
const cookieParser = require("cookie-parser");

const app = express();
// Middleware
// app.use(cors({
//   origin: process.env.CLIENT_URL || 'http://localhost:3000', // Configure CORS properly
//   credentials: true // Allow cookies
// }));

app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


// serve frontend static files (optional if you serve differently)
app.use(express.static(path.join(__dirname, 'public')));

// API routes
app.use('/api/v1', authRoutes);

const PORT = process.env.PORT || 5000;
connectDB()
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => console.log(`Server started on http://localhost:${PORT}`));
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });
