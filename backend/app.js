// app.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const AuthRouter = require('./Routes/AuthRouter');

require('dotenv').config();
require('./Models/db');

const app = express();

// Proper CORS middleware (only once)
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      process.env.PORTFOLIO_URL,
      process.env.DASHBOARD_URL,
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Middleware
app.use(bodyParser.json());

// Health check route
app.get('/ping', (req, res) => {
  res.send('PONG');
});

// Routes
app.use('/api/auth', AuthRouter);
module.exports = app;
